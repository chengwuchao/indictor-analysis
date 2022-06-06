<template>
  <div>
    <el-menu
      :default-active="activeRouteName"
      :default-openeds="defaultOpeneds"
      :collapse="isCollapse"
      class="el-menu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="(menuItem, index) in menus">
        <!-- 二级菜单 -->
        <el-sub-menu
          v-if="!menuItem.single && menuItem.children && menuItem.children.length"
          :key="index"
          :index="menuItem.name"
        >
          <template v-slot:title>
            <el-icon><component :is="menuItem.meta.icon" /></el-icon>
            <span>{{ menuItem.meta.label }}</span>
          </template>

          <el-menu-item :key="submenuItem.name" v-for="submenuItem in menuItem.children" :index="submenuItem.name">
            {{ submenuItem.meta.label }}
          </el-menu-item>
        </el-sub-menu>
        <!-- 一级菜单 指向某个 child -->
        <el-menu-item
          v-else-if="menuItem.single && menuItem.children && menuItem.children.length"
          :index="menuItem.children[0].name"
          :key="menuItem.children[0].name"
        >
          <el-icon><component :is="menuItem.children[0].meta.icon"></component></el-icon>
          <template v-slot:title>
            <span> {{ menuItem.children[0].meta?.label }}</span>
          </template>
        </el-menu-item>
        <!-- 一级菜单 -->
        <el-menu-item v-else :index="menuItem.name" :key="menuItem.name">
          <el-icon><component :is="menuItem.meta.icon"></component></el-icon>
          <template v-slot:title>
            <span>{{ menuItem.meta?.label }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { routesConfig } from '@/router/config';
import { Vue } from 'vue-class-component';
import { RouteRecordRaw } from 'vue-router';

export default class MyNavMenu extends Vue {
  menus: Array<RouteRecordRaw> = []; // 菜单
  defaultOpeneds = [];
  isCollapse = false;

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
    this.menus = [...routesConfig].filter((routeItem) => !routeItem.meta?.hidden);
  }
}
</script>
<style lang="scss" scoped></style>
