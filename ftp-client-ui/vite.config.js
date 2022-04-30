import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { AntDesignVueResolver, ElementPlusResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [NaiveUiResolver(), AntDesignVueResolver(), ElementPlusResolver()]
    })
  ]
})
