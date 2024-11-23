import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../../',
  srcDir: 'src',
  devtools: { enabled: true },
  devServer: {
    host: 'localhost',
    port: 4200
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      extends: '../tsconfig.app.json' // Nuxt copies this string as-is to the `./.nuxt/tsconfig.json`, therefore it needs to be relative to that directory
    }
  },
  imports: {
    autoImport: true
  },

  css: ['~/assets/css/styles.scss'],

  vite: {
    plugins: [nxViteTsPaths()]
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    'nuxt-security'
  ],
  // if not configuring the supabase redirect as false,
  // users cannot access the app without being authenticated
  supabase: {
    url: process.env.NUXT_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
    redirect: false
  },
  // TODO: cross origin opener google athentication
  security: {
    headers: {
      crossOriginResourcePolicy: 'cross-origin',
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      referrerPolicy: 'strict-origin-when-cross-origin'
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js'
        },
        {
          src: 'https://js.stripe.com/v3',
          defer: true
        },
        {
          src: 'https://accounts.google.com/gsi/client',
          async: true,
          defer: true
        }
      ]
    }
  },
  features: {
    devLogs: false
  },
  nitro: {
    preset: 'vercel',
    output: {
      dir: '../../.vercel/output'
    }
  },
  compatibilityDate: '2024-11-04',
  runtimeConfig: {
    public: {
      loginUri:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4200'
          : 'https://gx-nuxt-shopiverse.vercel.app',
      googleClientId:
        '312492860184-lrraqf5544cq3vjc915booficli8ilp3.apps.googleusercontent.com'
    }
  }
});
