import { useState, useMemo, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { PROJECTS, CATEGORIES, type Category, type Project } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import StaggeredMenu from './reactbits/StaggeredMenu';

/* ─────────────────────────────────────────────────────────
   ProjectRow — one horizontal index entry
   ───────────────────────────────────────────────────────── */
function ProjectRow({
    project,
    index,
    onOpen,
}: {
    project: Project;
    index: number;
    onOpen: (p: Project) => void;
}) {
    const [hovered, setHovered] = useState(false);
    const num = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 5) * 0.06 }}
            className="relative cursor-pointer group"
            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onOpen(project)}
        >
            {/* Hover background fill */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{ background: 'var(--color-bg-surface)' }}
            />
            {/* Left accent strip */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
                animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                initial={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                    background: 'linear-gradient(to bottom, var(--color-accent), var(--color-cyan))',
                    transformOrigin: 'top',
                }}
            />
            {/* Row body */}
            <div className={`relative px-6 flex items-start gap-6 transition-all duration-200 ${
                project.featured ? 'py-8' : 'py-5'
            }`}>
                {/* Index number */}
                <span
                    className="shrink-0 text-[11px] font-mono tracking-[0.15em] mt-[3px] w-8 select-none transition-colors duration-200"
                    style={{ color: hovered ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
                >
                    {num}
                </span>
                {/* Main content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3
                            className="text-base sm:text-lg font-semibold tracking-tight leading-snug"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            {project.name}
                        </h3>
                        {project.featured && (
                            <span
                                className="text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border"
                                style={{
                                    color: 'var(--color-accent)',
                                    borderColor: 'var(--color-border-accent)',
                                    background: 'var(--color-accent-dim)',
                                }}
                            >
                                Featured
                            </span>
                        )}
                    </div>
                    <p
                        className="text-[13px] leading-relaxed max-w-xl mb-3"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {project.oneLiner}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-[10px] font-mono px-2 py-0.5 rounded"
                                style={{
                                    background: 'var(--color-bg-elevated)',
                                    color: 'var(--color-text-tertiary)',
                                    border: '1px solid var(--color-border-subtle)',
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span
                                className="text-[10px] font-mono px-2 py-0.5 rounded"
                                style={{
                                    background: 'var(--color-bg-elevated)',
                                    color: 'var(--color-text-tertiary)',
                                    border: '1px solid var(--color-border-subtle)',
                                }}
                            >
                                +{project.techStack.length - 4}
                            </span>
                        )}
                    </div>
                </div>
                {/* Right: category + arrow */}
                <div className="shrink-0 flex flex-col items-end gap-3 ml-4">
                    <span
                        className="text-[10px] font-mono tracking-[0.12em] uppercase hidden sm:block"
                        style={{ color: 'var(--color-text-tertiary)' }}
                    >
                        {project.category}
                    </span>
                    {project.links?.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink size={10} />
                            Code
                        </a>
                    )}
                    <motion.div
                        animate={{ rotate: hovered ? -45 : 0, x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ color: hovered ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
                    >
                        <ArrowUpRight size={16} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────
   ProjectGrid section — editorial project index
   ───────────────────────────────────────────────────────── */
export default function ProjectGrid() {
    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const sectionRef = useRef<HTMLElement>(null);

    /* ── Parallax WORK watermark ── */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 18 });
    const workY = useTransform(smooth, [0, 1], ['-8%', '8%']);

    /* ── Filter logic ── */
    const filteredProjects = useMemo(() => {
        if (activeCategory === 'All') return PROJECTS;
        return PROJECTS.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    const featuredProjects = useMemo(() => filteredProjects.filter((p) => p.featured), [filteredProjects]);
    const standardProjects = useMemo(() => filteredProjects.filter((p) => !p.featured), [filteredProjects]);

    const filterItems = CATEGORIES.map((cat) => ({
        label: cat,
        count: cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length,
    }));

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-24 px-6 overflow-hidden"
        >
            {/* Slow-parallax watermark */}
            <motion.div
                aria-hidden="true"
                className="absolute -right-12 top-32 select-none pointer-events-none z-0"
                style={{ y: workY }}
            >
                <span
                    className="text-[22vw] font-black leading-none tracking-tighter"
                    style={{ color: 'rgba(108,99,255,0.025)', fontFamily: 'var(--font-sans)' }}
                >
                    WORK
                </span>
            </motion.div>

            {/* Top fade — bleed from hero */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-40 pointer-events-none z-[1]"
                style={{ background: 'linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 100%)' }}
            />

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* ── Section heading ── */}
                <div className="mb-12">
                    <motion.span
                        className="block text-[10px] font-mono tracking-[0.25em] uppercase mb-5"
                        style={{ color: 'var(--color-text-tertiary)' }}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        002 — Selected Systems
                    </motion.span>

                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-5"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Things I{' '}
                        <span className="text-gradient-accent">built</span>
                        {' & broke.'}
                    </motion.h2>

                    <motion.p
                        className="text-[14px] max-w-lg leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Each entry is a system, not a demo — built to answer a question or survive a constraint.
                    </motion.p>
                </div>

                {/* ── Filter ── */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                >
                    <StaggeredMenu
                        items={filterItems}
                        activeItem={activeCategory}
                        onSelect={(label) => setActiveCategory(label as Category)}
                    />
                </motion.div>

                {/* ── Featured rows ── */}
                <AnimatePresence mode="popLayout">
                    {featuredProjects.length > 0 && (
                        <motion.div
                            key={`feat-${activeCategory}`}
                            layout
                            className="mb-2"
                        >
                            <motion.div
                                className="mb-4 flex items-center gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <span
                                    className="text-[9px] font-mono tracking-[0.22em] uppercase"
                                    style={{ color: 'var(--color-text-tertiary)' }}
                                >
                                    Spotlight
                                </span>
                                <div
                                    className="flex-1 h-px"
                                    style={{ background: 'var(--color-border-subtle)' }}
                                />
                            </motion.div>

                            {featuredProjects.map((project, i) => (
                                <ProjectRow
                                    key={project.slug}
                                    project={project}
                                    index={i}
                                    onOpen={setSelectedProject}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Standard rows ── */}
                <AnimatePresence mode="popLayout">
                    {standardProjects.length > 0 && (
                        <motion.div
                            key={`std-${activeCategory}`}
                            layout
                            className="mt-8"
                        >
                            <motion.div
                                className="mb-4 flex items-center gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <span
                                    className="text-[9px] font-mono tracking-[0.22em] uppercase"
                                    style={{ color: 'var(--color-text-tertiary)' }}
                                >
                                    All Work
                                </span>
                                <div
                                    className="flex-1 h-px"
                                    style={{ background: 'var(--color-border-subtle)' }}
                                />
                            </motion.div>

                            {standardProjects.map((project, i) => (
                                <ProjectRow
                                    key={project.slug}
                                    project={project}
                                    index={featuredProjects.length + i}
                                    onOpen={setSelectedProject}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom row border */}
                <div style={{ borderBottom: '1px solid var(--color-border-subtle)' }} />

                {/* Empty state */}
                <AnimatePresence>
                    {filteredProjects.length === 0 && (
                        <motion.div
                            key="empty"
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p
                                className="text-[13px] font-mono"
                                style={{ color: 'var(--color-text-tertiary)' }}
                            >
                                No systems in this category yet.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Count footer */}
                <motion.div
                    className="mt-10 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <span
                        className="text-[11px] font-mono tracking-[0.12em]"
                        style={{ color: 'var(--color-text-tertiary)' }}
                    >
                        {filteredProjects.length} / {PROJECTS.length} systems
                    </span>
                    <span
                        className="text-[11px] font-mono tracking-[0.12em]"
                        style={{ color: 'var(--color-text-tertiary)' }}
                    >
                        Click any row to expand
                    </span>
                </motion.div>
            </div>

            {/* ── Modal ── */}
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
