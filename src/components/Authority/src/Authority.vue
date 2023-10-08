<template></template>

<script lang="ts" name="Authority" setup>
import { defineProps, withDefaults } from 'vue';

interface Props {
  authority?:string;
}

const props = withDefaults(defineProps<Props>, {
  authority: ''
})


</script>
