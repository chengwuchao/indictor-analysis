
import VueTree from './src/VueTree.vue'

export default {
    install: (Vue: any) => {
        Vue.component('vue-tree', VueTree);
    }
}