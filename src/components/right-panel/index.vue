<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="handle-button" :style="{ top: '200px' }" @click="handlePreview">
        <el-tooltip :content="isPreview ? '编辑' : '预览'" placement="left">
          <i :class="isPreview ? 'el-icon-edit-outline' : 'el-icon-view'" />
        </el-tooltip>
      </div>

      <div class="handle-button" :style="{ top: buttonTop + 'px' }" @click="show = !show">
        <i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
      </div>
      <!-- <div class="handle-button" :style="{ top: '200px' }">
        <svg-icon icon-class="preview" />
      </div> -->
      <div class="handle-button" :style="{ top: '300px' }" @click.stop="$emit('markdown')">
        <el-tooltip content="导出.md文件" placement="left">
          <svg-icon icon-class="markdown" />
        </el-tooltip>
      </div>

      <div class="handle-button" :style="{ top: '350px' }" @click.stop="$emit('pdf')">
        <el-tooltip content="导出.pdf文件" placement="left">
          <svg-icon icon-class="pdf" />
        </el-tooltip>
      </div>

      <div class="handle-button" :style="{ top: '400px' }" @click.stop="$emit('html')">
        <el-tooltip content="导出.html文件" placement="left">
          <i class="el-icon-download" />
        </el-tooltip>
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightPanel',
  props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  data() {
    return {
      show: false,
      isPreview: false
    }
  },

  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addEventClick()
      }
    }
  },
  mounted() {
    this.insertToBody()
  },
  beforeDestroy() {
    const elx = this.$refs.rightPanel
    elx.remove()
  },
  methods: {
    handlePreview() {
      this.isPreview = !this.isPreview
      this.$emit('view', this.isPreview)
    },
    addEventClick() {
      window.addEventListener('click', this.closeSidebar)
    },
    closeSidebar(evt) {
      const parent = evt.target.closest('.rightPanel')
      if (!parent) {
        this.show = false
        window.removeEventListener('click', this.closeSidebar)
      }
    },
    insertToBody() {
      const elx = this.$refs.rightPanel
      const body = document.querySelector('body')
      body.insertBefore(elx, body.firstChild)
    }
  }
}
</script>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 320px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 2000;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 1999;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 28px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  background: #3e86fa;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
