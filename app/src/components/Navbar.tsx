import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Projects', href: '#projects' },
    { label: 'Evolution', href: '#evolution' },
    { label: 'Proof', href: '#proof' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileOpen, setMobileOpen] = useState(false);

    /* ── Scroll state ──────────────────────────────────── */
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 32);

            // Update active section by checking which one is in view
            const sections = ['hero', 'projects', 'evolution', 'proof'];
            let current = 'hero';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 120) {
                    current = id;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Lock body scroll when mobile menu is open ─────── */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            {/* ── Floating pill nav ─────────────────────── */}
            <motion.header
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.nav
                    className="flex items-center gap-1 px-2 py-2 rounded-full"
                    animate={{
                        backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
                        borderColor: scrolled
                            ? 'rgba(42, 42, 58, 0.8)'
                            : 'rgba(42, 42, 58, 0.5)',
                    }}
                    style={{
                        background: scrolled
                            ? 'rgba(10, 10, 15, 0.88)'
                            : 'rgba(10, 10, 15, 0.55)',
                        border: '1px solid rgba(42, 42, 58, 0.6)',
                        boxShadow: scrolled
                            ? '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.025) inset'
                            : '0 4px 16px rgba(0,0,0,0.2)',
                        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
                        transition: 'background 0.3s ease, box-shadow 0.3s ease',
                    }}
                >
                    {/* Brand */}
                    <a
                        href="#hero"
                        className="px-3 py-1.5 text-sm font-semibold tracking-tight rounded-full transition-colors duration-200 mr-2"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        tarun<span style={{ color: 'var(--color-accent)' }}>.</span>
                    </a>

                    {/* Divider */}
                    <div
                        className="w-px h-4 mx-1"
                        style={{ background: 'var(--color-border-default)' }}
                    />

                    {/* Nav links */}
                    {NAV_LINKS.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                className="relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200"
                                style={{
                                    color: isActive
                                        ? 'var(--color-text-primary)'
                                        : 'var(--color-text-tertiary)',
                                    textDecoration: 'none',
                                }}
                                onMouseOver={(e) => {
                                    if (!isActive)
                                        (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
                                }}
                                onMouseOut={(e) => {
                                    if (!isActive)
                                        (e.currentTarget as HTMLElement).style.color = 'var(--color-text-tertiary)';
                                }}
                            >
                                {/* Active sliding pill */}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-pill"
                                        className="absolute inset-0 rounded-full -z-10"
                                        style={{
                                            background: 'var(--color-bg-elevated)',
                                            border: '1px solid var(--color-border-default)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {link.label}
                            </a>
                        );
                    })}

                    {/* Divider */}
                    <div
                        className="w-px h-4 mx-1"
                        style={{ background: 'var(--color-border-default)' }}
                    />

                    {/* GitHub CTA */}
                    <a
                        href="https://github.com/Tarunvoff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-mono tracking-wide rounded-full transition-all duration-200"
                        style={{
                            color: 'var(--color-text-tertiary)',
                            border: '1px solid transparent',
                        }}
                        onMouseOver={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-default)';
                            (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-elevated)';
                        }}
                        onMouseOut={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--color-text-tertiary)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                    >
                        {/* GitHub icon */}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </a>

                    {/* Mobile toggle */}
                    <button
                        className="sm:hidden p-1.5 rounded-full ml-1 transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </motion.nav>
            </motion.header>

            {/* ── Mobile overlay menu ───────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
                        style={{ background: 'rgba(10, 10, 15, 0.97)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {NAV_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    className="text-2xl font-semibold tracking-tight"
                                    style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="https://github.com/Tarunvoff"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-mono mt-4"
                                style={{ color: 'var(--color-text-tertiary)', textDecoration: 'none' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.28 }}
                                onClick={() => setMobileOpen(false)}
                            >
                                github.com/Tarunvoff →
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
