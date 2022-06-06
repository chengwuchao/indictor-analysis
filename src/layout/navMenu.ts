import { Vue } from 'vue-class-component';
import { routesConfig } from '@/router/config';
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
    console.log(this.menus);
  }
}
