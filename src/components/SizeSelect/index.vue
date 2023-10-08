<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu>
      <template #dropdown>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts" name="SizeSelect" setup>
import { computed, nextTick, ref } from 'vue';
import { useCommonStore } from '@/store/common';
import { useTagsViewStore } from '@/store/tagsView';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

const commandStore = useCommonStore();
const tagViewStore = useTagsViewStore();
const route = useRoute();
const router = useRouter();

interface SizeOption {
  label: string;
  value: string;
}

const sizeOptions = ref<Array<SizeOption>>([
  { label: 'Default', value: 'default' },
  { label: 'Medium', value: 'medium' },
  { label: 'Small', value: 'small' },
  { label: 'Mini', value: 'mini' },
]);

const size = computed(() => commandStore.size);

function handleSetSize(size: string) {
  // this.$ELEMENT.size = size;
  commandStore.setSize(size);

  refreshView();
  ElMessage({
    message: 'Switch Size Success',
    type: 'success',
  });
}

function refreshView() {
  // In order to make the cached page re-rendered
  tagViewStore.delAllCachedViews();

  const { fullPath } = route;

  nextTick(() => {
    router.replace({
      path: '/redirect' + fullPath,
    });
  });
}
</script>
