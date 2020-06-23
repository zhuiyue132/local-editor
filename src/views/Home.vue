<template>
  <div class="home">
    <el-container>
      <el-header class="md-header">
        <el-tooltip v-for="icon in icons" :key="icon.iconName" :content="icon.iconName">
          <svg-icon class-name="header-icon" :icon-class="icon.icon"></svg-icon>
        </el-tooltip>

        <el-dropdown v-if="showDropdownBtn" class="" style="cursor: pointer;">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down header-icon" style="font-size: 20px; font-weight: bold;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="icon in iconreset" :key="icon.iconName">
              <svg-icon class-name="header-icon" :icon-class="icon.icon" /> {{ icon.iconName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main class="md-main">
        <code-area v-model="codeStr" class="area-item" />
        <el-divider class="area-split-line" direction="vertical" />
        <preview-area :value="parsedHtml" class="area-item" />
      </el-main>
    </el-container>

    <right-panel>
      <settings />
    </right-panel>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

import CodeArea from '@/components/code-area'
import PreviewArea from '@/components/preview-area'
import RightPanel from '@/components/right-panel'
import Settings from '@/components/settings'
import icons from '@/config'
import { on } from '@/util'
import Markdown from 'markdown-it'

const mkd = new Markdown({
  html: true,
  highlight: (str, lang) => {
    // 加上custom则表示自定义样式，而非微信专属，避免被remove pre
    if (lang && hljs.getLanguage(lang)) {
      try {
        const formatted = hljs
          .highlight(lang, str, true)
          .value.replace(/\n/g, '<br/>') // 换行用br表示
          .replace(/\s/g, '&nbsp;') // 用nbsp替换空格
          .replace(/span&nbsp;/g, 'span ') // span标签修复
        return `<pre class="custom"><code class="hljs">${formatted}</code></pre>`
      } catch (e) {
        throw Error(e)
      }
    }
    return `<pre class="custom"><code class="hljs">${str}</code></pre>`
  }
})
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-task-checkbox'))

export default {
  name: 'Home',
  components: {
    CodeArea,
    PreviewArea,
    RightPanel,
    Settings
  },
  data() {
    return {
      PADDING: 40,
      SINGLE_ICON_WIDTH: 36,
      icons: [],
      iconreset: [],
      showDropdownBtn: false,
      codeStr: '# 1',
      parsedHtml: null
    }
  },
  watch: {
    codeStr: {
      immediate: true,
      handler(value) {
        this.parsedHtml = mkd.render(value)
      }
    }
  },
  created() {
    const resize = debounce(this.handleResize, 10)
    this.handleResize()
    on(window, 'resize', resize)
  },

  methods: {
    handleResize() {
      const { innerWidth } = window
      if (innerWidth > icons.length * this.SINGLE_ICON_WIDTH + this.PADDING) {
        this.icons = [...icons]
        this.showDropdownBtn = false
      } else {
        const iconNum = Math.floor((innerWidth - this.PADDING - 16) / this.SINGLE_ICON_WIDTH)
        this.icons = [...icons].splice(0, iconNum)
        this.showDropdownBtn = true
        this.iconreset = [...icons].splice(iconNum)
      }
    },
    parseCodeStr() {
      return mkd.render(this.codeStr)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .md-header {
    line-height: 50px;
    height: 50px !important;
    width: 100vw;
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
    > .md-input-base {
      margin-left: 20px;
    }
    .header-icon {
      cursor: pointer;
      height: 20px;
      width: 20px;
      margin: 0 8px;
      &:nth-child(1) {
        margin-left: 0;
      }
      &:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
  .md-main {
    padding: 0;
    padding-top: 54px;
    box-sizing: border-box;
    display: flex;
    .area-item {
      flex: 1;
      min-height: calc(100vh - 54px);
    }
    .area-split-line {
      height: calc(100vh - 54px);
    }
  }
}
</style>
