"use client";

import { Swords } from "lucide-react";

interface RivalryTrackerProps {
  selectedUniverse: string;
}

export function RivalryTracker({ selectedUniverse }: RivalryTrackerProps) {
  const allRivalries = [
    // DC
    { 
      p1: "Batman", p2: "Joker", p1Wins: 42, p2Wins: 18, p1Color: "#52525b", p2Color: "#a855f7",
      universe: "DC",
      description: "An eternal struggle of order versus chaos. Batman refuses to break his one rule, while the Joker lives only to try and force his hand."
    },
    { 
      p1: "Superman", p2: "Lex Luthor", p1Wins: 45, p2Wins: 12, p1Color: "#3b82f6", p2Color: "#10b981",
      universe: "DC",
      description: "Biology versus intellect. Luthor views Superman as an affront to human achievement; Superman sees a man blinded by ego."
    },
    { 
      p1: "Wonder Woman", p2: "Cheetah", p1Wins: 38, p2Wins: 15, p1Color: "#facc15", p2Color: "#ca8a04",
      universe: "DC",
      description: "Divine power versus feral cursed strength. Once friends, Barbara Minerva's transformation has made them eternal enemies."
    },

    // Marvel
    { 
      p1: "Iron Man", p2: "Captain America", p1Wins: 15, p2Wins: 16, p1Color: "#ef4444", p2Color: "#3b82f6",
      universe: "Marvel",
      description: "Freedom versus Security. Their fundamental differences often lead to explosive conflict, notably during the Civil War."
    },
    { 
      p1: "Spider-Man", p2: "Green Goblin", p1Wins: 52, p2Wins: 14, p1Color: "#ef4444", p2Color: "#22c55e",
      universe: "Marvel",
      description: "Norman Osborn's madness and his targeting of Peter Parker's loved ones has made this a cycle of tragedy and vengeance."
    },
    { 
      p1: "Thor", p2: "Loki", p1Wins: 35, p2Wins: 22, p1Color: "#60a5fa", p2Color: "#10b981",
      universe: "Marvel",
      description: "Asgardian brothers defined by godhood and mischief. Loki's thirst for the throne vs Thor's duty to protect the realms."
    },

    // Street Fighter
    { 
      p1: "Ryu", p2: "Ken", p1Wins: 55, p2Wins: 50, p1Color: "#ef4444", p2Color: "#dc2626",
      universe: "Street Fighter",
      description: "Two eternal brothers trained under Gouken. Ryu's pursuit of the true warrior vs Ken's fiery, passionate fighting style."
    },
    { 
      p1: "Chun-Li", p2: "M. Bison", p1Wins: 28, p2Wins: 20, p1Color: "#3b82f6", p2Color: "#dc2626",
      universe: "Street Fighter",
      description: "A quest for justice. Chun-Li seeks to dismantle Shadaloo and avenge her father's death at the hands of the dictator."
    },
    { 
      p1: "Guile", p2: "M. Bison", p1Wins: 25, p2Wins: 22, p1Color: "#10b981", p2Color: "#dc2626",
      universe: "Street Fighter",
      description: "Vengeance for a fallen comrade. Guile's military discipline vs Bison's Psycho Power, fueled by the memory of Charlie Nash."
    },

    // Mortal Kombat
    { 
      p1: "Scorpion", p2: "Sub-Zero", p1Wins: 88, p2Wins: 85, p1Color: "#eab308", p2Color: "#3b82f6",
      universe: "Mortal Kombat",
      description: "Fire and ice. Stemming from the destruction of the Shirai Ryu by the Lin Kuei, this is gaming's most iconic rivalry."
    },
    { 
      p1: "Raiden", p2: "Shao Kahn", p1Wins: 40, p2Wins: 42, p1Color: "#3b82f6", p2Color: "#ef4444",
      universe: "Mortal Kombat",
      description: "The protector of Earthrealm vs the Conqueror of Outworld. A clash that determines the fate of entire dimensions."
    },
    { 
      p1: "Liu Kang", p2: "Shang Tsung", p1Wins: 32, p2Wins: 18, p1Color: "#ef4444", p2Color: "#a855f7",
      universe: "Mortal Kombat",
      description: "The Shaolin champion vs the soul-stealing sorcerer. The original Mortal Kombat conflict that started the legacy."
    },

    // Star Wars
    { 
      p1: "Luke Skywalker", p2: "Darth Vader", p1Wins: 4, p2Wins: 3, p1Color: "#10b981", p2Color: "#ef4444",
      universe: "Star Wars",
      description: "The tragedy of the Skywalker lineage. A battle not just of lightsabers, but for the soul of Anakin Skywalker."
    },
    { 
      p1: "Obi-Wan", p2: "Darth Vader", p1Wins: 2, p2Wins: 1, p1Color: "#3b82f6", p2Color: "#ef4444",
      universe: "Star Wars",
      description: "Master vs Apprentice. From the flames of Mustafar to the corridors of the Death Star, a conflict that shaped the galaxy."
    },
    { 
      p1: "Han Solo", p2: "Boba Fett", p1Wins: 3, p2Wins: 2, p1Color: "#a855f7", p2Color: "#10b981",
      universe: "Star Wars",
      description: "Scoundrel vs Bounty Hunter. A tactical game of cat and mouse from the asteroid fields to the pits of Tatooine."
    },

    // TMNT
    { 
      p1: "Leonardo", p2: "Raphael", p1Wins: 22, p2Wins: 24, p1Color: "#3b82f6", p2Color: "#ef4444",
      universe: "TMNT",
      description: "Internal friction. Leo's disciplined leadership vs Raph's hot-headed rebellion, often settled on the rooftops of NYC."
    },
    { 
      p1: "Shredder", p2: "Splinter", p1Wins: 35, p2Wins: 38, p1Color: "#a1a1aa", p2Color: "#7c2d12",
      universe: "TMNT",
      description: "A centuries-old clan bloodfeud. Oroku Saki's hatred for Hamato Yoshi fuels the Foot Clan's war against the Turtles."
    },
    { 
      p1: "Casey Jones", p2: "Raphael", p1Wins: 15, p2Wins: 18, p1Color: "#52525b", p2Color: "#ef4444",
      universe: "TMNT",
      description: "Street-level kindred spirits. Initially rivals, their shared short tempers and vigilante methods forged an unbreakable bond."
    },

    // X-Men
    { 
      p1: "Professor X", p2: "Magneto", p1Wins: 28, p2Wins: 30, p1Color: "#eab308", p2Color: "#ef4444",
      universe: "X-Men",
      description: "Coexistence versus Survival. Xavier's dream vs Magneto's hard-line stance for mutant supremacy."
    },
    { 
      p1: "Wolverine", p2: "Sabretooth", p1Wins: 45, p2Wins: 42, p1Color: "#facc15", p2Color: "#fb923c",
      universe: "X-Men",
      description: "A primal, feral rivalry spanning centuries. Victor Creed exists solely to torment Logan on his birthday and beyond."
    },
    { 
      p1: "Cyclops", p2: "Wolverine", p1Wins: 20, p2Wins: 22, p1Color: "#ef4444", p2Color: "#facc15",
      universe: "X-Men",
      description: "The Boy Scout vs the Rebel. A clash over leadership philosophies and their mutual love for Jean Grey."
    },

    // Godzilla
    { 
      p1: "Godzilla", p2: "Kong", p1Wins: 2, p2Wins: 1, p1Color: "#3b82f6", p2Color: "#71717a",
      universe: "Godzilla",
      description: "The battle for alpha status. The prehistoric god of the ocean vs the King of Skull Island."
    },
    { 
      p1: "Godzilla", p2: "King Ghidorah", p1Wins: 3, p2Wins: 1, p1Color: "#3b82f6", p2Color: "#eab308",
      universe: "Godzilla",
      description: "Apex predator vs alien invader. Godzilla defends his crown against the three-headed planetary assassin."
    },
    { 
      p1: "Godzilla", p2: "MechaGodzilla", p1Wins: 2, p2Wins: 1, p1Color: "#3b82f6", p2Color: "#94a3b8",
      universe: "Godzilla",
      description: "Biological vs Technological apex. Humanity's ultimate weapon challenged by the King of the Monsters."
    },

    // Mario
    { 
      p1: "Mario", p2: "Bowser", p1Wins: 120, p2Wins: 5, p1Color: "#ef4444", p2Color: "#22c55e",
      universe: "Mario",
      description: "Platforming's greatest conflict. Bowser's obsession with the Mushroom Kingdom vs Mario's unbreakable spirit."
    },
    { 
      p1: "Mario", p2: "Wario", p1Wins: 40, p2Wins: 12, p1Color: "#ef4444", p2Color: "#eab308",
      universe: "Mario",
      description: "The reverse rivalry. Wario's greed and envy of Mario's fame drive him to constant schemes and competition."
    },
    { 
      p1: "Donkey Kong", p2: "Mario", p1Wins: 15, p2Wins: 22, p1Color: "#7c2d12", p2Color: "#ef4444",
      universe: "Mario",
      description: "The original arcade rivalry. It all started with a construction site and a kidnapped girlfriend named Pauline."
    },

    // Harry Potter
    { 
      p1: "Harry Potter", p2: "Voldemort", p1Wins: 1, p2Wins: 0, p1Color: "#ef4444", p2Color: "#22c55e",
      universe: "Harry Potter",
      description: "The Boy Who Lived vs the Dark Lord. Neither can live while the other survives. A conflict defined by destiny."
    },
    { 
      p1: "Harry Potter", p2: "Draco Malfoy", p1Wins: 12, p2Wins: 4, p1Color: "#ef4444", p2Color: "#10b981",
      universe: "Harry Potter",
      description: "School-age rivalry of privilege vs fame. A clash of houses that defined their years at Hogwarts."
    },
    { 
      p1: "Dumbledore", p2: "Grindelwald", p1Wins: 1, p2Wins: 0, p1Color: "#60a5fa", p2Color: "#dc2626",
      universe: "Harry Potter",
      description: "Tracing back to their youth, this rivalry concluded with the greatest magical duel in the history of wizardkind."
    },

    // Lord of the Rings
    { 
      p1: "Gandalf", p2: "Saruman", p1Wins: 5, p2Wins: 2, p1Color: "#f8fafc", p2Color: "#64748b",
      universe: "Lord of the Rings",
      description: "The Order of the Wizards split. Gandalf's humility and wisdom against Saruman's industrial greed and lust for the One Ring."
    },
    { 
      p1: "Aragorn", p2: "Sauron", p1Wins: 1, p2Wins: 0, p1Color: "#475569", p2Color: "#18181b",
      universe: "Lord of the Rings",
      description: "The heir of Isildur vs the Dark Lord. A multi-generational struggle for the fate of Middle-earth and the crown of Gondor."
    },
    { 
      p1: "Frodo", p2: "Gollum", p1Wins: 15, p2Wins: 18, p1Color: "#166534", p2Color: "#52525b",
      universe: "Lord of the Rings",
      description: "Two souls bound by the same burden. A tragic mirror of what the Ring does to its bearer, ending at the Crack of Doom."
    },

    // Transformers
    { 
      p1: "Optimus Prime", p2: "Megatron", p1Wins: 552, p2Wins: 548, p1Color: "#ef4444", p2Color: "#52525b",
      universe: "Transformers",
      description: "The eternal war for Cybertron. Optimus fights for freedom while Megatron seeks peace through absolute tyranny."
    },
    { 
      p1: "Bumblebee", p2: "Lockdown", p1Wins: 28, p2Wins: 32, p1Color: "#eab308", p2Color: "#18181b",
      universe: "Transformers",
      description: "The scrappy scout vs the intergalactic hunter. A game of speed and stealth against superior technology and ruthless experience."
    },
    { 
      p1: "Soundwave", p2: "Jazz", p1Wins: 45, p2Wins: 42, p1Color: "#2563eb", p2Color: "#94a3b8",
      universe: "Transformers",
      description: "Sonic warfare. The cold, logical data-mastery of Soundwave clashing with Jazz's rhythmic maneuvers and unpredictable flair."
    },

    // Power Rangers
    { 
      p1: "Red Ranger", p2: "Green Ranger", p1Wins: 15, p2Wins: 16, p1Color: "#ef4444", p2Color: "#22c55e",
      universe: "Power Rangers",
      description: "The classic clash of leadership and raw, corrupted talent before the Green Ranger joined the side of good."
    },
    { 
      p1: "Zordon", p2: "Lord Zedd", p1Wins: 1, p2Wins: 1, p1Color: "#60a5fa", p2Color: "#450a0a",
      universe: "Power Rangers",
      description: "The ancient cosmic sage versus the self-proclaimed Emperor of Evil. A rivalry that spans ten thousand years."
    },

    // Pokemon
    { 
      p1: "Pikachu", p2: "Mewtwo", p1Wins: 5, p2Wins: 12, p1Color: "#facc15", p2Color: "#7c3aed",
      universe: "Pokemon",
      description: "The ultimate underdog vs the genetic masterpiece. Heart and determination against absolute psychic power."
    },
    { 
      p1: "Charizard", p2: "Blastoise", p1Wins: 85, p2Wins: 82, p1Color: "#ea580c", p2Color: "#1d4ed8",
      universe: "Pokemon",
      description: "Fire vs Water. A high-stakes clash of elemental power and the most iconic starter rivalry in the series history."
    },

    // Dragon Ball Z
    { 
      p1: "Goku", p2: "Vegeta", p1Wins: 4, p2Wins: 3, p1Color: "#f97316", p2Color: "#2563eb",
      universe: "Dragon Ball Z",
      description: "The low-class Saiyan warrior vs the Prince of all Saiyans. An eternal race for power and the title of the strongest."
    },
    { 
      p1: "Gohan", p2: "Cell", p1Wins: 1, p2Wins: 0, p1Color: "#a855f7", p2Color: "#166534",
      universe: "Dragon Ball Z",
      description: "Harnessing dormant potential. The final stand during the Cell Games to protect the Earth from perfection."
    },

    // Ancient Greek Monsters
    { 
      p1: "Zeus", p2: "Typhon", p1Wins: 1, p2Wins: 0, p1Color: "#facc15", p2Color: "#450a0a",
      universe: "Ancient Greek Monsters",
      description: "King of the Gods vs Father of Monsters. A reality-shaking duel for the sovereignty of the heavens and earth."
    },
    { 
      p1: "Medusa", p2: "Perseus", p1Wins: 0, p2Wins: 1, p1Color: "#166534", p2Color: "#94a3b8",
      universe: "Ancient Greek Monsters",
      description: "The petrifying gaze vs the winged hero. A mythic hunt defining the boundaries between human skill and monstrous curse."
    },

    // How to Train Your Dragon
    { 
      p1: "Hiccup", p2: "Drago Bludvist", p1Wins: 2, p2Wins: 1, p1Color: "#7c2d12", p2Color: "#18181b",
      universe: "How to Train Your Dragon",
      description: "Bond versus Control. Hiccup's friendship with dragons vs Drago's ideology of enslavement and brute force dominance."
    },

    // Spongebob
    { 
      p1: "Spongebob", p2: "Squidward", p1Wins: 1200, p2Wins: 2, p1Color: "#facc15", p2Color: "#0ea5e9",
      universe: "Spongebob",
      description: "Eternal optimism vs chronic cynicism. Spongebob's idea of a perfect day is usually Squidward's worst nightmare."
    },
    { 
      p1: "Mr. Krabs", p2: "Plankton", p1Wins: 850, p2Wins: 45, p1Color: "#ef4444", p2Color: "#166534",
      universe: "Spongebob",
      description: "The fast-food war. A never-ending business rivalry for the Secret Formula of the legendary Krabby Patty."
    }
  ];

  const rivalries = allRivalries.filter(r => r.universe === selectedUniverse);

  if (rivalries.length === 0) {
    return (
      <div className="bg-zinc-900/20 border border-zinc-800/40 rounded-3xl p-12 text-center">
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest italic">
          No major recorded rivalries for the {selectedUniverse} universe in current archives.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {rivalries.map((r, i) => {
        const total = Math.max(r.p1Wins + r.p2Wins, 1);
        const p1Pct = (r.p1Wins / total) * 100;
        
        return (
           <div key={i} className="bg-zinc-900/30 border border-zinc-800/60 rounded-3xl p-6 lg:p-8 flex flex-col hover:border-blue-500/20 transition-all group">
              
              {/* Header section */}
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                 <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-800 px-2 py-1 rounded-md mb-2 inline-block">
                      {r.universe}
                    </span>
                    <div className="flex items-center gap-4 text-xl md:text-2xl font-black uppercase tracking-tighter">
                       <span style={{ color: r.p1Color }}>{r.p1}</span>
                       <Swords className="text-zinc-700 w-5 h-5" />
                       <span style={{ color: r.p2Color }}>{r.p2}</span>
                    </div>
                 </div>
                 
                 {/* Bar & Stats */}
                 <div className="flex flex-col w-full md:w-64 gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest">
                        <span style={{ color: r.p1Color }}>{r.p1Wins} WINS</span>
                        <span style={{ color: r.p2Color }}>{r.p2Wins} WINS</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden flex shadow-inner">
                        <div 
                            className="h-full transition-all" 
                            style={{ width: `${p1Pct}%`, backgroundColor: r.p1Color }} 
                        />
                        <div 
                            className="h-full transition-all" 
                            style={{ width: `${100 - p1Pct}%`, backgroundColor: r.p2Color }} 
                        />
                    </div>
                 </div>
              </div>

              {/* Description */}
              <div className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-4xl border-l-2 border-zinc-800 pl-4 group-hover:border-blue-500/50 transition-colors">
                {r.description}
              </div>
           </div>
        );
      })}
    </div>
  );
}

