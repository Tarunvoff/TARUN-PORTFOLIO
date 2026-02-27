import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS, type Project } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

/* ══════════════════════════════════════════════════════════
   SYSTEM INTELLIGENCE FIELD
   ══════════════════════════════════════════════════════════ */

/* ── Category accent colours ─────────────────────────────── */
const CAT_COLOR: Record<string, string> = {
    'AI / ML':               '#6C63FF',
    'GenAI / LLMs':          '#22D3EE',
    'Systems / Infra':       '#34D399',
    'Full-Stack Apps':       '#FBBF24',
    'Research / Simulation': '#FB7185',
};

/* ── Fixed spatial layout for the first 8 projects ───────── */
type NodeSize = 'featured' | 'medium' | 'small';

interface NodeLayout {
    left: string;
    top: string;
    size: NodeSize;
    zIndex: number;
}

const LAYOUT: Record<string, NodeLayout> = {
    // ── Row A  (y≈20–160px on 860px canvas) ──────────────────
    // left%×1200: rag=336→564, aura=624→852, track=900→1100  — no overlaps
    'rag-document-query':  { left: '28%',  top: '3%',  size: 'medium',   zIndex: 5 },
    'aurasound-ai':        { left: '52%',  top: '1%',  size: 'medium',   zIndex: 4 },
    'trackwise-platform':  { left: '75%',  top: '5%',  size: 'small',    zIndex: 5 },
    // ── Row B  (y≈280–450px) ──────────────────────────────────
    // left%×1200: api=24→292,               dviz=684→912  — wide gap avoids overlap
    'apiris-sdk':          { left: '2%',   top: '33%', size: 'featured', zIndex: 4 },
    'data-viz-agent':      { left: '57%',  top: '35%', size: 'medium',   zIndex: 3 },
    // ── Row C  (y≈530–700px) ──────────────────────────────────
    // left%×1200: soul=48→276, adya=324→592, herba=660→888  — no overlaps
    'soul-sync':           { left: '4%',   top: '62%', size: 'medium',   zIndex: 3 },
    'adya-mcp-hackathon':  { left: '27%',  top: '60%', size: 'featured', zIndex: 3 },
    'herba-verse':         { left: '55%',  top: '64%', size: 'medium',   zIndex: 2 },
};

/* ── Connection pairs ─────────────────────────────────────── */
const CONNECTIONS: [string, string][] = [
    ['apiris-sdk',         'rag-document-query'],
    ['adya-mcp-hackathon', 'rag-document-query'],
    ['adya-mcp-hackathon', 'data-viz-agent'],
    ['rag-document-query', 'aurasound-ai'],
    ['aurasound-ai',       'trackwise-platform'],
    ['aurasound-ai',       'data-viz-agent'],
    ['apiris-sdk',         'soul-sync'],
    ['soul-sync',          'herba-verse'],
    ['herba-verse',        'data-viz-agent'],
];

/* ── Pixel dimensions per node size (used for center calc) ── */
const NODE_W: Record<NodeSize, number> = { featured: 268, medium: 228, small: 200 };
const NODE_H: Record<NodeSize, number> = { featured: 164, medium: 138, small: 118 };

/* ── Compute SVG connector endpoints (percentage-based) ─── */
interface Line { x1: number; y1: number; x2: number; y2: number; slugA: string; slugB: string }

function computeLines(containerW: number, containerH: number): Line[] {
    return CONNECTIONS.map(([a, b]) => {
        const la = LAYOUT[a];
        const lb = LAYOUT[b];
        if (!la || !lb) return null;
        const ax = (parseFloat(la.left) / 100) * containerW + NODE_W[la.size] / 2;
        const ay = (parseFloat(la.top)  / 100) * containerH + NODE_H[la.size] / 2;
        const bx = (parseFloat(lb.left) / 100) * containerW + NODE_W[lb.size] / 2;
        const by = (parseFloat(lb.top)  / 100) * containerH + NODE_H[lb.size] / 2;
        return {
            x1: (ax / containerW) * 100,
            y1: (ay / containerH) * 100,
            x2: (bx / containerW) * 100,
            y2: (by / containerH) * 100,
            slugA: a, slugB: b,
        } as Line;
    }).filter(Boolean) as Line[];
}

/* ── Dot-pulse on node (decorative corner indicator) ──────── */
function PulseDot({ color }: { color: string }) {
    return (
        <span className="relative flex h-2 w-2">
            <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                style={{ background: color }}
            />
            <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: color }}
            />
        </span>
    );
}

