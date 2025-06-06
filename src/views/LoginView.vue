<template>
    <h1>
        Login Page

    </h1>



    <div>
        <div>
            {{ username }}
        </div>


        <div :class="className">
            {{ username }}
            {{ tags1 }}
        </div>
        <div v-html="tags1"></div>
        <div v-text="tags1"></div>


        <div>
            <!-- <input type="text" v-model="username" /> -->
            <el-input type="text"

            v-model="username" 

            style="width: 240px" placeholder="Please input username" />
        </div>

        <div>
            <!-- <el-input type="password" v-model="password" style="width: 240px" placeholder="Please input password" /> -->
            <el-input 

            v-model="password" 

            style="width: 240px" 
            type="password" 
            placeholder="Please input password"
                show-password />
        </div>

        <div>
            <!-- <button @click="submit">Login</button> -->
            <el-button type="primary" round @click="submit">Login</el-button>
        </div>
        <div>
            <el-input type="text" v-model="className" style="width: 240px" placeholder="Please input className" />
        </div>
        <div>
            <el-button type="primary" @click="changeName">ChangeName</el-button>
        </div>

    </div>

    <div>
        <router-link to="/">Back to Homepage</router-link>
    </div>
    

</template>



<script setup>

import { reactive, ref } from 'vue';
import axios from 'axios';

const username = ref(null);
const password = ref(null);

const tags1 = ref("<p>Hello World!</p>");

const className = ref('one');
const submit = () => {
    console.log('username', username.value);
    console.log('password', password.value);

    axios.post('http://localhost:8081/userinfoa/login', {
        username: username.value,
        password: password.value

    }).then(function (response) {
        console.log(response);
        // 这是在请求成功后打印服务器返回的响应数据，通常用来调试和查看服务器返回的内容。
        // response 是 Axios 返回的一个包含数据的对象。
    })
}


const changeName = () => {
    username.value = 'newUsername';


}






</script>





<style scoped>
.one {
    color: red;
}

.two {
    color: blue;
}








</style>