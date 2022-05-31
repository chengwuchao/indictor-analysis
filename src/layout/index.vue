<template>
  <div class="container">
    <div class="left-menu">
      <MyNavMenu />
    </div>
    <div class="main-section">
      <router-view v-slot="{ Component }" :key="key">
        <transition name="fade-transform">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MyNavMenu from './navMenu.vue';

@Options({
  components: {
    MyNavMenu,
  },
})
export default class Index extends Vue {
  get key() {
    return this.$route.fullPath;
  }
  get routeMeta() {
    console.log(this.$route.meta);
    return this.$route.meta || {};
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  box-sizing: border-box;
  .main-section {
    width: 1500px;
    box-sizing: border-box;
    height: 100%;
    padding: 12px 32px;
  }
}

:deep .left-menu {
  .el-menu {
    width: 220px;
    height: 100vh;
    min-height: 500px;
  }
}
</style>
