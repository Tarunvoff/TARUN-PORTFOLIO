import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer
            className="relative py-16 px-6"
            style={{ borderTop: '1px solid var(--color-border-default)' }}
        >
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                {/* Social links */}
                <div className="flex items-center gap-6 mb-8">
                    <a
                        href="https://github.com/Tarunvoff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-lg transition-all duration-200"
                        style={{
                            color: 'var(--color-text-tertiary)',
                            border: '1px solid var(--color-border-default)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                            e.currentTarget.style.color = 'var(--color-text-primary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                            e.currentTarget.style.color = 'var(--color-text-tertiary)';
                        }}
                        aria-label="GitHub"
                    >
                        <Github size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/tarun-v-sece/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-lg transition-all duration-200"
                        style={{
                            color: 'var(--color-text-tertiary)',
                            border: '1px solid var(--color-border-default)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                            e.currentTarget.style.color = 'var(--color-text-primary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                            e.currentTarget.style.color = 'var(--color-text-tertiary)';
                        }}
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={18} />
                    </a>
                    <a
                        href="mailto:tarunvoff@gmail.com"
                        className="group p-3 rounded-lg transition-all duration-200"
                        style={{
                            color: 'var(--color-text-tertiary)',
                            border: '1px solid var(--color-border-default)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                            e.currentTarget.style.color = 'var(--color-text-primary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                            e.currentTarget.style.color = 'var(--color-text-tertiary)';
                        }}
                        aria-label="Email"
                    >
                        <Mail size={18} />
                    </a>
                </div>

                {/* Personal line */}
                <p className="text-sm italic mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                    still learning. still building. still shipping.
                </p>

                <p className="text-xs font-mono" style={{ color: 'var(--color-text-tertiary)', opacity: 0.5 }}>
                    © {new Date().getFullYear()} Tarun V
                </p>
            </div>
        </footer>
    );
}