/* ── Animated SVG connector lines ────────────────────────── */
function ConnectorLines({
    lines,
    hoveredSlug,
}: {
    lines: Line[];
    hoveredSlug: string | null;
}) {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
            aria-hidden="true"
        >
            <defs>
                <marker id="dot-a" markerWidth="4" markerHeight="4" refX="2" refY="2">
                    <circle cx="2" cy="2" r="1.5" fill="rgba(108,99,255,0.5)" />
                </marker>
                <marker id="dot-b" markerWidth="4" markerHeight="4" refX="2" refY="2">
                    <circle cx="2" cy="2" r="1.5" fill="rgba(34,211,238,0.5)" />
                </marker>
            </defs>
            {lines.map((l, i) => {
                const active = hoveredSlug === l.slugA || hoveredSlug === l.slugB;
                return (
                    <motion.line
                        key={i}
                        x1={`${l.x1}%`} y1={`${l.y1}%`}
                        x2={`${l.x2}%`} y2={`${l.y2}%`}
                        strokeLinecap="round"
                        markerStart="url(#dot-a)"
                        markerEnd="url(#dot-b)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: active ? 0.55 : 0.13,
                            stroke: active ? 'rgba(108,99,255,0.7)' : 'rgba(108,99,255,0.35)',
                            strokeWidth: active ? 1.2 : 0.7,
                        }}
                        transition={{
                            pathLength: { duration: 1.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                            opacity:    { duration: 0.3 },
                            stroke:     { duration: 0.3 },
                            strokeWidth:{ duration: 0.3 },
                        }}
                        strokeDasharray="4 6"
                    />
                );
            })}
        </svg>
    );
}

