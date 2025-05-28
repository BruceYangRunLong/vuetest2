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
                <el-table-column fixed="right" label="Operations" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">
                            Detail
                        </el-button>
                        <el-button link type="primary" size="small">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>

    <div>
        <div class="demo-pagination-block">
            <div class="demonstration">All combined</div>
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[100, 200, 300, 400]" :size="size" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>



    <div>
        <el-button type="primary" @click="getEmps">getEmps</el-button>
    </div>


</template>




<script setup>

import axios from 'axios'
import { reactive, ref } from 'vue'

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const size = ref("large")

const background = ref(false)
const disabled = ref(false)

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
        tableData.value = response.data
    })

}

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

// const tableData = [
//     {
//         date: '2016-05-03',
//         name: 'Tom',
//         state: 'California',
//         city: 'Los Angeles',
//         address: 'No. 189, Grove St, Los Angeles',
//         zip: 'CA 90036',
//         tag: 'Home',
//     },
//     {
//         date: '2016-05-02',
//         name: 'Tom',
//         state: 'California',
//         city: 'Los Angeles',
//         address: 'No. 189, Grove St, Los Angeles',
//         zip: 'CA 90036',
//         tag: 'Office',
//     },
//     {
//         date: '2016-05-04',
//         name: 'Tom',
//         state: 'California',
//         city: 'Los Angeles',
//         address: 'No. 189, Grove St, Los Angeles',
//         zip: 'CA 90036',
//         tag: 'Home',
//     },
//     {
//         date: '2016-05-01',
//         name: 'Tom',
//         state: 'California',
//         city: 'Los Angeles',
//         address: 'No. 189, Grove St, Los Angeles',
//         zip: 'CA 90036',
//         tag: 'Office',
//     },
// ]


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