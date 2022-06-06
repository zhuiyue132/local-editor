<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import useEditor from "../store/useEditor";
import ArticleList from "./ArticleList.vue";

const emit = defineEmits(["save", "setting"]);

const state = useEditor();
const { setTitle } = state;
const { articleTitle } = storeToRefs(state);
watch(articleTitle, setTitle);
</script>

<template>
  <header class="page-header">
    <el-input
      v-model="articleTitle"
      placeholder="输入文章标题..."
      class="title"
    />
    <div class="right">
      <el-dropdown style="margin-right: 8px">
        <el-button type="text" @click.stop="emit('save')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-A40"></use>
          </svg>
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

      <el-dropdown style="margin-right: 8px">
        <el-button type="text" @click.stop="emit('save')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-A3"></use>
          </svg>
        </el-button>
        <template #dropdown>
          <ArticleList />
        </template>
      </el-dropdown>

      <el-button type="text" @click.stop="emit('save')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-A27"></use>
        </svg>
      </el-button>

      <el-button type="text" @click.stop="emit('setting')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-A96"></use>
        </svg>
      </el-button>
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
    width: 420px;
    flex: 0 0 420px;
    font-size: 18px;
    --el-input-border-color: transparent;
    --el-input-transparent-border: none;
    --el-input-border-radius: 0;
    --el-input-hover-border-color: transparent;
    --el-input-focus-border-color: transparent;
  }
  .right {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
