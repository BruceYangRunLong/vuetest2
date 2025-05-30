<template>
    <div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="empno" label="Empno" width="150" />
                <el-table-column prop="ename" label="Name" width="120" />
                <el-table-column prop="job" label="Job" width="120" />
                <el-table-column prop="deptno" label="Departmentno" width="130" />
                <el-table-column prop="mgr" label="mgr" width="120" />
                <el-table-column prop="hiredate" label="Hiredate" width="120" />
                <el-table-column prop="sal" label="Salary" width="120" />
                <el-table-column prop="comm" label="Commission" width="120" />
                <el-table-column fixed="right" label="Operations" min-width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="editDataFromBackEndGetEmpById(scope.row)">
                            Edit
                        </el-button>
                        <el-button link type="primary" size="small" @click="deleteDataFromBackEndShowDialog(scope.row)">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>

    <div>
        <div class="demo-pagination-block">
            <div class="demonstration">All combined</div>
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[5, 10, 15, 20]" :size="size" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="totalValue" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>



    <div>
        <el-button type="primary" @click="getEmps">getEmps</el-button>
    </div>





    <div>
        <el-dialog v-model="dialogFormVisible" title="Edit Employee" width="500">
            <el-form :model="form">
                <el-form-item label="empno" :label-width="formLabelWidth">
                    <el-input v-model="empInfo.empno" autocomplete="off" />
                </el-form-item>
                <el-form-item label="ename" :label-width="formLabelWidth">
                    <el-input v-model="empInfo.ename" autocomplete="off" />
                </el-form-item>
                <el-form-item label="job" :label-width="formLabelWidth">
                    <el-input v-model="empInfo.job" autocomplete="off" />
                </el-form-item>
                <el-form-item label="mgr" :label-width="formLabelWidth">
                    <el-input v-model="empInfo.mgr" autocomplete="off" />
                </el-form-item>
                <el-form-item label="hiredate" :label-width="formLabelWidth">
                    <el-input v-model="empInfo.hiredate" autocomplete="off" />
                </el-form-item>
                <el-form-item label="sal" :label-width="formLabelWidth">
                    <el-input v-model="empInfo.sal" autocomplete="off" />
                </el-form-item>
                <el-form-item label="comm" :label-width="formLabelWidth">
                    <el-input v-model="empInfo.comm" autocomplete="off" />
                </el-form-item>
                <el-form-item label="deptno" :label-width="formLabelWidth">
                    <el-input v-model="empInfo.deptno" autocomplete="off" />
                </el-form-item>




                <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="Please select a zone">
                        <el-option label="Zone No.1" value="shanghai" />
                        <el-option label="Zone No.2" value="beijing" />
                    </el-select>
                </el-form-item> -->
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="editDataFromBackEnd">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>




    <el-dialog v-model="dialogVisibleConfirmDelete" 
    title="Tips" 
    width="500" :before-close="handleClose">Confirm Deletion {{ deleteEmpInfo.empno }} ,{{ deleteEmpInfo.ename }}
        <span></span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleConfirmDelete = false">Cancel</el-button>
                <el-button type="primary" @click="deleteDataFromBackEnd">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>







</template>




<script setup>

import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { tr } from 'element-plus/es/locales.mjs'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const dialogVisibleConfirmDelete = ref(false)


// private Integer empno;

// private String ename;

// private String job;

// private Integer mgr;

// private LocalDate hiredate;

// private BigDecimal sal;

// private BigDecimal comm;

// private Integer deptno;


const empInfo = reactive({
    empno: '',
    ename: '',
    job: '',
    mgr: '',
    hiredate: '2025-01-01',
    sal: '',
    comm: '',
    deptno: '',
})





const currentPage4 = ref(1)
const pageSize4 = ref(5)
const size = ref("large")

const background = ref(false)
const disabled = ref(false)

const totalValue = ref(0)

const deleteEmpInfo = ref(null)





