import { useState, useRef } from 'react';
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from 'framer-motion';

/* ══════════════════════════════════════════════════════════
   3-D / 4-D MATH
══════════════════════════════════════════════════════════ */

type V3   = readonly [number, number, number];
type V4   = readonly [number, number, number, number];
type Edge = readonly [V3, V3];

function rotY(p: V3, a: number): V3 {
    const [x, y, z] = p;
    return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}
function rotX(p: V3, a: number): V3 {
    const [x, y, z] = p;
    return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
function cam(p: V3, rx: number, ry: number): V3 { return rotX(rotY(p, ry), rx); }
function proj(p: V3, fov = 240, d = 4.5, cx = 200, cy = 200): [number, number] {
    const s = fov / (d + p[2]);
    return [cx + p[0] * s, cy + p[1] * s];
}

/* Stereographic 4D→3D projection then standard 3D→2D */
function proj4d(p4: V4, w2 = 2.5): V3 {
    const f = 1 / (w2 - p4[3]);
    return [p4[0] * f, p4[1] * f, p4[2] * f];
}

function tesseractEdges(): Edge[] {
    /* 16 vertices of the unit hypercube in 4D, then project to 3D */
    const bits = [0,1];
    const verts4d: V4[] = [];
    for (const a of bits) for (const b of bits) for (const c of bits) for (const d of bits)
        verts4d.push([a*2-1, b*2-1, c*2-1, d*2-1] as V4);
    const verts3d: V3[] = verts4d.map(v => {
        const v3 = proj4d(v, 2.6);
        return [v3[0]*0.9, v3[1]*0.9, v3[2]*0.9] as V3;
    });
    const edges: Edge[] = [];
    for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
            // Two vertices are connected in a hypercube if they differ in exactly one bit
            const a = verts4d[i], b = verts4d[j];
            const diff = [0,1,2,3].filter(k => a[k] !== b[k]).length;
            if (diff === 1) edges.push([verts3d[i], verts3d[j]]);
        }
    }
    return edges;
}

function cubeEdges(cx = 0, cy = 0, cz = 0, s = 1): Edge[] {
    const v = (dx: number, dy: number, dz: number): V3 =>
        [cx + dx * s, cy + dy * s, cz + dz * s];
    return [
        [v(-1,-1,-1),v( 1,-1,-1)],[v( 1,-1,-1),v( 1, 1,-1)],
        [v( 1, 1,-1),v(-1, 1,-1)],[v(-1, 1,-1),v(-1,-1,-1)],
        [v(-1,-1, 1),v( 1,-1, 1)],[v( 1,-1, 1),v( 1, 1, 1)],
        [v( 1, 1, 1),v(-1, 1, 1)],[v(-1, 1, 1),v(-1,-1, 1)],
        [v(-1,-1,-1),v(-1,-1, 1)],[v( 1,-1,-1),v( 1,-1, 1)],
        [v( 1, 1,-1),v( 1, 1, 1)],[v(-1, 1,-1),v(-1, 1, 1)],
    ];
}
function internalLattice(s = 1.2): Edge[] {
    const v = (dx: number, dy: number, dz: number): V3 => [dx*s, dy*s, dz*s];
    return [
        [v(-1,0,-1),v(1,0,-1)],[v(1,0,-1),v(1,0,1)],[v(1,0,1),v(-1,0,1)],[v(-1,0,1),v(-1,0,-1)],
        [v(0,-1,-1),v(0,-1,1)],[v(0,-1,1),v(0,1,1)],[v(0,1,1),v(0,1,-1)],[v(0,1,-1),v(0,-1,-1)],
        [v(0,-1,0),v(0,1,0)],[v(-1,0,0),v(1,0,0)],[v(0,0,-1),v(0,0,1)],
    ];
}

/* ══════════════════════════════════════════════════════════
   STAGE DATA
══════════════════════════════════════════════════════════ */

interface DimStage {
    id: string;
    idx: number;
    dimension: string;
    label: string;
    subtitle: string;
    reflection: string[];
    edges: Edge[];
    subEdges?: Edge[];
    rotSpeed: number; // relative rotation multiplier
}

