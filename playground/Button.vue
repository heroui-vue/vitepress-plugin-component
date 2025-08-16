<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<template>
    <button class="my-button" @click="count++">点击了 {{ count }} 次</button>
</template>

<style>
.my-button {
    background-color: #3eaf7c;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
