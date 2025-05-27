<template>

    <div>
        <div>
            <h1>About Page</h1>

        </div>

        <div>
            countNum: {{ counter.count }}
        </div>

        <router-link to="/">Back to Homepage</router-link>
    </div>

</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()

</script>
