<template>
  <el-dialog :model-value="dialogVisible" title="Tips" width="90%" :before-close="handleClose">
    <div><el-button @click="showTree = true">显示 tree</el-button></div>
    <div class="container" v-if="showTree">
      <vue-tree
        style="height: 600px; border: 1px solid gray"
        :dataset="richMediaData"
        :config="treeConfig"
        ref="vueTreeRef"
      >
        <template v-slot:node="{ node, collapsed, index }">
          <div
            class="rich-media-node"
            @click="onClickNode(node, index)"
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
import { Vue } from 'vue-class-component';
import { Emit, PropSync, Watch } from 'vue-property-decorator';
import data, { TreeNode } from './data';

export default class IndictorsDialog extends Vue {
  @PropSync('show', { default: false }) dialogVisible!: boolean;

  @Watch('show', { immediate: true })
  showChanged(newVal: boolean) {
    if (newVal) {
      this.$nextTick(() => {
        this.showTree = true;
      });
    }
  }

  richMediaData: TreeNode = {} as TreeNode;
  treeConfig = { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 };
  showTree = false;
  contextstyle: any = {};
  window!: Window;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickNode(node: any, index: string | number) {
    console.log([node, index]);
    console.log(this.$refs.vueTreeRef);
    const { window } = this;
    if (window.event.x + 188 > document.documentElement.clientWidth) {
      this.contextstyle.left = 'unset';
      this.contextstyle.right = document.documentElement.clientWidth - window.event.x + 'px';
    } else {
      this.contextstyle.left = window.event.x + 'px';
    }
    if (window.event.y + 166 > document.documentElement.clientHeight) {
      this.contextstyle.top = 'unset';
      this.contextstyle.bottom = document.documentElement.clientHeight - window.event.y + 'px';
    } else {
      this.contextstyle.top = window.event.y + 'px';
    }
    this.contextstyle.display = 'block';
  }

  formatTreeData(node: TreeNode) {
    if (node == null) {
      return;
    }

    if (node.children && node.children.length) {
      // 复制 node.children
      node._children = JSON.parse(JSON.stringify(node.children));
      node.children = undefined;
      node._collapsed = true;
      if (node._children) {
        node._children.forEach((child) => {
          this.formatTreeData(child);
        });
      }
    }
  }

  @Emit('update:show')
  handleClose() {
    return false;
  }

  beforeMount() {
    this.formatTreeData(data);
    this.richMediaData = data;
  }

  mounted() {}
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
</style>
