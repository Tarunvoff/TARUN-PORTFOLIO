import { motion } from 'framer-motion';
import ScrollFloat from './reactbits/ScrollFloat';

interface CodingProfile {
  platform: string;
  username: string;
  url: string;
  iconUrl?: string;
  color: string; // Accent color for the platform
}

const PROFILES: CodingProfile[] = [
  {
    platform: 'LeetCode',
    username: 'Tarun_V28',
    url: 'https://leetcode.com/Tarun_V28',
    iconUrl: 'https://cdn.simpleicons.org/leetcode',
    color: 'rgba(255, 161, 22, 0.3)',
  },
  {
    platform: 'Codeforces',
    username: 'Tarunvoff',
    url: 'https://codeforces.com/profile/Tarunvoff',
    iconUrl: 'https://cdn.simpleicons.org/codeforces',
    color: 'rgba(49, 151, 255, 0.3)',
  },
];

export default function CodingProfiles() {
  return (
    <section
      id="profiles"
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
              Coding Profiles
            </h2>
            <span
              className="text-sm font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Competitive Programming
            </span>
          </div>
          <p
            className="text-lg max-w-2xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Algorithm design and problem-solving across competitive platforms.
          </p>
        </ScrollFloat>
      </div>

      {/* Profiles */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          {PROFILES.map((profile, idx) => (
            <ScrollFloat key={idx}>
              <motion.a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Glass Slab */}
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{
                    background: 'rgba(26, 26, 36, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(42, 42, 58, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 36, 0.75)';
                    e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 36, 0.6)';
                    e.currentTarget.style.borderColor = 'rgba(42, 42, 58, 0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Spotlight glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${profile.color} 0%, transparent 60%)`,
                      transition: 'opacity 0.3s ease',
                    }}
                  />

                  <div className="relative p-8 flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-6">
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-xl"
                        style={{
                          background: 'rgba(42, 42, 58, 0.5)',
                          border: '1px solid rgba(42, 42, 58, 0.8)',
                        }}
                      >
                        {profile.iconUrl ? (
                          <img
                            src={profile.iconUrl}
                            alt={`${profile.platform} logo`}
                            className="w-10 h-10 object-contain"
                            style={{ filter: 'grayscale(100%) brightness(0.7)' }}
                          />
                        ) : (
                          <div className="text-3xl">{profile.platform[0]}</div>
                        )}
                      </div>

                      {/* Center: Platform & Username */}
                      <div className="flex flex-col gap-1">
                        <div
                          className="text-sm font-mono uppercase tracking-wider"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {profile.platform}
                        </div>
                        <div
                          className="text-2xl font-semibold"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {profile.username}
                        </div>
                      </div>
                    </div>

                    {/* Right: View Profile Arrow */}
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: 'var(--color-text-secondary)',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }}
                      >
                        View Profile
                      </span>
                      <svg
                        className="w-5 h-5"
                        style={{
                          color: 'var(--color-text-tertiary)',
                          transition: 'transform 0.2s ease, color 0.2s ease',
                        }}
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
