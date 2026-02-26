import { motion } from 'framer-motion';
import { Trophy, Package, Award, Globe } from 'lucide-react';
import { PROOF_OF_WORK } from '../data/portfolioData';

const TYPE_CONFIG = {
    hackathon: { icon: Trophy, color: '#FBBF24' },
    'open-source': { icon: Package, color: '#6C63FF' },
    competition: { icon: Award, color: '#FB7185' },
    deployment: { icon: Globe, color: '#34D399' },
};

export default function ProofOfWork() {
    return (
        <section id="proof" className="relative py-24 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <span
                        className="inline-block text-xs font-mono tracking-widest uppercase mb-3"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        Credibility
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                        Proof of work
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PROOF_OF_WORK.map((item, i) => {
                        const config = TYPE_CONFIG[item.type];
                        const Icon = config.icon;
                        return (
                            <motion.div
                                key={item.title}
                                className="group p-5 rounded-xl transition-all duration-300"
                                style={{
                                    background: 'var(--color-bg-surface)',
                                    border: '1px solid var(--color-border-default)',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                whileHover={{ y: -2 }}
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                                    style={{ background: `${config.color}15` }}
                                >
                                    <Icon size={18} style={{ color: config.color }} />
                                </div>
                                <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    {item.title}
                                </h3>
                                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
