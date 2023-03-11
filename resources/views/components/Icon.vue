<script setup>

const props = defineProps(['name', 'size', 'color', 'shade', 'classes'])
let shade = (props.shade) ? ("-" + props.shade) : '';
const classList = "bi bi-" + props.name  + " text-" + props.color +
    shade + " " + props.classes
const size = "font-size: " + props.size + "px"

</script>

<template>

    <i :class="classList" :style="size"></i>

</template>
