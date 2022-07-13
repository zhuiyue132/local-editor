/*
 * @Author: chenghao
 * @Date: 2022-06-05 16:27:47
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-23 19:01:12
 */
import { defineStore } from 'pinia';
import { locale } from '../config';
export default defineStore('editor', {
  state: () => ({
    maxLength: '1000',
    placeholder: '试着输入一些内容...',
    previewDebounce: 10,
    value: '',
    articleTitle: '',
    locale,
    articleList: []
  }),

  actions: {
    // 设置编辑器内容;
    setValue(v) {
      this.value = v;
    },
    // 设置文章标题
    setTitle(v) {
      this.articleTitle = v;
    }
  }
});
