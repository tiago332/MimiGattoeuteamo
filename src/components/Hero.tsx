import { ChevronDown } from "lucide-react";
import { conteudo, fotos } from "@/content";

const leque = [
  "-translate-x-[112%] -rotate-12 group-hover:-translate-x-[130%] group-hover:-rotate-[16deg]",
  "-translate-x-1/2 rotate-2 z-10",
  "translate-x-[12%] rotate-[13deg] group-hover:translate-x-[30%] group-hover:rotate-[17deg]",
];

export function Hero() {
  const t = conteudo.hero;
  const escolhidas = t.fotosLeque.map((n) => fotos[n - 1]).filter(Boolean);

  return (
    <header className="flex min-h-[92svh] flex-col items-center justify-center pt-12 pb-8 text-center">
      <div className="mb-3.5 text-xs font-bold tracking-[3px] text-rosa uppercase">{t.eyebrow}</div>
      <h1 className="mb-[18px] font-serif text-[clamp(2.6rem,12vw,5rem)] leading-[1.02] font-medium tracking-tight">
        {t.nome}
        <span className="block text-rosa italic">{t.sobrenome}</span>
        <span aria-hidden="true">💙</span>
      </h1>
      <p className="mx-auto max-w-[460px] text-white/75">{t.subtitulo}</p>

      <a href="#fotos" aria-label="ver nossas fotos" className="group relative mx-auto mt-9 block h-[200px] w-[min(280px,78vw)]">
        {escolhidas.map((f, i) => (
          <img
            key={f.src}
            src={f.src}
            alt=""
            decoding="async"
            className={`absolute top-1/2 left-1/2 aspect-[4/5] w-[46%] -translate-y-1/2 rounded-[3px] border-[7px] border-b-[22px] border-white bg-white/10 object-cover shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 ${leque[i] ?? ""}`}
          />
        ))}
      </a>

      <a href="#carta" className="mt-7 inline-flex flex-col items-center gap-1 font-mao text-xl text-white/60 no-underline">
        <span>{t.rolar}</span>
        <ChevronDown className="size-5 animate-quicar" aria-hidden="true" />
      </a>
    </header>
  );
}
