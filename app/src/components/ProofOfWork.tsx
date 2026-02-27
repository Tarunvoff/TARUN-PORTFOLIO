import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import CardSwap from "./reactbits/CardSwap";
import ScrollFloat from "./reactbits/ScrollFloat";
import Orb from "./reactbits/Orb";

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */

interface Achievement {
    index: string;
    title: string;
    tag: string;
    brief: string;
    detail: string;
    meta: { label: string; value: string }[];
    accent: string; // subtle tint per card
}

const ACHIEVEMENTS: Achievement[] = [
    {
        index: "01",
        title: "Createathon",
        tag: "3rd Prize · First Win",
        brief: "E-commerce platform \"Forever\" built under pressure.",
        detail:
            "First competitive hackathon entry. Shipped a full e-commerce platform codenamed Forever within the contest window. The win validated that speed and precision were compatible — it opened everything that followed.",
        meta: [
            { label: "Result", value: "3rd Prize" },
            { label: "Project", value: "Forever" },
            { label: "Domain", value: "E-Commerce" },
        ],
        accent: "108,99,255",
    },
    {
        index: "02",
        title: "KEC Hackathon",
        tag: "2nd Prize · Medical Domain",
        brief: "SoulSync AI — built in 30 hours, medical NLP at core.",
        detail:
            "Designed and delivered SoulSync AI, a mental-health support system using NLP and retrieval, in a 30-hour sprint. Second place in a competitive medical-domain track across institutions.",
        meta: [
            { label: "Result", value: "2nd Prize" },
            { label: "System", value: "SoulSync AI" },
            { label: "Duration", value: "30 hours" },
        ],
        accent: "34,211,238",
    },
    {
        index: "03",
        title: "Freshathon 2025",
        tag: "1st Dept · 4th Institution",
        brief: "High-pressure innovation sprint — outperformed senior batches.",
        detail:
            "Ranked 1st in department and 4th institution-wide as a first-year student, competing against senior cohorts. A proof that early technical depth compounds faster than seniority.",
        meta: [
            { label: "Dept Rank", value: "1st" },
            { label: "Institution", value: "4th" },
            { label: "Year", value: "2025" },
        ],
        accent: "52,211,153",
    },
    {
        index: "04",
        title: "Best Student Innovator",
        tag: "Institutional Award",
        brief: "Recognized for sustained innovation across the academic year.",
        detail:
            "Awarded Best Student Innovator for a consistent body of technical work spanning multiple projects, hackathons, and open-source contributions. Institutional acknowledgment of compounding output.",
        meta: [
            { label: "Type", value: "Award" },
            { label: "Scope", value: "Institution" },
            { label: "Category", value: "Innovation" },
        ],
        accent: "251,191,36",
    },
    {
        index: "05",
        title: "Technical Club Secretary",
        tag: "SECE · AI Datathon Lead",
        brief: "Hosted CODEATHON — National Level 24-Hour Hackathon. Led AI Datathon 2025.",
        detail:
            "Served as Technical Club Secretary at SECE — organized and led CODEATHON, a national-level 24-hour hackathon, and the AI Datathon 2025. Designed the problem statements, managed operations, and mentored participants.",
        meta: [
            { label: "Role", value: "Secretary" },
            { label: "Event", value: "CODEATHON" },
            { label: "Level", value: "National" },
        ],
        accent: "249,115,22",
    },
    {
        index: "06",
        title: "ADYA AI Hackathon",
        tag: "1st Place · ₹1,00,000",
        brief: "Multi-agent MCP system — first among 400+ teams.",
        detail:
            "Won first place and the ₹1,00,000 prize by designing and shipping a multi-agent MCP orchestration system that coordinated AI tools at production scale. Over 400 teams competed. The most technically demanding win.",
        meta: [
            { label: "Prize", value: "₹1,00,000" },
            { label: "Teams", value: "400+" },
            { label: "System", value: "MCP Agents" },
        ],
        accent: "168,85,247",
    },
];

