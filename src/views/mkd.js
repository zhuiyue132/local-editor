import Markdown from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

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
  .use(require('markdown-it-texmath'), {
    // eslint-disable-next-line global-require
    engine: require('katex'),
    delimiters: 'dollars',
    katexOptions: { macros: { '\\RR': '\\mathbb{R}' } }
  })
  .use(require('markdown-it-code-copy'), {
    iconClass: 'el-icon-copy-document',
    buttonStyle:
      'border:none;background-color:rgba(0,0,0,0);position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none;'
  })
  .use(require('markdown-it-container'))
  .use(require('markdown-it-plantuml'), {
    imageFormat: 'png',
    openMarker: '@uml',
    closeMarker: '@uml'
  })
  .use(require('markdown-it-kbd'))

export default mkd
