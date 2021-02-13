/*! *****************************************************************************
vite 配置
***************************************************************************** */
import { defineConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
const AliasList = [
  'assets',
  'components',
  'constant',
  'hooks',
  'interface',
  'layout',
  'pages',
  'router',
  'share',
  'store',
  'styles',
  'utils'
]
export default defineConfig({
  base: './',
  resolve: {
    alias: AliasList.reduce((prev, cur) => {
      prev[`@${cur}`] = join(__dirname, `src/${cur}`)
      return prev
    }, {})
  },
  // define: {},
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/var.scss";'
      }
    }
  },
  // esbuild
  // assetsInclude
  server: {
    // port: +process.env.PORT
  },
  build: {
    target: 'esnext'
  },
  optimizeDeps: {}
  // dedupe:[],
  // logLevel
})
