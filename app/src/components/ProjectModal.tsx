import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, Lightbulb, Layers, Brain, Target, ArrowRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
    'AI / ML': '#6C63FF',
    'GenAI / LLMs': '#22D3EE',
    'Systems / Infra': '#34D399',
    'Full-Stack Apps': '#FBBF24',
    'Research / Simulation': '#FB7185',
};

const sections = [
    { key: 'problemSignal', label: 'Problem Signal', sublabel: 'Why this exists', icon: Lightbulb, color: '#FB7185' },
    { key: 'systemDesign', label: 'System Design', sublabel: 'Architecture overview', icon: Layers, color: '#6C63FF' },
    { key: 'intelligenceLayer', label: 'Intelligence Layer', sublabel: 'ML / logic / algorithm', icon: Brain, color: '#22D3EE' },
    { key: 'outcome', label: 'Outcome', sublabel: 'What works', icon: Target, color: '#34D399' },
    { key: 'nextIteration', label: 'Next Iteration', sublabel: 'What I\'d improve', icon: ArrowRight, color: '#FBBF24' },
] as const;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const accentColor = CATEGORY_COLORS[project.category] || '#6C63FF';

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto mt-[5vh] mx-4 rounded-2xl"
                style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-default)',
                }}
                initial={{ y: 40, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header gradient */}
                <div
                    className="absolute top-0 left-0 right-0 h-40 rounded-t-2xl opacity-20"
                    style={{
                        background: `linear-gradient(180deg, ${accentColor}15 0%, transparent 100%)`,
                    }}
                />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-lg transition-colors"
                    style={{ color: 'var(--color-text-tertiary)' }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--color-bg-elevated)';
                        e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--color-text-tertiary)';
                    }}
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                <div className="relative p-8">
                    {/* Category badge */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block w-2 h-2 rounded-full" style={{ background: accentColor }} />
                        <span className="text-xs font-mono tracking-wide uppercase" style={{ color: accentColor }}>
                            {project.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>
                        {project.displayName}
                    </h2>
                    <p className="text-base mb-6 max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
                        {project.oneLiner}
                    </p>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{
                                background: 'var(--color-bg-elevated)',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--color-border-default)',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border-default)'}
                        >
                            <Github size={14} /> View Source
                        </a>
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                style={{ background: accentColor, color: 'white' }}
                            >
                                <ExternalLink size={14} /> Live Demo
                            </a>
                        )}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-8 pb-8" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 rounded text-xs font-mono"
                                style={{
                                    background: 'var(--color-bg-elevated)',
                                    color: 'var(--color-text-secondary)',
                                    border: '1px solid var(--color-border-subtle)',
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Deep-dive sections */}
                    <div className="space-y-8">
                        {sections.map(({ key, label, sublabel, icon: Icon, color }) => (
                            <div key={key}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ background: `${color}15` }}
                                    >
                                        <Icon size={16} style={{ color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                            {label}
                                        </h3>
                                        <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                                            {sublabel}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className="text-sm leading-relaxed pl-11"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {project[key]}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Footer meta */}
                    <div
                        className="mt-8 pt-6 flex items-center justify-between text-[11px] font-mono"
                        style={{
                            borderTop: '1px solid var(--color-border-default)',
                            color: 'var(--color-text-tertiary)',
                        }}
                    >
                        <span>{project.language}</span>
                        <span>Created {project.createdAt}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
