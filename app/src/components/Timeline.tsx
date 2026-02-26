import { motion } from 'framer-motion';
import ScrollFloat from './reactbits/ScrollFloat';

interface TimelineEntry {
    phase: string;
    insight: string;
    description: string;
    linkedProject?: string;
}

const ENTRIES: TimelineEntry[] = [
    {
        phase: 'Foundations',
        insight: 'What happens when you ask the right questions about data?',
        description: 'Started with Python and exploratory analysis. Learned that the interesting part isn\'t the library — it\'s knowing which question to ask.',
        linkedProject: 'hotel-analysis',
    },
    {
        phase: 'Applied ML',
        insight: 'A model is only as useful as the system around it.',
        description: 'Built classification and prediction pipelines. Realized that training a model is the easy part — deploying it, explaining it, and trusting it are the real challenges.',
        linkedProject: 'diabetes-prediction',
    },
    {
        phase: 'RAG & Retrieval',
        insight: 'The best AI answers are the ones you can trace back to a source.',
        description: 'Deep dive into retrieval-augmented generation. Built document Q&A systems where every answer carries a citation, not a guess.',
        linkedProject: 'rag-document-query',
    },
    {
        phase: 'Agentic Systems',
        insight: 'Tools are useless without coordination.',
        description: 'Built MCP servers that let AI assistants orchestrate real services. The hard part isn\'t connecting APIs — it\'s designing the protocol that makes it reliable at scale.',
        linkedProject: 'adya-mcp-hackathon',
    },
    {
        phase: 'Production Thinking',
        insight: 'If it only works in a demo, it\'s broken.',
        description: 'Started building for failure: idempotency, retry logic, graceful degradation. Moved from "does it run?" to "does it survive?"',
        linkedProject: 'mobile-recharge',
    },
    {
        phase: 'Reliability & Trust',
        insight: 'Trust must be measured, not assumed.',
        description: 'Published Apiris — an API decision framework that predicts latency, detects anomalies, and advises on CVEs. The question shifted from "can AI do this?" to "should you trust it?"',
        linkedProject: 'apiris-sdk',
    },
];

export default function Timeline() {
    return (
        <section id="evolution" className="relative py-28 px-6">
            <div className="max-w-2xl mx-auto">
                {/* Section heading — ScrollFloat */}
                <ScrollFloat className="mb-4">
                    <span
                        className="block text-[11px] font-mono tracking-[0.2em] uppercase mb-4"
                        style={{ color: 'var(--color-text-tertiary)' }}
                    >
                        003
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15]"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        How my thinking evolved
                    </h2>
                </ScrollFloat>

                <ScrollFloat className="mb-20">
                    <p
                        className="text-base mt-3"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Not a timeline of events. A log of shifts in perspective.
                    </p>
                </ScrollFloat>

                {/* Entries — vertical flow, generous whitespace */}
                <div className="space-y-24">
                    {ENTRIES.map((entry, i) => (
                        <motion.article
                            key={entry.phase}
                            className="relative pl-7"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{
                                delay: 0.08,
                                duration: 0.75,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {/* Subtle left accent — anchors the entry without adding visual weight */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-px"
                                style={{ background: 'var(--color-border-subtle)' }}
                            />

                            {/* Phase number */}
                            <div className="mb-5">
                                <span
                                    className="text-[10px] font-mono tracking-[0.18em] uppercase tabular-nums"
                                    style={{ color: 'var(--color-text-tertiary)' }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <h3
                                className="text-xl font-semibold tracking-tight mb-3"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                {entry.phase}
                            </h3>

                            {/* Insight — italic, accent-hinted */}
                            <p
                                className="text-[14px] italic leading-relaxed mb-4"
                                style={{ color: 'var(--color-accent)', opacity: 0.75 }}
                            >
                                “{entry.insight}”
                            </p>

                            {/* Description */}
                            <p
                                className="text-[14px] leading-[1.85]"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                {entry.description}
                            </p>

                            {/* Optional project link */}
                            {entry.linkedProject && (
                                <a
                                    href={`#projects`}
                                    className="inline-block mt-5 text-[11px] font-mono tracking-wide transition-colors duration-200"
                                    style={{ color: 'var(--color-text-tertiary)' }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text-tertiary)')}
                                >
                                    → {entry.linkedProject}
                                </a>
                            )}
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
