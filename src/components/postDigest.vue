<script setup>
let props = defineProps({ months: String, days: Number, title: String, sub_title: String, content: String })
let months = props.months ?? "SEP";
let days = props.days ?? "10";
let title = props.title;
let subTitle = props.sub_title;
let content = props.content;
let d = defineEmits(['clickedTitle'])
import { ref } from 'vue';
let imgUrl = ref("/src/assets/defaultAvatar.png")
</script>
<template>
    <div>
        <n-thing content-indented style="max-width:90%;padding:24px;padding:15px">
            <template #avatar>
                <div class="pdAvatar" v-if="0">
                    {{ days ?? 9 }}<br />{{ months ?? "SEP" }}
                </div>
                <div v-else><n-avatar size="small" :src="imgUrl"></n-avatar></div>
            </template>
            <template #header>
                <div class="pdHeader" @click="() => { d('clickedTitle') }">{{ title ?? "标题，标题呢" }}</div>
            </template>
            <template #description>
                <div class="pdSubTitle">
                    {{ author ?? "作者在哪里" }}
                    <br />{{ subTitle ?? "如题，如何解决" }}
                </div>
                <div class="pdDigestContent">{{ content ?? "无解，紫菜罢" }}
                </div>
            </template>
        </n-thing>
        <n-divider>
        </n-divider>
    </div>
</template>
<style scoped>
.pdAvatar {
    background-color: rgba(147, 241, 52, 0.892);
    height: 48px;
    width: 48px;
    border-radius: 4px;

    padding: 8px;
    color: white;
    font-weight: 600;
    font-size: 16px;

    text-align: center;
}

.pdHeader {
    font-size: 30px;
    cursor: pointer;
}

.pdSubTitle {
    color: rgb(200, 197, 197);
    text-align: left;
    line-height: 1.5;
}

.pdDigestContent {
    line-height: 1.9;
    text-align: left;
}</style>