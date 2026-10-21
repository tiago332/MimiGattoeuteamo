import CelestialResonance from "@/components/ui/celestial-resonance";

const settings = {
  particleCount: 1000,
  particleSpeed: 0.05,
  particleLife: 400,
  trailOpacity: 0.1,
  hueSpeed: 0.1,
  canvasGlow: 10,
};

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="h-screen w-screen">
      <CelestialResonance {...s} className="h-full w-full" />
    </div>
  );
}
