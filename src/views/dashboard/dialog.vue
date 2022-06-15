<template>
  <el-dialog
    :model-value="dialogVisible"
    title="Tips"
    width="90%"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
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
import { Vue } from 'vue-class-component';
import { Emit, PropSync, Watch } from 'vue-property-decorator';
import data, { TreeNode } from './data';

declare global {
  interface Window {
    mouseEvent: MouseEvent;
    analytics: any;
  }
}

interface Contextstyle {
  top: string;
  left: string;
  right: string;
  bottom?: string;
  display: string;
}

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
  treeConfig = { nodeWidth: 120, nodeHeight: 45, levelHeight: 200 };
  showTree = false;
  contextstyle: Contextstyle = {
    display: 'none',
    right: '0px',
    top: '0px',
    left: '0px',
    bottom: '0px',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickNode(evt: MouseEvent, node: any, index: string | number) {
    console.log([node, index]);
    console.log(evt);
    console.log(window);
    if (evt.x + 188 > document.documentElement.clientWidth) {
      this.contextstyle.left = 'unset';
      this.contextstyle.right = document.documentElement.clientWidth - evt.x + 'px';
    } else {
      this.contextstyle.left = evt.x + 'px';
    }
    if (evt.y + 166 > document.documentElement.clientHeight) {
      this.contextstyle.top = 'unset';
      this.contextstyle.bottom = document.documentElement.clientHeight - evt.y + 'px';
    } else {
      this.contextstyle.top = evt.y + 'px';
    }
    this.contextstyle.display = 'block';

    evt.stopPropagation();
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

  clickDialog() {
    if (this.contextstyle.display == 'block') {
      this.contextstyle.display = 'none';
    }
  }

  created() {
    document.addEventListener('click', (event) => {
      if (this.contextstyle.display == 'block') {
        this.contextstyle.display = 'none';
      }
    });
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
