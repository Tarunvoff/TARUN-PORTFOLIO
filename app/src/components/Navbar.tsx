import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_LINKS = [
    { label: 'About', href: '/about', isRoute: true },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Achievements', href: '#proof' },
    { label: 'Skills', href: '#skills' },
];

const MENU_ITEMS = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'About', href: '/about', isRoute: true },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Achievements', href: '#proof' },
    { label: 'Tech Skills', href: '#skills' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Profiles', href: '#profiles' },
];

const SOCIAL_ITEMS = [
    { label: 'GitHub', href: 'https://github.com/Tarunvoff' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tarun-v-sece/' },
    { label: 'Email', href: 'mailto:tarunvoff@gmail.com' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    /* ── Scroll spy ──────────────────────────────────── */
    useEffect(() => {
        if (!isHomePage) return;
        const onScroll = () => {
            setScrolled(window.scrollY > 32);
            const sections = ['hero', 'projects', 'experience', 'proof', 'skills', 'blogs', 'profiles'];
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
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHomePage]);

    /* ── Lock body scroll when menu open ─────────────── */
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    /* ── Escape key to close ─────────────────────────── */
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen]);

    /* ── Navigation handler ──────────────────────────── */
    const handleNav = useCallback((href: string, isRoute?: boolean) => {
        setIsOpen(false);
        if (isRoute || href.startsWith('/')) {
            navigate(href);
        } else if (href.startsWith('#')) {
            if (!isHomePage) {
                navigate('/');
                setTimeout(() => {
                    const el = document.querySelector(href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
            } else {
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [navigate, isHomePage]);

    return (
        <>
            {/* ── Floating pill nav ────────────────────────────── */}
            <motion.header
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <nav
                    className="flex items-center gap-1 px-2 py-2 rounded-full"
                    style={{
                        background: scrolled
                            ? 'rgba(10, 10, 15, 0.88)'
                            : 'rgba(10, 10, 15, 0.55)',
                        border: '1px solid rgba(42, 42, 58, 0.6)',
                        boxShadow: scrolled
                            ? '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.025) inset'
                            : '0 4px 16px rgba(0,0,0,0.2)',
                        backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
                        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
                        transition: 'background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
                    }}
                >
                    {/* ── Brand ── */}
                    <a
                        href="/"
                        onClick={(e) => { e.preventDefault(); handleNav('/'); }}
                        className="px-3 py-1.5 text-sm font-semibold tracking-tight rounded-full transition-colors duration-200"
                        style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                    >
                        tarun<span style={{ color: 'var(--color-accent)' }}>.</span>
                    </a>

                    {/* ── Divider ── */}
                    <div
                        className="w-px h-4 mx-1 hidden md:block"
                        style={{ background: 'var(--color-border-default)' }}
                    />

                    {/* ── Desktop nav links (hidden on mobile) ── */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {NAV_LINKS.map((link) => {
                            const sectionId = link.href.replace('#', '');
                            const isActive = link.isRoute
                                ? location.pathname === link.href
                                : isHomePage && activeSection === sectionId;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNav(link.href, link.isRoute); }}
                                    className="relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200"
                                    style={{
                                        color: isActive
                                            ? 'var(--color-text-primary)'
                                            : 'var(--color-text-tertiary)',
                                        textDecoration: 'none',
                                    }}
                                    onMouseOver={(e) => {
                                        if (!isActive)
                                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                                    }}
                                    onMouseOut={(e) => {
                                        if (!isActive)
                                            e.currentTarget.style.color = 'var(--color-text-tertiary)';
                                    }}
                                >
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
                    </div>

                    {/* ── Divider (desktop) ── */}
                    <div
                        className="w-px h-4 mx-1 hidden md:block"
                        style={{ background: 'var(--color-border-default)' }}
                    />


                    {/* ── GitHub CTA (desktop) ── */}
                    <a
                        href="https://github.com/Tarunvoff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-mono tracking-wide rounded-full transition-all duration-200"
                        style={{
                            color: 'var(--color-text-tertiary)',
                            border: '1px solid transparent',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-primary)';
                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                            e.currentTarget.style.background = 'var(--color-bg-elevated)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-tertiary)';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </a>

                    {/* ── Hamburger (mobile only, far right) ── */}
                    <button
                        className="p-2 rounded-full ml-1 transition-colors duration-200 md:hidden"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onClick={() => setIsOpen(prev => !prev)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-primary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }}
                    >
                        <div className="relative w-[18px] h-[14px] flex flex-col justify-between">
                            <span
                                className="block w-full h-[2px] rounded-full transition-all duration-300 origin-center"
                                style={{
                                    background: 'currentColor',
                                    transform: isOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                                }}
                            />
                            <span
                                className="block w-full h-[2px] rounded-full transition-all duration-300"
                                style={{
                                    background: 'currentColor',
                                    opacity: isOpen ? 0 : 1,
                                    transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
                                }}
                            />
                            <span
                                className="block w-full h-[2px] rounded-full transition-all duration-300 origin-center"
                                style={{
                                    background: 'currentColor',
                                    transform: isOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                                }}
                            />
                        </div>
                    </button>
                </nav>
            </motion.header>

            {/* ── Slide-in menu overlay ────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-[60]"
                            style={{
                                background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(4px)',
                                WebkitBackdropFilter: 'blur(4px)',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu panel */}
                        <motion.aside
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            className="fixed top-0 right-0 h-full z-[70] flex flex-col"
                            style={{
                                width: 'clamp(280px, 35vw, 380px)',
                                background: 'rgba(14, 14, 20, 0.95)',
                                borderLeft: '1px solid rgba(42, 42, 58, 0.4)',
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                            }}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Close X at top-right */}
                            <div className="flex justify-end p-6 pb-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg transition-colors duration-200"
                                    style={{ color: 'var(--color-text-tertiary)' }}
                                    aria-label="Close menu"
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = 'var(--color-text-primary)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = 'var(--color-text-tertiary)';
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            {/* Greeting */}
                            <motion.div
                                className="px-8 pb-5"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p
                                    className="text-2xl font-bold tracking-tight mb-1"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    Hey, I'm{' '}
                                    <span style={{ color: 'var(--color-accent)' }}>Tarun V</span>
                                </p>
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--color-text-tertiary)' }}
                                >
                                    Builder · Engineer · Explorer
                                </p>
                                <div
                                    className="mt-5 h-px w-full"
                                    style={{
                                        background: 'linear-gradient(to right, var(--color-accent), rgba(42, 42, 58, 0.3), transparent)',
                                    }}
                                />
                            </motion.div>

                            {/* Nav items */}
                            <nav className="flex-1 px-8 py-4">
                                <ul className="flex flex-col gap-1">
                                    {MENU_ITEMS.map((item, i) => (
                                        <motion.li
                                            key={item.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.1 + i * 0.05,
                                                duration: 0.4,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        >
                                            <button
                                                onClick={() => handleNav(item.href, item.isRoute)}
                                                className="w-full text-left py-3 text-xl font-semibold tracking-tight transition-colors duration-200"
                                                style={{
                                                    color: 'var(--color-text-secondary)',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontFamily: 'inherit',
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.color = 'var(--color-accent)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                                }}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <span
                                                        className="text-[11px] font-mono tabular-nums"
                                                        style={{ color: 'var(--color-text-tertiary)', opacity: 0.5 }}
                                                    >
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    {item.label}
                                                </span>
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Social links at bottom */}
                            <motion.div
                                className="px-8 pb-8 pt-4"
                                style={{ borderTop: '1px solid rgba(42, 42, 58, 0.3)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <p
                                    className="text-[10px] font-mono uppercase tracking-[0.2em] mb-4"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    Connect
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {SOCIAL_ITEMS.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium transition-colors duration-200"
                                            style={{
                                                color: 'var(--color-text-tertiary)',
                                                textDecoration: 'none',
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = 'var(--color-text-primary)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = 'var(--color-text-tertiary)';
                                            }}
                                        >
                                            {s.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
