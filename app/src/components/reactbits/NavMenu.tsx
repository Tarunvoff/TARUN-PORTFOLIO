import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './NavMenu.css';

export interface NavMenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}

export interface NavMenuSocialItem {
    label: string;
    link: string;
}

export interface NavMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: NavMenuItem[];
    socialItems?: NavMenuSocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoUrl?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    changeMenuColorOnOpen?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    isFixed?: boolean;
    onNavigate?: (link: string) => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({
    position = 'right',
    colors = ['#B19EEF', '#5227FF'],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    className,
    menuButtonColor = '#fff',
    openMenuButtonColor = '#fff',
    changeMenuColorOnOpen = true,
    accentColor = '#5227FF',
    isFixed = false,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose,
    onNavigate
}: NavMenuProps) => {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);
    const line1Ref = useRef<HTMLSpanElement | null>(null);
    const line2Ref = useRef<HTMLSpanElement | null>(null);
    const line3Ref = useRef<HTMLSpanElement | null>(null);
    const iconRef = useRef<HTMLSpanElement | null>(null);

    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Tween | null>(null);
    const spinTweenRef = useRef<gsap.core.Tween | null>(null);
    const colorTweenRef = useRef<gsap.core.Tween | null>(null);
    const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
    const busyRef = useRef(false);
    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;
            const l1 = line1Ref.current;
            const l2 = line2Ref.current;
            const l3 = line3Ref.current;
            if (!panel || !l1 || !l2 || !l3) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(preContainer.querySelectorAll('.nm-prelayer')) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === 'left' ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen });
            gsap.set(l1, { transformOrigin: '50% 50%', y: 0, rotate: 0 });
            gsap.set(l2, { transformOrigin: '50% 50%', opacity: 1 });
            gsap.set(l3, { transformOrigin: '50% 50%', y: 0, rotate: 0 });
            if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
        });
        return () => ctx.revert();
    }, [menuButtonColor, position]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }
        itemEntranceTweenRef.current?.kill();

        const itemEls = Array.from(panel.querySelectorAll('.nm-panel-itemLabel')) as HTMLElement[];
        const numberEls = Array.from(
            panel.querySelectorAll('.nm-panel-list[data-numbering] .nm-panel-item')
        ) as HTMLElement[];
        const socialTitle = panel.querySelector('.nm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.nm-socials-link')) as HTMLElement[];

        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (itemEls.length) {
            gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        if (numberEls.length) {
            gsap.set(numberEls, { '--nm-num-opacity': 0 });
        }
        if (socialTitle) {
            gsap.set(socialTitle, { opacity: 0 });
        }
        if (socialLinks.length) {
            gsap.set(socialLinks, { y: 25, opacity: 0 });
        }

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
        });
        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;
        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        );

        if (itemEls.length) {
            const itemsStartRatio = 0.15;
            const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
            tl.to(
                itemEls,
                {
                    yPercent: 0,
                    rotate: 0,
                    duration: 1,
                    ease: 'power4.out',
                    stagger: { each: 0.1, from: 'start' }
                },
                itemsStart
            );
            if (numberEls.length) {
                tl.to(
                    numberEls,
                    {
                        duration: 0.6,
                        ease: 'power2.out',
                        '--nm-num-opacity': 1,
                        stagger: { each: 0.08, from: 'start' }
                    },
                    itemsStart + 0.1
                );
            }
        }

        if (socialTitle || socialLinks.length) {
            const socialsStart = panelInsertTime + panelDuration * 0.4;
            if (socialTitle) {
                tl.to(
                    socialTitle,
                    {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.out'
                    },
                    socialsStart
                );
            }
            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: 'power3.out',
                        stagger: { each: 0.08, from: 'start' },
                        onComplete: () => {
                            gsap.set(socialLinks, { clearProps: 'opacity' });
                        }
                    },
                    socialsStart + 0.04
                );
            }
        }

        openTlRef.current = tl;
        return tl;
    }, [position]);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback('onComplete', () => {
                busyRef.current = false;
            });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;
        itemEntranceTweenRef.current?.kill();

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all: HTMLElement[] = [...layers, panel];
        closeTweenRef.current?.kill();
        const offscreen = position === 'left' ? -100 : 100;
        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll('.nm-panel-itemLabel')) as HTMLElement[];
                if (itemEls.length) {
                    gsap.set(itemEls, { yPercent: 140, rotate: 10 });
                }
                const numberEls = Array.from(
                    panel.querySelectorAll('.nm-panel-list[data-numbering] .nm-panel-item')
                ) as HTMLElement[];
                if (numberEls.length) {
                    gsap.set(numberEls, { '--nm-num-opacity': 0 });
                }
                const socialTitle = panel.querySelector('.nm-socials-title') as HTMLElement | null;
                const socialLinks = Array.from(panel.querySelectorAll('.nm-socials-link')) as HTMLElement[];
                if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
                if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
                busyRef.current = false;
            }
        });
    }, [position]);

    const animateIcon = useCallback((opening: boolean) => {
        const l1 = line1Ref.current;
        const l2 = line2Ref.current;
        const l3 = line3Ref.current;
        if (!l1 || !l2 || !l3) return;
        spinTweenRef.current?.kill();
        if (opening) {
            // Hamburger → X
            gsap.to(l1, { y: 6, rotate: 45, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
            gsap.to(l2, { opacity: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
            gsap.to(l3, { y: -6, rotate: -45, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
        } else {
            // X → Hamburger
            gsap.to(l1, { y: 0, rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
            gsap.to(l2, { opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: 'auto', delay: 0.1 });
            gsap.to(l3, { y: 0, rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
        }
    }, []);

    const animateColor = useCallback(
        (opening: boolean) => {
            const btn = toggleBtnRef.current;
            if (!btn) return;
            colorTweenRef.current?.kill();
            if (changeMenuColorOnOpen) {
                const targetColor = opening ? openMenuButtonColor : menuButtonColor;
                colorTweenRef.current = gsap.to(btn, {
                    color: targetColor,
                    delay: 0.18,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.set(btn, { color: menuButtonColor });
            }
        },
        [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
    );

    React.useEffect(() => {
        if (toggleBtnRef.current) {
            if (changeMenuColorOnOpen) {
                const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
                gsap.set(toggleBtnRef.current, { color: targetColor });
            } else {
                gsap.set(toggleBtnRef.current, { color: menuButtonColor });
            }
        }
    }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

    // No text animation needed — hamburger icon only
    const animateText = useCallback((_opening: boolean) => {
        // no-op: removed text cycling in favor of icon-only toggle
    }, []);

    const toggleMenu = useCallback(() => {
        const target = !openRef.current;
        openRef.current = target;
        setOpen(target);
        if (target) {
            onMenuOpen?.();
            playOpen();
        } else {
            onMenuClose?.();
            playClose();
        }
        animateIcon(target);
        animateColor(target);
        animateText(target);
    }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

    const closeMenu = useCallback(() => {
        if (openRef.current) {
            openRef.current = false;
            setOpen(false);
            onMenuClose?.();
            playClose();
            animateIcon(false);
            animateColor(false);
            animateText(false);
        }
    }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

    const handleItemClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        closeMenu();
        // Delay navigation slightly so close animation starts
        setTimeout(() => {
            if (onNavigate) {
                onNavigate(link);
            } else if (link.startsWith('#')) {
                const el = document.querySelector(link);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = link;
            }
        }, 350);
    }, [closeMenu, onNavigate]);

    React.useEffect(() => {
        if (!closeOnClickAway || !open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                toggleBtnRef.current &&
                !toggleBtnRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeOnClickAway, open, closeMenu]);

    return (
        <div
            className={(className ? className + ' ' : '') + 'nav-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
            style={accentColor ? { ['--nm-accent' as string]: accentColor } : undefined}
            data-position={position}
            data-open={open || undefined}
        >
            <div ref={preLayersRef} className="nm-prelayers" aria-hidden="true">
                {(() => {
                    const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
                    let arr = [...raw];
                    if (arr.length >= 3) {
                        const mid = Math.floor(arr.length / 2);
                        arr.splice(mid, 1);
                    }
                    return arr.map((c, i) => <div key={i} className="nm-prelayer" style={{ background: c }} />);
                })()}
            </div>

            {/* Hamburger toggle button */}
            <button
                ref={toggleBtnRef}
                className="nm-toggle"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="nav-menu-panel"
                onClick={toggleMenu}
                type="button"
            >
                <span ref={iconRef} className="nm-hamburger" aria-hidden="true">
                    <span ref={line1Ref} className="nm-hamburger-line" />
                    <span ref={line2Ref} className="nm-hamburger-line" />
                    <span ref={line3Ref} className="nm-hamburger-line" />
                </span>
            </button>

            <aside id="nav-menu-panel" ref={panelRef} className="nav-menu-panel" aria-hidden={!open}>
                <div className="nm-panel-inner">
                    <ul className="nm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
                        {items && items.length ? (
                            items.map((it, idx) => (
                                <li className="nm-panel-itemWrap" key={it.label + idx}>
                                    <a
                                        className="nm-panel-item"
                                        href={it.link}
                                        aria-label={it.ariaLabel}
                                        data-index={idx + 1}
                                        onClick={(e) => handleItemClick(e, it.link)}
                                    >
                                        <span className="nm-panel-itemLabel">{it.label}</span>
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li className="nm-panel-itemWrap" aria-hidden="true">
                                <span className="nm-panel-item">
                                    <span className="nm-panel-itemLabel">No items</span>
                                </span>
                            </li>
                        )}
                    </ul>
                    {displaySocials && socialItems && socialItems.length > 0 && (
                        <div className="nm-socials" aria-label="Social links">
                            <h3 className="nm-socials-title">Socials</h3>
                            <ul className="nm-socials-list" role="list">
                                {socialItems.map((s, i) => (
                                    <li key={s.label + i} className="nm-socials-item">
                                        <a href={s.link} target="_blank" rel="noopener noreferrer" className="nm-socials-link">
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default NavMenu;
