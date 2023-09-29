<template>
    <div>
        <span>{{ vm.tips }}</span>
    </div>
</template>


<script lang="ts" setup>

import {reactive} from 'vue';


  
const vm = reactive({
    tips: '暂无权限，请联系管理员222'
})


</script>