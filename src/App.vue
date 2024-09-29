<script setup>
import headerItem1 from './components/headerItem1.vue';
import { PersonCircle, Search } from '@vicons/ionicons5'

import { useRouter,useRoute } from 'vue-router'
let router = useRouter(),route=useRoute();

import _storage from "./storage"
let storage = _storage();
import { onMounted, computed ,ref} from "vue";


const debug1=ref(false)

const userOptions = computed(() => [
  {
    label: storage.currentUserName ?? "登录",
    key: storage.currentUserName ? "headIcon" : "login"
  },
  { label: "个人档案", key: "profile" },
  { label: "登出", key: "logout" }])

function handleSelect(n) {

  userOptions.forceKey = 2;
  if (n === "profile") router.push('/profile');
  else if (n === "logout") { storage.handleLogout(() => router.replace("/")) }
  else if (n === "headIcon") { router.push('/@' + storage.currentUid) }
  else if (n === "login") { router.push('/login') }
}


import { checkConnection } from './request';

onMounted(() => checkConnection(f => 0, () => console.error("Server unconnected.Check it please.")));

// import {theme as themeOverrides} from './style.theme.js'
import {theme as themeOverrides} from './style.theme.js'
import { darkTheme } from 'naive-ui';

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <n-message-provider>
      <n-layout position="absolute">
        <Transition>
          <n-layout-header  style="height:10%;min-height:48px;"
            v-if="!storage.hideHeader">
            <n-space justify="space-around" align="center" style="height:100%;">
              <n-icon @click="() => { router.push('/') }" title="返回首页"><img src="/src/assets/SHOUYE.jpg"
                  style="height:32px;" alt="emmm"></n-icon>
              <n-space>
                <headerItem1 @click="debug1=!debug1">官方新闻</headerItem1>
                <headerItem1>花边资讯</headerItem1>
                
                <headerItem1>:::{{ route.path }}</headerItem1>
                <headerItem1>[placeholder]</headerItem1>
                <n-input round placeholder="搜索暂不可用" id="search" style="margin: var(--gmargin);text-align: center;">
                  <template #suffix>
                    <n-icon>
                      <Search />
                    </n-icon>
                  </template>
                </n-input>
              </n-space>

              <n-space>
                <headerItem1 @click="router.push('/register');" v-if="!storage.currentUid">来点注册</headerItem1>
                <headerItem1 @click="router.push('/login');" v-if="!storage.currentUid">来点登录</headerItem1>
                <headerItem1>
                  <n-dropdown trigger="hover" :options='userOptions' @select="handleSelect" ref="nd">
                    <n-space v-if="debug1">
                      <n-icon size="30px"><PersonCircle /></n-icon>
                      {{ storage.currentUserName }}
                    </n-space>
                    <n-avatar v-else>storage.currentUserAvatar</n-avatar>
                  </n-dropdown>
                </headerItem1>
              </n-space>
            </n-space>

            <!-- <div style="width:100%;position:absolute;height: 30px;background-color: rgb(191, 191, 191);">分割线</div> -->
          </n-layout-header>
        </Transition>
        <n-layout-content :style='{ height: storage.hideHeader ? "100%" : "85%" }' :native-scrollbar="true" v-if="!debug1">
          <RouterView></RouterView>
        </n-layout-content>

      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
n-layout-header {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
