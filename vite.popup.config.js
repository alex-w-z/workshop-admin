import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { CRX_OUTDIR } from './globalConfig' 

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: CRX_OUTDIR,
  },
  server:{
    port: 3000,
    open: '/',
    //设置反向代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1/',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
})
