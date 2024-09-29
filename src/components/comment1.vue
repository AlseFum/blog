<script setup>
import { ThumbsUpSharp, ThumbsDownSharp } from "@vicons/ionicons5"
import { MdEditor } from "md-editor-v3"
let props = defineProps({
    uid: String,
    content: String,
    replyTo: String,
    commentId: String,
    spread: false,
    primary: false,
    submitFunc: Function,
})
//primary即是是否是第一层评论。
//第二层之后的不知道怎么做
//或者第二层之后就不做了，整个从属得了
import comm from './comment1.vue'
import _stor from "../storage"
const storage = _stor();
import { computed, ref, onMounted } from 'vue'
let curComm = ref({});
let fu = ref(1)
if (props.commentId) {
    curComm.value = storage.getComment(props.commentId,
        i => {
            curComm.value = i;
            fu.value++
            console.log("From comm", curComm.value);
        })
}
let replies = computed(() => curComm?.value?.comments)
//强制更新用
let toreply = ref(false);
let scratch=ref("")
</script>
<template>
    <div class="commentBody">

        <n-thing content-indented style="line-height: 1.1;">
            <template #avatar>
                <n-avatar size="large">
                    U
                </n-avatar>
            </template>
            <template #header>
                <span style="line-height:1.5;text-decoration: underline;font-weight:700;
                    font-size:14px;
                    color: black;height:16px;">用户ID <span style="color:#555">时间</span></span>

            </template>
            <template v-if="headerExtra" #header-extra>
                头部额外
            </template>
            <!-- <template #description>
                    描述,不该出现
                </template> -->
            <span style="margin:10px 0px;font-size:14px;"> <span v-if="!replyTo">回复 {{ replyTo }}：</span>这该是评论正文{{
                curComm?.content }}:<slot></slot><br />

            </span>
            <!-- <template #footer>
                    尾部:日期
                </template> -->
            <template #action>
                <n-space vertical>
                <n-space >
                    <n-icon title="赞">
                        <ThumbsUpSharp />
                    </n-icon>
                    <n-icon title="踩">
                        <ThumbsDownSharp />
                    </n-icon>
                    <a class="commentAction" style="color: rgba(128, 128, 128, 0.774);" @click="toreply = !toreply">Reply</a>
                    <a class="commentAction" style="color: rgba(128, 128, 128, 0.774);">Report</a>

                </n-space>
                <n-button @click="submitFunc(props.commentId,scratch);console.log('heh',scratch)" v-if="toreply">提交</n-button>
                <KeepAlive>
                    <div  v-if="toreply" style="width:80%;height:160px;overflow: hidden;" d-outline>
                        <MdEditor :preview="'false'" v-model.value="scratch">
                        </MdEditor>
                    </div>
                </KeepAlive></n-space>
            </template>

        </n-thing>
        <div v-if="props.spread" style="margin-left:50px">{{ replies }}
            <comm v-for="i in replies" :commentId="i">{{ i }}
            </comm>
        </div>
    </div>
</template>
<style scoped>
.commentUserName {
    display: inline-block;
    text-decoration: underline;
    font-weight: 700;
    font-size: 14px;

}

.commentContent {
    display: inline-block;
    font-size: 14px;
    color: #666;
    word-wrap: break-word;
    overflow: auto;
    line-height: 1.8;

}

.commentAction {
    height: 8px;
}</style>