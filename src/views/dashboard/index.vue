<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <template v-slot:header>
      <div>
        <span>{{ message }}</span>
      </div>
    </template>
    <!-- card body -->
  </el-card>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class DashboardIndex extends Vue {
  message = '33444';
}
</script>
