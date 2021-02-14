<template>
  <div class="app-container">
    <div class="nav">
      <el-menu default-active="1-1"
               class="el-menu-vertical"
               :collapse="isCollapse">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-star-off"></i>
            <span>zhihu</span>
          </template>
          <router-link to="/about">
            <el-menu-item index="1-1">专栏</el-menu-item>
          </router-link>
          <router-link to="/about">
            <el-menu-item index="1-2">问题</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/bcy">
          <el-menu-item index="2">
          <i class="el-icon-picture-outline"></i>
          <template #title>
            bcy
          </template>
          </el-menu-item>
        </router-link>
        <router-link to="/about">
          <el-menu-item index="99">
          <i class="el-icon-chat-dot-square"></i>
          <template #title>
            关于
          </template>
          </el-menu-item>
        </router-link>
      </el-menu>
      <div class="arrow-content" @click="checkType">
        <span :class="isCollapse?'el-icon-right' : 'el-icon-back'"/>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    const isCollapse = ref(true)

    function checkType () {
      isCollapse.value = !isCollapse.value
    }

    return {
      isCollapse,
      checkType,
    }
  },
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.app-container {
  height: 100%;
  display: flex;
}

.nav {
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-menu-vertical {
    flex: 1;
  }

  .arrow-content {
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    background-color: #ededed;
  }
}

.content {
  flex: 1;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
