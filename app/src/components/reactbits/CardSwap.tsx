import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardSwapProps {
    front: ReactNode;
    back: ReactNode;
    className?: string;
}

export default function CardSwap({ front, back, className = '' }: CardSwapProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`relative h-full w-full ${className}`}
            style={{ perspective: '1200px' }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onFocus={() => setIsFlipped(true)}
            onBlur={() => setIsFlipped(false)}
            tabIndex={0}
            role="button"
            aria-label="Flip card for more details"
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Front face */}
                <div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    {front}
                </div>

                {/* Back face */}
                <div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    {back}
                </div>
            </motion.div>
        </div>
    );
}
