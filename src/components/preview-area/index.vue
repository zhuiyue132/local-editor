<template>
  <div class="md-preview-area">
    <github-corner style="position: absolute; top: 50px; border: 0; right: 0;"></github-corner>
    <div v-html="value"></div>
  </div>
</template>
<script>
import githubCorner from '../github-corner'

export default {
  name: 'PreviewArea',
  components: {
    githubCorner
  },
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
  padding: 20px 50px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
