<script setup>
import s from '../storage'
</script>
<template>
  <span v-if="!s.currentUid">欢迎，{{ s().currentUserName }}</span><span v-else>
    啊哦，你怎么进来的？不管了，现在是示例界面
  </span>
  <n-tabs :key="type + placement" :type="type" animated :placement="'left'" :style="placement === 'left' || placement === 'right'
      ? { height: '240px' }
      : undefined
    ">
    <n-tab-pane name="oasis" tab="个人信息">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="设置">
      Hey Jude
    </n-tab-pane>

  </n-tabs>
</template>
<style scoped></style>