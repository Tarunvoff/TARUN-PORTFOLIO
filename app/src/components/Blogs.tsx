import { motion } from 'framer-motion';
import ScrollFloat from './reactbits/ScrollFloat';

interface BlogPost {
  title: string;
  summary: string;
  url: string;
  date: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Prompt Injection & Jailbreak Attacks',
    summary: 'Exploring adversarial techniques that manipulate LLM behavior through carefully crafted inputs',
    url: 'https://medium.com/@tarunvoff/prompt-injection-jailbreak-attacks-a-simple-guide-to-llm-security-0fc6f16c8774',
    date: '2025',
  },
  {
    title: 'Data Leakage in LLMs',
    summary: 'Analyzing privacy risks and information disclosure patterns in large language models',
    url: 'https://medium.com/@tarunvoff/understanding-and-mitigating-data-leakage-in-large-language-models-bf83e4ff89e7',
    date: '2025',
  },
  {
    title: 'LLM Security',
    summary: 'Comprehensive framework for securing AI systems against emerging threat vectors',
    url: 'https://medium.com/@tarunvoff/llm-security-cybersecurity-threats-and-how-to-tackle-them-e13b35ebf3b7',
    date: '2025',
  },
  {
    title: 'The Quantum Leap: Google Willow',
    summary: 'Deep dive into Google\'s quantum computing breakthrough and implications for AI',
    url: 'https://medium.com/@tarunvoff/the-quantum-leap-my-take-on-googles-willow-and-the-future-of-computing-50621769ae97',
    date: '2024',
  },
  {
    title: 'Malicious Use of LLMs',
    summary: 'Understanding attack surfaces and defense mechanisms in generative AI systems',
    url: 'https://medium.com/@tarunvoff/malicious-use-of-large-language-models-phishing-and-social-engineering-934fbcd0dd17',
    date: '2025',
  },
];

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <ScrollFloat>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Technical Writing
            </h2>
            <span
              className="text-sm font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Research & Analysis
            </span>
          </div>
          <p
            className="text-base sm:text-lg max-w-2xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Editorial explorations of AI security, quantum computing, and emerging intelligence systems.
          </p>
        </ScrollFloat>
      </div>

      {/* Blog Posts */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col gap-4">
          {BLOG_POSTS.map((post, idx) => (
            <ScrollFloat key={idx}>
              <motion.a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {/* Glass Strip */}
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{
                    background: 'rgba(26, 26, 36, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(42, 42, 58, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 36, 0.7)';
                    e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 36, 0.5)';
                    e.currentTarget.style.borderColor = 'rgba(42, 42, 58, 0.3)';
                  }}
                >
                  {/* Subtle glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(108, 99, 255, 0.05) 0%, transparent 100%)',
                      transition: 'opacity 0.3s ease',
                    }}
                  />

                  <div className="relative p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    {/* Date Badge */}
                    <div
                      className="hidden sm:flex flex-shrink-0 w-16 h-16 rounded-lg items-center justify-center"
                      style={{
                        background: 'rgba(42, 42, 58, 0.5)',
                        border: '1px solid rgba(42, 42, 58, 0.8)',
                      }}
                    >
                      <div
                        className="text-xs font-mono font-semibold"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {post.date}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Mobile date badge inline */}
                      <span
                        className="inline-block sm:hidden text-[10px] font-mono font-semibold mb-1.5 px-2 py-0.5 rounded"
                        style={{
                          color: 'var(--color-text-tertiary)',
                          background: 'rgba(42, 42, 58, 0.5)',
                        }}
                      >
                        {post.date}
                      </span>
                      <h3
                        className="text-lg sm:text-xl font-semibold mb-1.5 group-hover:text-gradient-accent transition-all duration-300"
                        style={{
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {post.summary}
                      </p>
                    </div>

                    {/* Read Article Link */}
                    <div className="flex-shrink-0 flex items-center gap-2 w-full sm:w-auto">
                      <span
                        className="text-sm font-medium whitespace-nowrap relative flex-1 sm:flex-initial text-center sm:text-left py-2 sm:py-0 rounded-lg sm:rounded-none"
                        style={{
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        <span className="relative">
                          Read Article
                          <span
                            className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] transition-all duration-300 hidden sm:block"
                            style={{
                              background: 'var(--color-accent)',
                            }}
                          />
                        </span>
                      </span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 hidden sm:block"
                        style={{ color: 'var(--color-text-tertiary)' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.a>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </section>
  );
}
