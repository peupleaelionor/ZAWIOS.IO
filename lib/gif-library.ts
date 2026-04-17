/**
 * ZAWIOS GIF Library — Curated collection organized by mood/category.
 * Uses Giphy embed URLs (no API key required for display).
 * Each GIF has a small preview (200px) and full-size URL.
 */

export interface GifItem {
  id: string
  title: string
  preview: string   // small/still preview
  url: string       // full animated GIF
  width: number
  height: number
}

export interface GifCategory {
  id: string
  label: string
  icon: string  // short descriptor
  gifs: GifItem[]
}

// ── Curated GIF collection ─────────────────────────────────────────────────
// Using Giphy media URLs (public CDN, no API key needed)
export const GIF_CATEGORIES: GifCategory[] = [
  {
    id: 'reactions',
    label: 'Reactions',
    icon: '⚡',
    gifs: [
      {
        id: 'g-mind-blown',
        title: 'Mind Blown',
        preview: 'https://media.giphy.com/media/xT0xeJpnrWC3XWblEk/200w.gif',
        url: 'https://media.giphy.com/media/xT0xeJpnrWC3XWblEk/giphy.gif',
        width: 480, height: 366,
      },
      {
        id: 'g-thinking',
        title: 'Thinking',
        preview: 'https://media.giphy.com/media/a5viI92PAF89q/200w.gif',
        url: 'https://media.giphy.com/media/a5viI92PAF89q/giphy.gif',
        width: 480, height: 360,
      },
      {
        id: 'g-interesting',
        title: 'Interesting',
        preview: 'https://media.giphy.com/media/l0MYJnJQ4EiYLxvQ4/200w.gif',
        url: 'https://media.giphy.com/media/l0MYJnJQ4EiYLxvQ4/giphy.gif',
        width: 480, height: 270,
      },
      {
        id: 'g-mic-drop',
        title: 'Mic Drop',
        preview: 'https://media.giphy.com/media/3o7qDSOvkaCl6TiIDe/200w.gif',
        url: 'https://media.giphy.com/media/3o7qDSOvkaCl6TiIDe/giphy.gif',
        width: 480, height: 480,
      },
      {
        id: 'g-shook',
        title: 'Shook',
        preview: 'https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/200w.gif',
        url: 'https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif',
        width: 480, height: 278,
      },
      {
        id: 'g-facepalm',
        title: 'Facepalm',
        preview: 'https://media.giphy.com/media/XsUtdIeJ0MWMo/200w.gif',
        url: 'https://media.giphy.com/media/XsUtdIeJ0MWMo/giphy.gif',
        width: 450, height: 254,
      },
    ],
  },
  {
    id: 'agree',
    label: 'Agree',
    icon: '✓',
    gifs: [
      {
        id: 'g-thumbs-up',
        title: 'Thumbs Up',
        preview: 'https://media.giphy.com/media/111ebonMs90YLu/200w.gif',
        url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
        width: 320, height: 240,
      },
      {
        id: 'g-yes',
        title: 'Yes!',
        preview: 'https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/200w.gif',
        url: 'https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif',
        width: 480, height: 360,
      },
      {
        id: 'g-nod',
        title: 'Nod',
        preview: 'https://media.giphy.com/media/gVoBC0SuaHStq/200w.gif',
        url: 'https://media.giphy.com/media/gVoBC0SuaHStq/giphy.gif',
        width: 300, height: 225,
      },
      {
        id: 'g-clapping',
        title: 'Clapping',
        preview: 'https://media.giphy.com/media/7rj2ZgttvgomY/200w.gif',
        url: 'https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif',
        width: 360, height: 200,
      },
      {
        id: 'g-exactly',
        title: 'Exactly',
        preview: 'https://media.giphy.com/media/1Z02vuppxP1Pa/200w.gif',
        url: 'https://media.giphy.com/media/1Z02vuppxP1Pa/giphy.gif',
        width: 480, height: 264,
      },
    ],
  },
  {
    id: 'disagree',
    label: 'Disagree',
    icon: '✗',
    gifs: [
      {
        id: 'g-no-way',
        title: 'No Way',
        preview: 'https://media.giphy.com/media/d10dMmzqCYqQ0/200w.gif',
        url: 'https://media.giphy.com/media/d10dMmzqCYqQ0/giphy.gif',
        width: 500, height: 253,
      },
      {
        id: 'g-nope',
        title: 'Nope',
        preview: 'https://media.giphy.com/media/spfi6nabVuq5y/200w.gif',
        url: 'https://media.giphy.com/media/spfi6nabVuq5y/giphy.gif',
        width: 384, height: 239,
      },
      {
        id: 'g-doubt',
        title: 'Doubt',
        preview: 'https://media.giphy.com/media/l3q2K5jinAlChoCLS/200w.gif',
        url: 'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif',
        width: 480, height: 264,
      },
      {
        id: 'g-side-eye',
        title: 'Side Eye',
        preview: 'https://media.giphy.com/media/ANbD1CCdA6gTK/200w.gif',
        url: 'https://media.giphy.com/media/ANbD1CCdA6gTK/giphy.gif',
        width: 500, height: 213,
      },
    ],
  },
  {
    id: 'celebrate',
    label: 'Celebrate',
    icon: '★',
    gifs: [
      {
        id: 'g-party',
        title: 'Party',
        preview: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/200w.gif',
        url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
        width: 480, height: 366,
      },
      {
        id: 'g-confetti',
        title: 'Confetti',
        preview: 'https://media.giphy.com/media/g9582DNuQppxC/200w.gif',
        url: 'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
        width: 480, height: 264,
      },
      {
        id: 'g-dance',
        title: 'Dance',
        preview: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/200w.gif',
        url: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
        width: 480, height: 366,
      },
      {
        id: 'g-fireworks',
        title: 'Fireworks',
        preview: 'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/200w.gif',
        url: 'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif',
        width: 480, height: 480,
      },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    icon: '◆',
    gifs: [
      {
        id: 'g-charts',
        title: 'Charts Going Up',
        preview: 'https://media.giphy.com/media/JtBZm3Getg3dqxK60a/200w.gif',
        url: 'https://media.giphy.com/media/JtBZm3Getg3dqxK60a/giphy.gif',
        width: 480, height: 270,
      },
      {
        id: 'g-calculate',
        title: 'Calculating',
        preview: 'https://media.giphy.com/media/APqEbxBsVlkWSuFpth/200w.gif',
        url: 'https://media.giphy.com/media/APqEbxBsVlkWSuFpth/giphy.gif',
        width: 480, height: 400,
      },
      {
        id: 'g-stonks',
        title: 'Stonks',
        preview: 'https://media.giphy.com/media/YnkMcHgNIMW4Yfber1/200w.gif',
        url: 'https://media.giphy.com/media/YnkMcHgNIMW4Yfber1/giphy.gif',
        width: 480, height: 480,
      },
      {
        id: 'g-brain-expand',
        title: 'Big Brain',
        preview: 'https://media.giphy.com/media/d3mlE7uhX8KFgEmY/200w.gif',
        url: 'https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif',
        width: 480, height: 264,
      },
    ],
  },
  {
    id: 'waiting',
    label: 'Waiting',
    icon: '◷',
    gifs: [
      {
        id: 'g-popcorn',
        title: 'Popcorn',
        preview: 'https://media.giphy.com/media/pUeXcg80cO8I8/200w.gif',
        url: 'https://media.giphy.com/media/pUeXcg80cO8I8/giphy.gif',
        width: 400, height: 225,
      },
      {
        id: 'g-waiting',
        title: 'Waiting',
        preview: 'https://media.giphy.com/media/tXL4FHPSnVJ0A/200w.gif',
        url: 'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif',
        width: 500, height: 282,
      },
      {
        id: 'g-clock',
        title: 'Tick Tock',
        preview: 'https://media.giphy.com/media/3oriO04qxVReM5rJEA/200w.gif',
        url: 'https://media.giphy.com/media/3oriO04qxVReM5rJEA/giphy.gif',
        width: 480, height: 269,
      },
      {
        id: 'g-lets-see',
        title: "Let's See",
        preview: 'https://media.giphy.com/media/l4FGuhL4U2WSOXsmI/200w.gif',
        url: 'https://media.giphy.com/media/l4FGuhL4U2WSOXsmI/giphy.gif',
        width: 480, height: 271,
      },
    ],
  },
]

/** Get all GIFs flattened */
export function getAllGifs(): GifItem[] {
  return GIF_CATEGORIES.flatMap((c) => c.gifs)
}

/** Search GIFs by title (case-insensitive) */
export function searchGifs(query: string): GifItem[] {
  const q = query.toLowerCase().trim()
  if (!q) return getAllGifs()
  return getAllGifs().filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      GIF_CATEGORIES.find((c) => c.gifs.some((gg) => gg.id === g.id))?.label.toLowerCase().includes(q),
  )
}
