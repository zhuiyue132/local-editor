<script setup>
  import { Editor } from '@bytemd/vue-next';
  import Header from '@/components/Header.vue';
  import ArticleList from '@/components/ArticleList.vue';
  import { ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import useEditor from '@/store/useEditor';
  import useImageUpload from '@/hooks/useImageUpload';
  import useArticleSave from '@/hooks/useSave';
  import useExport from '@/hooks/useExport.js';
  import { getPlugins } from '@/config';

  const EditorStore = useEditor();
  const { setValue } = EditorStore;
  const { uploadImages } = useImageUpload();
  const { saveArticle } = useArticleSave();

  const {
    maxLength,
    placeholder,
    previewDebounce,
    value = '',
    locale,
    articleTitle,
    articleList
  } = storeToRefs(EditorStore);
  // 如果plugins也放在store内部的话，会引起第二次加载plugins失败，导致toolbar点击失效;
  const plugins = getPlugins();

  const { exportHTML, exportMarkdown, exportImage, exportPDF } = useExport({
    articleTitle,
    articleContent: value
  });

  const searchKey = ref('');
  const articleListAfterSearch = computed(() => {
    const search = searchKey.value;
    if (!search) return articleList.value;
    return articleList.value.filter(item => item.name.includes(search));
  });

  /**
   * 保存按钮点击；
   */
  const onSaveClick = saveArticle;

  const onSettingClick = () => {};

  // 编辑按钮点击；
  const onEditClick = row => {
    value.value = row.content;
    articleTitle.value = row.name;
    dialogVisible.value = false;
  };

  const onExportClick = type => {
    switch (type) {
      case 'html':
        exportHTML();
        break;
      case 'markdown':
        exportMarkdown();
        break;
      case 'image':
        exportImage();
        break;
      case 'pdf':
        exportPDF();
        break;
      default:
        break;
    }
  };

  const dialogVisible = ref(false);
</script>

<template>
  <ArticleList
    v-if="dialogVisible"
    :data="articleListAfterSearch"
    :keyword="searchKey"
    @close="dialogVisible = false"
    @recover="onEditClick"
    @search="val => (searchKey = val)"
  />
  <Header @save="onSaveClick" @setting="onSettingClick" @open-list="dialogVisible = true" @export="onExportClick" />
  <div id="app-content" class="markdown-body">
    <Editor
      v-model:value="value"
      :plugins="plugins"
      :locale="locale"
      :upload-images="uploadImages"
      :preview-debounce="previewDebounce"
      :placeholder="placeholder"
      :max-length="maxLength"
      class="mkd-editor"
      @change="setValue"
    />
  </div>
</template>
