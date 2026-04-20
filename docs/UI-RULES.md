# ZAWIOS UI Rules — Light Royal System

5 règles non-négociables. Toute PR qui les viole est bloquée.

---

## 1 · SPACING — grille 8px stricte

Tout espace (padding, gap, margin) est un multiple de 8px.
`8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96`

- Sections horizontales: `py-12 md:py-16 lg:py-20`
- Container max-width: `640px` (content) · `1280px` (layout)
- Grilles: `gap-4` (16px) · `gap-6` (24px) · jamais de gap en px dur dans Tailwind

---

## 2 · RADIUS — cohérence par taille

| Usage           | Token       | Valeur |
|-----------------|-------------|--------|
| Tags / pills    | `--radius-sm` | 8px  |
| Cards / inputs  | `--radius`    | 12px |
| Modals / sheets | `--radius-lg` | 16px |
| CTA buttons     | `--radius-lg` | 16px |
| Badges          | `--radius-full` | 9999px |

Ne jamais mélanger `rounded-full` et `rounded-lg` dans le même composant.

---

## 3 · BORDERS — légers et cohérents

```css
border: 1px solid var(--border); /* #E6E9F2 — usage standard */
border: 1px solid var(--border2); /* hover / focus states */
```

- Jamais de `border-2` sur les cartes (trop lourd).
- Jamais de `outline` sans `focus-visible:`.
- Les dividers sont `border-t` uniquement (pas de `hr`).

---

## 4 · HOVER — subtil, pas de flash

```css
transition: all 150ms ease; /* durée standard */
```

Hover card:
- `background` → `var(--surface-alt)` (pas de couleur de marque)
- `border-color` → `var(--border2)`
- `box-shadow` → `var(--shadow-sm)`

Hover CTA Royal:
- `background` → `var(--primary-hover)` = `#142C8E`
- `transform: translateY(-1px)` — très discret, jamais `scale`

Interdit: changement de couleur de texte brutal, glow excessif, animations > 220ms sur hover.

---

## 5 · FOCUS — accessibilité garantie

Tout élément interactif doit avoir un focus ring visible:

```css
focus-visible:outline: 2px solid var(--primary);
focus-visible:outline-offset: 2px;
```

- `tabIndex={-1}` sur les éléments décoratifs uniquement.
- Tout bouton, lien, input, select: focus ring Royal Blue.
- Le `focus-visible` ne s'applique pas au `focus` (pas de ring au clic souris).
- touch targets minimum: `min-height: 44px` · `min-width: 44px`

---

## Rappel lexical

| Interdit         | Autorisé          |
|------------------|-------------------|
| `#000000`        | `var(--text)`     |
| `bg-gray-*`      | `var(--bg)`       |
| `text-blue-*`    | `var(--primary)`  |
| pari / mise / bet | signal / vote    |
| EN hardcodé      | `t('key')` FR/EN  |
