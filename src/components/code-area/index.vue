<template>
  <div class="md-code-area" ref="ace"></div>
</template>
<script>
import Ace from 'ace-builds'
import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入

export default {
  name: 'CodeArea',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      ace: null
    }
  },
  mounted() {
    console.log('Ace :>> ', Ace)
    this.ace = Ace.edit(this.$refs.ace, {
      autoScrollEditorIntoView: true,
      copyWithEmptySelection: true,
      fontSize: 16, // 编辑器内字体大小
      tabSize: 2,
      selectionStyle: 'text',
      wrap: true,
      value: this.value ? this.value : ''
    })
    this.ace.setTheme('ace/theme/chrome')
    this.ace.getSession().setMode('ace/mode/markdown')
    this.ace.renderer.setShowPrintMargin(false)
    this.ace.getSession().on('change', this.handleOnChange)
  },
  methods: {
    handleOnChange() {
      this.$emit('change', this.ace.getSession().getValue())
    }
  }
}
</script>
<style lang="scss" scoped>
.md-code-area {
  height: calc(100vh - 64px);
  overflow: scroll;
}
</style>
