<template>
  <div class="home">
    <el-container>
      <el-header class="md-header">
        <template v-for="(icon, index) in icons">
          <el-tooltip v-if="!icon.extraComponentName" :key="icon.iconName" :content="icon.iconName">
            <svg-icon
              :style="{ marginLeft: index === 0 ? '0' : '8px', marginRight: index === icons.length - 1 ? '0' : '8px' }"
              class-name="header-icon"
              :icon-class="icon.icon"
              @click="handleHeaderIconClick(icon)"
            />
          </el-tooltip>

          <el-popover v-else :key="icon.iconName" ref="pop" placement="top-start" width="230" trigger="hover">
            <component :is="icon.extraComponentName" @assit="handleAssit" />
            <svg-icon
              class-name="header-icon"
              :style="{ marginLeft: index === 0 ? '0' : '8px', marginRight: index === icons.length - 1 ? '0' : '8px' }"
              slot="reference"
              :icon-class="icon.icon"
            />
          </el-popover>
        </template>

        <el-dropdown v-if="showDropdownBtn" @command="handleHeaderIconClick" style="cursor: pointer;">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down header-icon" style="font-size: 20px; font-weight: bold;" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="icon in iconreset" :command="icon" :key="icon.iconName">
              <svg-icon class-name="header-icon" :icon-class="icon.icon" /> {{ icon.iconName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main class="md-main">
        <code-area v-model="codeStr" ref="code" class="area-item" />
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
/* eslint-disable no-case-declarations */

import debounce from 'lodash/debounce'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

import CodeArea from '@/components/code-area'
import PreviewArea from '@/components/preview-area'
import RightPanel from '@/components/right-panel'
import Settings from '@/components/settings'
import TableSizeSelector from '@/components/table-size-selector'
import LinkAssitor from '@/components/link-assitor'
import icons from '@/config'
import { on, setCode, getCode, isFirstEntry, FIRST_ENTRY_KEY } from '@/util'
import Markdown from 'markdown-it'
import templateCode from '@/config/template'

const mkd = new Markdown({
  html: true,
  highlight: (str, lang) => {
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
    Settings,
    TableSizeSelector,
    LinkAssitor
  },
  data() {
    return {
      PADDING: 40,
      SINGLE_ICON_WIDTH: 36,
      icons: [],
      iconreset: [],
      showDropdownBtn: false,
      codeStr: '',
      parsedHtml: null
    }
  },
  watch: {
    codeStr: {
      handler(value) {
        this.parsedHtml = mkd.render(value)
        setCode(value)
      }
    }
  },
  created() {
    const resize = debounce(this.handleResize, 10)
    this.handleResize()
    on(window, 'resize', resize)

    if (isFirstEntry()) {
      this.codeStr = templateCode
    } else if (getCode()) {
      this.codeStr = getCode()
    } else {
      this.codeStr = ''
    }

    window.localStorage.setItem(FIRST_ENTRY_KEY, 1)
  },

  methods: {
    handleAssit(data = {}) {
      console.log('data :>> ', data)
      this.$refs.pop[0].doClose()
      const { type, col, row } = data
      switch (type) {
        case 'table':
          let th = 'title1'
          let tableSeparate = '---'
          let rt = 'text1'
          for (let index = 2; index <= col; index++) {
            th += `|title${index}`
            tableSeparate += '|---'
            rt += `|text${index}`
          }
          const tempRt = rt
          for (let index = 2; index <= row; index++) {
            rt += `
${tempRt}`
          }
          const ret = `
${th}  
${tableSeparate}
${rt}

`
          console.log('ret :>> ', ret)
          this.$refs.code.ace.insert(ret)
          break

        default:
          break
      }
    },

    // eslint-disable-next-line consistent-return
    handleHeaderIconClick({ template, callback, isSymmetrical, defaultTemplate }) {
      if (callback) return callback()
      // 当前光标包裹了内容，需要将选中的内容，用对称标签 重新包裹
      let ret = null
      if (isSymmetrical) {
        ret = defaultTemplate
        if (this.$refs.code.getTextRange()) {
          console.log('插入对称语法 :>> ', ` ${template}${this.$refs.code.getTextRange()}${template} `)
          ret = ` ${template}${this.$refs.code.getTextRange()}${template} `
        }
      } else {
        ret = template
        if (this.$refs.code.getTextRange()) {
          // 如果当前选中了内容，则把选中的也带入带编辑器中，否则新插入的内容会替换掉选中内容
          console.log('插入非对称语法 :>> ', ` ${template}${this.$refs.code.getTextRange()} `)
          ret = `${this.$refs.code.getTextRange()}${template} `
        }
      }

      this.$refs.code.ace.insert(ret)
    },
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
    }
  }
  .md-main {
    padding: 0;
    padding-top: 54px;
    display: flex;
    .area-item {
      width: calc(50vw - 1px);
      min-height: calc(100vh - 54px);
    }
    .area-split-line {
      height: calc(100vh - 54px);
    }
  }
}
</style>
