/*
 * @Author: chenghao 
 * @Date: 2022-06-13 23:26:52 
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-14 00:31:19
 * @Desc: 文件导出;
 */
import { ref } from 'vue';
import { ElMessage } from "element-plus";
import githubCssRaw from 'github-markdown-css/github-markdown-light.css?raw';
import HTMLTemplate from '@/config/template.html?raw';

export default function useExport ({ articleTitle, articleList, articleContent }) {

  const articleTitleDefault = `未命名`;

  // 校验下可以导出吗；
  const exportValidator = () => {
    if (!('download' in document.createElement('a'))) {
      ElMessage.error('你的浏览器不支持文件导出，请更新浏览器！');
      return false;
    };
    console.log(articleTitle.value, articleContent);
    if (!articleContent.value) {
      ElMessage.error('文章内容为空，导出不了哦！');
      return false;
    }
    return true;
  }

  /**
   * 文件导出;
   * @param {*} fileName 文件名，带后缀
   * @param {*} fileContent 文件内容，blob格式；
   */
  const fileDownload = (fileName, fileContent) => {
    const elem = document.createElement('a');
    elem.download = fileName;
    elem.style.display = 'none';
    // const blob = new Blob([this.$refs.code.getValue()], { type: 'text/plain' });
    // const blob = new Blob([htmlValue], { type: 'text/plain' })
    elem.href = URL.createObjectURL(fileContent)
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }




  const exportHTML = () => {
    if (!exportValidator()) return;
    const fileName = `${articleTitle.value || articleTitleDefault}.html`;
    const fileContent = new Blob([HTMLTemplate.replace('<!-- <title></title> -->', `<title>${articleTitle.value || articleTitleDefault}</title>`).replace('<!-- <style></style> -->', `<style>${githubCssRaw}</style>`).replace(`<!-- <main></main> -->`, document.querySelector('.bytemd-preview > .markdown-body').innerHTML)], { type: 'text/plain' })
    fileDownload(fileName, fileContent);
  };
  const exportMarkdown = () => { };
  const exportPDF = () => { };
  const exportImage = () => { };

  return {
    exportHTML,
    exportMarkdown,
    exportPDF,
    exportImage,
  }
}