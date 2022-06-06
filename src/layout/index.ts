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
