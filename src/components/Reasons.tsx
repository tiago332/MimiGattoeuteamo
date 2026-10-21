import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { conteudo } from "@/content";
import { Hint, Reveal, SectionTitle } from "./Reveal";

export function Reasons() {
  const t = conteudo.motivos;
  return (
    <Reveal id="motivos" className="mt-14 md:mt-24">
      <SectionTitle num="03">{t.titulo}</SectionTitle>
      <Hint>{t.dica}</Hint>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {t.lista.map((texto, i) => (
          <Card key={i} numero={i + 1} texto={texto} />
        ))}
      </div>
    </Reveal>
  );
}

function Card({ numero, texto }: { numero: number; texto: string }) {
  const [virado, setVirado] = useState(false);
  const face = "virar-face absolute inset-0 rounded-[18px] shadow-[0_14px_34px_rgba(0,0,0,0.4)]";
  return (
    <button
      type="button"
      aria-pressed={virado}
      onClick={() => setVirado((v) => !v)}
      className="virar relative min-h-[132px] cursor-pointer border-0 bg-transparent p-0 text-left md:min-h-40"
    >
      <span
        className={cn(
          face,
          "virar-frente flex items-center justify-between px-6 text-[#2a0f1a]",
          numero % 2 ? "bg-gradient-to-br from-rosa to-[#c4b5fd]" : "bg-gradient-to-br from-azul to-[#c4b5fd]",
        )}
      >
        <b className="font-serif text-[2.4rem] font-medium italic">{String(numero).padStart(2, "0")}</b>
        <Heart className="size-7 fill-current opacity-80" aria-hidden="true" />
      </span>
      <span className={cn(face, "virar-verso flex items-center border border-white/10 bg-[#0b1430]/90 px-5 py-4 leading-normal backdrop-blur-md")}>
        {texto}
      </span>
    </button>
  );
}
