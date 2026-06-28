import { motion } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Mail, MapPin, GraduationCap, Briefcase, Code2, Brain, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Orb from './reactbits/Orb';
import profilePic from '../assets/Tarun_profile.jpeg';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.08 } },
};

export default function AboutPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative" style={{ background: 'var(--color-bg-primary)' }}>
            {/* Background grid */}
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

            {/* Orb background */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.12 }}>
                <Orb hue={20} />
            </div>

            {/* Back button */}
            <motion.nav
                className="fixed top-6 left-6 z-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                    style={{
                        background: 'rgba(10, 10, 15, 0.7)',
                        border: '1px solid rgba(42, 42, 58, 0.6)',
                        color: 'var(--color-text-secondary)',
                        backdropFilter: 'blur(16px)',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                        e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(42, 42, 58, 0.6)';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                >
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                    Back
                </button>
            </motion.nav>

            {/* Content */}
            <main className="relative z-[1] max-w-4xl mx-auto px-6 pt-28 pb-24">
                {/* Hero section */}
                <motion.section
                    className="mb-20 flex flex-col md:flex-row gap-10 items-center justify-between"
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                >
                    {/* Left: Content */}
                    <div className="flex-1 w-full">
                        <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                            <span
                                className="text-[11px] font-mono tracking-[0.2em] uppercase mb-4 block"
                                style={{ color: 'var(--color-text-tertiary)' }}
                            >
                                About
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
                            variants={fadeUp}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <span style={{ color: 'var(--color-text-primary)' }}>Tarun </span>
                            <span className="text-gradient-accent">V</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg sm:text-xl leading-relaxed mb-8"
                            style={{ color: 'var(--color-text-secondary)' }}
                            variants={fadeUp}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Software engineer exploring the intersection of AI reliability, agentic systems, and applied intelligence.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-3"
                            variants={fadeUp}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <InfoPill icon={<MapPin size={14} />} text="India" />
                            <InfoPill icon={<GraduationCap size={14} />} text="B.Tech, AI & DS" />
                            <InfoPill icon={<Code2 size={14} />} text="Full-Stack + AI" />
                        </motion.div>
                    </div>

                    {/* Right: Picture */}
                    <motion.div
                        className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden flex-shrink-0"
                        variants={fadeUp}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{
                            border: '2px solid rgba(108, 99, 255, 0.4)',
                            boxShadow: '0 0 20px rgba(108, 99, 255, 0.2)',
                        }}
                        whileHover={{
                            scale: 1.03,
                            borderColor: 'var(--color-accent)',
                            boxShadow: '0 0 32px rgba(108, 99, 255, 0.35)',
                        }}
                    >
                        <img
                            src={profilePic}
                            alt="Tarun V"
                            className="w-full h-full object-cover object-top"
                        />
                    </motion.div>
                </motion.section>

                {/* Divider */}
                <motion.div
                    className="w-full h-px mb-16"
                    style={{ background: 'linear-gradient(to right, transparent, var(--color-border-default), transparent)' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                />

                {/* The Story */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <SectionHeader label="001" title="The Story" />
                    <div className="space-y-5 text-base leading-[1.85]" style={{ color: 'var(--color-text-secondary)' }}>
                        <p>
                            I didn't start with a plan. I started with curiosity — the kind that keeps you up at 2 AM
                            debugging a model that should have converged three hours ago.
                        </p>
                        <p>
                            What began as writing Python scripts to analyze datasets quickly evolved into building
                            full-stack applications, then into designing AI systems that don't just process information —
                            they <em className="text-gradient-accent" style={{ fontStyle: 'normal', fontWeight: 600 }}>reason, decide, and adapt</em>.
                        </p>
                        <p>
                            Today, I work at the intersection of software engineering and applied AI. I build systems
                            that are reliable under pressure, transparent in their decisions, and designed for real-world
                            deployment — not just notebook demos.
                        </p>
                    </div>
                </motion.section>

                {/* What I Work On */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeader label="002" title="What I Build" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DomainCard
                            icon={<Brain size={20} />}
                            title="Agentic AI Systems"
                            description="Multi-agent orchestration, MCP servers, tool-use frameworks — systems where AI coordinates with external services at production scale."
                            accent="108,99,255"
                        />
                        <DomainCard
                            icon={<Code2 size={20} />}
                            title="RAG & Document Intelligence"
                            description="LangChain + vector databases for retrieval-augmented generation. Building Q&A systems with source citations and evidence-backed answers."
                            accent="34,211,238"
                        />
                        <DomainCard
                            icon={<Briefcase size={20} />}
                            title="Full-Stack Platforms"
                            description="MERN, Next.js, FastAPI — role-based apps with real-time features, AI integration, and production-grade architecture."
                            accent="52,211,153"
                        />
                        <DomainCard
                            icon={<Brain size={20} />}
                            title="AI Security & Reliability"
                            description="LLM security research, prompt injection defense, API trust frameworks. Making AI systems you can actually deploy safely."
                            accent="251,191,36"
                        />
                    </div>
                </motion.section>

                {/* Principles */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeader label="003" title="Principles" />
                    <div className="space-y-6">
                        {[
                            {
                                title: 'Build to ship, not to demo',
                                body: 'Every project I build is designed with deployment in mind. If it can\'t handle edge cases, it\'s not done.',
                            },
                            {
                                title: 'Depth over breadth',
                                body: 'I\'d rather master one problem domain deeply than skim across ten. Understanding compounds.',
                            },
                            {
                                title: 'Speed is a feature',
                                body: 'The gap between an idea and a shipped prototype should be measured in hours, not weeks. Velocity is skill.',
                            },
                            {
                                title: 'Transparent systems',
                                body: 'AI that can\'t explain its decisions isn\'t intelligent — it\'s a liability. Every system I build has observability baked in.',
                            },
                        ].map((p, i) => (
                            <motion.div
                                key={i}
                                className="relative pl-6"
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                            >
                                <div
                                    className="absolute left-0 top-1.5 w-2 h-2 rounded-full"
                                    style={{ background: 'var(--color-accent)' }}
                                />
                                <h4
                                    className="text-base font-semibold mb-1"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {p.title}
                                </h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                    {p.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Connect */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeader label="004" title="Let's Connect" />
                    <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Open to collaboration, research discussions, and interesting problems.
                        If you're building something at the intersection of AI and engineering, I'd love to hear about it.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://drive.google.com/file/d/15G8CSScZ_T7KQbY5p4vt4MexK-ie1awk/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
                            style={{
                                border: '1px solid rgba(108, 99, 255, 0.4)',
                                color: 'var(--color-accent)',
                                background: 'rgba(108, 99, 255, 0.08)',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-accent)';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.background = 'rgba(108, 99, 255, 0.18)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.4)';
                                e.currentTarget.style.color = 'var(--color-accent)';
                                e.currentTarget.style.background = 'rgba(108, 99, 255, 0.08)';
                            }}
                        >
                            <Download size={16} />
                            Resume
                        </a>
                        <SocialButton
                            href="https://github.com/Tarunvoff"
                            icon={<Github size={16} />}
                            label="GitHub"
                        />
                        <SocialButton
                            href="https://www.linkedin.com/in/tarun-v-sece/"
                            icon={<Linkedin size={16} />}
                            label="LinkedIn"
                        />
                        <SocialButton
                            href="mailto:tarunvoff@gmail.com"
                            icon={<Mail size={16} />}
                            label="tarunvoff@gmail.com"
                        />
                    </div>
                </motion.section>
            </main>

            {/* Bottom gradient */}
            <div
                className="fixed bottom-0 inset-x-0 h-32 pointer-events-none z-[2]"
                style={{
                    background: 'linear-gradient(to top, var(--color-bg-primary), transparent)',
                }}
            />
        </div>
    );
}

/* ── Sub-components ────────────────────────────────── */

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
                background: 'rgba(42, 42, 58, 0.4)',
                border: '1px solid rgba(42, 42, 58, 0.6)',
                color: 'var(--color-text-secondary)',
            }}
        >
            {icon}
            {text}
        </span>
    );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
    return (
        <div className="mb-8">
            <span
                className="text-[10px] font-mono tracking-[0.22em] uppercase block mb-2"
                style={{ color: 'var(--color-accent)' }}
            >
                {label}
            </span>
            <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
            >
                {title}
            </h2>
        </div>
    );
}

function DomainCard({
    icon,
    title,
    description,
    accent,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    accent: string;
}) {
    return (
        <motion.div
            className="p-5 rounded-xl transition-all duration-300"
            style={{
                background: 'rgba(26, 26, 36, 0.5)',
                border: '1px solid rgba(42, 42, 58, 0.3)',
                backdropFilter: 'blur(12px)',
            }}
            whileHover={{
                borderColor: `rgba(${accent}, 0.3)`,
                background: 'rgba(26, 26, 36, 0.7)',
            }}
        >
            <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{
                    background: `rgba(${accent}, 0.12)`,
                    color: `rgba(${accent}, 0.9)`,
                }}
            >
                {icon}
            </div>
            <h3
                className="text-base font-semibold mb-2 tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
            >
                {title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {description}
            </p>
        </motion.div>
    );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
            style={{
                border: '1px solid var(--color-border-default)',
                color: 'var(--color-text-secondary)',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.background = 'rgba(108, 99, 255, 0.06)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-default)';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.background = 'transparent';
            }}
        >
            {icon}
            {label}
        </a>
    );
}
