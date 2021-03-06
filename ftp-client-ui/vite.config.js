import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import * as path from 'path'

const outDir = path.resolve(__dirname, '../build/ui')

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  build: {
    outDir,
    emptyOutDir: outDir
  }
})
