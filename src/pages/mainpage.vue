<script setup>


import postDigest from '../components/postDigest.vue'
import { onMounted, computed } from 'vue';
import { fpost } from "../request"
import { PencilOutline } from '@vicons/ionicons5';
import _stor from '../storage'



const storage = _stor();
const postsToDisplay = computed(() => {
  let ptd = Array.from(storage.cachedPosts.values());
  return ptd;
})



// import { useMessage } from 'naive-ui/es/message';

// let message = useMessage();
// onMounted(() => {
 
// })



</script>
<template>
  <!-- <div style="position:fixed;bottom:80px;right:20%;width:40px;padding:20px;border-radius:50%;color:black;z-index:3"
    id="affix" @click="message.info('还没做好，等等', { closable: true, duration: 3000 })">
    <PencilOutline />
  </div> -->

  <n-layout has-sider sider-placement="right" position="absolute">

    <n-layout-content style="padding-left:60px;overflow-y: hidden;" :native-scrollbar="false">
      <TransitionGroup>
        <postDigest v-for="(i, index) in postsToDisplay" 
        :content="i.content" :sub_title="i.pid" 
        :title="i.title" :key="index"
          @clicked-title="() => { $router.push('/post/' + i.pid) }"  />
      </TransitionGroup>
    </n-layout-content>

    <n-layout-sider bordered content-style="padding: 24px;">
      <n-space vertical justify="end" style="height:100%;">
        <router-link to="/write"><div>
          <n-icon size="48"><PencilOutline/></n-icon><span style="font-size:30px;">整点？</span></div>
        </router-link>
        <n-space justify="center"><a style="font-size:8px" title="还没上线">联系我们</a></n-space>
      </n-space>
    </n-layout-sider>

  </n-layout>
</template>
<style scoped>
#affix {
  box-shadow: 0px 10px 15px -3px rgba(35, 35, 35, 0.326);
}

.v-enter-active,
.v-leave-active:nth-child(1) {
  transition: opacity 0.2s ease;
}

.v-leave-active:nth-child(2) {
  transition: opacity 0.3s ease;
}

.v-leave-active:nth-child(3) {
  transition: opacity 0.4s ease;
}

.v-leave-active:nth-child(4) {
  transition: opacity 0.5s ease;
}

.v-leave-active:nth-child(5) {
  transition: opacity 0.6s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}</style>