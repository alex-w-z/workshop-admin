<template>
    <el-dialog
        v-model="isVisible"
        v-if="isVisible"
        title="Content"
        width="60%"
    >
        <el-table
            ref="multipleTableRef"
            :data="creationsList"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @select-all="handleSelectAll"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column label="AssertId" property="assertId">
            <!-- <template #default="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column property="assertName" label="AssertName" />
            <el-table-column property="isBlocked" label="IsBlocked"/>
            <el-table-column property="currentVersion" label="CurrentVersion" />
            <el-table-column property="lastVersion" label="LastVersion" show-overflow-tooltip />
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection(creationsList)"
            >选中所有没有发布的作品</el-button
            >
            <el-button @click="toggleSelection()">清除选中</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
// 接受父组件传递的方法
const emit = defineEmits(['onClose'])
// 接收父组件传递的参数
const props = defineProps(['visible','creationsList'])

const multipleTableRef = ref(null)
const multipleSelection = ref([])
const isAllSelected = ref(false)

const handleSelectAll = (selection) => {
  if (selection.length === 0){
    isAllSelected.value = false
  }else{
    isAllSelected.value = true
  }
};

const toggleSelection = (rows) => {
  console.log(rows);
  if (rows) {
    const selectedRows = []
    // 选中rows 中currentVersion 为 - 的行 
    rows.forEach((row) => {
      if (row.currentVersion === '-') {
        selectedRows.push(row)
      }
    })
    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => {
        // 如果isAllSelected 为false 则选中
        if (!isAllSelected.value) {
          multipleTableRef.value.toggleRowSelection(row, undefined)
        } else {
          // 如果isAllSelected 为true，获取rows与selectedRows的非交集 
          const unSelectedRows = rows.filter((item) => {
            return !Array.from(selectedRows.includes(item))
          })
          console.log(unSelectedRows);
          if(unSelectedRows.length > 0){
            // 取消选中
            multipleTableRef.value.toggleRowSelection(unSelectedRows, undefined)
            isAllSelected.value = false
          }
          

          
        } 
        // multipleTableRef.value.toggleRowSelection(row, undefined)
      })
    } else {
      multipleTableRef.value.clearSelection()
    }
  } else {
    multipleTableRef.value.clearSelection()
  }
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}



// 是否显示弹窗
const isVisible = computed({
    get() {
        return props.visible
    },
    set() {
        emit('onClose')
    }
})
</script>

<style scoped lang="stylus"></style>