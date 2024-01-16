<template>
  <el-dialog v-model="isVisible" v-if="isVisible" width="70%">
    <!-- <div>
      <el-button @click="resetDateFilter">reset date filter</el-button>
      <el-button @click="clearFilter">reset all filters</el-button>
    </div> -->
    <el-table ref="multipleTableRef" row-key="assertId" :data="creationsList"  style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="AssertId" prop="assertId" column-key="assertId" />
      <el-table-column prop="assertName" label="AssertName" />
      <el-table-column prop="isBlocked" label="IsBlocked"
        :filters="[{ text: 'No', value: 'No' }, { text: 'blocked', value: 'blocked' }]"
        :filter-method="filterBlocked" ></el-table-column>
      <el-table-column prop="currentVersion" label="CurrentVersion" />
      <el-table-column prop="featured" label="Featured" />
      <el-table-column prop="hidden" label="Hidden" />
      <el-table-column prop="lastVersion" label="LastVersion" show-overflow-tooltip />
    </el-table>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
// 接受父组件传递的方法
const emit = defineEmits(['onClose'])
// 接收父组件传递的参数
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  creationsList: {
    type: Array,
    default: () => []
  }

})



const multipleTableRef = ref(null);
const multipleSelection = ref([]);

const toggleSelection = (rows) => {
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
        multipleTableRef.value.toggleRowSelection(row, undefined)
      })
    } else {
      multipleTableRef.value.clearSelection()
    }
  } else {
    multipleTableRef.value.clearSelection()
  }
}


const filterBlocked = (value, row) => {
  return row.isBlocked === value;
};


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