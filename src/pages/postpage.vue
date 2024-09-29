<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue';
import comm from '../components/comment1.vue'
import _stor from "../storage"
let storage = _stor();
let router = useRouter();

let post =      computed(() => storage.getPost(router.currentRoute.value.params.pid));
let comments =  computed(() => post.value?.comments ?? [])
let title =     computed(() => post.value.title || "TITLE")
let sub_title = computed(() => post.value?.sub_title || "没有什么副标题")
let authorId =  computed(() => post.value?.authorId || "这...算了我为什么要骂自己")

import {useMessage} from"naive-ui";
let message = useMessage()
onMounted(() => {
    for (let i of post.value.comments) storage.getComment(i);
    setTimeout(() => {
       
    }, 1000);
})
let writingComment = ref(false)
let scratch = ref("")
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

function filterScriptTags(value) {
      return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }

import { submitComment } from '../request'
function submitNewComment(mode,content) {
    //0就是当前post，否则为对应的comment
    console.log(scratch.value)
    if(!storage.currentUid){
        console.log("你要登录！")
        return;
    }
    let tosub={
        replyTo: mode == 0 ? "post" : "comment",
        replyId:mode==0?post.value.pid:mode,
        content:mode ==0?scratch.value:content,
        fromUser:storage.currentUid
    }
    
    submitComment(tosub, i => {
      message.info("还没做这个")
    })
}
</script>
<template>
    <n-layout :native-scrollbar="false" position="absolute" style="padding-left:100px;padding-right:100px;"
        :style="{ paddingTop: storage.hideHeader ? '60px' : '40px' }">

        <n-page-header @back="() => router.go(-1)">
            <template #title>
                <span v-if="title">{{ title }}</span>
                <n-skeleton v-else text style="min-width:280px;" />
            </template>
            ID：{{ authorId }}
            <template #extra>
                <n-button @click="storage.updatePost(post.pid,d=>{console.log('callback',d)})">
                    尝试刷新
                </n-button>
            </template>
        </n-page-header>

        <h4 style="padding-left: 40px;">
            <n-skeleton v-if="!(sub_title)" text :repeat="2" style="width:60%"></n-skeleton>
            <span v-else>{{ sub_title }}</span>
        </h4>
        <br />
        <section style="text-align:left;line-height: 2;font-size:12pt;padding:10px 40px;">
            <n-skeleton text :repeat="20" v-if="!(post?.content)"></n-skeleton>
            <span v-else v-html="filterScriptTags(post.content)"></span>
        </section><br />

        <n-space justify="end">
            <n-button type="primary">点赞</n-button>
            <n-button type="success">收藏？</n-button>
        </n-space>
        <n-space v-if="comments.length > 0" vertical justify="space-between">
            <div v-for="i in comments??[]">
                <comm :commentId="i" spread="true" :submitFunc="submitNewComment" >{{ i }}</comm>
            </div>
        </n-space>
        <n-button style="padding:4px 10px;" @click="writingComment = !writingComment">Post a comment</n-button>
        <n-button v-if="writingComment" @click="submitNewComment(0)">PO上网</n-button>
        <MdEditor v-model:model-value="scratch" :preview="false" v-if="writingComment"
            style="max-width:60%;margin:0 auto" />
    </n-layout>
</template>
<style scoped></style>