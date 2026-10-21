import { useEffect, useRef, useState } from "react";
import CelestialResonance from "@/components/ui/celestial-resonance";
import { Opening } from "@/components/Opening";
import { Hero } from "@/components/Hero";
import { Letter } from "@/components/Letter";
import { Gallery } from "@/components/Gallery";
import { Reasons } from "@/components/Reasons";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Reveal } from "@/components/Reveal";
import { conteudo } from "@/content";

/** Menos partículas no celular e para quem pediu menos movimento: mantém a rolagem lisa. */
function configParticulas() {
  const celular = window.matchMedia("(max-width: 640px)").matches;
  const poucoMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (poucoMovimento) return { particleCount: 200, particleSpeed: 0.02, hueSpeed: 0.03, canvasGlow: 4 };
  if (celular) return { particleCount: 450, particleSpeed: 0.05, hueSpeed: 0.1, canvasGlow: 6 };
  return { particleCount: 1000, particleSpeed: 0.05, hueSpeed: 0.1, canvasGlow: 10 };
}

export default function App() {
  const audio = useRef<HTMLAudioElement>(null);
  const [aberto, setAberto] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [particulas] = useState(configParticulas);

  useEffect(() => {
    document.title = conteudo.tituloAba;
  }, []);

  // trava a rolagem enquanto a abertura está na tela
  useEffect(() => {
    document.body.style.overflow = aberto ? "" : "hidden";
  }, [aberto]);

  function tocar() {
    audio.current?.play().catch(() => setTocando(false));
  }

  function alternar() {
    const a = audio.current;
    if (!a) return;
    if (a.paused) tocar();
    else a.pause();
  }

  return (
    <>
      {/* fundo de partículas, fixo atrás de tudo */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <CelestialResonance {...particulas} particleLife={400} trailOpacity={0.1} className="h-full w-full" ariaLabel="" />
      </div>
      {/* véu leve pra manter o texto legível sobre as partículas */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,5,20,0.15),rgba(0,5,20,0.55))]" aria-hidden="true" />

      <Opening
        onOpen={(comMusica) => {
          setAberto(true);
          if (comMusica) tocar();
        }}
      />

      <main className="relative mx-auto max-w-[920px] px-4 pb-[calc(64px+48px+env(safe-area-inset-bottom))] md:px-8">
        <Hero />
        <Letter />
        <Gallery />
        <Reasons />

        <Reveal id="versiculo" className="mt-14 md:mt-24">
          <blockquote className="m-0 border-y border-white/15 px-5 py-9 text-center">
            <p className="mb-3 font-serif text-[1.3rem] leading-snug italic md:text-[1.7rem]">{conteudo.versiculo.texto}</p>
            <cite className="text-xs font-bold tracking-[2px] text-rosa uppercase not-italic">{conteudo.versiculo.referencia}</cite>
          </blockquote>
        </Reveal>

        <Reveal className="mt-14 text-center">
          <footer>
            <p className="m-0 font-mao text-[2rem] font-bold text-rosa">{conteudo.rodape.texto}</p>
            <div className="mt-1.5 inline-block animate-bater text-2xl" aria-hidden="true">
              {conteudo.rodape.emojis}
            </div>
          </footer>
        </Reveal>
      </main>

      <MusicPlayer visivel={aberto} tocando={tocando} progresso={progresso} onToggle={alternar} />
      <audio
        ref={audio}
        src={`/${conteudo.musica.arquivo}`}
        loop
        preload="metadata"
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgresso((a.currentTime / a.duration) * 100);
        }}
      />
    </>
  );
}
