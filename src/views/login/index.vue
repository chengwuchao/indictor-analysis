<template>
  <h1 @click="handleClick">{{ time }}</h1>
</template>

<script lang="ts" setup>
import { onMounted, proxyRefs, ref } from 'vue';
import { reactive } from 'vue-demi';

const data = reactive({ title: 'hello world', count: 0, time: new Date() });

const time = ref(new Date());

function handleClick() {
  data.title = '111';
}

onMounted(() => {
  data.count = 100;

  setInterval(() => {
    data.count++;
    data.time = new Date();
    time.value = new Date();
  }, 1000);
});
</script>
