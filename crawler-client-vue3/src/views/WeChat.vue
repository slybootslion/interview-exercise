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
    async function getWeChat (url) {
      // const driver = await SingleInstance.createDriver()
      // await driver.get(url)
      // await driver.quit()
    }

    return {
      getWeChat,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
