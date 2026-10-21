import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Faz o bloco aparecer suavemente quando entra na tela. */
export function Reveal({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visto");
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visto");
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={cn("revelar scroll-mt-6", className)}>
      {children}
    </section>
  );
}

export function SectionTitle({ num, children }: { num: string; children: ReactNode }) {
  return (
    <h2 className="mb-4 flex items-baseline gap-2.5 font-serif text-[1.6rem] leading-tight font-bold md:text-[2.1rem]">
      <span className="font-mao text-[1.3rem] font-bold text-rosa">{num}</span>
      {children}
    </h2>
  );
}

export function Hint({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("-mt-2 mb-4 font-mao text-lg text-white/60", className)}>{children}</p>;
}