/* ═══════════════════════════════════════════════════════════
   SPOTLIGHT + TILT WRAPPER
   — tracks mouse position inside the card for two effects:
     1. Radial gradient spotlight that follows the cursor
     2. Subtle 3-D tilt via rotateX/rotateY
═══════════════════════════════════════════════════════════ */

function SpotlightTiltCard({
    children,
    accent,
    className = "",
}: {
    children: React.ReactNode;
    accent: string;
    className?: string;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spot, setSpot] = useState({ x: 50, y: 50, visible: false });
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const px = ((e.clientX - left) / width) * 100;
        const py = ((e.clientY - top) / height) * 100;
        setSpot({ x: px, y: py, visible: true });
        // tilt: max ±8 deg
        const rx = -((e.clientY - top) / height - 0.5) * 8;
        const ry = ((e.clientX - left) / width - 0.5) * 8;
        setTilt({ rx, ry });
    }, []);

    const onMouseLeave = useCallback(() => {
        setSpot((s) => ({ ...s, visible: false }));
        setTilt({ rx: 0, ry: 0 });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className={`relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            animate={{
                rotateX: tilt.rx,
                rotateY: tilt.ry,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.6 }}
            style={{
                transformStyle: "preserve-3d",
                perspective: 900,
                /* Glass base */
                background: "rgba(255,255,255,0.028)",
                border: "1px solid rgba(255,255,255,0.075)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
            }}
            whileHover={{
                borderColor: `rgba(${accent},0.28)`,
            }}
        >
            {/* Gradient border glow — thin illuminated outline */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, rgba(${accent},0.12) 0%, transparent 50%, rgba(${accent},0.06) 100%)`,
                    zIndex: 0,
                }}
            />

            {/* Spotlight radial — follows cursor */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 140px at ${spot.x}% ${spot.y}%, rgba(${accent},0.13) 0%, transparent 80%)`,
                    opacity: spot.visible ? 1 : 0,
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <div className="relative" style={{ zIndex: 2 }}>
                {children}
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   CARD FACES
═══════════════════════════════════════════════════════════ */

function FrontFace({ item }: { item: Achievement }) {
    return (
        <div
            className="flex flex-col justify-between h-full p-6"
            style={{ minHeight: 220 }}
        >
            {/* Top row: index + tag */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <span
                    className="font-mono tabular-nums font-bold select-none"
                    style={{
                        fontSize: "clamp(2rem, 4vw, 2.8rem)",
                        lineHeight: 1,
                        color: "rgba(255,255,255,0.07)",
                        letterSpacing: "-0.03em",
                    }}
                >
                    {item.index}
                </span>
                <span
                    className="text-[9.5px] font-mono tracking-[0.18em] uppercase mt-1 text-right"
                    style={{ color: `rgba(${item.accent},0.75)` }}
                >
                    {item.tag}
                </span>
            </div>

            {/* Title */}
            <div className="flex-1">
                <h3
                    className="font-semibold tracking-tight leading-tight mb-3"
                    style={{
                        fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                        color: "var(--color-text-primary)",
                    }}
                >
                    {item.title}
                </h3>
                <p
                    className="text-[12.5px] leading-[1.65]"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                >
                    {item.brief}
                </p>
            </div>

            {/* Bottom: meta row */}
            <div
                className="flex flex-wrap gap-x-4 gap-y-1.5 mt-5 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
            >
                {item.meta.map((m) => (
                    <div key={m.label}>
                        <div
                            className="text-[8.5px] font-mono tracking-[0.16em] uppercase"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                            {m.label}
                        </div>
                        <div
                            className="text-[11px] font-semibold"
                            style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                            {m.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Hover hint */}
            <div
                className="absolute bottom-3 right-4 text-[8px] font-mono tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.14)" }}
            >
                hover ↻
            </div>
        </div>
    );
}

function BackFace({ item }: { item: Achievement }) {
    return (
        <div
            className="flex flex-col justify-between h-full p-6"
            style={{
                minHeight: 220,
                background: `rgba(${item.accent},0.05)`,
            }}
        >
            {/* Top */}
            <div className="flex items-center justify-between mb-4">
                <span
                    className="text-[9px] font-mono tracking-[0.2em] uppercase"
                    style={{ color: `rgba(${item.accent},0.65)` }}
                >
                    {item.index} · detail
                </span>
                <div
                    className="w-5 h-px"
                    style={{ background: `rgba(${item.accent},0.4)` }}
                />
            </div>

            {/* Detail text */}
            <p
                className="flex-1 text-[13px] leading-[1.8]"
                style={{ color: "rgba(255,255,255,0.62)" }}
            >
                {item.detail}
            </p>

            {/* Meta grid */}
            <div
                className="grid grid-cols-3 gap-2 mt-5 pt-4"
                style={{ borderTop: `1px solid rgba(${item.accent},0.15)` }}
            >
                {item.meta.map((m) => (
                    <div key={m.label} className="text-center">
                        <div
                            className="text-[8px] font-mono tracking-widest uppercase mb-0.5"
                            style={{ color: "rgba(255,255,255,0.18)" }}
                        >
                            {m.label}
                        </div>
                        <div
                            className="text-[11px] font-bold"
                            style={{ color: `rgba(${item.accent},0.9)` }}
                        >
                            {m.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   ASYMMETRIC PLACEMENT CONFIG
   Two-column grid where each card has an explicit column-start
   and a vertical offset applied via mt-* for architectural depth.
═══════════════════════════════════════════════════════════ */

const PLACEMENT = [
    { col: 1, mtClass: "mt-0"  },  // 01 — flush top-left
    { col: 2, mtClass: "mt-10" },  // 02 — offset top-right
    { col: 2, mtClass: "mt-0"  },  // 03 — flush right
    { col: 1, mtClass: "mt-6"  },  // 04 — slight offset left
    { col: 1, mtClass: "mt-0"  },  // 05 — flush left
    { col: 2, mtClass: "mt-8"  },  // 06 — offset right
] as const;

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */

export default function ProofOfWork() {
    return (
        <section
            id="proof"
            className="relative py-24 px-6 overflow-hidden"
            style={{ background: "var(--color-bg-primary)" }}
        >
            {/* Orb ambient — very low opacity */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0.18, zIndex: 0 }}
            >
                <Orb className="absolute inset-0 w-full h-full" />
            </div>

            {/* Background grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)," +
                        "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                    zIndex: 0,
                }}
            />

            <div className="relative max-w-5xl mx-auto" style={{ zIndex: 1 }}>
                {/* Section header */}
                <ScrollFloat className="mb-16">
                    <span
                        className="block text-[10.5px] font-mono tracking-[0.26em] uppercase mb-4"
                        style={{ color: "var(--color-text-tertiary)" }}
                    >
                        004 · competitive record
                    </span>
                    <h2
                        className="text-3xl sm:text-[2.4rem] font-bold tracking-tight"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        Achievements
                    </h2>
                    <p
                        className="mt-2 text-[14px]"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                        A record of outcomes, not attempts.
                    </p>
                </ScrollFloat>

                {/*
                    Asymmetric two-column grid.
                    Each card is the same size, placed at different
                    column positions with vertical offsets for depth.
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                    {ACHIEVEMENTS.map((item, i) => {
                        const { col, mtClass } = PLACEMENT[i];
                        return (
                            <ScrollFloat
                                key={item.index}
                                className={`${col === 2 ? "sm:col-start-2" : "sm:col-start-1"} ${mtClass}`}
                            >
                                <SpotlightTiltCard accent={item.accent}>
                                    <div style={{ height: 260 }}>
                                        <CardSwap
                                            front={<FrontFace item={item} />}
                                            back={<BackFace item={item} />}
                                        />
                                    </div>
                                </SpotlightTiltCard>
                            </ScrollFloat>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
