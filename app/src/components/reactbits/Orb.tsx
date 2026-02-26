import { useEffect, useRef } from 'react';

interface OrbProps {
    className?: string;
}

export default function Orb({ className = '' }: OrbProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        // Fix: reset transform before scaling so calls don't compound
        // Use window dimensions as fallback because offsetWidth/Height returns 0
        // for absolute-positioned canvas before the first layout pass.
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.offsetWidth || canvas.parentElement?.offsetWidth || window.innerWidth;
            const h = canvas.offsetHeight || canvas.parentElement?.offsetHeight || window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // safe reset + scale
        };
        resize();
        window.addEventListener('resize', resize);

        const orbs = [
            { x: 0.25, y: 0.35, r: 580, color: [108, 99, 255], speed: 0.00025 },
            { x: 0.75, y: 0.65, r: 500, color: [34, 211, 238],  speed: 0.00040 },
            { x: 0.55, y: 0.25, r: 420, color: [108, 99, 255],  speed: 0.00032 },
            { x: 0.15, y: 0.75, r: 360, color: [52, 211, 153],  speed: 0.00018 },
        ];

        const draw = () => {
            const w = canvas.offsetWidth || canvas.parentElement?.offsetWidth || window.innerWidth;
            const h = canvas.offsetHeight || canvas.parentElement?.offsetHeight || window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            orbs.forEach((orb) => {
                const cx = w * orb.x + Math.sin(time * orb.speed * 2000) * 50;
                const cy = h * orb.y + Math.cos(time * orb.speed * 3000) * 38;

                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
                gradient.addColorStop(0,   `rgba(${orb.color.join(',')}, 0.32)`);
                gradient.addColorStop(0.4, `rgba(${orb.color.join(',')}, 0.14)`);
                gradient.addColorStop(0.75,`rgba(${orb.color.join(',')}, 0.05)`);
                gradient.addColorStop(1,   `rgba(${orb.color.join(',')}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
                ctx.fill();
            });

            time++;
            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            style={{ opacity: 1 }}
        />
    );
}
