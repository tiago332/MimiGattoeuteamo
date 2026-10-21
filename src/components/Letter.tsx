import { Heart } from "lucide-react";
import { conteudo } from "@/content";
import { Reveal, SectionTitle } from "./Reveal";

export function Letter() {
  const t = conteudo.carta;
  return (
    <Reveal id="carta" className="mt-14 md:mt-24">
      <SectionTitle num="01">{t.titulo}</SectionTitle>
      <article className="relative rounded-[18px] border border-white/10 bg-[repeating-linear-gradient(to_bottom,transparent_0_31px,rgba(147,197,253,0.10)_31px_32px)] bg-white/[0.06] px-[22px] pt-8 pb-[26px] leading-8 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:px-14 md:pt-11 md:pb-9 md:text-[1.08rem]">
        <div className="absolute top-0 bottom-0 left-3.5 w-px bg-rosa/25 md:left-[34px]" aria-hidden="true" />
        <div className="absolute -top-4 right-[22px] grid size-10 rotate-12 place-items-center rounded-full bg-rosa text-[#3a1220] shadow-[0_4px_12px_rgba(249,168,192,0.4)]" aria-hidden="true">
          <Heart className="size-5 fill-current" />
        </div>
        {t.paragrafos.map((p) => (
          <p key={p.slice(0, 24)} className="mb-4">
            {p}
          </p>
        ))}
        <p className="mb-4 font-serif text-xl text-azul italic">{t.destaque}</p>
        <div className="mt-3 text-right font-mao text-[1.6rem] text-rosa">
          {t.assinaturaAntes} <strong className="font-bold">{t.assinatura}</strong>
        </div>
      </article>
    </Reveal>
  );
}