const LINE_SEG: Edge[] = [[[-2.4,0,0],[-0.4,0,0]],[[0.4,0,0],[2.4,0,0]]];
const SQUARE: Edge[] = [
    [[-1.5,-1.5,0],[1.5,-1.5,0]],[[1.5,-1.5,0],[1.5,1.5,0]],
    [[1.5,1.5,0],[-1.5,1.5,0]],[[-1.5,1.5,0],[-1.5,-1.5,0]],
];
const CUBE      = cubeEdges(0,0,0,1.2);
const LATTICE   = internalLattice(1.2);
const TWO_CUBES: Edge[] = [
    ...cubeEdges(-1.9,0,0,0.82),...cubeEdges(1.9,0,0,0.82),
    [[-1.08,-0.82,0],[1.08,-0.82,0]],[[-1.08,0.82,0],[1.08,0.82,0]],
    [[-1.08,0,0],[1.08,0,0]],
];
const MULTI_NET: Edge[] = [
    ...cubeEdges(-2.0,-2.0,0,0.58),...cubeEdges(2.0,-2.0,0,0.58),
    ...cubeEdges(-2.0,2.0,0,0.58),...cubeEdges(2.0,2.0,0,0.58),
    [[-1.42,-2.0,0],[1.42,-2.0,0]],[[-1.42,2.0,0],[1.42,2.0,0]],
    [[-2.0,-1.42,0],[-2.0,1.42,0]],[[2.0,-1.42,0],[2.0,1.42,0]],
    [[-1.42,-1.42,0],[1.42,1.42,0]],[[1.42,-1.42,0],[-1.42,1.42,0]],
];
const TESSERACT = tesseractEdges();

const STAGES: DimStage[] = [
    {
        id:'curiosity', idx:0, dimension:'1D', label:'Curiosity',
        subtitle:'The Question',
        reflection:['Every model starts with a question.','I had no method — only curiosity about what data held.'],
        edges:LINE_SEG, rotSpeed:0.3,
    },
    {
        id:'python', idx:1, dimension:'2D', label:'Python Foundations',
        subtitle:'Structure Appears',
        reflection:['A second axis changes everything.','Data is not random. It sits in a space you can reason about.'],
        edges:SQUARE, rotSpeed:0.5,
    },
    {
        id:'ml', idx:2, dimension:'3D', label:'Machine Learning',
        subtitle:'Depth Introduced',
        reflection:['Prediction introduced uncertainty.','Every hypothesis lives in a loss landscape — and the geometry tells you where to go.'],
        edges:CUBE, rotSpeed:0.8,
    },
    {
        id:'deep', idx:3, dimension:'3D internal', label:'Deep Learning & NLP',
        subtitle:'Hidden Representation',
        reflection:['Structure is not always visible from outside.','The important geometry is latent — you have to learn it, not observe it.'],
        edges:CUBE, subEdges:LATTICE, rotSpeed:0.9,
    },
    {
        id:'llm', idx:4, dimension:'interacting', label:'LLM & GenAI',
        subtitle:'Context Becomes Generative',
        reflection:['Context changed what generation meant.','Two representations interacting is not addition — it is emergence.'],
        edges:TWO_CUBES, rotSpeed:1.0,
    },
    {
        id:'agents', idx:5, dimension:'networked', label:'Agentic Systems',
        subtitle:'Coordinated Intelligence',
        reflection:['Intelligence began deciding.','The hard part is not capability — it is coordination under uncertainty.'],
        edges:MULTI_NET, rotSpeed:1.1,
    },
    {
        id:'reliability', idx:6, dimension:'4D projection', label:'Reliability & Trust',
        subtitle:'Stabilized Structure',
        reflection:['A fourth dimension is constraint — and constraint is what makes systems trustworthy.','Systems must endure.'],
        edges:TESSERACT, rotSpeed:0.7,
    },
];

