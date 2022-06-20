<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- card body -->
      <el-button @click="show = true">显示 Dialog</el-button>
    </el-card>
    <IndictorsDialog v-model:show="show" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue-demi';
import IndictorsDialog from './dialog.vue';

const show = ref<boolean>(false);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
</style>
