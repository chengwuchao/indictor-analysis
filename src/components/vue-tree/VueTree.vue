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
            left: formatDimension(direction === DirectionEnums.VERTICAL ? node.x : node.y),
            top: formatDimension(direction === DirectionEnums.VERTICAL ? node.y : node.x),
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

<script lang="ts" setup>
import TreeChartCore, {
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_LEVEL_HEIGHT,
  TreeLinkStyle,
  Direction,
  TreeDataset,
} from '@ssthouse/tree-chart-core';
import { defineProps, toRefs, onBeforeUnmount, onMounted, ref, defineExpose, reactive, unref } from 'vue';

const props = defineProps({
  config: {
    type: Object,
    default: () => {
      return {
        nodeWidth: DEFAULT_NODE_WIDTH,
        nodeHeight: DEFAULT_NODE_HEIGHT,
        levelHeight: DEFAULT_LEVEL_HEIGHT,
      };
    },
  },
  linkStyle: {
    type: String,
    default: TreeLinkStyle.CURVE,
  },
  direction: {
    type: String,
    default: Direction.VERTICAL,
  },
  collapseEnabled: {
    type: Boolean,
    default: true,
  },
  dataset: {
    type: [Object, Array],
    default: () => {
      return {};
    },
  },
});

const DirectionEnums = ref(Direction);
const svg = ref(null);
const domContainer = ref(null);
const container = ref(null);

let state = reactive<{
  treeChartCore: any;
  nodeDataList: any;
  initialTransformStyle: {};
}>({
  treeChartCore: {},
  nodeDataList: [],
  initialTransformStyle: {},
});

const formatDimension = (dimension: string | number) => {
  if (typeof dimension === 'number') return `${dimension}px`;
  if (dimension.indexOf('px') !== -1) {
    return dimension;
  } else {
    return `${dimension}px`;
  }
};

// @Watch('dataset', { deep: true })
// updateDataSet() {
//   treeChartCoreValue.updateDataset(this.dataset);
//   this.nodeDataList = this.treeChartCore.getNodeDataList();
// }

function init() {
  state.treeChartCore = new TreeChartCore({
    svgElement: svg.value as unknown as SVGAElement,
    domElement: domContainer.value as unknown as HTMLDivElement,
    treeContainer: container.value as unknown as HTMLDivElement,
    dataset: props.dataset as TreeDataset,
    direction: props.direction as Direction,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    treeConfig: props.config as any,
    collapseEnabled: props.collapseEnabled,
    linkStyle: props.linkStyle as TreeLinkStyle,
  });
  state.treeChartCore.init();
  state.nodeDataList = state.treeChartCore.getNodeDataList();
  state.initialTransformStyle = state.treeChartCore.getInitialTransformStyle();
}
function updateDataset(dataset: TreeDataset) {
  state.treeChartCore.updateDataset(dataset);
}
function zoomIn() {
  state.treeChartCore.zoomIn();
}
function zoomOut() {
  state.treeChartCore.zoomOut();
}
function restoreScale() {
  state.treeChartCore.setScale(1);
}
function onClickNode(index: number) {
  state.treeChartCore.onClickNode(index);
  state.nodeDataList = state.treeChartCore.getNodeDataList();
}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  state.treeChartCore.destroy();
});

defineExpose({
  updateDataset,
  zoomIn,
  zoomOut,
  restoreScale,
  onClickNode,
});
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
