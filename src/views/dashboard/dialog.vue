<template>
  <el-dialog :model-value="show" title="Tips" width="90%" :before-close="handleClose" :close-on-click-modal="false">
    <div class="container" v-if="showTree">
      <vue-tree
        @click="clickDialog"
        style="height: 600px; border: 1px solid gray"
        :dataset="richMediaData"
        :config="treeConfig"
        ref="vueTreeRef"
      >
        <template v-slot:node="{ node, collapsed, index }">
          <div
            class="rich-media-node"
            @click="onClickNode($event, node, index)"
            :style="{ border: collapsed ? '2px solid grey' : '' }"
          >
            <span style="padding: 4px 0; font-weight: bold">{{ node.name }}</span>
          </div>
        </template>
      </vue-tree>

      <div class="gl_prs_ctn" :style="[contextstyle]">
        <ul class="gl_prs_li">
          <li>添加</li>
          <li>详情</li>
          <li>编辑</li>
          <li>删除</li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Emit, Prop, Ref, Vue, Watch } from 'vue-property-decorator';

export default class IndictorsDialog extends Vue {
  @Prop({ type: Boolean, default: false }) show!: boolean;

  richMediaData = null;
  treeConfig = { nodeWidth: 180, nodeHeight: 80, levelHeight: 200 };
  showTree = false;
  curNode = null;
  curNodeIndex = 0;
  categoryItem = null;
  formInline = {
    dateRange: [],
    institution: '',
    channel: '',
    product: '',
  };

  @Ref('vueTreeRef') vueTreeRef!: any;

  @Watch('show', { immediate: true })
  showChange(newVal, oldVal) {}

  @Emit('update:show')
  updateShow() {
    return false;
  }

  handleClose() {
    this.updateShow();
  }
}
</script>

<style lang="scss" scoped>
container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
}

.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
.gl_prs_ctn {
  width: 188px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(102, 175, 233, 0.6) 0px 0px 8px;
  z-index: 99999;
  position: fixed;
  padding: 10px;
  box-sizing: content-box;
  height: 142px;
}
.gl_prs_li {
  padding: unset;
  margin: unset;
}
.gl_prs_li > li {
  cursor: pointer;
  list-style: none;
  border-bottom: 1px solid #efefef;
  padding: 7px 10px;
}
li:last-child {
  border: unset;
}
li:hover {
  background: #ccc;
  color: #fff;
}
</style>
