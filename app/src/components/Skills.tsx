import { motion } from 'framer-motion';
import ScrollFloat from './reactbits/ScrollFloat';
import { useState } from 'react';

interface Technology {
  name: string;
  iconUrl?: string; // optional SVG URL from simpleicons CDN
}

interface SkillCluster {
  title: string;
  technologies: Technology[];
}

const ICON_MAP: Record<string, string> = {
  Python: 'https://cdn.simpleicons.org/python',
  C: 'https://cdn.simpleicons.org/c',
  'C++': 'https://cdn.simpleicons.org/cplusplus',
  JavaScript: 'https://cdn.simpleicons.org/javascript',
  TypeScript: 'https://cdn.simpleicons.org/typescript',
  Java: 'https://cdn.simpleicons.org/openjdk',
  HTML5: 'https://cdn.simpleicons.org/html5',
  CSS3: 'https://cdn.simpleicons.org/css3',
  React: 'https://cdn.simpleicons.org/react',
  'Next.js': 'https://cdn.simpleicons.org/nextdotjs/fff',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs',
  Express: 'https://cdn.simpleicons.org/express/fff',
  FastAPI: 'https://cdn.simpleicons.org/fastapi',
  Flask: 'https://cdn.simpleicons.org/flask/fff',
  Django: 'https://cdn.simpleicons.org/django',
  MongoDB: 'https://cdn.simpleicons.org/mongodb',
  MySQL: 'https://cdn.simpleicons.org/mysql',
  PostgreSQL: 'https://cdn.simpleicons.org/postgresql',
  Redis: 'https://cdn.simpleicons.org/redis',
  Firebase: 'https://cdn.simpleicons.org/firebase',
  Docker: 'https://cdn.simpleicons.org/docker',
  Kubernetes: 'https://cdn.simpleicons.org/kubernetes',
  Git: 'https://cdn.simpleicons.org/git',
  GitHub: 'https://cdn.simpleicons.org/github/fff',
  GitLab: 'https://cdn.simpleicons.org/gitlab',
  Linux: 'https://cdn.simpleicons.org/linux',
  Ubuntu: 'https://cdn.simpleicons.org/ubuntu',
  TensorFlow: 'https://cdn.simpleicons.org/tensorflow',
  PyTorch: 'https://cdn.simpleicons.org/pytorch',
  'Scikit-learn': 'https://cdn.simpleicons.org/scikitlearn',
  Pandas: 'https://cdn.simpleicons.org/pandas',
  NumPy: 'https://cdn.simpleicons.org/numpy',
  Matplotlib: 'https://cdn.simpleicons.org/matplotlib',
  Seaborn: 'https://cdn.simpleicons.org/seaborn',
  HuggingFace: 'https://cdn.simpleicons.org/huggingface',
  LangChain: 'https://cdn.simpleicons.org/langchain',
  OpenAI: 'https://cdn.simpleicons.org/openai/fff',
  Streamlit: 'https://cdn.simpleicons.org/streamlit',
  Kafka: 'https://cdn.simpleicons.org/apachekafka',
  GraphQL: 'https://cdn.simpleicons.org/graphql',
  Tailwind: 'https://cdn.simpleicons.org/tailwindcss',
  Bootstrap: 'https://cdn.simpleicons.org/bootstrap',
  Vercel: 'https://cdn.simpleicons.org/vercel/fff',
  Netlify: 'https://cdn.simpleicons.org/netlify',
  AWS: 'https://cdn.simpleicons.org/amazonwebservices/fff',
  'Google Cloud': 'https://cdn.simpleicons.org/googlecloud',
  Azure: 'https://cdn.simpleicons.org/microsoftazure',
  'Power BI': 'https://cdn.simpleicons.org/powerbi',
  'VS Code': 'https://cdn.simpleicons.org/visualstudiocode',
  LeetCode: 'https://cdn.simpleicons.org/leetcode',
  Codeforces: 'https://cdn.simpleicons.org/codeforces',
  Supabase: 'https://cdn.simpleicons.org/supabase',
  Postman: 'https://cdn.simpleicons.org/postman',
  Ollama: 'https://cdn.simpleicons.org/ollama/fff',
  Pinecone: 'https://cdn.simpleicons.org/pinecone',
  Spacy: 'https://cdn.simpleicons.org/spacy',
  Meta: 'https://cdn.simpleicons.org/meta/fff',
  OWASP: 'https://cdn.simpleicons.org/owasp/fff',
  Snyk: 'https://cdn.simpleicons.org/snyk',
  LlamaIndex: 'https://cdn.simpleicons.org/llamaindex',
};

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    title: 'Systems & Cloud',
    technologies: [
      { name: 'Python', iconUrl: ICON_MAP['Python'] },
      { name: 'TypeScript', iconUrl: ICON_MAP['TypeScript'] },
      { name: 'Docker', iconUrl: ICON_MAP['Docker'] },
      { name: 'AWS', iconUrl: ICON_MAP['AWS'] },
      { name: 'GCP', iconUrl: ICON_MAP['Google Cloud'] },
      { name: 'Azure', iconUrl: ICON_MAP['Azure'] },
    ],
  },
  {
    title: 'Generative AI & RAG',
    technologies: [
      { name: 'OpenAI', iconUrl: ICON_MAP['OpenAI'] },
      { name: 'LangChain', iconUrl: ICON_MAP['LangChain'] },
      { name: 'LlamaIndex', iconUrl: ICON_MAP['LlamaIndex'] },
      { name: 'Ollama', iconUrl: ICON_MAP['Ollama'] },
      { name: 'Pinecone', iconUrl: ICON_MAP['Pinecone'] },
      { name: 'HuggingFace', iconUrl: ICON_MAP['HuggingFace'] },
    ],
  },
  {
    title: 'NLP & ML Engineering',
    technologies: [
      { name: 'PyTorch', iconUrl: ICON_MAP['PyTorch'] },
      { name: 'TensorFlow', iconUrl: ICON_MAP['TensorFlow'] },
      { name: 'Scikit-learn', iconUrl: ICON_MAP['Scikit-learn'] },
      { name: 'spaCy', iconUrl: ICON_MAP['Spacy'] },
      { name: 'Pandas', iconUrl: ICON_MAP['Pandas'] },
      { name: 'NumPy', iconUrl: ICON_MAP['NumPy'] },
    ],
  },
  {
    title: 'AI Security & Guardrails',
    technologies: [
      { name: 'LLM Guardrails', iconUrl: ICON_MAP['Snyk'] },
      { name: 'Prompt Shielding', iconUrl: ICON_MAP['Snyk'] },
      { name: 'PII Sanitization', iconUrl: ICON_MAP['Snyk'] },
      { name: 'OWASP LLM Sec', iconUrl: ICON_MAP['OWASP'] },
      { name: 'LlamaGuard', iconUrl: ICON_MAP['Meta'] },
      { name: 'SecureLLM', iconUrl: ICON_MAP['Snyk'] },
    ],
  },
  {
    title: 'Data & Databases',
    technologies: [
      { name: 'PostgreSQL', iconUrl: ICON_MAP['PostgreSQL'] },
      { name: 'MongoDB', iconUrl: ICON_MAP['MongoDB'] },
      { name: 'Redis', iconUrl: ICON_MAP['Redis'] },
      { name: 'Supabase', iconUrl: ICON_MAP['Supabase'] },
      { name: 'Firebase', iconUrl: ICON_MAP['Firebase'] },
      { name: 'MySQL', iconUrl: ICON_MAP['MySQL'] },
    ],
  },
  {
    title: 'Tools & Frontend',
    technologies: [
      { name: 'Git', iconUrl: ICON_MAP['Git'] },
      { name: 'React', iconUrl: ICON_MAP['React'] },
      { name: 'Next.js', iconUrl: ICON_MAP['Next.js'] },
      { name: 'Node.js', iconUrl: ICON_MAP['Node.js'] },
      { name: 'FastAPI', iconUrl: ICON_MAP['FastAPI'] },
      { name: 'Vercel', iconUrl: ICON_MAP['Vercel'] },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <ScrollFloat>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Capability Modules
            </h2>
            <span
              className="text-sm font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Technical Stack
            </span>
          </div>
          <p
            className="text-base sm:text-lg max-w-2xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Core competencies across systems, intelligence layers, and infrastructure.
          </p>
        </ScrollFloat>
      </div>

      {/* Skill Clusters Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SKILL_CLUSTERS.map((cluster, clusterIdx) => (
            <ScrollFloat key={clusterIdx}>
              <motion.div
                className="group relative h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  delay: clusterIdx * 0.1,
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {/* Glass Panel */}
                <div
                  className="relative overflow-hidden rounded-xl h-full"
                  style={{
                    background: 'rgba(26, 26, 36, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(42, 42, 58, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 36, 0.75)';
                    e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 36, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(42, 42, 58, 0.4)';
                  }}
                >
                  {/* Spotlight effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 0%, rgba(108, 99, 255, 0.1) 0%, transparent 60%)',
                      transition: 'opacity 0.3s ease',
                    }}
                  />

                  <div className="relative p-6">
                    {/* Cluster Title */}
                    <h3
                      className="text-lg font-semibold mb-6 pb-3"
                      style={{
                        color: 'var(--color-text-primary)',
                        borderBottom: '1px solid rgba(42, 42, 58, 0.5)',
                      }}
                    >
                      {cluster.title}
                    </h3>

                    {/* Technologies Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {cluster.technologies.map((tech, techIdx) => (
                        <TechIcon key={techIdx} tech={tech} delay={techIdx * 0.05} />
                      ))}
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

interface TechIconProps {
  tech: Technology;
  delay: number;
}

function TechIcon({ tech, delay }: TechIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg cursor-default"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ scale: 1.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'rgba(42, 42, 58, 0.3)' : 'transparent',
        transition: 'background 0.2s ease',
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 flex items-center justify-center"
        style={{
          transition: 'filter 0.2s ease, transform 0.2s ease',
          transform: isHovered ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        {!imgError && tech.iconUrl ? (
          <img
            src={tech.iconUrl}
            alt={`${tech.name} logo`}
            className="w-8 h-8 object-contain"
            onError={() => setImgError(true)}
            style={{
              filter: isHovered ? 'none' : 'grayscale(100%) brightness(0.7)',
            }}
          />
        ) : (
          <div
            className="w-8 h-8 flex items-center justify-center font-mono text-[10px] font-bold rounded-lg"
            style={{
              background: 'rgba(108, 99, 255, 0.12)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(108, 99, 255, 0.25)',
              filter: isHovered ? 'none' : 'brightness(0.8)',
            }}
          >
            {tech.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name */}
      <div
        className="text-xs font-medium text-center leading-tight"
        style={{
          color: isHovered ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
          transition: 'color 0.2s ease',
        }}
      >
        {tech.name}
      </div>
    </motion.div>
  );
}
