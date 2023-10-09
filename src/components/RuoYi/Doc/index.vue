<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script lang="ts" name="RuoYiDoc" setup>
const url = 'http://doc.ruoyi.vip/ruoyi-vue';

function goto() {
  window.open(url);
}
</script>
