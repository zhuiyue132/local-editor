<template>
  <div class="drawer-container">
    <div>
      <!-- <h3 class="drawer-title">控制面板</h3> -->

      <div class="drawer-item">
        <span>滚动跟随</span>
        <el-switch v-model="autoScrollActivated" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>启用图床</span>
        <el-switch v-model="pictureBedActivated" class="drawer-switch" />
        <div class="drawer-tip">
          图床启用后，可以将【 jpeg, jpg, png, gif, bmp 】直接拖拽至编辑器中上传，图片将上传至
        </div>
        <div class="drawer-tip">
          当前使用的是
          <b> <a href="http://sm.ms" target="_blank" rel="noopener noreferrer">SM.MS</a> </b>
          免费图床。
        </div>
      </div>
      <div class="drawer-item">
        <span>主题设置</span>
      </div>
      <div class="drawer-item">
        <span>显示行号</span>
        <el-switch v-model="gutterActivated" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>光标行高亮</span>
        <el-switch v-model="cursorLineHighlightActivated" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      autoScrollActivated: false,
      pictureBedActivated: false,
      gutterActivated: true,
      cursorLineHighlightActivated: true
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-y: scroll;

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
    .drawer-tip {
      color: #ccc;
      font-size: 12px;
      padding: 5px 0;
    }
  }

  .drawer-switch {
    float: right;
  }
  .drawer-input {
    width: 100px;
    float: right;
  }
}
</style>
