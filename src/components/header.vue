<template>
  <div class="header">
    <Row>
      <!-- <i-col class="center" span="1">
        <div class="m_action_item">
          <Tooltip content="插入图片">
            <span class="iconfont icon-tupian"></span>
          </Tooltip>
        </div>
      </i-col> -->
      <i-col v-for="(item,index) in actionBtnList" :key="index" class="center" span="1">
        <div @click="insert(item.template, item.isSpecial)" class="m_action_item">
          <Tooltip :content="item.desc">
            <span class="iconfont" :class="item.icon"></span>
          </Tooltip>
        </div>
      </i-col>

      <i-col class="center" span="1">
        <Button @click="makeFile" type="primary">导出 markdown</Button>
      </i-col>
    </Row>
  </div>
</template>
<script>
import bus from './../lib/bus.js';
export default {
  name: 'Header',
  data () {
    return {
      linkText: '', // 链接文字
      linkAddress: '', // 链接地址
      actionBtnList: [ // 操作按钮
        {
          desc: '加粗',
          template: ' **text** ',
          icon: 'icon-jiacu'
        }, {
          desc: '倾斜',
          template: ' *text* ',
          icon: 'icon-qingxie'
        }, {
          desc: '删除线',
          template: ' ~~text~~ ',
          icon: 'icon-shanchuxian'
        }, {
          desc: '插入链接',
          template: 'link',
          isSpecial: true, // 特殊标记，当存在特殊标记时，template作为该按钮调用的函数名传入
          icon: 'icon-link'
        }, {
          desc: '标记',
          template: ` ==text== `,
          icon: 'icon-biaozhu'
        }, {
          desc: '一级标题',
          template: `
# text`,
          icon: 'icon-h1'
        }, {
          desc: '二级标题',
          template: `
## text`,
          icon: 'icon-h2'
        }, {
          desc: '三级标题',
          template: `
### text`,
          icon: 'icon-h3'
        }, {
          desc: '四级标题',
          template: `
#### text`,
          icon: 'icon-h4'
        }, {
          desc: '五级标题',
          template: `
##### text`,
          icon: 'icon-h5'
        }, {
          desc: '六级标题',
          template: `
###### text`,
          icon: 'icon-h6'
        }, {
          desc: '分割线',
          template: `
---`,
          icon: 'icon-fengexian'
        },
        {
          desc: '引用',
          template: `
> text`,
          icon: 'icon-yinyong'
        }, {
          desc: '无序列表',
          template: `
- text - 1
- text - 2`,
          icon: 'icon-wuxuliebiao'
        }, {
          desc: '有序列表',
          template: `
1. text - 1
1. text - 2 `,
          icon: 'icon-youxuliebiao'
        }, {
          desc: '代码块',
          template: `
\`\`\`
code here!
\`\`\``,
          icon: 'icon-code'
        }, {
          desc: '插入表格',
          template: `
1header 1 | header 2
---|---
text1 | text2
text1 | text2`,
          icon: 'icon-biaoge'
        }
      ]
    }
  },
  methods: {
    insert (temp, isSpecial = false) {
      if (!isSpecial) bus.$emit('insert', temp)
      else this[temp]()
    },
    link () {
      const _this = this
      this.$Modal.confirm({
        title: '插入链接',
        render: (h) => {
          return h('Form',
            [
              h('FormItem', {
                props: {
                  label: '显示文字:',
                }
              }, [
                  h('Input', {
                    props: { type: 'text', placeholder: '输入显示文字', maxlength: 10 },
                    on: {
                      input: e => {
                        this.linkText = e
                      }
                    }
                  })
                ]
              ),
              h('FormItem', {
                props: {
                  label: '链接地址:',
                }
              }, [
                  h('Input', {
                    props: { type: 'url', placeholder: '输入链接地址' },
                    on: {
                      input: e => {
                        this.linkAddress = e
                      }
                    }
                  })
                ]
              )
            ])
        },
        onOk () {
          bus.$emit('insert', `[${_this.linkText}](${_this.linkAddress})`)
        }
      })
    },
    makeFile () {
      if (!('download' in document.createElement('a'))) return this.$Notice.error({ title: '浏览器不支持' })
      this.$Modal.confirm({
        title: '插入链接',
        content: '文件导出后将会清除草稿，是否确认',
        onOk () {
          bus.$emit('export')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px #ccc solid;
  box-shadow: 2px 2px 2px #ccc;
  .center {
    text-align: center;
  }
  .m_action_item {
    cursor: pointer;
    &:hover {
      color: rgb(11, 155, 212);
      font-weight: 900;
    }
  }
}
</style>

