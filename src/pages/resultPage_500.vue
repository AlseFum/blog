<script setup>
import {useRouter} from 'vue-router'
let router=useRouter();
function backtomainpage() {
    router.push("/")
}
</script>
<template>

  <n-result
    status="500"
    title="500 服务器错误"
    description="服务器出错可能说明该雇更多程序员了"
  >
    <template #footer>
      <n-button @click="backtomainpage">散财消灾</n-button>
    </template>
  </n-result>

</template>
<style scoped>

</style>