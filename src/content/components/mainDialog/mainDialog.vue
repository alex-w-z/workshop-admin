<template>
  <el-dialog v-model="isVisible" v-if="isVisible" width="70%">
    <div>
      <el-button @click="clearFilter">reset all filters</el-button>
      <el-button :disabled="multipleSelection.length <= 0" @click="approveSelected">approveTheSelected</el-button>
    </div>
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
      <el-table-column prop="hidden" label="Hidden"
        :filters="[{ text: 'true', value: true }, { text: 'false', value: false }]"
        :filter-method="filterHidden" ></el-table-column>
      <el-table-column prop="lastVersion" label="LastVersion" show-overflow-tooltip />
    </el-table>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { apiReqs } from '@/api';
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

const resetDateFilter = () => {
  multipleTableRef.value?.clearFilter(['date'])
}

const clearFilter = () => {
  multipleTableRef.value?.clearFilter();
}
const filterBlocked = (value, row) => {
  multipleTableRef.value.clearSelection();
  return row.isBlocked === value;
};

const filterHidden = (value, row) => {
  multipleTableRef.value.clearSelection();
  console.log('value', value)
  console.log('row.hidden', row.hidden);
  return row.hidden === value;
  
};




const handleSelectionChange = (val) => {
  multipleSelection.value = val
  console.log(multipleSelection.value);
}

const approveSelected = () => {
  console.log(multipleSelection.value);
  let selectedRows = multipleSelection.value
  if (selectedRows.length > 0) {
    selectedRows.forEach((row) => {
      apiReqs.approveCreationByBackground({
        data: {
          text: row.assertId,
        },
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        }
      });
    })
  }
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

<style scoped lang="stylus">
.CRX-el-table
  margin-top: 10px;
</style>