<template>
  <div class="bcy-container">
    <el-input placeholder="输入网址" v-model="url">
      <template #prepend>Http://</template>
      <template #append>
        <el-button icon="el-icon-attract" @click="getBcy"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { BcyApi } from '@/api'

const prefix = 'https://'
export default defineComponent({
  name: 'Bcy',
  setup () {
    const url = ref('')

    // methods
    async function getBcy () {
      let urlVal = url.value
      if (!url.value.startsWith('http')) {
        urlVal = prefix + url.value
      }
      const reg = /^\w+[^\s]+(\.[^\s]+){1,}$/
      if (!reg.test(urlVal)) return
      const res = await BcyApi.getXiaoJieJie({ url })
      console.log(res)
    }

    return {
      url,
      getBcy,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.bcy-container {
  padding: 20px;
}
</style>
