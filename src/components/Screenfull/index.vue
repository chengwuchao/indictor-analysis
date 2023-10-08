<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script lang="ts" name="Screenfull" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import screenfull from 'screenfull/dist/screenfull';

const isFullscreen = ref<boolean>(false);

onMounted(() => {
  init();
});

onUnmounted(() => {
  destroy();
});

function click() {
  if (!screenfull.isEnabled) {
    this.$message({ message: '你的浏览器不支持全屏', type: 'warning' });
    return false;
  }
  screenfull.toggle();
}

function change() {
  isFullscreen.value = (
    screenfull as unknown as screenfull.Screenfull
  ).isFullscreen;
}

function init() {
  if (screenfull.isEnabled) {
    screenfull.on('change', change);
  }
}

function destroy() {
  if (screenfull.isEnabled) {
    screenfull.off('change', change);
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
