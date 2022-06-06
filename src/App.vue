<script setup>
import { Editor } from "@bytemd/vue-next";
import Header from "./components/Header.vue";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import useEditor from "./store/useEditor";
import { getPlugins } from "./config";

const EditorStore = useEditor();
const { setValue } = EditorStore;
const {
  maxLength,
  placeholder,
  previewDebounce,
  uploadImages,
  value = "",
  locale,
  articleTitle,
} = storeToRefs(EditorStore);
// 如果plugins也放在store内部的话，会引起第二次加载plugins失败，导致toolbar点击失效;
const plugins = getPlugins();

/**
 * 保存按钮点击；
 */
const onSaveClick = () => {};

const onSettingClick = () => {};
</script>

<template>
  <Header @save="onSaveClick" @setting="onSettingClick" />
  <div id="app-content" class="markdown-body">
    <Editor
      :plugins="plugins"
      :locale="locale"
      :value="value"
      :upload-images="uploadImages"
      :preview-debounce="previewDebounce"
      :placeholder="placeholder"
      :max-length="maxLength"
      class="mkd-editor"
      @change="setValue"
    />
  </div>
</template>

<style lang="less">
#app-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: calc(100vh - 60px);
  .mkd-editor {
    height: 100%;
    > .bytemd {
      height: 100%;
      border-left: none;
      border-right: none;
      border-bottom: none;
      .bytemd-toolbar-right [bytemd-tippy-path="5"] {
        display: none;
      }
    }
  }
}

.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
