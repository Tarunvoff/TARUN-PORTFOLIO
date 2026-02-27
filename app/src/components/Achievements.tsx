import { motion } from 'framer-motion';
import ScrollFloat from './reactbits/ScrollFloat';

interface Achievement {
  title: string;
  description: string;
  result: string;
  scope: string;
  domain: string;
  year: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Apiris SDK — PyPI Publication',
    description: 'Built and published production-grade intelligent API decision framework with latency prediction, anomaly detection, and CVE advisory',
    result: '85-92% prediction accuracy · 130+ API vendors',
    scope: 'Open Source SDK',
    domain: 'AI/ML Systems',
    year: '2026',
  },
  {
    title: 'VANIJ MCP Platform',
    description: 'Architected Model Context Protocol platform enabling standardized AI-service integration across Slack, Salesforce, Zoom, GSuite',
    result: '3 forks · 10+ service integrations · Dual-language support',
    scope: 'Hackathon Project',
    domain: 'GenAI Infrastructure',
    year: '2025',
  },
  {
    title: 'TrackWise Platform',
    description: 'Full-stack educational platform with AI-powered task generation, progress analytics, and real-time collaboration features',
    result: 'Role-based architecture · AI tutor · Analytics dashboard',
    scope: 'Production Deployment',
    domain: 'EdTech Platform',
    year: '2025',
  },
  {
    title: 'RAG Document Query Engine',
    description: 'Enterprise-grade RAG pipeline with LangChain, Gemini 2.5, and Pinecone for intelligent document Q&A with evidence backing',
    result: 'Multi-format support · WebSocket batch processing',
    scope: 'Production System',
    domain: 'GenAI/RAG',
    year: '2025',
  },
  {
    title: 'AuraSound AI',
    description: 'Noise pollution and mental health analytics platform with 7 ML models, advanced feature engineering, and interactive dashboards',
    result: '7-model ensemble · Hyperparameter optimization',
    scope: 'Research Tool',
    domain: 'ML Analytics',
    year: '2025',
  },
  {
    title: 'SoulSync Wellness',
    description: 'AI-powered emotional wellness companion with mood tracking, reflective journaling, and personalized mental health insights',
    result: 'Gemini AI integration · Weekly trend analysis',
    scope: 'Mobile Application',
    domain: 'Health Tech',
    year: '2025',
  },
];

export default function Achievements() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <ScrollFloat>
          <div className="flex items-baseline gap-4 mb-3">
            <h2
              className="text-4xl font-semibold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Achievements
            </h2>
            <span
              className="text-sm font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Proof of Execution
            </span>
          </div>
          <p
            className="text-lg max-w-2xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Validated impact across open source, production systems, and competitive builds.
          </p>
        </ScrollFloat>
      </div>

      {/* Achievements Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((achievement, idx) => (
            <ScrollFloat key={idx}>
              <motion.div
                className="group relative h-full"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Glass Slab */}
                <div
                  className="relative overflow-hidden rounded-xl h-full"
                  style={{
                    background: 'rgba(26, 26, 36, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(42, 42, 58, 0.4)',
                    transform: 'perspective(1000px) rotateX(1deg)',
                    transformOrigin: 'center',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 36, 0.75)';
                    e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.3)';
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 36, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(42, 42, 58, 0.4)';
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(1deg)';
                  }}
                >
                  {/* Spotlight effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 0%, rgba(108, 99, 255, 0.12) 0%, transparent 60%)',
                      transition: 'opacity 0.4s ease',
                    }}
                  />

                  <div className="relative p-6 flex flex-col h-full">
                    {/* Title */}
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {achievement.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-6 flex-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {achievement.description}
                    </p>

                    {/* Metric Strip */}
                    <div
                      className="grid grid-cols-2 gap-4 pt-4"
                      style={{
                        borderTop: '1px solid rgba(42, 42, 58, 0.5)',
                      }}
                    >
                      <MetricItem label="RESULT" value={achievement.result} />
                      <MetricItem label="YEAR" value={achievement.year} />
                      <MetricItem label="SCOPE" value={achievement.scope} />
                      <MetricItem label="DOMAIN" value={achievement.domain} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </section>
  );
}

interface MetricItemProps {
  label: string;
  value: string;
}

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="text-[10px] font-mono uppercase tracking-wider"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {label}
      </div>
      <div
        className="text-xs font-medium leading-tight"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {value}
      </div>
    </div>
  );
}