/* ══════════════════════════════════════════════════════════
   RIGHT-SIDE CONCEPTUAL SVG VISUALS
══════════════════════════════════════════════════════════ */

function ConceptVisual1D() {
    return (
        <svg viewBox="0 0 240 120" fill="none" className="w-full" style={{maxHeight:160}}>
            <line x1="20" y1="60" x2="220" y2="60" stroke="rgba(200,210,255,0.25)" strokeWidth="1"/>
            {[40,72,104,136,168,200].map(x=>(
                <line key={x} x1={x} y1="54" x2={x} y2="66" stroke="rgba(200,210,255,0.18)" strokeWidth="0.8"/>
            ))}
            <motion.circle cx="120" cy="60" r="5" fill="rgba(200,210,255,0.85)"
                animate={{r:[5,7,5],opacity:[0.85,1,0.85]}}
                transition={{duration:2.2,repeat:Infinity,ease:'easeInOut'}}/>
            <text x="120" y="90" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.22)" fontFamily="monospace">x</text>
            <text x="20" y="90" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.12)" fontFamily="monospace">0</text>
            <text x="220" y="90" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.12)" fontFamily="monospace">n</text>
        </svg>
    );
}

function ConceptVisual2D() {
    const pts: [number,number][] = [
        [45,85],[62,70],[80,60],[95,72],[115,50],[130,55],[148,40],[165,48],[185,32],[200,38]
    ];
    return (
        <svg viewBox="0 0 240 120" fill="none" className="w-full" style={{maxHeight:160}}>
            <line x1="30" y1="100" x2="220" y2="100" stroke="rgba(200,210,255,0.22)" strokeWidth="0.8"/>
            <line x1="30" y1="10"  x2="30"  y2="100" stroke="rgba(200,210,255,0.22)" strokeWidth="0.8"/>
            {[60,90,120,150,180].map(x=>(
                <line key={x} x1={x} y1="96" x2={x} y2="104" stroke="rgba(200,210,255,0.12)" strokeWidth="0.6"/>
            ))}
            {pts.map(([x,y],i)=>(
                <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(200,210,255,0.55)"/>
            ))}
            <polyline
                points={pts.map(([x,y])=>`${x},${y}`).join(' ')}
                stroke="rgba(120,140,255,0.35)" strokeWidth="1" fill="none"/>
            <text x="222" y="103" fontSize="9" fill="rgba(255,255,255,0.18)" fontFamily="monospace">x</text>
            <text x="24"  y="12"  fontSize="9" fill="rgba(255,255,255,0.18)" fontFamily="monospace">y</text>
        </svg>
    );
}

function ConceptVisual3D() {
    /* Loss curve: decreasing oscillation */
    const pts: [number,number][] = Array.from({length:28},(_,i)=>{
        const x = 20 + i*7.5;
        const decay   = Math.exp(-i*0.13);
        const noise   = Math.sin(i*2.3)*decay*18;
        const trend   = 80 - i*2.5;
        return [x, trend + noise];
    });
    return (
        <svg viewBox="0 0 240 110" fill="none" className="w-full" style={{maxHeight:150}}>
            <line x1="18" y1="8"   x2="18"  y2="100" stroke="rgba(200,210,255,0.2)" strokeWidth="0.8"/>
            <line x1="18" y1="100" x2="230" y2="100" stroke="rgba(200,210,255,0.2)" strokeWidth="0.8"/>
            {[0,1,2,3].map(i=>(
                <line key={i} x1="14" y1={100-i*25} x2="22" y2={100-i*25}
                    stroke="rgba(200,210,255,0.1)" strokeWidth="0.6"/>
            ))}
            <polyline
                points={pts.map(([x,y])=>`${x},${y}`).join(' ')}
                stroke="rgba(180,200,255,0.65)" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
            <text x="2" y="105" fontSize="8" fill="rgba(255,255,255,0.14)" fontFamily="monospace">loss</text>
            <text x="222" y="108" fontSize="8" fill="rgba(255,255,255,0.14)" fontFamily="monospace">epoch</text>
        </svg>
    );
}

