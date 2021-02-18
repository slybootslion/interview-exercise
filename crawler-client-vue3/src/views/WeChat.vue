<template>
  <div class="container">
    <UrlBar title="微信" @goCrawler="getWeChat"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import UrlBar from '@/components/UrlBar'

export default defineComponent({
  name: 'WeChat',
  components: { UrlBar },
  setup () {
    function getWeChat (url) {
      console.log(url)
    }

    return {
      getWeChat,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
