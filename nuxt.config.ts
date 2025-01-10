// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      githubToken: process.env.GITHUB_TOKEN,
      githubClientId: process.env.GITHUB_CLIENT_ID,
      githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  plugins: [
    '~/plugins/setGradientBackground.js',
    '~/plugins/directives.js',
    '~/plugins/merge-class.js',
    '~/plugins/Vue3Lottie.client.js',
    '~/plugins/websocket-server.js',
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.js' },
      { code: 'fr', name: 'Français', file: 'fr.js' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
  },
})
