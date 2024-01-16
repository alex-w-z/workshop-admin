<template>
    <el-config-provider namespace="CRX-el">
        <div class="CRX-content">
            <div class="content-entry" @click="isShowMainDialog = true">
                <MainDialog :visible="isShowMainDialog" :creationsList="creationsList" @onClose="isShowMainDialog = false" />
            </div>
            
        </div>
    </el-config-provider>
</template>
<script setup>
import { ref, onMounted } from 'vue';
// import { sendMessage, onMessage } from 'webext-bridge/content-script';
import MainDialog from '@/content/components/mainDialog/mainDialog.vue';
const isShowMainDialog = ref(false)

const creationsList = ref([]);
let targetNode = null;

// 初始化页面数据，判断页面URL：http://qa2.ylands.ied.com/workshop-admin/creations/ 是否包含 creations，如果是，则为创意工坊作品列表页面
// 并且从页面上获取 classs='v-datatable' 的table元素，并从table 元素内的每一行的第一列获取作品ID，返回一个作品id list
const initPageData = () => {
    const url = window.location.href;
    const isCreationsPage = url.includes('creations');

    if (isCreationsPage) {
        const tables = document.querySelectorAll('table');
        tables.forEach((table) => {
            if (table && table.classList.contains('v-datatable')) {
                // 给targetNode赋值，用于MutationObserver监听DOM变化
                targetNode = table;
                const tbody = table.querySelector('tbody');
                if (tbody) {
                    const rows = tbody.querySelectorAll('tr');
                    
                    rows.forEach((row) => {
                        // 获取第一个td内的文本，即作品assertId, 第二个td内的文本，即作品名称assertName, 第三个td内的文本，即作品Blocked状态，第九个td内的文本，即作品当前发布版本号，第十个td内的文本，即作品最后一个版本号 
                        const assertId = row.querySelector('td:nth-child(1)').innerText;
                        const assertName = row.querySelector('td:nth-child(2)').innerText.replace(/\s+/g, '');
                        const isBlocked = row.querySelector('td:nth-child(4)').innerText;
                        const featured = row.querySelector('td:nth-child(6)').innerText;
                        // 如果row.querySelector('td:nth-child(7)').innerText 为 no 则hidden为 false，如果为 "border_clear" 则hidden为 true
                        const hidden = (row.querySelector('td:nth-child(7)').innerText === 'no' ? false : true);
                        const currentVersion = row.querySelector('td:nth-child(9)').innerText;
                        const lastVersion = row.querySelector('td:nth-child(10)').innerText;
                        
                        
                        //将id,name,isBlocked,currentVersion,lastVersion 装入 {id,name,isBlocked,currentVersion,lastVersion} 对象中，然后将该对象装入creationsList数组中 
                        creationsList.value.push({assertId:assertId,assertName:assertName,isBlocked:isBlocked,featured:featured,hidden:hidden,currentVersion:currentVersion,lastVersion:lastVersion});
                    });
                }
            }
        });
    }
};

onMounted(() => {
    setTimeout(() => {
        initPageData();
        const observer = new MutationObserver((mutationsList) => {
            // 在每次 DOM 变化时，重新执行 initPageData,重新执行前，要清空creationsList数组
            creationsList.value = [];
            initPageData();
        });
        const config = {
            childList: true, subtree: true
        };
        if (targetNode) {
            observer.observe(targetNode, config);
        }
    }, 2000);
});









</script>

<style scoped lang="stylus">
.CRX-content
    .content-entry
        position: fixed
        z-index: 1000
        bottom: 100px
        right: 20px
        width: 50px
        height: 50px
        background: url('images/content-icon.png')
        background-size: 100% 100%
        cursor: pointer
.CRX-el-popper
    .CRX-el-table-filter
        z-index :9000
</style>