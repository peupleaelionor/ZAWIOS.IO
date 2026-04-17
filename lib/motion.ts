export const fadeUp = {
  initial:   { opacity: 0, y: 16 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] as const },
}

export const fadeIn = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.3, ease: 'easeOut' as const },
}

export const slideUp = {
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] as const },
}

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const staggerItem = {
  initial:    { opacity: 0, y: 12 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.0, 0.0, 0.2, 1] as const },
}

export const scaleIn = {
  initial:    { opacity: 0, scale: 0.96 },
  animate:    { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] as const },
}

export const viewportOnce = { once: true, margin: '-80px' }
