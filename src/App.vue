<template>
  <div id="app">
    <md-head ref="head"></md-head>
    <div class="g_editor_container">
      <div class="editor">
        <Input ref="textarea" class="textarea" :rows="9999" v-model="editorContent" type="textarea" />
      </div>
      <div class="preview">
        <div v-html="result"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MdHead from './components/header';
import bus from './lib/bus.js';
import markdown from 'markdown-it'
import hljs from 'highlight.js';
import markdownItMark from 'markdown-it-mark';
import markdownItIns from 'markdown-it-ins';
import markdownItEmoji from 'markdown-it-emoji';
import './assets/theme.css'
import 'highlight.js/styles/default.css'
import hotkeys from 'hotkeys-js';
import _ from 'lodash'

export default {
  name: 'App',
  components: {
    MdHead
  },
  data () {
    return {
      editorContent: '',
      operateHistory: [],
      deleteHistory: [],
      result: '',
      markdown: new markdown({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (__) { }
          }
          return ''; // 使用额外的默认转义
        }
      }).use(markdownItMark).use(markdownItIns).use(markdownItEmoji).use(require('markdown-it-footnote')).use(require('markdown-it-task-checkbox'))
    }
  },
  mounted () {
    console.log('不是所有的事情都能如愿以偿，但是任何事情都值得去尝试。加油！')
    hotkeys.filter = () => true
    hotkeys('ctrl+2,command+2,ctrl+3,command+3,ctrl+b,command+b,ctrl+k,command+k,ctrl+u,command+u,ctrl+i,command+i,ctrl+shift+i,command+shift+i,ctrl+z,command+z,ctrl+shift+z,command+shift+z', (event, handler) => {
      event.preventDefault()
      let template = ''
      let bothEnds = ''
      switch (handler.key) {
        case 'ctrl+2': // 二级标题
        case 'command+2':
          template = `
## text  `
          break;
        case 'ctrl+3': // 三级标题
        case 'command+3':
          template = `
### text  `
          break;
        case 'ctrl+b': // 加粗
        case 'command+b':
          template = ' **text** '
          bothEnds = '**'
          break;
        case 'ctrl+k': // 连接
        case 'command+k':
          template = ' [text]( ) '
          break;
        case 'ctrl+u': // 图片上传
        case 'command+u':
          this.$refs.head.insertImage()
          break;

        case 'ctrl+i': // 行内代码
        case 'command+i':
          template = ' `text` '
          break;
        case 'ctrl+shift+i': // 代码块
        case 'command+shift+i':
          template = `
\`\`\`
code here!
\`\`\`
`
          break;
        case 'ctrl+z': // 撤销
        case 'command+z':

          if (this.operateHistory.length < 1) return
          this.deleteHistory.push(this.operateHistory[this.operateHistory.length - 1])
          this.operateHistory.splice(this.operateHistory.length - 1, 1)
          // if (this.operateHistory.length >= 1) { // 最后一步不允许撤销
          //   this.editorContent = this.operateHistory[this.operateHistory.length - 1]
          // }
          var str = this.operateHistory.length ? this.operateHistory[this.operateHistory.length - 1] : ''
          this.editorContent = str
          break;
        case 'ctrl+shift+z': // 撤销
        case 'command+shift+z':
          if (!this.deleteHistory.length) return
          this.editorContent = this.deleteHistory[this.deleteHistory.length - 1]
          this.deleteHistory.splice(this.deleteHistory.length - 1, 1)
          break;
        default:
          template = ''
          break;
      }
      if (!template) return
      this.insertAtCursor(template, bothEnds)
    });

    /** 
     * 操作按钮插入内容
    */
    bus.$on('insert', this.insertAtCursor)
    /** 
     * 导出文件
    */
    bus.$on('export', () => {
      if (!this.editorContent || !window.localStorage.getItem('MarkdownDraft')) {
        return this.$Notice.error({ title: '你还没有写内容' })
      }
      const content = this.editorContent
      const elem = document.createElement('a');
      elem.download = 'draft.md';
      elem.style.display = 'none';
      const blob = new Blob([content], { type: 'text/plain' });
      elem.href = URL.createObjectURL(blob)
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
      setTimeout(() => {
        this.editorContent = ''
        window.localStorage.removeItem('MarkdownDraft')
      }, 300)
    })

    if (!window.localStorage.getItem('MarkdownDraft')) return
    this.editorContent = window.localStorage.getItem('MarkdownDraft') || ''
    this.operateHistory.push(this.editorContent)
  },
  watch: {
    editorContent: _.debounce(function (current, prev) {
      this.result = this.markdown.render(this.editorContent)
      const history = this.operateHistory
      let str = history.length ? history[history.length - 1] : ''
      if (current !== str) {
        history.push(current)
      }
      this.autoSave()
    }, 0)
  },
  methods: {
    autoSave () { // 自动保存
      window.localStorage.setItem('MarkdownDraft', this.editorContent)
    },
    insertAtCursor (myValue, bothEnds) { // 插入到光标所在位置
      const myField = document.querySelector('textarea')
      //IE 浏览器
      if (document.selection) {
        myField.focus();
        const sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
      }

      //FireFox、Chrome等
      else if (myField.selectionStart || myField.selectionStart == '0') {
        const startPos = myField.selectionStart;
        const endPos = myField.selectionEnd;

        if (startPos === endPos) {
          myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
        } else {
          myField.value = myField.value.substring(0, startPos) + bothEnds + myField.value.substring(startPos, endPos) + bothEnds + myField.value.substring(endPos, myField.value.length);
        }
        // 保存滚动条
        const restoreTop = myField.scrollTop;
        if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
        }
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
      } else {
        myField.value += myValue;
      }

      document.querySelector('textarea').dispatchEvent(new Event('input'));

    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
textarea.ivu-input {
  height: 100% !important;
  background-color: rgb(246, 247, 249);
  border: none;
  font-size: 18px;
  &:focus {
    box-shadow: none;
  }
}
.task-list {
  list-style: none;
}
#app {
  color: #2c3e50;
  height: 100%;
  .g_editor_container {
    height: calc(100% - 56px);
  }
  .editor,
  .preview {
    width: 50%;
    height: 100%;
    padding: 5px 0 0 15px;
    background: rgb(246, 247, 249);
    float: left;
    overflow: auto;
    font-size: 18px;
    &::before {
      content: "编码区";
      font-size: 20px;
      font-weight: 800;
    }
    .textarea {
      height: calc(100% - 40px);
      background-color: rgb(246, 247, 249);
    }
  }
  .preview {
    background: #fff;
    padding-left: 30px;
    font-size: 15px;
    font-weight: 400;
    &::before {
      content: "预览区";
    }
    img[alt="img_preview"] {
      max-width: 100%;
      max-height: 600px;
    }
  }
}
</style>
