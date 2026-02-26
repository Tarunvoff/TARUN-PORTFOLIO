import { useRef, useEffect, useState, type ReactNode } from 'react';

interface ScrollFloatProps {
    children: ReactNode;
    className?: string;
}

export default function ScrollFloat({ children, className = '' }: ScrollFloatProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Once visible, stay visible
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                filter: isVisible ? 'blur(0px)' : 'blur(6px)',
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out, filter 0.7s ease-out',
                willChange: 'opacity, transform, filter',
            }}
        >
            {children}
        </div>
    );
}
