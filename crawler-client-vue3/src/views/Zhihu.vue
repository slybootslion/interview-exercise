<template>
  <div class="container">
    <el-input placeholder="输入网址" v-model="url">
      <template #prepend>Http://</template>
      <template #append>
        <el-button icon="el-icon-attract" @click="getZhihu"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import checkUrl from '@/components/hook/checkUrl'

export default defineComponent({
  name: 'Zhihu',
  setup () {
    const route = useRoute()
    const url = ref('')
    const type = ref('zl')

    watchEffect(() => {
      type.value = route.params.type
    })

    function getZhihu () {
      const urlType = type.value
      if (!checkUrl(url.value)) return false
    }

    return {
      url,
      getZhihu,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  padding: 20px;
}
</style>