function ConceptVisualDL() {
    /* 4-layer neural net: 3→4→4→2 */
    const layers = [
        { x: 35,  nodes: 3 },
        { x: 100, nodes: 5 },
        { x: 165, nodes: 5 },
        { x: 220, nodes: 2 },
    ];
    const nodeY = (count: number, i: number) => 20 + (80 / (count + 1)) * (i + 1);
    const lines: [number,number,number,number,number][] = [];
    for (let l = 0; l < layers.length - 1; l++) {
        const a = layers[l], b = layers[l+1];
        for (let i = 0; i < a.nodes; i++)
            for (let j = 0; j < b.nodes; j++)
                lines.push([a.x, nodeY(a.nodes,i), b.x, nodeY(b.nodes,j), l]);
    }
    return (
        <svg viewBox="0 0 255 100" fill="none" className="w-full" style={{maxHeight:140}}>
            {lines.map(([x1,y1,x2,y2,l],i)=>(
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(200,210,255,1)"
                    strokeWidth="0.5"
                    opacity={l===1?0.18:0.12}/>
            ))}
            {layers.map(({x,nodes},li)=>
                Array.from({length:nodes},(_,ni)=>(
                    <circle key={`${li}-${ni}`}
                        cx={x} cy={nodeY(nodes,ni)} r={li===0||li===layers.length-1?4:3.5}
                        fill="rgba(10,10,15,1)"
                        stroke="rgba(200,210,255,1)"
                        strokeWidth={li===1||li===2?0.7:1}
                        opacity={li===1||li===2?0.55:0.82}/>
                ))
            )}
        </svg>
    );
}

function ConceptVisualLLM() {
    /* Attention matrix — 8×8 grid with varying opacity */
    const SIZE = 8;
    const seed = [0.9,0.3,0.1,0.7,0.2,0.5,0.8,0.4,0.6,0.2,0.95,0.1,0.4,0.7,0.3,0.8,
                  0.1,0.85,0.2,0.5,0.9,0.3,0.6,0.15,0.4,0.3,0.7,0.9,0.2,0.5,0.1,0.8,
                  0.6,0.2,0.4,0.8,0.3,0.9,0.5,0.2,0.2,0.7,0.3,0.4,0.85,0.2,0.9,0.5,
                  0.8,0.5,0.2,0.3,0.6,0.8,0.2,0.9,0.3,0.9,0.6,0.2,0.4,0.7,0.3,0.85];
    const cell = 22, gap = 2, off = 18;
    return (
        <svg viewBox="0 0 215 215" fill="none" className="w-full" style={{maxHeight:160}}>
            <text x="1" y="10" fontSize="7" fill="rgba(255,255,255,0.14)" fontFamily="monospace">attention</text>
            {Array.from({length:SIZE},(_,r)=>
                Array.from({length:SIZE},(_,c)=>{
                    const op = seed[r*SIZE+c] ?? 0.3;
                    return (
                        <rect key={`${r}-${c}`}
                            x={off + c*(cell+gap)} y={off + r*(cell+gap)}
                            width={cell} height={cell} rx="1"
                            fill={`rgba(160,180,255,${op * 0.7})`}
                            stroke="rgba(200,210,255,0.06)" strokeWidth="0.5"/>
                    );
                })
            )}
        </svg>
    );
}

