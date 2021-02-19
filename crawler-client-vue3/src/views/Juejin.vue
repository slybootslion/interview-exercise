<template>
  <div class="container">
    <UrlBar title="掘金" @goCrawler="getJuejin"/>
    <div class="content">
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import JuejinApi from '@/api/models/JuejinApi'
import UrlBar from '@/components/UrlBar'

export default defineComponent({
  name: 'Juejin',
  components: { UrlBar },
  setup () {
    const title = ref('')
    const content = ref('')

    async function getJuejin (url) {
      const res = await JuejinApi.getJuejin(url)
      console.log(res)
      title.value = res.title
      content.value = res.content
    }

    return {
      getJuejin,
      title,
      content,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
