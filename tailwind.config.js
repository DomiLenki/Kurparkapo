/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { sm: '560px', md: '820px', lg: '1020px', xl: '1400px' },
    extend: {
      colors: {
        papier: 'var(--papier)', flaeche: 'var(--flaeche)', schwarz: 'var(--schwarz)', leise: 'var(--leise)',
        rot: 'var(--rot)', gelb: 'var(--gelb)', gruen: 'var(--gruen)', blau: 'var(--blau)', rosa: 'var(--rosa)',
        feld: 'var(--feld)', tinte: 'var(--tinte)',
      },
      borderRadius: { feld: 'var(--r)' },
    },
  },
  plugins: [],
}
