<script setup>

import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import _stor from "../storage"
import { useMessage } from 'naive-ui'
let message = useMessage();
const storage = _stor();
let router = useRouter();


const loginInfo = ref({
  uid: "cola_rexp",
  password: ""
})
function requestLogin() {
  storage.handleLogin(loginInfo.value,
    response => {
      console.log("callingback",response)
      if(response.status>=200&&response.status<400){message.success("欢迎回来")

      router.go(-1);}
      else{
        
        if(response.status===404)message.error("没找着，你换个号")
        else if(response.status===400)message.error("错了错了，多找找自己的原因")
      }
    })
}

let tov = {
  "Form": {
    "labelFontSizeTopMedium": "9px"
  }
}
onMounted(() => { storage.switchHeader() })
onUnmounted(() => { storage.switchHeader() })
</script>
<template>
  <n-space align="center" vertical :themeOverrides="tov">
    <n-avatar class="deAvatar"><n-image width="48" alt="图片路径相关" /></n-avatar>
    <div class="signinsign"> Sign in</div>
    <n-form class="deForm" label-placement="top" :model="loginInfo">
      <n-form-item label="用户ID" path="username">
        <n-input size="large" v-model:value="loginInfo.uid"></n-input></n-form-item>
      <n-form-item>
        <n-input size="large" v-model:value="loginInfo.password"></n-input></n-form-item>
      <n-form-item>
        <n-button @click="requestLogin" style="margin:0 auto">登录</n-button>
      </n-form-item>


    </n-form>
  </n-space>
</template>
<style scoped>
.signinsign {
  height: 36px;
  font-size: 18pt;
  font-size: 100;
}

.deAvatar {
  width: 48px;
  height: 48px;
  margin-top: 32px;
  margin-bottom: 24px;
}

.deForm {
  min-width: 248px;
  min-height: 184px;
  border: 2px rgba(92, 92, 92, 0.704) solid;
  border-radius: 4px;
  background-color: rgba(246, 248, 250, 0.836);
  padding: 24px;
}
</style>