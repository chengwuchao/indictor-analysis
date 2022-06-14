<template>
  <div class="tree-container" ref="container">
    <svg class="svg vue-tree" ref="svg" :style="initialTransformStyle"></svg>
    <div class="dom-container" ref="domContainer" :style="initialTransformStyle">
      <transition-group name="tree-node-item" tag="div">
        <div
          class="node-slot"
          v-for="(node, index) of nodeDataList"
          @click="onClickNode(index)"
          :key="node.data._key"
          :style="{
            left: formatDimension(direction === Direction.VERTICAL ? node.x : node.y),
            top: formatDimension(direction === Direction.VERTICAL ? node.y : node.x),
            width: formatDimension(config.nodeWidth),
            height: formatDimension(config.nodeHeight),
          }"
        >
          <slot name="node" v-bind:node="node.data" v-bind:collapsed="node.data._collapsed" v-bind:index="index">
            <!-- 默认展示value字段 -->
            <span>{{ node.data.value }}</span>
          </slot>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import TreeChartCore, {
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_LEVEL_HEIGHT,
  TreeLinkStyle,
  Direction,
  TreeDataset,
} from '@ssthouse/tree-chart-core';
import { Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

const formatDimension = (dimension: string | number) => {
  if (typeof dimension === 'number') return `${dimension}px`;
  if (dimension.indexOf('px') !== -1) {
    return dimension;
  } else {
    return `${dimension}px`;
  }
};

export default class VueTree extends Vue {
  @Prop({
    default: () => {
      return {
        nodeWidth: DEFAULT_NODE_WIDTH,
        nodeHeight: DEFAULT_NODE_HEIGHT,
        levelHeight: DEFAULT_LEVEL_HEIGHT,
      };
    },
  })
  config!: object;

  @Prop({
    default: TreeLinkStyle.CURVE,
  })
  linkStyle!: TreeLinkStyle;

  @Prop({
    default: Direction.VERTICAL,
  })
  direction!: Direction;

  @Prop({ default: true })
  collapseEnabled!: boolean;

  @Prop()
  dataset!: object | [];

  formatDimension = formatDimension;
  Direction = Direction;
  treeChartCore: TreeChartCore = {} as unknown as TreeChartCore;
  nodeDataList: unknown[] = [];
  initialTransformStyle = {};

  @Watch('dataset', { deep: true })
  updateDataSet() {
    this.treeChartCore.updateDataset(this.dataset);
    this.nodeDataList = this.treeChartCore.getNodeDataList();
  }

  init() {
    this.treeChartCore = new TreeChartCore({
      svgElement: this.$refs.svg as SVGElement,
      domElement: this.$refs.domContainer as HTMLDivElement,
      treeContainer: this.$refs.container as HTMLDivElement,
      dataset: this.dataset as TreeDataset,
      direction: this.direction as Direction,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      treeConfig: this.config as any,
      collapseEnabled: this.collapseEnabled,
      linkStyle: this.linkStyle as TreeLinkStyle,
    });
    this.treeChartCore.init();
    this.nodeDataList = this.treeChartCore.getNodeDataList();
    this.initialTransformStyle = this.treeChartCore.getInitialTransformStyle();
  }
  updateDataset(dataset: TreeDataset) {
    this.treeChartCore.updateDataset(dataset);
  }
  zoomIn() {
    this.treeChartCore.zoomIn();
  }
  zoomOut() {
    this.treeChartCore.zoomOut();
  }
  restoreScale() {
    this.treeChartCore.setScale(1);
  }
  onClickNode(index: number) {
    this.treeChartCore.onClickNode(index);
    this.nodeDataList = this.treeChartCore.getNodeDataList();
  }

  mounted() {
    this.init();
    console.log(JSON.parse(JSON.stringify(this.dataset)));
  }
  beforeUnmount() {
    // remove dom reference
    this.treeChartCore.destroy();
  }
}
</script>

<style lang="scss">
.tree-container {
  .node {
    fill: grey !important;
  }

  .link {
    stroke-width: 2px !important;
    fill: transparent !important;
    stroke: #cecece !important;
  }
}
</style>

<style lang="scss" scoped>
.tree-node-item-enter,
.tree-node-item-leave-to {
  transition-timing-function: ease-in-out;
  transition: transform 0.8s;
  opacity: 0;
}

.tree-node-item-enter-active,
.tree-node-item-leave-active {
  transition-timing-function: ease-in-out;
  transition: all 0.8s;
}

.tree-container {
  position: relative;
  overflow: hidden;

  .vue-tree {
    position: relative;
  }

  > svg,
  .dom-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible;
    transform-origin: 0 50%;
  }

  .dom-container {
    z-index: 1;
    pointer-events: none;
  }
}

.node-slot {
  cursor: pointer;
  pointer-events: all;
  position: absolute;
  background-color: transparent;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  transition: all 0.8s;
  transition-timing-function: ease-in-out;
}
</style>