function ConceptVisualAgents() {
    /* DAG: tool-calling flow */
    const nodes = [
        {id:'P', x:110, y:18,  label:'Planner'},
        {id:'T', x:38,  y:72,  label:'Tool A'},
        {id:'M', x:182, y:72,  label:'Tool B'},
        {id:'E', x:110, y:128, label:'Executor'},
    ];
    const arrows: [number,number,number,number][] = [
        [110,32,55,72],[110,32,165,72],
        [55,86,110,128],[165,86,110,128],
    ];
    return (
        <svg viewBox="0 0 220 155" fill="none" className="w-full" style={{maxHeight:160}}>
            <defs>
                <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="rgba(180,195,255,0.45)"/>
                </marker>
            </defs>
            {arrows.map(([x1,y1,x2,y2],i)=>(
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(180,195,255,0.32)" strokeWidth="1"
                    markerEnd="url(#arr)" strokeDasharray="4 3"/>
            ))}
            {nodes.map(n=>(
                <g key={n.id}>
                    <rect x={n.x-32} y={n.y-11} width={64} height={22} rx="3"
                        fill="rgba(10,10,15,0.9)" stroke="rgba(200,210,255,0.28)" strokeWidth="0.8"/>
                    <text x={n.x} y={n.y+4} textAnchor="middle"
                        fontSize="9" fill="rgba(255,255,255,0.58)" fontFamily="monospace">
                        {n.label}
                    </text>
                </g>
            ))}
        </svg>
    );
}

function ConceptVisualReliability() {
    /* Stabilizing signal: noisy → flat */
    const pts: [number,number][] = Array.from({length:40},(_,i)=>{
        const x = 14 + i * 5.3;
        const decay = Math.exp(-i * 0.09);
        const noise = Math.sin(i * 3.1 + 1) * decay * 22;
        return [x, 60 + noise];
    });
    const flatLine = pts.slice(-6).map(p=>p[1]);
    const avg = flatLine.reduce((a,b)=>a+b,0)/flatLine.length;
    return (
        <svg viewBox="0 0 230 110" fill="none" className="w-full" style={{maxHeight:150}}>
            <line x1="12" y1="8" x2="12" y2="100" stroke="rgba(200,210,255,0.18)" strokeWidth="0.7"/>
            <line x1="12" y1="100" x2="222" y2="100" stroke="rgba(200,210,255,0.18)" strokeWidth="0.7"/>
            <line x1="160" y1={avg} x2="218" y2={avg}
                stroke="rgba(180,200,255,0.35)" strokeWidth="0.8" strokeDasharray="4 3"/>
            <polyline
                points={pts.map(([x,y])=>`${x},${y}`).join(' ')}
                stroke="rgba(200,215,255,0.72)" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
            <text x="155" y={avg-5} fontSize="8" fill="rgba(255,255,255,0.2)" fontFamily="monospace">stable</text>
            <text x="2" y="105" fontSize="7" fill="rgba(255,255,255,0.12)" fontFamily="monospace">signal</text>
        </svg>
    );
}

const CONCEPT_VISUALS = [
    ConceptVisual1D,
    ConceptVisual2D,
    ConceptVisual3D,
    ConceptVisualDL,
    ConceptVisualLLM,
    ConceptVisualAgents,
    ConceptVisualReliability,
];

/* ══════════════════════════════════════════════════════════
   GEOMETRY RENDERER
══════════════════════════════════════════════════════════ */

const ROT_X = 0.24;

function GeomSVG({ stage, ry }: { stage: DimStage; ry: number }) {
    const renderEdges = (edges: Edge[], op: number, sw: number) =>
        edges.map(([a, b], i) => {
            const pa = proj(cam(a, ROT_X, ry));
            const pb = proj(cam(b, ROT_X, ry));
            return (
                <line key={i} x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]}
                    stroke="rgba(210,220,255,1)" strokeWidth={sw}
                    strokeLinecap="round" opacity={op}/>
            );
        });
    return (
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full" style={{overflow:'visible'}}>
            {stage.subEdges && renderEdges(stage.subEdges, 0.2, 0.55)}
            {renderEdges(stage.edges, 0.72, 0.95)}
        </svg>
    );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */

