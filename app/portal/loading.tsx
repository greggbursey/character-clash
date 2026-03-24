import { Loader2 } from "lucide-react";

export default function PortalLoading() {
  return (
    <div className="min-h-[100dvh] w-full bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full scale-150 animate-pulse" />
        {/* Spinner */}
        <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-zinc-400 animate-spin relative z-10" />
      </div>
      <p className="mt-8 text-zinc-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base animate-pulse shadow-black drop-shadow-lg">
        Initializing Portal...
      </p>
    </div>
  );
}
