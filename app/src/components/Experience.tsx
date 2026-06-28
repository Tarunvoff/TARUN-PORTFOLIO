import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollFloat from './reactbits/ScrollFloat';

interface Job {
    company: string;
    role: string;
    period: string;
    description: string[];
    tech?: string[];
    logoColor: string;
}

const EXPERIENCES: Job[] = [
    {
        company: 'HCLTech',
        role: 'HCL Campus Ambassador',
        period: 'Jun 2026 – Jun 2027',
        logoColor: 'rgba(16, 185, 129, 0.85)', // Emerald
        description: [
            'Represented HCLTech corporate programs on campus, coordinating brand outreach and developer drives.',
            'Partnered with academic departments to organize guest speaker sessions and university-wide hackathons.',
            'Served as the key interface linking student engineering talent with HCL recruiting opportunities.'
        ]
    },
    {
        company: 'Tensorik Technologies',
        role: 'AIML Lead and Intern',
        period: 'Mar 2026 – Sep 2026',
        logoColor: 'rgba(236, 72, 153, 0.85)', // Pink
        description: [
            'Spearheaded research and implementation of custom PyTorch computer vision pipelines and sequence models.',
            'Led a core student internship cohort, guiding development of regression tasks and data ingestion pipelines.',
            'Optimized model inference size and memory footprints via quantization for edge hardware execution.'
        ],
        tech: ['PyTorch', 'TensorFlow', 'OpenCV', 'Python', 'CUDA']
    },
    {
        company: 'Hepro AI',
        role: 'Cloud Intern',
        period: 'Mar 2026 – May 2026',
        logoColor: 'rgba(6, 182, 212, 0.85)', // Cyan
        description: [
            'Architected scalable containerized cloud deployments, automating multi-environment infrastructure configurations.',
            'Engineered secure serverless microservice APIs and managed isolated private VPC configurations.',
            'Implemented real-time telemetry logging, resource usage monitors, and horizontal autoscaling metrics.'
        ],
        tech: ['AWS', 'Docker', 'Kubernetes', 'Serverless', 'Terraform']
    },
    {
        company: 'Technical Club',
        role: 'Technical Club Secretary',
        period: 'Aug 2025 – Jun 2026',
        logoColor: 'rgba(245, 158, 11, 0.85)', // Amber
        description: [
            'Directed technical events, dev bootcamps, and hackathons, coordinating cross-functional team initiatives.',
            'Designed problem statements, challenge platforms, and spearheaded mentorship pathways for 200+ members.',
            'Conducted hands-on workshops covering open-source contribution workflows and system foundations.'
        ]
    },
    {
        company: 'Innoboon Tech',
        role: 'AI Intern',
        period: 'Apr 2024 – Jun 2024',
        logoColor: 'rgba(99, 102, 241, 0.85)', // Indigo
        description: [
            'Designed and deployed agentic validation workflows and prompt injection protective filters for production LLM systems.',
            'Engineered optimized vector store indexing and query refinement pipelines to reduce RAG hallucination rates.',
            'Configured local LLM inference nodes (Ollama/vLLM) to accelerate response validation cycles.'
        ],
        tech: ['Python', 'Ollama', 'LangChain', 'FastAPI', 'Vector DBs']
    }
];

