
<template>
    <div class="P-login">
        <img src="./logo.png" class="logo" />
        <div class="ipt-con">
            <el-input v-model="account" placeholder="账号" />
        </div>
        <div class="ipt-con">
            <el-input v-model="password" type="password" placeholder="请输入账号" show-password />
        </div>
        <div class="ipt-con">
            <el-select v-model="serve_name" placeholder="请选择服务器">
                <el-option label="测试服" value="test" />
                <el-option label="正式服" value="prod" />
            </el-select>
        </div>
        <div class="ipt-con">
            <el-button style="width: 100%" @click="onLogin">登录</el-button>
        </div>
    </div>
    
</template>


<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router';
const account = ref('');
const password = ref('');
const serve_name = ref('');

const router = useRouter();
const onLogin = () => {
    router.push('/home');
}
</script>

<style scoped lang="stylus">
.P-login
    position: absolute
    top: 0
    bottom: 0
    width: 100%
    background: #4bb8e5
    .logo
        display: block
        margin: 50px auto 20px
    .ipt-con
        margin: 0 auto 20px
        width: 300px
        text-align: center
</style>