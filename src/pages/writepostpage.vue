<script setup>

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { watch, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
let router = useRouter()
import _stor from "../storage"
let storage = _stor();

let content = ""
let previewOrNot = false;

let default_title = computed(() => {
    const timeNow = new Date();
    return `${storage.currentUserName}于${timeNow.getFullYear()}年${timeNow.getMonth() + 1}月${timeNow.getDate()}日`
})
import { submitPost } from "../request"
let titleRef = ref()
onMounted(() => storage.switchHeader())
onUnmounted(() => storage.switchHeader())
function trysubmit() {
    let info = {
        fromUser: storage.currentUid,
        authorId: storage.currentUid,
        content,
        title: titleRef.value.value ?? default_title.value,
    };
    console.log("submitpost:", info)
    submitPost(info, i => {
        console.log("sp func callback:i:", i);
        setTimeout(() => { router.push('/post/' + i.pid) }, 10)
        storage.init();

    })
}
</script>
<template>
    <n-layout position="absolute">
        <n-layout-content :native-scrollbar="false" style="color:white;
            min-width:60%;
            min-height:20em;
            left:50%;
            transform:translateX(-50%);
            position:absolute;
            overflow-y: auto;
            top:10%;
            padding:var(--gpadding);
            border:1px red solid
            ">
            <n-form>
                <n-form-item label="标题">
                    <n-input ref="titleRef" :placeholder="default_title"></n-input>
                </n-form-item>
            </n-form>
            <n-space justify="end"><n-button @click="trysubmit">提交</n-button></n-space>
            <quill-editor theme="snow" v-model:content="content" content-type="html"
                style="min-height:15rem;max-height:40rem;overflow-y:auto"></quill-editor>
        </n-layout-content>

        <!-- <div  style="position: fixed;left:50%;z-index:334;bottom:15%;transform:translateX(-50%)">
            <n-button style="background-color: var(--primary200);color:var(--text)"
                @click="console.log(content)">翻一下</n-button>
        </div> -->
    </n-layout>
</template>
<style scoped>
.ql-editor {
    height: 400px;
    /* 调整高度 */
    width: 100%;
    /* 调整宽度 */
}
</style>