export default function Experience() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section
            id="experience"
            className="relative py-20 md:py-32 overflow-hidden"
            style={{ background: 'var(--color-bg-primary)' }}
        >
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 md:mb-24">
                <ScrollFloat>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                        <h2
                            className="text-3xl sm:text-4xl font-semibold tracking-tight"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Professional Journey
                        </h2>
                        <span
                            className="text-sm font-mono uppercase tracking-wider"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            Experience
                        </span>
                    </div>
                    <p
                        className="text-base sm:text-lg max-w-2xl"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Timeline of my internships, leadership roles, and community contributions.
                    </p>
                </ScrollFloat>
            </div>

            {/* Timeline Wrapper */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
                {/* Vertical Center Track line */}
                <div
                    className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] transform sm:-translate-x-1/2"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(108, 99, 255, 0.4) 0%, rgba(42, 42, 58, 0.15) 100%)',
                    }}
                />

                <div className="flex flex-col gap-12 md:gap-16">
                    {EXPERIENCES.map((job, idx) => {
                        const isEven = idx % 2 === 0;
                        const isHovered = hoveredIdx === idx;

                        return (
                            <div
                                key={idx}
                                className={`relative flex flex-col sm:flex-row ${
                                    isEven ? 'sm:flex-row-reverse' : ''
                                } items-start sm:items-center`}
                            >
                                {/* Timeline Indicator Dot */}
                                <div
                                    className="absolute left-4 sm:left-1/2 top-1 sm:top-1/2 w-3.5 h-3.5 rounded-full transform -translate-x-[5px] sm:-translate-x-1/2 sm:-translate-y-1/2 z-10 transition-all duration-300"
                                    style={{
                                        background: isHovered ? job.logoColor : 'rgba(10, 10, 15, 1)',
                                        border: `2px solid ${isHovered ? '#fff' : job.logoColor}`,
                                        boxShadow: isHovered ? `0 0 12px ${job.logoColor}` : 'none',
                                    }}
                                />

                                {/* Empty Spacer side on desktop */}
                                <div className="hidden sm:block w-1/2" />

                                {/* Content Card side */}
                                <div className="w-full sm:w-1/2 pl-10 sm:pl-0 sm:px-8">
                                    <motion.div
                                        className="relative p-6 rounded-xl overflow-hidden cursor-default transition-all duration-300"
                                        initial={{ opacity: 0, y: 28 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                        onMouseEnter={() => setHoveredIdx(idx)}
                                        onMouseLeave={() => setHoveredIdx(null)}
                                        style={{
                                            background: isHovered
                                                ? 'rgba(26, 26, 36, 0.8)'
                                                : 'rgba(26, 26, 36, 0.45)',
                                            border: `1px solid ${
                                                isHovered ? 'rgba(108, 99, 255, 0.35)' : 'rgba(42, 42, 58, 0.4)'
                                            }`,
                                            boxShadow: isHovered
                                                ? '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.1) inset'
                                                : 'none',
                                        }}
                                    >
                                        {/* Colored Accent Top Border */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-[2px]"
                                            style={{
                                                background: job.logoColor,
                                                opacity: isHovered ? 1 : 0.4,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        />

                                        {/* Card Header info */}
                                        <div className="flex flex-col gap-1 mb-4">
                                            <span
                                                className="text-[11px] font-mono tracking-wider"
                                                style={{ color: isHovered ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
                                            >
                                                {job.period}
                                            </span>
                                            <h3
                                                className="text-lg font-bold tracking-tight"
                                                style={{ color: 'var(--color-text-primary)' }}
                                            >
                                                {job.role}
                                            </h3>
                                            <h4
                                                className="text-sm font-semibold tracking-wide"
                                                style={{ color: 'var(--color-text-secondary)' }}
                                            >
                                                {job.company}
                                            </h4>
                                        </div>

                                        {/* Role bullet points */}
                                        <ul className="flex flex-col gap-2 mb-5">
                                            {job.description.map((point, pIdx) => (
                                                <li
                                                    key={pIdx}
                                                    className="text-xs sm:text-[13px] leading-relaxed flex items-start gap-2"
                                                    style={{ color: 'var(--color-text-secondary)' }}
                                                >
                                                    <span
                                                        className="mt-[6px] w-[4px] h-[4px] rounded-full flex-shrink-0"
                                                        style={{ background: job.logoColor }}
                                                    />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Optional Tech Stack tags */}
                                        {job.tech && (
                                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-solid"
                                                 style={{ borderColor: 'rgba(42, 42, 58, 0.4)' }}>
                                                {job.tech.map((t, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                                                        style={{
                                                            background: 'rgba(10, 10, 15, 0.4)',
                                                            color: 'var(--color-text-tertiary)',
                                                            border: '1px solid rgba(42, 42, 58, 0.3)'
                                                        }}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
