<template>
    <div class="P-home">
        <h1>Home Page</h1>
        <el-button @click="openCreationsUrl">登录</el-button>
    </div>
</template>
<script setup>

const openCreationsUrl = () => {
    chrome.tabs.create({ url: 'http://qa2.ylands.ied.com/workshop-admin/creations/' });
}

</script>

<style scoped lang="stylus">
.P-home
    position: absolute
    top: 0
    bottom: 0
    width: 100%
    background: linear-gradient(#f48c8d,#f4c58d)
    h1
        margin-top: 50px
        text-align: center
        color: #fff
        font-size: 40px
</style>