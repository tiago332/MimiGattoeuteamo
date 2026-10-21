import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { conteudo, fotos } from "@/content";
import { Hint, Reveal, SectionTitle } from "./Reveal";

const giros = ["-rotate-[1.5deg]", "rotate-[1.8deg]", "-rotate-[0.6deg]", "rotate-[1.8deg]", "-rotate-[1.5deg]", "-rotate-[0.6deg]"];

export function Gallery() {
  const t = conteudo.fotos;
  const trilho = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  const [aberta, setAberta] = useState<number | null>(null);

  // marca o pontinho da foto que está no centro do carrossel
  const marcar = useCallback(() => {
    const g = trilho.current;
    if (!g) return;
    const centro = g.scrollLeft + g.clientWidth / 2;
    let melhor = 0;
    let menor = Infinity;
    Array.from(g.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centro);
      if (d < menor) {
        menor = d;
        melhor = i;
      }
    });
    setAtivo(melhor);
  }, []);

  return (
    <Reveal id="fotos" className="mt-14 md:mt-24">
      <SectionTitle num="02">{t.titulo}</SectionTitle>
      <Hint className="md:hidden">{t.dica} →</Hint>

      <div
        ref={trilho}
        onScroll={() => requestAnimationFrame(marcar)}
        className="sem-barra -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-3.5 pb-[22px] md:mx-0 md:grid md:grid-cols-3 md:gap-x-7 md:gap-y-[34px] md:overflow-visible md:px-0"
      >
        {fotos.map((f, i) => (
          <figure
            key={f.src}
            className={cn(
              "relative m-0 flex-[0_0_76%] snap-center rounded bg-white px-2.5 pt-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.45)] transition-transform duration-300 sm:flex-[0_0_44%] md:hover:z-10 md:hover:scale-[1.03] md:hover:rotate-0",
              giros[i],
            )}
          >
            <span className="absolute -top-2.5 left-1/2 z-10 h-[22px] w-[70px] -translate-x-1/2 -rotate-3 bg-[#f2d4da]/85 shadow-sm" aria-hidden="true" />
            <button type="button" onClick={() => setAberta(i)} className="block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-[#efe4d3] p-0" aria-label={`ampliar ${f.legenda}`}>
              <img src={f.src} alt={f.alt} decoding="async" className="block size-full object-cover" />
            </button>
            <figcaption className="px-1 pt-2 pb-3 text-center font-mao text-[1.35rem] text-[#3a2e2b]">{f.legenda}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-1 flex justify-center gap-2 md:hidden" aria-hidden="true">
        {fotos.map((f, i) => (
          <span key={f.src} className={cn("h-[7px] rounded-full transition-all", i === ativo ? "w-5 bg-rosa" : "w-[7px] bg-white/25")} />
        ))}
      </div>

      {aberta !== null && <Lightbox indice={aberta} setIndice={setAberta} />}
    </Reveal>
  );
}

function Lightbox({ indice, setIndice }: { indice: number; setIndice: (i: number | null) => void }) {
  const fechar = useRef<HTMLButtonElement>(null);
  const inicioX = useRef<number | null>(null);
  // só devolve o foco (com contorno) pra foto se a pessoa estiver usando teclado
  const usouTeclado = useRef(false);
  const total = fotos.length;
  const ir = useCallback((d: number) => setIndice((indice + d + total) % total), [indice, setIndice, total]);
  const f = fotos[indice];

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    fechar.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = "";
      if (usouTeclado.current) anterior?.focus({ preventScroll: true });
      else anterior?.blur();
    };
  }, []);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      usouTeclado.current = true;
      if (e.key === "Escape") setIndice(null);
      if (e.key === "ArrowLeft") ir(-1);
      if (e.key === "ArrowRight") ir(1);
    };
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [ir, setIndice]);

  const botao = "absolute grid size-11 cursor-pointer place-items-center rounded-full bg-white/12 text-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="foto ampliada"
      onClick={(e) => e.target === e.currentTarget && setIndice(null)}
      onTouchStart={(e) => (inicioX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (inicioX.current === null) return;
        const dx = e.changedTouches[0].clientX - inicioX.current;
        if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
        inicioX.current = null;
      }}
      className="fixed inset-0 z-40 flex animate-aparecer touch-pan-y items-center justify-center bg-black/90 px-3 pt-14 pb-[calc(24px+env(safe-area-inset-bottom))]"
    >
      <button ref={fechar} type="button" onClick={() => setIndice(null)} aria-label="fechar" className={cn(botao, "top-[calc(10px+env(safe-area-inset-top))] right-2.5")}>
        <X className="size-5" />
      </button>
      <button type="button" onClick={() => ir(-1)} aria-label="foto anterior" className={cn(botao, "top-1/2 left-2 -translate-y-1/2 md:left-6")}>
        <ChevronLeft className="size-6" />
      </button>
      <figure className="m-0 grid max-h-full max-w-full justify-items-center gap-2.5">
        <img src={f.src} alt={f.alt} className="max-h-[calc(100svh-150px)] max-w-full rounded-md object-contain shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
        <figcaption className="font-mao text-2xl text-white">{f.legenda}</figcaption>
      </figure>
      <button type="button" onClick={() => ir(1)} aria-label="próxima foto" className={cn(botao, "top-1/2 right-2 -translate-y-1/2 md:right-6")}>
        <ChevronRight className="size-6" />
      </button>
    </div>
  );
}
