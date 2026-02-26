import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StaggeredMenuProps {
    items: { label: string; count: number }[];
    activeItem: string;
    onSelect: (label: string) => void;
}

export default function StaggeredMenu({ items, activeItem, onSelect }: StaggeredMenuProps) {
    const [hasAnimated, setHasAnimated] = useState(false);

    return (
        <nav className="flex flex-wrap gap-1" role="tablist">
            <AnimatePresence onExitComplete={() => setHasAnimated(true)}>
                {items.map((item, i) => {
                    const isActive = activeItem === item.label;
                    return (
                        <motion.button
                            key={item.label}
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onSelect(item.label)}
                            className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md"
                            style={{
                                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                            }}
                            initial={hasAnimated ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: hasAnimated ? 0 : i * 0.06,
                                duration: 0.35,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            onMouseOver={(e) => {
                                if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)';
                            }}
                            onMouseOut={(e) => {
                                if (!isActive) e.currentTarget.style.color = 'var(--color-text-tertiary)';
                            }}
                        >
                            {item.label}
                            <span
                                className="ml-1.5 text-[11px] tabular-nums"
                                style={{ opacity: 0.5 }}
                            >
                                {item.count}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="staggeredActiveTab"
                                    className="absolute inset-0 rounded-md -z-10"
                                    style={{
                                        background: 'var(--color-bg-elevated)',
                                        border: '1px solid var(--color-border-default)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </AnimatePresence>
        </nav>
    );
}
