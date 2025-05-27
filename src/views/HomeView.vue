<template>

    <div>HomeView</div>




    <div>

        countNum: {{ counter.count }}
        <button @click="counter.increment">add</button>

    </div>



    <div>

        <router-link to="/login">Go to Login</router-link>
    </div>


    <div>

        <router-link to="/about">Go to About</router-link>

    </div>

</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()

</script>



<style></style>