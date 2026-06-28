import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProjectGrid from './components/ProjectGrid';
import Experience from './components/Experience';
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

      {/* ── Floatable Bottom-Right Resume Button ── */}
      <motion.a
          href="https://drive.google.com/file/d/14e1FNWHGEC8MTRzZLAsXBUIf55uvCGUT/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-6 bottom-8 z-40 flex items-center gap-2.5 px-5 py-3 rounded-full border shadow-lg group transition-all duration-300"
          style={{
              background: 'rgba(20, 20, 30, 0.82)',
              borderColor: 'rgba(108, 99, 255, 0.45)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255,255,255,0.025) inset',
              backdropFilter: 'blur(20px)',
              textDecoration: 'none',
          }}
          whileHover={{
              y: -4,
              borderColor: 'var(--color-accent)',
              background: 'rgba(108, 99, 255, 0.15)',
              boxShadow: '0 12px 32px rgba(108, 99, 255, 0.3)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1.2 }}
      >
          <Download
              size={15}
              className="transition-transform duration-300 group-hover:translate-y-[1px]"
              style={{ color: 'var(--color-accent)' }}
          />
          <span
              className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: '#fff' }}
          >
              Resume
          </span>
      </motion.a>

      <Navbar />

      <main className="relative z-[1]">
        <Hero />

        <ProjectGrid />

        <Timeline />

        <Experience />

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
