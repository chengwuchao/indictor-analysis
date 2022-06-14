<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- card body -->
      <el-button @click="show = true">显示 Dialog</el-button>
    </el-card>
    <IndictorsDialog v-model:show="show" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IndictorsDialog from './dialog.vue';

@Options({
  components: {
    IndictorsDialog,
  },
})
export default class DashboardIndex extends Vue {
  show = false;
}
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
