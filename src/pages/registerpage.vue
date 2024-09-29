<script setup>

import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import _stor from "../storage"
const storage = _stor();
let router = useRouter();
import { useMessage } from 'naive-ui';
const message=useMessage();
const loginInfo = ref({
  uid: "cola_rep",
  nickname:"假冒伪劣可乐",
  password: "b",
  checkpassword:"b"
})
import { fpost } from "../request/index.js"
function requestRegister() {

    if(!(loginInfo.value.password===loginInfo.value.checkpassword)){
        message.warning("密码不一样。",{closable:true,duration:3000})
    }else storage.handleRegister(loginInfo.value,()=>router.go(-1))}

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
    <div class="signinsign"> Register</div>
    <n-form class="deForm" label-placement="top" :model="loginInfo">
      <n-form-item label="用户ID" path="uid">
        <n-input size="large" v-model:value="loginInfo.uid"></n-input>
      </n-form-item>
        <n-form-item label="用户名" path="nickname">
        <n-input size="large" v-model:value="loginInfo.nickname"></n-input></n-form-item>
      <n-form-item>
        <n-input size="large" v-model:value="loginInfo.password"></n-input></n-form-item>
        <n-form-item>
        <n-input size="large" v-model:value="loginInfo.checkpassword"></n-input></n-form-item>
      <n-form-item>
        <n-button @click="requestRegister" style="margin:0 auto">登录</n-button>
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