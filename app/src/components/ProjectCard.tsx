import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/portfolioData';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
    onViewSystem: () => void;
    featured?: boolean;
    index?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
    'AI / ML':              '#6C63FF',
    'GenAI / LLMs':         '#22D3EE',
    'Systems / Infra':      '#34D399',
    'Full-Stack Apps':      '#FBBF24',
    'Research / Simulation':'#FB7185',
};

export default function ProjectCard({
    project,
    onViewSystem,
    featured = false,
    index = 0,
}: ProjectCardProps) {
    const [hovered, setHovered] = useState(false);
    const accent = CATEGORY_COLORS[project.category] || '#6C63FF';
    const num = String(index + 1).padStart(2, '0');

    /* ── Featured card — tall editorial layout ─────────── */
    if (featured) {
        return (
            <motion.div
                className="relative h-full w-full rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                    background: 'var(--color-bg-surface)',
                    border: `1px solid var(--color-border-subtle)`,
                }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onClick={onViewSystem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Decorative glow on hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                        background: `radial-gradient(ellipse at 30% 20%, ${accent}12 0%, transparent 60%)`,
                        border: `1px solid ${accent}30`,
                    }}
                />

                {/* Large decorative index number */}
                <div
                    className="absolute top-4 right-6 text-[88px] font-bold leading-none select-none pointer-events-none"
                    style={{
                        color: accent,
                        opacity: hovered ? 0.06 : 0.04,
                        fontVariantNumeric: 'tabular-nums',
                        transition: 'opacity 0.4s ease',
                        fontFamily: 'var(--font-mono)',
                    }}
                >
                    {num}
                </div>

                <div className="relative h-full p-7 flex flex-col">
                    {/* Category badge */}
                    <div className="flex items-center gap-2 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                        <span
                            className="text-[10px] font-mono tracking-[0.2em] uppercase"
                            style={{ color: accent }}
                        >
                            {project.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        className="text-2xl font-bold tracking-tight leading-tight mb-3"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {project.displayName}
                    </h3>

                    {/* One-liner */}
                    <p
                        className="text-[14px] leading-relaxed mb-5 max-w-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {project.oneLiner}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Problem signal — revealed gently always */}
                    <div className="mb-5 pb-5" style={{ borderBottom: `1px solid var(--color-border-subtle)` }}>
                        <p
                            className="text-[12px] leading-relaxed"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            {project.problemSignal.length > 120
                                ? project.problemSignal.slice(0, 120) + '…'
                                : project.problemSignal}
                        </p>
                    </div>

                    {/* Footer row */}
                    <div className="flex items-center justify-between">
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.techStack.slice(0, 3).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 rounded text-[10px] font-mono"
                                    style={{
                                        background: 'var(--color-bg-elevated)',
                                        color: 'var(--color-text-tertiary)',
                                        border: '1px solid var(--color-border-subtle)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); onViewSystem(); }}
                            className="flex items-center gap-1.5 text-[12px] font-mono tracking-wide ml-4 flex-shrink-0"
                            style={{ color: accent }}
                            whileHover={{ gap: '6px' }}
                        >
                            Open <ArrowUpRight size={13} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        );
    }

    /* ── Standard card — compact with flip-reveal ──────── */
    return (
        <div
            className="relative h-full w-full"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: hovered ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-2xl p-5 flex flex-col"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border-subtle)',
                    }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />
                        <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: accent }}>
                            {project.category}
                        </span>
                        <span
                            className="ml-auto text-[10px] font-mono tabular-nums"
                            style={{ color: 'var(--color-text-tertiary)', opacity: 0.45 }}
                        >
                            {num}
                        </span>
                    </div>

                    <h3
                        className="text-[14px] font-semibold tracking-tight leading-snug mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {project.displayName}
                    </h3>

                    <p
                        className="text-[12px] leading-[1.6]"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {project.oneLiner.length > 80 ? project.oneLiner.slice(0, 80) + '…' : project.oneLiner}
                    </p>

                    <div className="flex-1" />

                    <div className="flex flex-wrap gap-1 pt-3">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="px-1.5 py-0.5 rounded text-[9px] font-mono"
                                style={{
                                    background: 'var(--color-bg-elevated)',
                                    color: 'var(--color-text-tertiary)',
                                    border: '1px solid var(--color-border-subtle)',
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl p-5 flex flex-col"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'var(--color-bg-elevated)',
                        border: `1px solid ${accent}25`,
                    }}
                >
                    <span
                        className="text-[8px] font-mono tracking-[0.22em] uppercase mb-2 block"
                        style={{ color: accent, opacity: 0.8 }}
                    >
                        Problem Signal
                    </span>
                    <p
                        className="text-[12px] leading-relaxed flex-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {project.problemSignal.length > 140
                            ? project.problemSignal.slice(0, 140) + '…'
                            : project.problemSignal}
                    </p>

                    <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${accent}18` }}>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 text-[10px] font-mono transition-opacity hover:opacity-100 opacity-50"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            <Github size={10} /> Source
                        </a>
                        <button
                            onClick={(e) => { e.stopPropagation(); onViewSystem(); }}
                            className="flex items-center gap-1 text-[11px] font-mono"
                            style={{ color: accent }}
                        >
                            Details <ArrowUpRight size={11} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
