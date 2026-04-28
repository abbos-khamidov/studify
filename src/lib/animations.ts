/** GSAP presets */
export const EASE_OUT = "power3.out";
export const EASE_IN_OUT = "power2.inOut";
export const DURATION_FAST = 0.6;
export const DURATION_NORMAL = 1.0;
export const DURATION_SLOW = 1.4;
export const STAGGER_DEFAULT = 0.08;

export const easeOut = [0.16, 1, 0.3, 1];
export const easeInOut = [0.33, 1, 0.68, 1];

export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.normal, ease: easeOut } },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: easeOut } },
};
