/*
 * @Author: chenghao
 * @Date: 2022-06-05 16:27:47
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-05 23:52:20
 */
import { defineStore } from "pinia";
import { locale } from "../config";
export default defineStore("editor", {
  state: () => ({
    maxLength: "1000",
    placeholder: "试着输入一些内容...",
    previewDebounce: 10,
    value: "",
    articleTitle: "",
    locale,
  }),

  actions: {
    setValue(v) {
      this.value = v;
    },
    setTitle(v) {
      this.articleTitle = v;
    },
  },
});
