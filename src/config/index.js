/*
 * @Author: chenghao
 * @Date: 2020-06-18 17:23:01
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-06-29 20:46:31
 * @Desc: config
 */
import store from '@/store'

/**
 * icon fields desc
 *
 * icon: svg-icon使用的svg图片名
 * iconName：icon 文字描述
 * callback： 点击回调
 * template: 模板
 * isSymmetrical: 模板语法是否对称
 * defaultTemplate: 默认模板,
 * extraComponentName: 需要额外组件辅助完成功能时，填写辅助组件名，动态组件渲染。
 */
export default [
  // TODO: 前进后退时对是否可执行的判断
  {
    icon: 'arrow-left',
    iconName: '撤回',
    callback: () => {
      store.state.ace.aceEditor.undo()
    }
  },
  {
    icon: 'arrow-right',
    iconName: '重做',
    callback: () => {
      store.state.ace.aceEditor.redo()
    }
  },
  // {
  //   icon: 'arrow-left',
  //   iconName: '回退'
  // },
  // {
  //   icon: 'arrow-right',
  //   iconName: '恢复'
  // },
  // {
  //   icon: 'dark-mode',
  //   iconName: '切换模式'
  // },
  // {
  //   icon: 'downscale',
  //   iconName: '恢复浏览器'
  // },
  // {
  //   icon: 'fullscreen',
  //   iconName: '全屏'
  // },
  // {
  //   icon: 'panel',
  //   iconName: '分割面板'
  // },
  {
    icon: 'bold',
    iconName: '加粗',
    template: '**',
    defaultTemplate: ` **text** `,
    isSymmetrical: true
  },
  {
    icon: 'i',
    iconName: '倾斜',
    template: '*',
    defaultTemplate: ` *text* `,
    isSymmetrical: true
  },
  {
    icon: 'brackets',
    iconName: '行内代码',
    template: '`',
    defaultTemplate: ' `text` ',
    isSymmetrical: true
  },
  {
    icon: 'line-through',
    iconName: '删除线',
    template: '~~',
    defaultTemplate: ' ~~text~~ ',
    isSymmetrical: true
  },
  {
    icon: 'underline',
    iconName: '下划线',
    template: '++',
    defaultTemplate: ' ++text++ ',
    isSymmetrical: true
  },
  {
    icon: 'mark',
    iconName: '标注',
    template: '==',
    defaultTemplate: ' ==text== ',
    isSymmetrical: true
  },
  {
    icon: 'code',
    iconName: '代码块',
    template: `
\`\`\`
`,
    isSymmetrical: true,
    defaultTemplate: `
\`\`\`js
show your code here！
\`\`\``
  },
  {
    icon: 'table',
    iconName: '插入表格',
    extraComponentName: 'table-size-selector'
  },
  {
    icon: 'link',
    iconName: '插入链接',
    extraComponentName: 'link-assitor'
  },
  {
    icon: 'image',
    iconName: '直接把图片拖动到页面内完成上传',
    callback() {}
  },
  {
    icon: 'h2',
    iconName: '二级标题',
    template: `
## 二级标题`
  },
  {
    icon: 'h3',
    iconName: '三级标题',
    template: `
### 三级标题`
  },
  {
    icon: 'h4',
    iconName: '四级标题',
    template: `
#### 四级标题`
  },
  {
    icon: 'h5',
    iconName: '五级标题',
    template: `
##### 五级标题`
  },
  {
    icon: 'splitline',
    iconName: '分割线',
    template: `

---
`
  },
  {
    icon: 'checkbox',
    iconName: '已完成',
    template: `
- [x] text`
  },
  {
    icon: 'checkbox-unchecked',
    iconName: '待办',
    template: `
- [ ] text`
  },
  {
    icon: 'quote',
    iconName: '引用',
    template: `
> text`
  },
  {
    icon: 'ul',
    iconName: '无序列表',
    template: `
- text - 1
- text - 2`
  },
  {
    icon: 'ol',
    iconName: '有序列表',
    template: `
1. text - 1
1. text - 2`
  }

  // {
  //   icon: 'link',
  //   iconName: '插入链接'
  // }
  // {
  //   icon: 'flow',
  //   iconName: '流程'
  // },

  // {
  //   icon: 'formula',
  //   iconName: '公式'
  // },
  // {
  //   icon: 'ganta',
  //   iconName: '甘特图'
  // },

  // {
  //   icon: 'image',
  //   iconName: '上传图片'
  // }
]
