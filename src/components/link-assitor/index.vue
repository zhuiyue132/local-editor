<template>
  <div class="md-link-assitor">
    <div class="link-label">显示文本</div>
    <el-input v-model="form.desc" size="mini" placeholder="输入显示文本" />
    <div class="link-label">输入链接</div>
    <el-input v-model="form.url" size="mini" placeholder="输入链接地址" />
    <el-button size="mini" class="link-label" type="primary" @click="save">完成</el-button>
  </div>
</template>
<script>
export default {
  name: 'LinkAssitor',
  data() {
    return {
      form: {
        url: '',
        desc: ''
      }
    }
  },
  methods: {
    save() {
      const { url, desc } = this.form
      this.$emit('assit', {
        url,
        desc,
        type: 'link'
      })
      this.reset()
      this.$parent.doClose() // el-popover 组件内部方法
    },
    reset() {
      this.form = { ...this.$options.data().form }
    }
  }
}
</script>
<style lang="scss" scoped>
.md-link-assitor {
  text-align: center;
}
.link-label {
  font-size: 12px;
  margin: 10px 0;
  text-align: left;
}
</style>