const getDataFromBackEnd = () => {
    axios.get(
        'http://localhost:8081/emp/getAllEmpsByPageCondition', {
        params: {
            pageSize: pageSize4.value,
            pageNum: currentPage4.value
        }
    }
    ).then(function (response) {
        console.log(response);
        // 这是在请求成功后打印服务器返回的响应数据，通常用来调试和查看服务器返回的内容。
        // response 是 Axios 返回的一个包含数据的对象。
        tableData.value = response.data.records
        totalValue.value = response.data.total;
    })

}




const editDataFromBackEndGetEmpById = (row) => {

    console.log('row', row);
    dialogFormVisible.value = true;
    axios.get(
        'http://localhost:8081/emp/getEmpBYEmpno', {
        params: {
            empno: row.empno
        }
    }
    ).then(function (response) {
        console.log(response);

        // empinfo.value = response.data;
        // 用于将整个 response.data 赋值给 empInfo.value，
        // 并且 empInfo 中其他属性不受影响。

        Object.assign(empInfo, response.data);
        //Object.assign(empInfo, response.data); 
        // 将 response.data 的属性逐一复制到 empInfo 中，
        // 可能会覆盖 empInfo 中已有的属性。

    })

}
const editDataFromBackEnd = (row) => {

    console.log('row', row);
    // dialogFormVisible.value = true;
    axios.post(
        'http://localhost:8081/emp/updateEmpByEmpno', empInfo
    ).then(function (response) {
        console.log(response);

        if (response.data = true) {
            ElMessage({
                message: 'Congrats, this is a success message for edit.',
                type: 'success',
                plain: true,
            })
        } else {
            ElMessage({
                message: 'Oops, this is a error message for edit.',
                type: 'error',
                plain: true,
            })
        }
        getDataFromBackEnd();
        dialogFormVisible.value = false;
        // empinfo.value = response.data;
        // 用于将整个 response.data 赋值给 empInfo.value，
        // 并且 empInfo 中其他属性不受影响。

        Object.assign(empInfo, response.data);
        //Object.assign(empInfo, response.data); 
        // 将 response.data 的属性逐一复制到 empInfo 中，
        // 可能会覆盖 empInfo 中已有的属性。

    })

}

const deleteDataFromBackEndShowDialog = (row) => {

    dialogVisibleConfirmDelete.value = true;
    deleteEmpInfo.value = row
}

const deleteDataFromBackEnd = () => {

    dialogVisibleConfirmDelete.value = false;
    axios.get(
        'http://localhost:8081/emp/deleteEmpByEmpno', {
        params: {
            empno: deleteEmpInfo.value.empno
        }
    }
    ).then(function (response) {
        if (response.data = true) {
            ElMessage({
                message: 'Congrats, this is a success message for delete.',
                type: 'success',
                plain: true,
            })
        } else {
            ElMessage({
                message: 'Oops, this is a error message for delete.',
                type: 'error',
                plain: true,
            })
        }
        getDataFromBackEnd();
        // dialogFormVisible.value = false;
        // empinfo.value = response.data;
        // 用于将整个 response.data 赋值给 empInfo.value，
        // 并且 empInfo 中其他属性不受影响。

        // Object.assign(empInfo, response.data);
        //Object.assign(empInfo, response.data); 
        // 将 response.data 的属性逐一复制到 empInfo 中，
        // 可能会覆盖 empInfo 中已有的属性。

    })

}




//如果你把数据请求放在 mounted() 中，
// 意味着它只会在组件的初次加载时执行一次，避免了不必要的重复请求。
onMounted(() => {
    // 在组件挂载后获取数据
    getDataFromBackEnd();

})




const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    getDataFromBackEnd();
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    getDataFromBackEnd();
}


const handleClick = () => {
    console.log('click')
}



const tableData = ref(null)


const getEmps = () => {
    // console.log('username', username.value); 
    // console.log('password', password.value);

    axios.get(
        'http://localhost:8081/emp/getAllEmps',
    ).then(function (response) {
        console.log(response);
        // 这是在请求成功后打印服务器返回的响应数据，通常用来调试和查看服务器返回的内容。
        // response 是 Axios 返回的一个包含数据的对象。
        tableData.value = response.data
    })

}

</script>

<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>