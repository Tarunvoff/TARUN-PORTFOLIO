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
  Nextjs: 'https://cdn.simpleicons.org/nextdotjs',
  'Next.js': 'https://cdn.simpleicons.org/nextdotjs',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs',
  Express: 'https://cdn.simpleicons.org/express',
  FastAPI: 'https://cdn.simpleicons.org/fastapi',
  Flask: 'https://cdn.simpleicons.org/flask',
  Django: 'https://cdn.simpleicons.org/django',
  MongoDB: 'https://cdn.simpleicons.org/mongodb',
  MySQL: 'https://cdn.simpleicons.org/mysql',
  PostgreSQL: 'https://cdn.simpleicons.org/postgresql',
  Redis: 'https://cdn.simpleicons.org/redis',
  Firebase: 'https://cdn.simpleicons.org/firebase',
  Docker: 'https://cdn.simpleicons.org/docker',
  Kubernetes: 'https://cdn.simpleicons.org/kubernetes',
  Git: 'https://cdn.simpleicons.org/git',
  GitHub: 'https://cdn.simpleicons.org/github',
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
  OpenAI: 'https://cdn.simpleicons.org/openai',
  Streamlit: 'https://cdn.simpleicons.org/streamlit',
  Kafka: 'https://cdn.simpleicons.org/apachekafka',
  GraphQL: 'https://cdn.simpleicons.org/graphql',
  Tailwind: 'https://cdn.simpleicons.org/tailwindcss',
  Bootstrap: 'https://cdn.simpleicons.org/bootstrap',
  Vercel: 'https://cdn.simpleicons.org/vercel',
  Netlify: 'https://cdn.simpleicons.org/netlify',
  AWS: 'https://cdn.simpleicons.org/amazonaws',
  'Google Cloud': 'https://cdn.simpleicons.org/googlecloud',
  'Power BI': 'https://cdn.simpleicons.org/powerbi',
  'VS Code': 'https://cdn.simpleicons.org/visualstudiocode',
  LeetCode: 'https://cdn.simpleicons.org/leetcode',
  Codeforces: 'https://cdn.simpleicons.org/codeforces',
};

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    title: 'Systems Engineering',
    technologies: [
      { name: 'Python', iconUrl: ICON_MAP['Python'] },
      { name: 'Node.js', iconUrl: ICON_MAP['Node.js'] },
      { name: 'TypeScript', iconUrl: ICON_MAP['TypeScript'] },
      { name: 'FastAPI', iconUrl: ICON_MAP['FastAPI'] },
      { name: 'Flask', iconUrl: ICON_MAP['Flask'] },
      { name: 'Express', iconUrl: ICON_MAP['Express'] },
    ],
  },
  {
    title: 'AI & Machine Learning',
    technologies: [
      { name: 'OpenAI', iconUrl: ICON_MAP['OpenAI'] },
      { name: 'LangChain', iconUrl: ICON_MAP['LangChain'] },
      { name: 'Scikit-learn', iconUrl: ICON_MAP['Scikit-learn'] },
      { name: 'XGBoost', iconUrl: ICON_MAP['Python'] },
      { name: 'PyTorch', iconUrl: ICON_MAP['PyTorch'] },
      { name: 'TensorFlow', iconUrl: ICON_MAP['TensorFlow'] },
    ],
  },
  {
    title: 'Data & Analytics',
    technologies: [
      { name: 'Pandas', iconUrl: ICON_MAP['Pandas'] },
      { name: 'NumPy', iconUrl: ICON_MAP['NumPy'] },
      { name: 'Pinecone', iconUrl: ICON_MAP['Pinecone'] || ICON_MAP['Python'] },
      { name: 'MongoDB', iconUrl: ICON_MAP['MongoDB'] },
      { name: 'PostgreSQL', iconUrl: ICON_MAP['PostgreSQL'] },
      { name: 'Redis', iconUrl: ICON_MAP['Redis'] },
    ],
  },
  {
    title: 'Frontend & Integration',
    technologies: [
      { name: 'React', iconUrl: ICON_MAP['React'] },
      { name: 'Vite', iconUrl: ICON_MAP['Vercel'] },
      { name: 'Tailwind', iconUrl: ICON_MAP['Tailwind'] },
      { name: 'Framer Motion', iconUrl: ICON_MAP['Vite'] },
      { name: 'Redux', iconUrl: ICON_MAP['Python'] },
      { name: 'Streamlit', iconUrl: ICON_MAP['Streamlit'] },
    ],
  },
  {
    title: 'Tools & Workflow',
    technologies: [
      { name: 'Git', iconUrl: ICON_MAP['Git'] },
      { name: 'Docker', iconUrl: ICON_MAP['Docker'] },
      { name: 'AWS', iconUrl: ICON_MAP['AWS'] },
      { name: 'Supabase', iconUrl: ICON_MAP['Vercel'] },
      { name: 'Vercel', iconUrl: ICON_MAP['Vercel'] },
      { name: 'Postman', iconUrl: ICON_MAP['Vercel'] },
    ],
  },
];

export default function Skills() {
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
            className="text-lg max-w-2xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Core competencies across systems, intelligence layers, and infrastructure.
          </p>
        </ScrollFloat>
      </div>

      {/* Skill Clusters Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    backdropFilter: 'blur(20px)',
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
                    <div className="grid grid-cols-3 gap-4">
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
        {tech.iconUrl ? (
          <img
            src={tech.iconUrl}
            alt={`${tech.name} logo`}
            className="w-8 h-8 object-contain"
            style={{
              filter: isHovered ? 'none' : 'grayscale(100%) brightness(0.7)',
            }}
          />
        ) : (
          <div
            style={{
              fontSize: '1.5rem',
              filter: isHovered ? 'none' : 'grayscale(100%) brightness(0.7)',
            }}
          >
            {tech.name[0]}
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
