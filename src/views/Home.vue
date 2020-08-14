<template>
  <div class="home" @dragover.prevent.stop="handleDragover">
    <el-container>
      <el-header class="md-header">
        <template v-for="(icon, index) in icons">
          <el-tooltip v-if="!icon.extraComponentName" :key="icon.iconName" :content="icon.iconName">
            <svg-icon
              :style="{
                marginLeft: index === 0 ? '0' : '8px',
                marginRight: index === icons.length - 1 ? '0' : '8px'
              }"
              class-name="header-icon"
              :icon-class="icon.icon"
              @click="handleHeaderIconClick(icon)"
            />
          </el-tooltip>

          <el-popover v-else :key="icon.iconName" ref="pop" placement="top-start" width="230" trigger="hover">
            <component :is="icon.extraComponentName" @assit="handleAssit" />
            <svg-icon
              class-name="header-icon"
              :style="{
                marginLeft: index === 0 ? '0' : '8px',
                marginRight: index === icons.length - 1 ? '0' : '8px'
              }"
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
        <code-area v-model="codeStr" ref="code" @changeScrollTop="debouncePositionChange" class="area-item" />
        <el-divider class="area-split-line" direction="vertical" />
        <preview-area :value="parsedHtml" class="area-item" />
      </el-main>
    </el-container>

    <right-panel @download:markdown="debounceDownloadMarkdown" @download:png="debounceDownloadPng">
      <settings />
    </right-panel>

    <el-upload
      drag
      :show-file-list="false"
      :style="{ zIndex: dragover ? 10001 : -1 }"
      action="https://upload.qiniup.com"
      :data="uploadParams"
      ref="upload"
      class="full-screen-upload"
      :accept="accept"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :before-upload="beforeUpload"
    >
      <template v-if="dragover">
        <div class="upload-tip">
          将文件拖到此处，松手即可完成上传
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script>
/* eslint-disable no-case-declarations */

