import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProjectGrid from './components/ProjectGrid';
import Timeline from './components/Timeline';
import ProofOfWork from './components/ProofOfWork';
import Footer from './components/Footer';

export default function App() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* ── Full-body even dot grid ───────────────────────── */}
      {/* Fixed so it doesn't scroll — consistent across all sections */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(42,42,58,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,42,58,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <Navbar />

      <main className="relative z-[1]">
        <Hero />

        <ProjectGrid />

        <Timeline />

        <ProofOfWork />
      </main>

      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  );
}
