import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper:     '#f5ede0',
        canvas:    '#ebe1d0',
        fillSoft:  '#ece1cc',
        fill:      '#d8c4a8',
        ink:       '#3d2c1d',
        mute:      '#8a7560',
        line:      '#c9b69a',
        lineSoft:  '#d8c8b0',
        terra:     '#8a6a4a',
        terraSoft: '#c9a785',
        terraWash: '#e2d2bc',
        marron:    '#5a3f2c',
        marronDeep:'#3d2c1d',
        beige1:    '#e9dcc4',
        beige2:    '#d6c4a3',
        beige3:    '#bfa57f',
        beige4:    '#a4855e',
        beige5:    '#7d6041',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        display: '-0.025em',
      },
      borderRadius: {
        card: '6px',
      },
      maxWidth: {
        frame: '1200px',
        prose1: '440px',
        prose2: '720px',
        prose3: '960px',
      },
    },
  },
  plugins: [],
} satisfies Config;