import debounce from 'lodash/debounce'
import html2canvas from 'html2canvas'
import { mapState } from 'vuex'
import CodeArea from '@/components/code-area'
import PreviewArea from '@/components/preview-area'
import RightPanel from '@/components/right-panel'
import Settings from '@/components/settings'
import TableSizeSelector from '@/components/table-size-selector'
import LinkAssitor from '@/components/link-assitor'
import icons from '@/config'
import { on, setCode, getCode, isFirstEntry, FIRST_ENTRY_KEY } from '@/util'
import templateCode from '@/config/template'
import mkd from './mkd'
import canvas2image from '@/util/canvas2image.js'
import { generateQiniuToken } from '@/util/qiniu.token.js'
import qiniu from '@/config/qiniu'

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
      parsedHtml: null,
      dragover: false,
      accept: '.png,.jpg,.gif,.bmp,.jpeg',
      uploadParams: {
        token: ''
      }
    }
  },
  computed: {
    ...mapState({
      picBedStatus: state => state.settings.picBedStatus
    })
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
    this.uploadParams.token = generateQiniuToken()

    this.debounceDownloadPng = debounce(this.handleDownloadPng, 300)
    this.debounceDownloadMarkdown = debounce(this.handleDownloadMarkdown, 300)
    this.debouncePositionChange = debounce(this.handlePositionChange, 10)
  },

  mounted() {
    const element = document.getElementsByClassName('el-upload-dragger')[0]
    // TODO: off events
    on(element, 'dragleave', e => {
      e.stopPropagation()
      e.preventDefault()
      this.dragover = false
    })

    on(element, 'drop', e => {
      e.stopPropagation()
      e.preventDefault()
      console.log('e.dataTransfer.files:>> ', e.dataTransfer.files)
      if (!this.fileExtensionValidator(e.dataTransfer.files)) {
        this.$message.error('不支持该文件类型的上传')
        this.dragover = false
      }
    })
  },
  methods: {
    handleDragover() {
      if (!this.picBedStatus) return
      this.dragover = true
    },
    handlePositionChange(cursor = {}) {
      // 获取光标或者顶部第一行的行列数据
      const { ace } = this.$refs.code
      const topLineCodeVal = ace.getSession().getLine(cursor.row)

      // 将顶部第一行的codeVal 解析成 dom 元素
      const wrapper = document.createElement('div')
      wrapper.innerHTML = mkd.render(topLineCodeVal) // 此时还是个html格式的字符串
      const html = wrapper.firstChild
      if (!html || html.nodeName === '#text') return

      html.setAttribute('id', 'scrollTarget')
      html.style.display = 'none'
      document.body.appendChild(html)
      /**
       * 实际上采用的是字符串的对比，将解析成dom的val，拆出innerText进行对比
       */

      // 插入到dom中便于访问元素，并获取元素内部的innerText，用完后移除

      const innerText =
        html.children.length === 0
          ? html.innerText.trim()
          : [...document.getElementById('scrollTarget').querySelectorAll('*')]
              .find(item => item.children.length === 0)
              .innerText.trim()
      document.body.removeChild(html)

      const originPageY = ace.renderer.getScrollTop()
      const curPos = ace.renderer.textToScreenCoordinates(cursor.row, cursor.column)
      const prevPos = ace.renderer.textToScreenCoordinates(cursor.row - 1, cursor.column)
      // 编辑器的总高度 = 行高 x 总行数
      const totalHeight = ace.getSession().getLength() * Math.abs(prevPos.pageY - curPos.pageY)

      try {
        const includesTextList = [...document.querySelector('#previewArea > div').querySelectorAll('*')]
          // .filter(item => (item.innerText || '').indexOf(innerText) > -1)
          .filter(item => item.innerText === innerText && Boolean(item.innerText) && item.tagName === html.tagName)
          .filter(item => item.children.length <= 1)
        if (includesTextList.length > 0) {
          const s = (originPageY + curPos.pageY) / totalHeight
          const bodyHeight = document.body.offsetHeight
          const timeLine = includesTextList.sort((pushup, forSelector) => {
            const h = pushup.offsetTop / bodyHeight
            const d = forSelector.offsetTop / bodyHeight
            return Math.abs(s - h) - Math.abs(s - d)
          })
          const value = timeLine[0].offsetTop - curPos.pageY
          document.getElementById('previewArea').scrollTop = value
        }
      } catch (error) {
        console.log('autoscroll occured error :>> ', error)
      }
    },

    codeValueValidator() {
      if (!('download' in document.createElement('a'))) {
        this.$message.error('浏览器不支持')
        return false
      }
      const codeValue = this.$refs.code.getValue().replace(/\s/g, '')
      if (!codeValue) {
        this.$message.error('先写点东西再导出吧')
        return false
      }
      return true
    },
    handleDownloadPng() {
      if (!this.codeValueValidator()) return
      const scale = 1.1
      // html2canvas 方法返回的是 promise 承诺
      html2canvas(document.querySelector('#previewArea > div'), {
        logging: false,
        scale,
        useCORS: true, // 允许使用跨域图片
        allowTaint: false // 不允许跨域图片污染画布
      }).then(canvas => {
        const image = canvas2image.convertToPNG(canvas, canvas.width * scale, canvas.height * scale)
        const elem = document.createElement('a')
        elem.download = 'draft.jpeg'
        elem.style.display = 'none'
        elem.href = image.src
        document.body.appendChild(elem)
        elem.click()
        document.body.removeChild(elem)
      })
    },
    handleDownloadMarkdown() {
      if (!this.codeValueValidator()) return

      const elem = document.createElement('a')
      elem.download = 'draft.md'
      elem.style.display = 'none'
      const blob = new Blob([this.$refs.code.getValue()], { type: 'text/plain' })
      elem.href = URL.createObjectURL(blob)
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    },
    fileExtensionValidator(files) {
      const target = [].slice.call(files).filter(file => {
        const { type, name } = file
        const extension = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''
        const baseType = type.replace(/\/.*$/, '')

        return this.accept
          .split(',')
          .map(t => t.trim())
          .some(acceptedType => {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '')
            }
            return false
          })
      })
      return target.length > 0
    },
    beforeUpload(file) {
      const size = 10
      const gtLimitSize = file.size / 1024 / 1024 > size

      if (gtLimitSize) {
        this.$message.error(`图片上传不能超过${size}M`)
        this.dragover = false
      }
      return !gtLimitSize
    },
    handleUploadSuccess(res) {
      console.log('pic upload success :>> ', res)
      this.dragover = false
      this.uploadParams.token = generateQiniuToken()
      this.$refs.code.ace.insert(` ![alt](${qiniu.cdnAddress}${res.key}/z)`)
    },
    handleUploadError() {
      this.dragover = false
    },

    handleAssit(data = {}) {
      console.log('data :>> ', data)
      this.$refs.pop[0].doClose()
      const { type, col, row, url, desc } = data
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
          this.$refs.code.ace.insert(ret)
          break
        case 'link':
          this.$refs.code.ace.insert(` [${desc}](${url}) `)
          break
        default:
          break
      }
    },

    handleHeaderIconClick({ template, callback, isSymmetrical, defaultTemplate }) {
      if (callback) {
        callback()
        return
      }
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
  .full-screen-upload {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    .upload-tip {
      width: 100%;
      height: 100%;
      padding-top: 240px;
      font-size: 36px;
      &::before {
        font-family: element-icons !important;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        display: block;
        font-size: 120px;
        content: '\e7c3';
      }
      &::after {
        display: block;
        font-size: 28px;
        margin-top: 10px;
        content: '只能上传【png,jpg,jpeg,gif,bmp】格式文件，且不超过10M';
      }
    }
  }
}
</style>
<style lang="scss">
.el-upload-dragger {
  width: 100vw;
  height: 100vh;
  z-index: inherit;
  background-color: rgba(255, 255, 255, 0.75);
  border: none;
  .el-upload__text {
    font-size: 36px;
    font-weight: bold;
  }
  .el-upload__tip {
    font-size: 28px;
  }
  &.is-dragover {
    background-color: rgba(32, 159, 255, 0.55);
    color: #fff;
  }
}
</style>
