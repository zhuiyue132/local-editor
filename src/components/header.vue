<template>
  <div class="header">
    <Row>
      <i-col class="center" span="1">
        <div @click="blod" class="m_action_item">
          <Tooltip content="加粗">
            <span class="iconfont icon-jiacu"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="italic" class="m_action_item">
          <Tooltip content="倾斜">
            <span class="iconfont icon-qingxie"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="linethrough" class="m_action_item">
          <Tooltip content="删除线">
            <span class="iconfont icon-shanchuxian"></span>
          </Tooltip>
        </div>
      </i-col>
      <!-- <i-col class="center" span="1">
        <div class="m_action_item">
          <Tooltip content="标注">
            <span class="iconfont icon-biaozhu"></span>
          </Tooltip>
        </div>
      </i-col> -->
      <i-col class="center" span="1">
        <div @click="h1" class="m_action_item">
          <Tooltip content="一级标题">
            <span class="iconfont icon-h1"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="h2" class="m_action_item">
          <Tooltip content="二级标题">
            <span class="iconfont icon-h2"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="h3" class="m_action_item">
          <Tooltip content="三级标题">
            <span class="iconfont icon-h3"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="h4" class="m_action_item">
          <Tooltip content="四级标题">
            <span class="iconfont icon-h4"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="h5" class="m_action_item">
          <Tooltip content="五级标题">
            <span class="iconfont icon-h5"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="h6" class="m_action_item">
          <Tooltip content="六级标题">
            <span class="iconfont icon-h6"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="devider" class="m_action_item">
          <Tooltip content="分割线">
            <span class="iconfont icon-fengexian"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="quot" class="m_action_item">
          <Tooltip content="引用">
            <span class="iconfont icon-yinyong"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="unorder" class="m_action_item">
          <Tooltip content="无序列表">
            <span class="iconfont icon-wuxuliebiao"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="order" class="m_action_item">
          <Tooltip content="有序列表">
            <span class="iconfont icon-youxuliebiao"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="code" class="m_action_item">
          <Tooltip content="代码块">
            <span class="iconfont icon-code"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="link" class="m_action_item">
          <Tooltip content="插入链接">
            <span class="iconfont icon-link"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div class="m_action_item">
          <Tooltip content="插入图片">
            <span class="iconfont icon-tupian"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <div @click="table" class="m_action_item">
          <Tooltip content="插入表格">
            <span class="iconfont icon-biaoge"></span>
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
      linkText: '',
      linkAddress: ''
    }
  },
  methods: {
    blod () {
      bus.$emit('insert', '**text**')
    },
    italic () {
      bus.$emit('insert', '*text*')
    },
    linethrough () {
      bus.$emit('insert', '~~text~~')
    },
    h1 () {
      bus.$emit('insert', '# text')
    },
    h2 () {
      bus.$emit('insert', '## text')
    },
    h3 () {
      bus.$emit('insert', '### text')
    },
    h4 () {
      bus.$emit('insert', '#### text')
    },
    h5 () {
      bus.$emit('insert', '##### text')
    },
    h6 () {
      bus.$emit('insert', '###### text')
    },
    devider () {
      bus.$emit('insert', '---')
    },
    quot () {
      bus.$emit('insert', '> text')
    },
    unorder () {
      bus.$emit('insert', `- text-1
- text-2`)
    },
    order () {
      bus.$emit('insert', `1. text-1
1. text-2 `)
    },
    code () {
      bus.$emit('insert', `\`\`\`
it's your code here!
\`\`\``)
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
    table () {
      bus.$emit('insert', `1header 1 | header 2
---|---
text1 | text2
text1 | text2`)
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

