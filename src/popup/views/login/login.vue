
<template>
    <div class="P-login">
        <img src="./logo.png" class="logo" />
        <div class="P-form">
        <el-form :model="form" :rules="rules">
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"  type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="请选择服务器" prop="serve_name">
                <el-select v-model="form.serve_name">
                    <el-option label="测试服" value="qa2" />
                    <el-option label="正式服" value="zsf" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" @click="onLogin">登录</el-button>
            </el-form-item>
        </el-form>
        </div>  
    </div>
    
</template>


<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router';
import { apiReqs } from '@/api';

const form = ref({
    username: '',
    password: '',
    serve_name: '',
    rememberMe: false
});

const rules = ref({
    username: [
        { required: true, message: 'Cannot be empty', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Cannot be empty', trigger: 'blur' },
    ],
    serve_name: [
        { required: true, message: 'Cannot be empty', trigger: 'blur' }
    ]
});

const router = useRouter();
const onLogin = () => {
    
    apiReqs.signIn({
        data: form,
        success: (res) => {
            console.log(res);
            
            router.push('/home');
            
        },
        error: (err) => {
            alert(err);
        }
    });
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
    .P-form
        margin: 50px auto 20px
        width: 90%
        text-align: center
</style>