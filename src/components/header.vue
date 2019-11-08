<template>
  <div class="header">
    <Row>
      <i-col v-for="(item,index) in actionBtnList" :key="index" class="center" span="1">
        <div @click="insert(item.template, item.isSpecial, item.bothEnds)" class="m_action_item">
          <Tooltip :content="item.desc">
            <span class="iconfont" :class="item.icon"></span>
          </Tooltip>
        </div>
      </i-col>
      <i-col class="center" span="1">
        <Dropdown @on-click="goToGithub">
          <a href="javascript:void(0)">
            快捷键
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              ctrl/⌘+2 = H2标题
            </DropdownItem>
            <DropdownItem>
              ctrl/⌘+3 = H3标题
            </DropdownItem>
            <DropdownItem disabled>
              快捷键不支持其他等级标题
            </DropdownItem>
            <DropdownItem>
              ctrl/⌘+b = 加粗
            </DropdownItem>
            <DropdownItem>
              ctrl/⌘+k = 空链接
            </DropdownItem>
            <DropdownItem>
              ctrl/⌘+u = 上传图片
            </DropdownItem>
            <DropdownItem>
              ctrl/⌘+i = 行内代码
            </DropdownItem>
            <DropdownItem>
              ctrl/⌘+shift+i = 代码块
            </DropdownItem>
            <DropdownItem divided>
              ctrl/⌘+z = 撤销
            </DropdownItem>
            <DropdownItem>
              ctrl/⌘+shift+z = 恢复
            </DropdownItem>
            <DropdownItem name="github" style="color:red" divided>觉得好用，去点个star ？</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </i-col>
      <i-col class="center" span="1">
        <Button @click="makeFile" type="primary">导出</Button>
      </i-col>

    </Row>

    <Modal v-model="modalShow" title="插入图片" @on-cancel="clear">

      <p> 提示：上传成功后会自动插入到编辑器中，请耐心等待。</p>
      <Upload ref="upload" name="fileupload" type="drag" accept="image/*" :show-upload-list="true" :on-success="uploadSuccess" :on-error="uploadError" action="https://img.yyhy.me/upload.php?type=Sougou">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传</p>
        </div>
      </Upload>
      <div slot="footer"></div>
    </Modal>
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
      modalShow: false,
      actionBtnList: [ // 操作按钮
        {
          desc: '加粗',
          template: ' **text** ',
          icon: 'icon-jiacu',
          bothEnds: '**'
        }, {
          desc: '倾斜',
          template: ' *text* ',
          icon: 'icon-qingxie',
          bothEnds: '*'
        }, {
          desc: '删除线',
          template: ' ~~text~~ ',
          icon: 'icon-shanchuxian',
          bothEnds: '~~'
        }, {
          desc: '下划线',
          template: ' ++text++ ',
          icon: 'icon-Underline',
          bothEnds: '++'
        }, {
          desc: '行内代码',
          template: ' `text` ',
          icon: 'icon-kuohaobrackets'
        }, {
          desc: '插入链接',
          template: 'link',
          isSpecial: true, // 特殊标记，当存在特殊标记时，template作为该按钮调用的函数名传入
          icon: 'icon-link'
        }, {
          desc: '插入图片',
          template: 'insertImage',
          isSpecial: true, // 特殊标记，当存在特殊标记时，template作为该按钮调用的函数名传入
          icon: 'icon-tupian'
        }, {
          desc: '标记',
          template: ` ==text== `,
          icon: 'icon-biaozhu',
          bothEnds: '=='
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
***`,
          icon: 'icon-fengexian'
        }, {
          desc: '待办',
          template: `
- [ ] text`,
          icon: 'icon-checkboxoutlineblank'
        }, {
          desc: '已完成',
          template: `
- [x] text`,
          icon: 'icon-checkboxoutline'
        }, {
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
header 1 | header 2
---|---
text1 | text2
text1 | text2`,
          icon: 'icon-biaoge'
        }
      ]
    }
  },

  methods: {
    goToGithub (name) {
      if (!name) return
      window.open("https://github.com/ch957869975/md-editor");
    },
    uploadError (error) {
      this.$Notice.error({
        title: '上传出错'
      })
      this.clear()
    },
    uploadSuccess (response, file, fileList) {
      if (response.code !== '0') {
        this.$Notice.error({
          title: "上传失败了，重试一下吧！"
        })
        return;
      }
      bus.$emit('insert', `
![img_preview](${response.msg})`)
      this.clear()
    },
    clear () {
      setTimeout(() => {
        this.modalShow = false
        this.$refs.upload.clearFiles()
      }, 250)
    },
    insert (temp, isSpecial = false, bothEnds = '') {
      if (!isSpecial) bus.$emit('insert', temp, bothEnds)
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
    insertImage () {
      this.modalShow = true
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

