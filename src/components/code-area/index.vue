<template>
  <div>
    <div class="md-code-area" ref="ace"></div>
    <el-popover placement="top-start" width="300" class="hotkey-icon" trigger="hover">
      <div>这里是快捷键提示</div>
      <svg-icon slot="reference" icon-class="hotkey" class-name="hotkey-icon" />
    </el-popover>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
import Ace from 'ace-builds'
import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入
import { mapState } from 'vuex'

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
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      fontSize: state => +state.settings.fontSize,
      showGutter: state => state.settings.showGutter
    })
  },
  watch: {
    theme(val) {
      this.ace.setTheme(val)
    },
    fontSize(val) {
      this.ace.setFontSize(val)
    },
    showGutter(val) {
      this.ace.renderer.setShowGutter(val)
    }
  },
  mounted() {
    console.log('Ace :>> ', Ace)
    this.ace = Ace.edit(this.$refs.ace, {
      autoScrollEditorIntoView: true,
      copyWithEmptySelection: true,
      tabSize: 2,
      selectionStyle: 'text',
      wrap: true,
      useSoftTabs: true,
      fontSize: this.fontSize, // 编辑器内字体大小
      showGutter: this.showGutter,
      value: this.value ? this.value : ''
    })

    this.ace.setTheme(this.theme)

    this.ace.getSession().setMode('ace/mode/markdown')
    this.ace.renderer.setShowPrintMargin(false)

    const handleChangeEvent = debounce(this.handleOnChange, 300)
    this.ace.getSession().on('change', handleChangeEvent)

    // this.ace.getSession().selection.on('changeCursor', () => {
    //   this.$emit('changeCursor', this.ace.getCursorPosition())
    // })

    this.ace.getSession().on('changeScrollTop', () => {
      this.$emit('changeScrollTop', {
        row: this.ace.renderer.getFirstFullyVisibleRow(),
        column: 0
      })
    })
    // 保存编辑器实例
    this.$store.commit('SET_EDITOR', this.ace)
  },
  methods: {
    handleOnChange() {
      this.$emit('change', this.getValue())
    },
    handleInsert() {},
    getTextRange() {
      if (!this.ace) return ''
      return this.ace.session.getTextRange(this.ace.getSelectionRange())
    },
    /**
     * 当传入行号时，返回对应行号的value
     * 否则，返回全部的value
     */
    getValue(row) {
      if (!this.ace) return ''
      if (row !== undefined) return this.ace.getSession().getLine(row)
      return this.ace.getSession().getValue()
    }
  }
}
</script>
<style lang="scss" scoped>
.md-code-area {
  height: calc(100vh - 54px);
  overflow-y: auto;
  overflow-x: hidden;
}
.hotkey-icon {
  position: fixed;
  font-size: 20px;
  bottom: 10px;
  left: 51%;
  z-index: 9999;
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin: 0 8px;
}
</style>