export default function Timeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const [idx,      setIdx]      = useState(0);
    const [prevIdx,  setPrevIdx]  = useState(0);
    const [ry,       setRy]       = useState(0.35);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    /* Parallax transforms */
    const bgY   = useTransform(scrollYProgress, [0,1], ['0%',   '-7%']);
    const geomY = useTransform(scrollYProgress, [0,1], ['0%',   '-3%']);
    const infoY = useTransform(scrollYProgress, [0,1], ['0%',   '-1%']);

    useMotionValueEvent(scrollYProgress, 'change', v => {
        const next = Math.min(6, Math.floor(v * 7.5));
        if (next !== idx) { setPrevIdx(idx); setIdx(next); }
        setRy(0.35 + v * Math.PI * 1.8);
    });

    const stage     = STAGES[idx];
    const forward   = idx >= prevIdx;
    const Visual    = CONCEPT_VISUALS[idx];
    const progress  = (idx) / 6; // 0→1

    return (
        <section
            id="evolution"
            ref={sectionRef}
            className="relative"
            style={{ minHeight: '700vh', background: 'var(--color-bg-primary)' }}
        >
            {/* ── Sticky viewport ── */}
            <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>

                {/* LAYER 1 — grid background */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ y: bgY, zIndex: 0 }}
                >
                    <div className="absolute inset-0" style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px),' +
                            'linear-gradient(90deg, rgba(255,255,255,0.026) 1px, transparent 1px)',
                        backgroundSize: '56px 56px',
                        maskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 20%, transparent 80%)',
                    }}/>
                </motion.div>

                {/* ── Section header — top center ── */}
                <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-12 pointer-events-none" style={{zIndex:20}}>
                    <motion.div
                        className="text-center"
                        initial={{opacity:0,y:10}}
                        animate={{opacity:1,y:0}}
                        transition={{duration:1,ease:[0.22,1,0.36,1]}}
                    >
                        <span className="block text-[10px] font-mono tracking-[0.26em] uppercase mb-3"
                            style={{color:'var(--color-text-tertiary)'}}>
                            003 · dimensional evolution
                        </span>
                        <h2 className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight"
                            style={{color:'var(--color-text-primary)'}}>
                            How my thinking evolved
                        </h2>
                        <p className="mt-1.5 text-[13px]" style={{color:'rgba(255,255,255,0.25)'}}>
                            Not a timeline of events.{' '}
                            <span style={{color:'rgba(255,255,255,0.14)'}}>A dimensional shift.</span>
                        </p>
                    </motion.div>
                </div>

                {/* ── Main content: split-screen ── */}
                <div className="absolute inset-0 flex items-center" style={{zIndex:5, paddingTop:'9rem', paddingBottom:'5rem'}}>
                    <div className="w-full h-full flex gap-0">

                        {/* ──────── LEFT: geometry (60%) ──────── */}
                        <motion.div
                            className="relative flex items-center justify-center"
                            style={{ width:'60%', height:'100%', y: geomY }}
                        >
                            {/* Dimension tag — top-left */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`dim-${stage.id}`}
                                    className="absolute top-0 left-8 font-mono"
                                    initial={{opacity:0}}
                                    animate={{opacity:1}}
                                    exit={{opacity:0}}
                                    transition={{duration:0.4}}
                                >
                                    <span className="text-[9.5px] tracking-[0.22em] uppercase"
                                        style={{color:'rgba(255,255,255,0.18)'}}>
                                        {stage.dimension}
                                    </span>
                                </motion.div>
                            </AnimatePresence>

                            {/* Geometry SVG */}
                            <div style={{width:'min(380px,55vw)', height:'min(380px,55vw)'}}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={stage.id}
                                        className="w-full h-full"
                                        initial={{opacity:0, scale:0.9, rotate: forward?-0.8:0.8}}
                                        animate={{opacity:1, scale:1.0, rotate:0}}
                                        exit={{  opacity:0, scale:1.06, rotate: forward?0.8:-0.8}}
                                        transition={{duration:0.7, ease:[0.22,1,0.36,1]}}
                                    >
                                        <GeomSVG stage={stage} ry={ry}/>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Stage progress bar — bottom of left col */}
                            <div className="absolute bottom-0 left-8 right-8 flex items-center gap-3">
                                <div className="flex-1 relative h-px" style={{background:'rgba(255,255,255,0.08)'}}>
                                    <motion.div
                                        className="absolute top-0 left-0 h-full"
                                        style={{background:'rgba(200,215,255,0.45)'}}
                                        animate={{width:`${progress*100}%`}}
                                        transition={{duration:0.6,ease:[0.22,1,0.36,1]}}
                                    />
                                </div>
                                <span className="font-mono text-[9px] tabular-nums"
                                    style={{color:'rgba(255,255,255,0.22)'}}>
                                    {String(idx+1).padStart(2,'0')}/{STAGES.length}
                                </span>
                            </div>
                        </motion.div>

                        {/* Vertical divider */}
                        <div className="flex-shrink-0 w-px self-stretch my-6"
                            style={{background:'rgba(255,255,255,0.06)'}}/>

                        {/* ──────── RIGHT: info panel (40%) ──────── */}
                        <motion.div
                            className="relative flex flex-col justify-center pl-10 pr-8"
                            style={{width:'40%', height:'100%', y: infoY}}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`info-${stage.id}`}
                                    className="flex flex-col gap-6"
                                    initial={{opacity:0, x: 12}}
                                    animate={{opacity:1, x:  0}}
                                    exit={{  opacity:0, x:-12}}
                                    transition={{duration:0.65, ease:[0.22,1,0.36,1]}}
                                >
                                    {/* Stage index + label */}
                                    <div>
                                        <span className="block text-[9px] font-mono tracking-[0.24em] uppercase mb-2"
                                            style={{color:'rgba(255,255,255,0.2)'}}>
                                            stage {String(idx+1).padStart(2,'0')} · {stage.dimension}
                                        </span>
                                        <h3 className="text-[1.45rem] font-semibold tracking-tight leading-tight"
                                            style={{color:'var(--color-text-primary)'}}>
                                            {stage.label}
                                        </h3>
                                        <div className="text-[11px] font-mono mt-1"
                                            style={{color:'rgba(255,255,255,0.28)'}}>
                                            {stage.subtitle}
                                        </div>
                                    </div>

                                    {/* Conceptual technical visual */}
                                    <div className="rounded-lg p-4 flex items-center justify-center"
                                        style={{
                                            background:'rgba(255,255,255,0.02)',
                                            border:'1px solid rgba(255,255,255,0.06)',
                                            minHeight:130,
                                        }}>
                                        <Visual/>
                                    </div>

                                    {/* Reflection lines */}
                                    <div className="flex flex-col gap-2">
                                        {stage.reflection.map((line,i)=>(
                                            <p key={i}
                                                className="text-[13px] leading-relaxed"
                                                style={{
                                                    color: i===0
                                                        ? 'rgba(255,255,255,0.55)'
                                                        : 'rgba(255,255,255,0.28)',
                                                    fontStyle: i===1 ? 'italic' : 'normal',
                                                }}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Stage nav dots on right edge */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
                                {STAGES.map((s,i)=>(
                                    <motion.div key={s.id} className="rounded-full"
                                        animate={{
                                            height:  i===idx ? 18 : 5,
                                            width:   5,
                                            opacity: i===idx ? 0.85 : (i<idx ? 0.32 : 0.12),
                                            background: 'rgba(200,215,255,1)',
                                        }}
                                        transition={{duration:0.4,ease:[0.22,1,0.36,1]}}/>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll nudge — stage 0 only */}
                <AnimatePresence>
                    {idx === 0 && (
                        <motion.div
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
                            style={{zIndex:20}}
                            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                            transition={{duration:0.5}}
                        >
                            {[0,1,2].map(i=>(
                                <motion.div key={i} className="w-px rounded-full"
                                    style={{height:6, background:'rgba(255,255,255,0.22)'}}
                                    animate={{opacity:[0.12,0.55,0.12]}}
                                    transition={{duration:1.5, delay:i*0.22, repeat:Infinity}}/>
                            ))}
                            <span className="text-[7.5px] font-mono tracking-widest uppercase mt-0.5"
                                style={{
                                    writingMode:'vertical-lr',
                                    color:'rgba(255,255,255,0.16)',
                                    letterSpacing:'0.2em',
                                }}>scroll</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
