<template>
  <div
    v-if="isExternalLink"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$attrs"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue';
interface Props {
  iconClass?: boolean;
  className?: string;
}


const props = withDefaults(defineProps<Props>, {
   iconClass: true,
   className: ''
})


const isExternalLink = computed(() => {
  return false;
});

const iconName = computed(() => {
  return `#icon-${props.iconClass}`;
});

const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className;
  } else {
    return 'svg-icon';
  }
});

const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.iconClass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
  };
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
