import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";

export interface TriviaSession {
  id?: string;
  category: 'all' | 'universe' | 'character';
  filterValue: string;
  score: number;
  total: number;
  timestamp: any;
}

export async function saveTriviaSession(session: Omit<TriviaSession, 'timestamp'>) {
  try {
    const docRef = await addDoc(collection(db, "triviaSessions"), {
      ...session,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving trivia session:", error);
    return null;
  }
}

export async function getTriviaStats() {
  try {
    const q = query(collection(db, "triviaSessions"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const sessions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TriviaSession[];

    if (sessions.length === 0) return null;

    const totalCompletions = sessions.length;
    const scores = sessions.map(s => s.score);
    const totalPossible = sessions.reduce((acc, s) => acc + s.total, 0);
    const totalScored = sessions.reduce((acc, s) => acc + s.score, 0);
    
    const universeStats: Record<string, { total: number, count: number, max: number, min: number }> = {};
    const characterStats: Record<string, { total: number, count: number, max: number, min: number }> = {};

    sessions.forEach(s => {
      if (s.category === 'universe') {
        if (!universeStats[s.filterValue]) {
          universeStats[s.filterValue] = { total: 0, count: 0, max: 0, min: 10 };
        }
        universeStats[s.filterValue].total += s.score;
        universeStats[s.filterValue].count++;
        universeStats[s.filterValue].max = Math.max(universeStats[s.filterValue].max, s.score);
        universeStats[s.filterValue].min = Math.min(universeStats[s.filterValue].min, s.score);
      } else if (s.category === 'character') {
        if (!characterStats[s.filterValue]) {
          characterStats[s.filterValue] = { total: 0, count: 0, max: 0, min: 5 };
        }
        characterStats[s.filterValue].total += s.score;
        characterStats[s.filterValue].count++;
        characterStats[s.filterValue].max = Math.max(characterStats[s.filterValue].max, s.score);
        characterStats[s.filterValue].min = Math.min(characterStats[s.filterValue].min, s.score);
      }
    });

    return {
      totalCompletions,
      averageScore: (totalScored / totalPossible) * 100,
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      universeStats,
      characterStats
    };
  } catch (error) {
    console.error("Error fetching trivia stats:", error);
    return null;
  }
}
