<template>
  <div class="container">
    <div class="left-menu">
      <NavMenu />
    </div>
    <div class="main-section">
      <transition name="fade-transform">
        <router-view :key="key" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavMenu from './navMenu.vue';

Options({
  components: {
    NavMenu,
  },
});

export default class LayoutIndex extends Vue {
  get key() {
    return this.$route.fullPath;
  }
  get routeMeta() {
    console.log(this.$route.meta);
    return this.$route.meta || {};
  }
}
</script>

<style lang="scss" scoped></style>
