<template>
  <div v-html="value" class="md-preview-area"></div>
</template>
<script>
export default {
  name: 'PreviewArea',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.md-preview-area {
  height: calc(100vh - 64px);
  overflow: scroll;
  padding: 30px 55px;
}
</style>
