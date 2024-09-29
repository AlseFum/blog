<script setup>

import _stor from '../storage'
let storage = _stor()
import { useRoute } from 'vue-router';
let route = useRoute();

import { onMounted, computed, ref } from 'vue';

let requiringUid = computed(() => {
  let n = decodeURIComponent(route.path).substring(1);
  return n[0] === "@" ? n.substring(1) : false;
})

let currentUser = ref(storage.getUser(requiringUid.value));

onMounted(() => {
  storage.getUser(requiringUid.value, i => {
    currentUser.value = i;
  });


})
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
let text = "";
import postDigest from '../components/postDigest.vue';

</script>
<template>
  <n-result v-if="requiringUid === false" status="404" title="你是不是输错地址了" description="用户名得用‘@’打头">
    <template #footer>
      <n-button>找点乐子吧</n-button>
    </template>
  </n-result>
  <n-result v-else-if="!currentUser?.uid" title="你要找的用户不存在">
    <template #footer>
      <n-button>找点乐子吧</n-button>
    </template></n-result>
  <div v-else class="userContent"
    style="background-color: rgb(100, 100, 100);height:100%;box-shadow: 0px 10px 22px 8px rgba(255,255,255,0.2);">
    <div style="width:25%;float:left;margin:12px">
      <div style="height:30px;"></div>
      <n-space vertical align="start" :wrap-item="false">
        <div style="width:120px;height:120px;border-radius: 50%;align-self:stretch;background-color: rgb(157, 157, 157);
  
  ">
          我的图图！
        </div>
        <div><n-h4>NICKNAME</n-h4>
          Id</div>

        <div style="margin-top: 24px;">
          <n-grid cols="3">
            <n-gi v-for="i in 8"> <n-button>你好啊</n-button></n-gi>
          </n-grid>

        </div>
      </n-space>

    </div>
    <div style="width:70%;height:100%;float:right;margin:12px;">

      <n-h2>这家伙干了什么！</n-h2>
      <n-space style="width:100%;height:100%;overflow: scroll;" vertical>
        <postDigest v-for="i in currentUser.postsID" style="width:100%;">{{ i }}</postDigest>
      </n-space>
    </div>
    <!-- <n-thing content-indent="true">
      <template #avatar>
        <n-avatar>
          touxi
        </n-avatar>
      </template>
      <template #header><span style="font-size:large">{{ currentUser?.uid }}</span>&nbsp;
        <span style="font-size: small;">这里再来个用户签名 </span></template>
        <template #description>犯罪履历自陈</template>
        <ul ref="postslist">
      <li>这里应该有遍历user的作品</li>
      <li v-for="i in currentUser?.postsId ?? currentUser?.postsID">
      <router-link :to="'/post/'+i">  {{ i }}</router-link>
      </li>
    </ul>
    </n-thing>
    
    给他留个言？
    <MdEditor style="max-width: 70%;max-height:200px;margin:0 auto" preview="false" v-model="text" />
    <n-space justify="end">d<n-button @click="console.log(text)" >提交！</n-button></n-space>
     -->
  </div>
</template>
<style scoped>
.userContent {
  min-width: 70%;
  max-width: 80%;
  margin: 0 auto;

}
</style>