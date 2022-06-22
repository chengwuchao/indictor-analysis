<template>
  <el-dialog :model-value="show" title="Tips" width="90%" :before-close="handleClose" :close-on-click-modal="false">
    <div class="container" v-if="showTree">
      <vue-tree
        @click="vueTreeClick"
        style="height: 600px; border: 1px solid gray"
        :dataset="richMediaData"
        :config="treeConfig"
        ref="vueTreeRef"
      >
        <template v-slot:node="{ node, collapsed, index }">
          <el-popover
            v-if="node.categoryList && node.categoryList.length"
            placement="bottom"
            :width="200"
            :visible="node.popoverVisible"
            popper-class="popover-category"
            trigger="click"
          >
            <template #reference>
              <div
                class="rich-media-node"
                @click="onClickNode($event, node, index)"
                :style="{ border: collapsed ? '2px solid grey' : '' }"
              >
                <div
                  class="text-center rich-media-node__content"
                  :class="{ 'has-next': node.categoryList && node.categoryList.length }"
                >
                  <div style="padding: 4px 0; font-weight: bold">{{ node.name }}</div>
                  <div>
                    <span class="text-success mr-md">{{ Number((node.proportion || 0) * 100).toFixed(2) }}%</span>
                    <span class="text-grey">{{ Number((node.growth || 0) * 100).toFixed(2) }}%</span>
                  </div>
                </div>
                <div class="details-link" @click="showDetails(node)" v-if="node.popoverVisible">
                  <a href="javascript:void(0)">
                    <Icon icon="ant-design:line-chart-outline" />
                  </a>
                </div>
              </div>
            </template>
            <div
              class="text-center"
              :class="['category_' + node.categoryList.length]"
              v-if="node.categoryList && node.categoryList.length"
            >
              <template v-for="(categoryItem, index) in node.categoryList" :key="categoryItem.value">
                <span class="category-item" :class="['item_' + (index + 1)]" @click="expandNext(categoryItem, index)">{{
                  categoryItem.label
                }}</span>
              </template>
            </div>
          </el-popover>
          <template v-else>
            <div
              class="rich-media-node"
              @click="onClickNode($event, node, index)"
              :style="{ border: collapsed ? '2px solid grey' : '' }"
            >
              <div
                class="text-center rich-media-node__content"
                :class="{ 'has-next': node.categoryList && node.categoryList.length }"
              >
                <div style="padding: 4px 0; font-weight: bold">{{ node.name }}</div>
                <div>
                  <span class="text-success mr-md">{{ Number((node.proportion || 0) * 100).toFixed(2) }}%</span>
                  <span class="text-grey">{{ Number((node.growth || 0) * 100).toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </template>
        </template>
      </vue-tree>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Emit, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { TreeNode, treeNodeData } from './data';

export default class IndictorsDialog extends Vue {
  @Prop({ type: Boolean, default: false }) show!: boolean;

  richMediaData: TreeNode = {} as TreeNode;
  treeConfig = { nodeWidth: 180, nodeHeight: 80, levelHeight: 200 };
  showTree = false;
  curNode = {} as any;
  curNodeIndex = 0;
  categoryItem = {} as any;
  formInline = {
    dateRange: [],
    institution: '',
    channel: '',
    product: '',
  };

  @Ref('vueTreeRef') vueTreeRef!: any;

  @Watch('show', { immediate: true })
  showChange(newVal: boolean) {
    if (newVal) {
      this.$nextTick(() => {
        this.showTree = true;
      });
    }
  }

  @Emit('update:show')
  updateShow() {
    return false;
  }

  handleClose() {
    this.updateShow();
  }

  onClickNode(evt: MouseEvent, node: any, index: number) {
    if (this.curNode) {
      this.curNode.popoverVisible = false;
    }

    this.curNodeIndex = index;
    this.curNode = node;
    node.popoverVisible = true;
    evt.stopPropagation();
  }

  expandNext(category: any) {
    this.curNode._children = category.data;
    this.curNode.children = null;
    this.curNode._collapsed = true;
    this.vueTreeRef.onClickNode(this.curNodeIndex);
    this.curNode.popoverVisible = false;
  }

  vueTreeClick() {
    this.curNode.popoverVisible = false;
  }

  beforeMount() {
    document.addEventListener('click', () => {
      this.curNode.popoverVisible = false;
    });

    this.formatTreeData(JSON.parse(JSON.stringify(treeNodeData)));
    this.richMediaData = treeNodeData;
  }

  formatTreeData(node: TreeNode) {
    if (node == null) {
      return;
    }

    if (node.children && node.children.length) {
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
}
</script>

<style lang="scss">
@import '@/styles/variable.scss';
$category-item-width: 60px;
.popover-category {
  visibility: hidden !important;
  top: -15px !important;
  .category-item {
    display: inline-block;
    width: $category-item-width;
    height: $category-item-width;
    line-height: $category-item-width;
    border-radius: 50%;
    color: #fff;
    position: relative;
    font-size: 14px;
    visibility: visible;
    background: #1569a5e8;
    &:hover {
      cursor: pointer;
      @extend .bg-blue;
    }
  }

  .category_3 {
    & > .item_1 {
      right: 10px;
    }

    & > .item_2 {
      top: 30px;
    }

    & > .item_3 {
      left: 10px;
    }
  }

  .category_2 {
    & > .item_1 {
      right: 15px;
    }
    & > .item_2 {
      left: 15px;
    }
  }
}
</style>

<style lang="scss" scoped>
container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rich-media-node {
  position: relative;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 4px;
  .rich-media-node__content {
    background: #bad7efcf;
    &.has-next {
      background: #345b7b;
      color: white;
    }
    width: 140px;
    height: 50px;
  }
}

.details-link {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -48px;
  padding: 4px 8px;
  border: 1px solid #345b7b;
  font-size: 25px;
  border-radius: 4px;

  a {
    color: #345b7b;
  }
}
</style>
