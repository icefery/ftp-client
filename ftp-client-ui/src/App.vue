<template>
  <a-config-provider :locale="zhCN">
    <n-config-provider :hljs="hljs">
      <Layout />
    </n-config-provider>
  </a-config-provider>
</template>
<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)
</script>