/* ── Single project node ─────────────────────────────────── */
function SystemNode({
    project,
    layout,
    index,
    isHighlighted,
    isAnyHovered,
    onHover,
    onLeave,
    onClick,
}: {
    project: Project;
    layout: NodeLayout;
    index: number;
    isHighlighted: boolean;
    isAnyHovered: boolean;
    onHover: (slug: string) => void;
    onLeave: () => void;
    onClick: (p: Project) => void;
}) {
    const color = CAT_COLOR[project.category] || '#6C63FF';
    const isFeatured = layout.size === 'featured';
    const width = NODE_W[layout.size];

    const dimmed = isAnyHovered && !isHighlighted;

    return (
        <motion.div
            className="absolute cursor-pointer"
            style={{
                left: layout.left,
                top:  layout.top,
                width,
                zIndex: layout.zIndex,
            }}
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.65,
                delay: 0.3 + index * 0.09,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => onHover(project.slug)}
            onMouseLeave={onLeave}
            onClick={() => onClick(project)}
        >
            <motion.div
                animate={{
                    y:       isHighlighted ? -6 : 0,
                    opacity: dimmed ? 0.35 : 1,
                    scale:   isHighlighted ? 1.02 : 1,
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                    background:    'rgba(14, 14, 22, 0.78)',
                    backdropFilter:'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    borderRadius:  '10px',
                    border:        `1px solid ${isHighlighted
                        ? color
                        : 'rgba(42,42,58,0.7)'}`,
                    boxShadow: isHighlighted
                        ? `0 0 0 1px ${color}33, 0 8px 40px ${color}22, 0 2px 12px rgba(0,0,0,0.5)`
                        : '0 2px 16px rgba(0,0,0,0.4)',
                    padding: isFeatured ? '18px 20px' : '14px 16px',
                    transition: 'border-color 0.22s ease, box-shadow 0.22s ease',
                }}
            >
                {/* Top row: category dot + label + featured badge */}
                <div className="flex items-center justify-between mb-2.5 gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <PulseDot color={color} />
                        <span
                            className="text-[9px] font-mono tracking-[0.18em] uppercase truncate"
                            style={{ color: `${color}cc` }}
                        >
                            {project.category}
                        </span>
                    </div>
                    {project.featured && (
                        <span
                            className="shrink-0 text-[8px] font-mono uppercase tracking-[0.16em] px-1.5 py-0.5 rounded-sm"
                            style={{
                                color: '#6C63FF',
                                background: 'rgba(108,99,255,0.12)',
                                border: '1px solid rgba(108,99,255,0.22)',
                            }}
                        >
                            Featured
                        </span>
                    )}
                </div>

                {/* Project name */}
                <h3
                    className={`font-bold tracking-tight leading-tight mb-1.5 ${
                        isFeatured ? 'text-[15px]' : 'text-[13px]'
                    }`}
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {project.displayName}
                </h3>

                {/* One-liner */}
                <p
                    className={`leading-snug mb-3 ${isFeatured ? 'text-[12px]' : 'text-[11px]'}`}
                    style={{
                        color: 'var(--color-text-secondary)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    } as React.CSSProperties}
                >
                    {project.oneLiner}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.slice(0, isFeatured ? 3 : 2).map((t) => (
                        <span
                            key={t}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm"
                            style={{
                                background: 'rgba(42,42,58,0.6)',
                                color: 'var(--color-text-tertiary)',
                                border: '1px solid rgba(42,42,58,0.8)',
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Footer: CTA + GitHub */}
                <div className="flex items-center justify-between">
                    <motion.span
                        className="flex items-center gap-1 text-[10px] font-medium"
                        animate={{ color: isHighlighted ? color : 'var(--color-text-tertiary)' }}
                        transition={{ duration: 0.2 }}
                    >
                        View system
                        <ArrowUpRight size={10} />
                    </motion.span>

                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--color-text-tertiary)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github size={9} />
                        src
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   ProjectGrid — main export
   ══════════════════════════════════════════════════════════ */
export default function ProjectGrid() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [hoveredSlug,     setHoveredSlug]     = useState<string | null>(null);
    const [lines,           setLines]            = useState<Line[]>([]);

    const sectionRef   = useRef<HTMLElement>(null);
    const fieldRef     = useRef<HTMLDivElement>(null);
    const isInView     = useInView(sectionRef, { once: true, margin: '-10%' });

    /* ── Parallax backdrop ─────────────────────────────────── */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const smooth  = useSpring(scrollYProgress, { stiffness: 35, damping: 16 });
    const bgY     = useTransform(smooth, [0, 1], ['0%', '12%']);

    /* ── Compute connector line positions after layout ─────── */
    const measureLines = useCallback(() => {
        const field = fieldRef.current;
        if (!field) return;
        const rect = field.getBoundingClientRect();
        if (rect.width < 10) return;
        setLines(computeLines(rect.width, rect.height));
    }, []);

    useEffect(() => {
        if (!isInView) return;
        // small delay lets absolute nodes settle
        const id = setTimeout(measureLines, 120);
        window.addEventListener('resize', measureLines);
        return () => {
            clearTimeout(id);
            window.removeEventListener('resize', measureLines);
        };
    }, [isInView, measureLines]);

    /* Pick displayed projects (those with a layout entry + rest) */
    const layoutedProjects  = PROJECTS.filter((p) => Boolean(LAYOUT[p.slug]));
    const overflowProjects  = PROJECTS.filter((p) => !LAYOUT[p.slug]);

    /* Connected slugs for a given hovered slug */
    const connectedTo = (slug: string) => {
        const set = new Set<string>();
        CONNECTIONS.forEach(([a, b]) => {
            if (a === slug) set.add(b);
            if (b === slug) set.add(a);
        });
        set.add(slug);
        return set;
    };
    const connectedSet = hoveredSlug ? connectedTo(hoveredSlug) : null;

    const fieldH = 860; // desktop canvas height in px

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ paddingTop: '80px', paddingBottom: '80px' }}
        >
            {/* ── Parallax grid backdrop ─────────────────────── */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    y: bgY,
                    backgroundImage: `
                        linear-gradient(rgba(42,42,58,0.13) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(42,42,58,0.13) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Top fade — blends from hero */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-36 pointer-events-none z-[2]"
                style={{ background: 'linear-gradient(to bottom, var(--color-bg-primary), transparent)' }}
            />
            {/* Bottom fade */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-[2]"
                style={{ background: 'linear-gradient(to top, var(--color-bg-primary), transparent)' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* ── Section header ─────────────────────────── */}
                <div className="mb-16">
                    <motion.span
                        className="block text-[10px] font-mono tracking-[0.28em] uppercase mb-4"
                        style={{ color: 'var(--color-text-tertiary)' }}
                        initial={{ opacity: 0, x: -14 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.45 }}
                    >
                        002 — System Intelligence Field
                    </motion.span>

                    <motion.h2
                        className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Selected Systems{' '}
                        <span className="text-gradient-accent">&amp; Experiments</span>
                    </motion.h2>

                    <motion.p
                        className="text-[14px] max-w-md leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.18, duration: 0.5 }}
                    >
                        Exploring the intersection of decision-making,<br />
                        intelligent systems, and automation.
                    </motion.p>
                </div>

                {/* ── Spatial field — desktop ────────────────── */}
                <div className="hidden lg:block">
                    <div
                        ref={fieldRef}
                        className="relative w-full"
                        style={{ height: fieldH }}
                    >
                        {/* SVG connector layer */}
                        {isInView && (
                            <ConnectorLines lines={lines} hoveredSlug={hoveredSlug} />
                        )}

                        {/* Ambient radial depth gradient */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                zIndex: 0,
                                background: `
                                    radial-gradient(ellipse 55% 40% at 30% 55%, rgba(108,99,255,0.04) 0%, transparent 70%),
                                    radial-gradient(ellipse 40% 35% at 75% 30%, rgba(34,211,238,0.03) 0%, transparent 70%)
                                `,
                            }}
                        />

                        {/* Project nodes */}
                        {isInView && layoutedProjects.map((project, i) => {
                            const layout = LAYOUT[project.slug];
                            if (!layout) return null;
                            const highlighted = !hoveredSlug || (connectedSet?.has(project.slug) ?? false);
                            return (
                                <SystemNode
                                    key={project.slug}
                                    project={project}
                                    layout={layout}
                                    index={i}
                                    isHighlighted={highlighted}
                                    isAnyHovered={Boolean(hoveredSlug)}
                                    onHover={setHoveredSlug}
                                    onLeave={() => setHoveredSlug(null)}
                                    onClick={setSelectedProject}
                                />
                            );
                        })}

                        {/* Bottom-right system count medallion */}
                        <motion.div
                            className="absolute bottom-4 right-4 text-right"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            <p
                                className="text-[11px] font-mono tracking-[0.12em]"
                                style={{ color: 'var(--color-text-tertiary)' }}
                            >
                                {layoutedProjects.length} nodes mapped · hover to trace
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* ── Mobile / tablet fallback — stacked list ── */}
                <div className="lg:hidden space-y-3">
                    {PROJECTS.map((project, i) => {
                        const color = CAT_COLOR[project.category] || '#6C63FF';
                        return (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                onClick={() => setSelectedProject(project)}
                                className="cursor-pointer rounded-lg p-4"
                                style={{
                                    background: 'rgba(14,14,22,0.7)',
                                    border: `1px solid rgba(42,42,58,0.7)`,
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                                    <span className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: `${color}cc` }}>
                                        {project.category}
                                    </span>
                                    {project.featured && (
                                        <span className="text-[8px] font-mono uppercase tracking-[0.16em] px-1.5 py-px rounded-sm ml-auto"
                                            style={{ color: '#6C63FF', background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.22)' }}>
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-[14px] font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    {project.displayName}
                                </h3>
                                <p className="text-[12px] leading-snug mb-2.5" style={{ color: 'var(--color-text-secondary)' }}>
                                    {project.oneLiner}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {project.techStack.slice(0, 3).map((t) => (
                                        <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm"
                                            style={{ background: 'rgba(42,42,58,0.6)', color: 'var(--color-text-tertiary)', border: '1px solid rgba(42,42,58,0.8)' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Overflow projects (no layout slot) ────── */}
                {overflowProjects.length > 0 && (
                    <div className="hidden lg:block mt-16">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-mono tracking-[0.22em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
                                Additional Systems
                            </span>
                            <div className="flex-1 h-px" style={{ background: 'var(--color-border-subtle)' }} />
                        </div>
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                            {overflowProjects.map((project, i) => {
                                const color = CAT_COLOR[project.category] || '#6C63FF';
                                return (
                                    <motion.div
                                        key={project.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-20px' }}
                                        transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => setSelectedProject(project)}
                                        className="cursor-pointer rounded-lg p-4 group"
                                        style={{
                                            background: 'rgba(14,14,22,0.7)',
                                            border: '1px solid rgba(42,42,58,0.6)',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                                        }}
                                        whileHover={{
                                            y: -3,
                                            borderColor: `${color}66`,
                                            boxShadow: `0 4px 20px ${color}18`,
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                                            <span className="text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: `${color}cc` }}>
                                                {project.category}
                                            </span>
                                        </div>
                                        <h3 className="text-[13px] font-semibold mb-1 leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                                            {project.displayName}
                                        </h3>
                                        <p className="text-[11px] leading-snug mb-2.5" style={{ color: 'var(--color-text-secondary)' }}>
                                            {project.oneLiner.slice(0, 70)}{project.oneLiner.length > 70 ? '…' : ''}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {project.techStack.slice(0, 2).map((t) => (
                                                <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm"
                                                    style={{ background: 'rgba(42,42,58,0.6)', color: 'var(--color-text-tertiary)', border: '1px solid rgba(42,42,58,0.8)' }}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Modal ─────────────────────────────────────── */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

