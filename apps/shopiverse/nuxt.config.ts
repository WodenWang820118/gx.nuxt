import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';
import swc from 'unplugin-swc';

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
    typeCheck: false, // Disable type checking during dev to prevent file generation
    tsConfig: {
      extends: '../tsconfig.app.json', // Nuxt copies this string as-is to the `./.nuxt/tsconfig.json`, therefore it needs to be relative to that directory
      compilerOptions: {
        declaration: false,
        declarationMap: false,
        sourceMap: false,
        emitDeclarationOnly: false,
        noEmit: true
      }
    }
  },
  imports: {
    autoImport: true
  },

  css: ['~/assets/css/styles.scss'],

  vite: {
    plugins: [
      nxViteTsPaths(),
      swc.vite({
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true
          },
          target: 'es2021'
        }
      })
    ],
    optimizeDeps: {
      include: ['reflect-metadata']
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    }
  },
  modules: ['@nuxt/ui', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
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
    },
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
          'Cross-Origin-Embedder-Policy': 'unsafe-none'
        }
      }
    },
    rollupConfig: {
      plugins: [
        swc.rollup({
          jsc: {
            parser: {
              syntax: 'typescript',
              decorators: true
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true
            },
            target: 'es2021'
          }
        })
      ]
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          experimentalDecorators: true,
          emitDecoratorMetadata: true
        }
      }
    }
  },
  compatibilityDate: '2024-11-04',
  runtimeConfig: {
    // Private keys (only available server-side)
    databaseUrl: process.env.DATABASE_URL || '',
    nodeEnv: process.env.NODE_ENV || 'development',
    public: {
      loginUri:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4200'
          : 'https://gx-vue-shopiverse.vercel.app',
      googleClientId:
        '312492860184-lrraqf5544cq3vjc915booficli8ilp3.apps.googleusercontent.com',
      // Firebase configuration
      firebaseApiKey: 'AIzaSyB87I48tXzjVC3BiEdFfxPPcj9YsMldGcs',
      firebaseAuthDomain: 'shopiverse-1b323.firebaseapp.com',
      firebaseProjectId: 'shopiverse-1b323',
      firebaseStorageBucket: 'shopiverse-1b323.firebasestorage.app',
      firebaseMessagingSenderId: '706722258181',
      firebaseAppId: '1:706722258181:web:3a2ad6c75dc31b2c33eb6c',
      firebaseMeasurementId: 'G-Y4ZGFBHEPK'
    }
  }
});
