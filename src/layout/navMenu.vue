<template>
  <div>
    <el-menu
      :default-active="activeRouteName"
      :default-openeds="defaultOpeneds"
      class="el-menu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="(menuItem, index) in menus">
        <el-sub-menu
          v-if="
            !menuItem.single && menuItem.children && menuItem.children.length
          "
          :key="index"
          :index="menuItem.name"
        >
          <template v-slot:title>
            <i class="el-icon-location"></i>
            <span>{{ menuItem.meta.label }}</span>
          </template>

          <el-menu-item
            :key="submenuItem.name"
            v-for="submenuItem in menuItem.children"
            :index="submenuItem.name"
          >
            {{ submenuItem.meta.label }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else-if="
            menuItem.single && menuItem.children && menuItem.children.length
          "
          :index="menuItem.children[0].name"
          :key="menuItem.children[0].name"
        >
          <i class="el-icon-menu"></i>
          <template v-slot:title>
            <span> {{ menuItem.children[0].meta?.label }}</span>
          </template>
        </el-menu-item>
        <el-menu-item v-else :index="menuItem.name" :key="menuItem.name">
          <i class="el-icon-menu"></i>
          <template v-slot:title>
            <span>{{ menuItem.meta?.label }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { routesConfig } from '@/router/config';
import { RouteRecordRaw } from 'vue-router';

export default class MyNavMenu extends Vue {
  menus: Array<RouteRecordRaw> = []; // 菜单
  defaultOpeneds = [];

  get activeRouteName() {
    return this.$route.name;
  }

  handleOpen(key: string, keyPath: string) {
    console.log(key, keyPath);
  }
  handleClose(key: string, keyPath: string) {
    console.log(key, keyPath);
  }
  handleSelect(pathIndex: string) {
    if (this.activeRouteName === pathIndex) {
      return;
    }
    // this.$router.push({ name: pathIndex });
    //
    this.$router.push({ name: pathIndex, query: { t: +new Date() } });
  }

  mounted() {
    this.menus = [...routesConfig].filter(
      (routeItem) => !routeItem.meta?.hidden
    );
    console.log(this.menus);
  }
}
</script>

<style lang="scss" scoped></style>
