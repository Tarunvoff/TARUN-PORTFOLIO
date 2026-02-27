import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Orb from './reactbits/Orb';

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Create subtle floating particles
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.3 + 0.05,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`;
                ctx.fill();
            });

            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(108, 99, 255, ${0.05 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const headlineWords = 'I build systems that think, decide, and scale.'.split(' ');

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center">
            {/* Orb — ambient background. No overflow-hidden so glow bleeds to next section */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Orb />
            </div>
            <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

            {/* Subtle radial gradient overlay */}
            <div className="absolute inset-0 z-[2]" style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(108, 99, 255, 0.07) 0%, transparent 70%)',
            }} />

            <div className="relative z-[3] max-w-4xl mx-auto px-6 text-center">
                {/* Split text animation on headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                    {headlineWords.map((word, i) => (
                        <motion.span
                            key={i}
                            className="inline-block mr-[0.3em]"
                            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            style={{
                                color: ['think,', 'decide,', 'scale.'].includes(word)
                                    ? undefined
                                    : 'var(--color-text-primary)',
                            }}
                        >
                            {['think,', 'decide,', 'scale.'].includes(word) ? (
                                <span className="text-gradient-accent">{word}</span>
                            ) : (
                                word
                            )}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
                    style={{ color: 'var(--color-text-secondary)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                >
                    Software engineer exploring the intersection of AI reliability, agentic systems, and applied intelligence.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="#projects"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300"
                        style={{
                            background: 'var(--color-accent)',
                            color: 'white',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = 'var(--color-accent-hover)')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'var(--color-accent)')}
                    >
                        View experiments
                        <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
                    </a>
                    <a
                        href="https://github.com/Tarunvoff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300"
                        style={{
                            border: '1px solid var(--color-border-default)',
                            color: 'var(--color-text-secondary)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                            e.currentTarget.style.color = 'var(--color-text-primary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }}
                    >
                        GitHub
                    </a>
                </motion.div>
            </div>

            {/* Bottom gradient fade — blends hero into projects section seamlessly */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 z-[4] pointer-events-none"
                style={{
                    height: '220px',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(10,10,15,0.6) 50%, var(--color-bg-primary) 100%)',
                }}
            />

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4, y: [0, 6, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
            >
                <ChevronDown size={20} style={{ color: 'var(--color-text-tertiary)' }} />
            </motion.div>
        </section>
    );
}
