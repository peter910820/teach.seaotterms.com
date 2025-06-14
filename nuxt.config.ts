// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/global.css", "~/assets/css/floatup.css", "~/assets/css/button.css"],
  app: {
    head: {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/wowjs@1.1.3/dist/wow.min.js",
          defer: true,
        },
        {
          src: "https://kit.fontawesome.com/8f1caa7fe1.js",
          crossorigin: "anonymous",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
          defer: true,
        },
        { src: "https://cdn.jsdelivr.net/npm/typed.js@2.0.12", defer: true },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/wowjs@1.1.3/css/libs/animate.min.css",
        },
      ],
    },
  },
});
