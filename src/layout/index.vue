<template>
  <el-container class="layout-container-demo">
    <!-- left menu -->
    <el-aside width="200px">
      <el-scrollbar>
        <NavMenu />
      </el-scrollbar>
    </el-aside>

    <el-container>
      <!-- top -->
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>
      <!-- main content -->
      <el-main>
        <el-scrollbar>
          <router-view v-slot="{ Component }" :key="key">
            <transition name="fade-transform">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavMenu from './navMenu.vue';

@Options({
  components: {
    NavMenu,
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
.layout-container-demo .el-header {
  position: relative;
  background-color: #fff;
  color: var(--el-text-color-primary);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo :deep .el-menu {
  border-right: none;
  height: 100vh;
  min-height: 500px;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
