// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    cssPath: false,
  },
  i18n: {
    locales: [
      { code: 'nl', language: 'nl-NL', name: 'Nederlands', file: 'nl.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'nl',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    // set by NUXT_DATOCMS_CMA_TOKEN env variable
    datocmsCmaToken: '',
    // set by NUXT_DATOCMS_DRAFT_CONTENT_CDA_TOKEN env variable
    datocmsDraftContentCdaToken: '',
    // set by NUXT_SECRET_API_TOKEN env variable
    secretApiToken: '',
    // set by NUXT_SIGNED_COOKIE_JWT_SECRET env variable
    signedCookieJwtSecret: '',

    public: {
      // set by NUXT_PUBLIC_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN env variable
      datocmsPublishedContentCdaToken: '',
      // set by NUXT_PUBLIC_DRAFT_MODE_COOKIE_NAME env variable
      draftModeCookieName: '',
    },
  },
  routeRules: {
    // Add cors headers on API routes
    '/api/**': { cors: true },
  },
});
