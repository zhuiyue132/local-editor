<template>
  <svg class="icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup>
  import { computed } from 'vue';
  const props = defineProps({
    href: {
      type: String,
      default: 'A27'
    },
    className: {
      type: String,
      default: ''
    }
  });
  const iconName = computed(() => `#icon-${props.href}`);
</script>
