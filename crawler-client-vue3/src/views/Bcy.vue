<template>
  <div class="bcy-container">
    <h1 class="page-title">bcy</h1>
    <el-input placeholder="输入网址" v-model="url">
      <template #prepend>Http://</template>
      <template #append>
        <el-button icon="el-icon-attract" @click="getBcy"></el-button>
      </template>
    </el-input>
    <div class="pic-content" v-if="picList.length">
      <div class="click-all">
        <el-checkbox v-model="checkAll"
                     @change="handleCheckAllChange">全选
        </el-checkbox>
        <el-button size="small" @click="downloadPic">下载选中</el-button>
      </div>
      <div class="pic-box">
        <el-checkbox-group v-model="selectList"
                           @change="handleCheckPic">
          <div class="pic-item" v-for="pic in picList" :key="pic">
            <el-checkbox :label="pic">{{}}</el-checkbox>
            <el-image
              style="width: 100px; height: 100px"
              :src="pic"
              fit="scale-down"
              :preview-src-list="picList">
            </el-image>
          </div>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { BcyApi } from '@/api'
import checkUrl from '@/views/hook/checkUrl'

export default defineComponent({
  name: 'Bcy',
  setup () {
    const url = ref('')
    const picList = ref([])
    const selectList = ref([])
    const checkAll = ref(true)

    // methods
    async function getBcy () {
      if (!checkUrl(url.value)) return
      const res = await BcyApi.getXiaoJieJie({ url: url.value })
      selectList.value = picList.value = res
    }

    function handleCheckAllChange (val) {
      selectList.value = val ? picList.value : []
    }

    function handleCheckPic (value) {
      const checkedCount = value.length
      checkAll.value = checkedCount === picList.value.length
    }

    function download (url) {
      const x = new XMLHttpRequest()
      x.open('GET', url, true)
      x.responseType = 'blob'
      x.onload = function () {
        const url = window.URL.createObjectURL(x.response)
        const a = document.createElement('a')
        a.href = url
        a.download = ''
        a.click()
      }
      x.send()
    }

    function downloadPic () {
      // console.log(selectList.value)
      const pics = selectList.value.map(url => {
        if (url.includes('item') || url.includes('user')) {
          return 'https://img-bcy-qn.pstatp.com' + url.split('~tplv-banciyuan-w650')[0].split('img/banciyuan')[1]
        }
        return url.replace('~tplv-banciyuan-w650', '~noop')
      })
      // console.log(pics)
      for (let i = 0; i < pics.length; i++) {
        download(pics[i])
      }
      picList.value = []
    }

    return {
      url,
      getBcy,
      picList,
      checkAll,
      handleCheckAllChange,
      selectList,
      handleCheckPic,
      downloadPic,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.bcy-container {
  padding: 20px;

  .page-title {
    margin-bottom: 20px;
    font-size: 28px;
  }

  .pic-content {
    display: flex;
    flex-direction: column;

    .click-all {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
    }

    .pic-box {
      .el-checkbox-group {
        display: flex;
        flex-wrap: wrap;
      }

      .pic-item {
        margin: 0 10px 10px 0;
      }
    }
  }
}
</style>
