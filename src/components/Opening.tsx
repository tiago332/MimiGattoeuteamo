import { useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { conteudo } from "@/content";

/** Tela de abertura. O toque no botão também libera a música no celular. */
export function Opening({ onOpen }: { onOpen: (comMusica: boolean) => void }) {
  const [fechando, setFechando] = useState(false);
  const [removida, setRemovida] = useState(false);
  const t = conteudo.abertura;

  if (removida) return null;

  function abrir(comMusica: boolean) {
    setFechando(true);
    onOpen(comMusica);
    setTimeout(() => setRemovida(true), 800);
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 grid place-items-center bg-noite/70 p-6 backdrop-blur-xl transition-[opacity,visibility] duration-700",
        fechando && "invisible opacity-0",
      )}
    >
      <div className="grid justify-items-center gap-[18px] text-center">
        <div className="relative h-[100px] w-[150px] animate-flutuar rounded-lg bg-[#fffaf2] shadow-[0_18px_40px_rgba(0,0,0,0.45)]" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 h-[60px] rounded-t-lg bg-[#f2d4da] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          <div className="absolute top-[42px] left-1/2 grid size-[34px] -translate-x-1/2 place-items-center rounded-full bg-[#c4536a] font-serif font-bold text-white shadow-[0_3px_8px_rgba(196,83,106,0.45)]">
            {t.inicialSelo}
          </div>
        </div>
        <p className="mt-2 font-mao text-[1.9rem] leading-tight">{t.texto}</p>
        <button
          type="button"
          onClick={() => abrir(true)}
          className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-rosa px-8 py-3.5 text-[1.05rem] font-bold tracking-wide text-[#3a1220] shadow-[0_10px_30px_rgba(249,168,192,0.35)] transition active:scale-95"
        >
          {t.botao} <Mail className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => abrir(false)}
          className="cursor-pointer p-2 text-sm text-white/60 underline underline-offset-4"
        >
          {t.semMusica}
        </button>
      </div>
    </div>
  );
}
