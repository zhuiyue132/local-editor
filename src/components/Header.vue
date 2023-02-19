<script setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import useEditor from '@/store/useEditor';
  import ArticleList from '@/components/ArticleList.vue';
  import Icon from '@/components/Icon.vue';

  const emit = defineEmits(['save', 'setting', 'openList', 'export']);

  const state = useEditor();
  const { setTitle } = state;
  const { articleTitle, articleList } = storeToRefs(state);
  watch(articleTitle, setTitle);

  const onDropdownCommand = command => emit('export', command);
</script>

<template>
  <header class="page-header">
    <el-input v-model="articleTitle" placeholder="输入文章标题..." maxlength="25" class="title" />
    <div class="right">
      <!-- 历史记录 -->
      <!-- <el-button text class="gap" @click.stop="emit('openList')">
        <Icon href="A3" />
      </el-button> -->

      <!-- 下载 -->
      <el-dropdown class="gap" @command="onDropdownCommand">
        <el-button text>
          <Icon href="A40" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="image">导出图片</el-dropdown-item>
            <el-dropdown-item command="markdown">导出源文件</el-dropdown-item>
            <el-dropdown-item command="pdf">导出PDF文件</el-dropdown-item>
            <el-dropdown-item command="html">导出HTML文件</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 保存 -->
      <!-- <el-button class="gap" text @click.stop="emit('save')">
        <Icon href="A27" />
      </el-button> -->

      <!-- 设置 -->
      <!-- <el-button class="gap" text @click.stop="emit('setting')">
        <Icon href="A96" />
      </el-button> -->
    </div>
  </header>
</template>

<style lang="less" scoped>
  .page-header {
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    .title {
      height: 40px;
      flex: 1;
      // width: 420px;
      // flex: 0 0 420px;
      font-size: 18px;
      --el-input-border-color: transparent;
      --el-input-transparent-border: none;
      --el-input-border-radius: 0;
      --el-input-hover-border-color: transparent;
      --el-input-focus-border-color: transparent;
    }
    .right {
      flex: 0 0 232px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: end;
      .gap {
        margin-left: 0;
      }
    }
  }
</style>
