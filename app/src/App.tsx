import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProjectGrid from './components/ProjectGrid';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import ProofOfWork from './components/ProofOfWork';
import CodingProfiles from './components/CodingProfiles';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import Orb from './components/reactbits/Orb';
import AboutPage from './components/AboutPage';

function HomePage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* ── Full-body even dot grid ───────────────────────── */}
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

      {/* ── Subtle Orb Background ───────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.15 }}>
        <Orb />
      </div>

      <Navbar />

      <main className="relative z-[1]">
        <Hero />

        <ProjectGrid />

        <Timeline />

        <Skills />

        <ProofOfWork />

        <CodingProfiles />

        <Blogs />
      </main>

      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
