<template>
  <div id="app">
    <md-head></md-head>
    <div class="g_editor_container">
      <div class="editor">
        <Input class="textarea" :rows="9999" v-model="editorContent" type="textarea" />
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
// import './assets/misty-light-macos.css'
import './assets/theme.css'
import 'highlight.js/styles/default.css'

export default {
  name: 'App',
  components: {
    MdHead
  },
  data () {
    return {
      editorContent: '',
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
      }).use(markdownItMark).use(markdownItIns).use(markdownItEmoji).use(require('markdown-it-footnote'))
    }
  },
  mounted () {
    /** 
     * 操作按钮插入内容
    */
    bus.$on('insert', string => {
      this.insertAtCursor(string)
      document.querySelector('textarea').dispatchEvent(new Event('input'));
    })
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
    this.editorContent = window.localStorage.getItem('MarkdownDraft')
  },
  watch: {
    editorContent () {
      this.result = this.markdown.render(this.editorContent)
      this.autoSave()
    }
  },
  methods: {
    autoSave () { // 自动保存
      window.localStorage.setItem('MarkdownDraft', this.editorContent)
    },
    insertAtCursor (myValue) { // 插入到光标所在位置
      const myField = document.querySelector('textarea')

      //IE 浏览器
      if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
      }

      //FireFox、Chrome等
      else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
      } else {
        myField.value += myValue;
        myField.focus();
      }
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
      content: '编码区';
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
      content: '预览区';
    }
  }
}
</style>
