import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { conteudo } from "@/content";

interface Props {
  visivel: boolean;
  tocando: boolean;
  progresso: number;
  onToggle: () => void;
}

export function MusicPlayer({ visivel, tocando, progresso, onToggle }: Props) {
  const t = conteudo.musica;
  return (
    <div
      aria-label="player de música"
      className={cn(
        "fixed inset-x-4 bottom-[calc(12px+env(safe-area-inset-bottom))] z-20 mx-auto flex h-16 max-w-[420px] items-center gap-3 rounded-full border border-white/10 bg-[#0b1430]/70 pr-4 pl-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)]",
        visivel ? "translate-y-0" : "translate-y-[140%]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={tocando ? "pausar música" : "tocar música"}
        className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-rosa text-[#3a1220] shadow-[0_6px_14px_rgba(249,168,192,0.35)] active:scale-95"
      >
        {tocando ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
      </button>
      <div className="grid min-w-0 flex-1 gap-px">
        <span className="truncate font-serif text-[0.95rem] italic">{t.titulo}</span>
        <span className="text-[0.62rem] font-bold tracking-[2px] text-rosa uppercase">{t.subtitulo}</span>
        <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-white/15">
          <div className="h-full bg-rosa" style={{ width: `${progresso}%` }} />
        </div>
      </div>
      <div className="flex h-5 items-end gap-[3px]" aria-hidden="true">
        {[0, -0.3, -0.6, -0.15].map((d) => (
          <i
            key={d}
            className={cn("h-1 w-[3px] rounded-sm bg-rosa", tocando ? "animate-eq" : "opacity-50")}
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
    </div>
  );
}
