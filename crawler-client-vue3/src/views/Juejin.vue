<template>
  <div class="container">
    <h1 class="page-title">掘金文章获取</h1>
    <el-input placeholder="输入网址" v-model="url">
      <template #prepend>Http://</template>
      <template #append>
        <el-button icon="el-icon-attract" @click="getJuejin"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import checkUrl from '@/views/hook/checkUrl'
import JuejinApi from '@/api/models/JuejinApi'

export default defineComponent({
  name: 'Juejin',
  setup () {
    const url = ref('https://juejin.cn/post/6908502083075325959')

    async function getJuejin () {
      const urlValue = url.value
      if (!checkUrl(urlValue)) return false
      const res = await JuejinApi.getJuejin(urlValue)
      console.log(res)
    }

    return {
      url,
      getJuejin,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  padding: 20px;

  .page-title {
    margin-bottom: 20px;
    font-size: 28px;
  }
}
</style>
