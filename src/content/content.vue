<template>
    <el-config-provider namespace="CRX-el">
        <div class="CRX-content">
            <div v-if="canDisplay" class="content-entry"></div>
        </div>
    </el-config-provider>
    
</template>
<script>
import { ref, onMounted } from 'vue';
import { sendMessage, onMessage } from 'webext-bridge/content-script';
export default {
    name: 'CRX-content',
    setup() {
        let canDisplay = ref(false)
        
        onMessage('isTargetPage', (data) => {
            canDisplay.value = data === 1;
        });


        return {
            canDisplay
        };
    }
};

// 初始化页面数据，判断页面URL：http://qa2.ylands.ied.com/workshop-admin/creations/ 是否包含 creations，如果是，则为创意工坊作品列表页面
// 并且从页面上获取 classs='v-datatable' 的table元素，并从table 元素内的每一行的第一列获取作品ID，返回一个作品id list
// const initPageData = () => {
//     const url = window.location.href;
//     const isCreationsPage = url.includes('creations');
//     if (isCreationsPage) {
//         const table = document.querySelector('.v-datatable');
//         const rows = table.querySelectorAll('tbody tr');
//         const ids = [];
//         rows.forEach(row => {
//             const id = row.querySelector('td').innerText;
//             ids.push(id);
//         });
//         return ids;
//     }
//     return [];
// };
</script>

<style scoped lang="stylus">
.CRX-content
    .content-entry
        position: fixed
        z-index: 9999
        bottom: 100px
        right: 20px
        width: 50px
        height: 50px
        background: url('images/content-icon.png')
        background-size: 100% 100%
        cursor: pointer
</style>