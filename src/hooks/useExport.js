/*
 * @Author: chenghao
 * @Date: 2022-06-13 23:26:52
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-17 16:12:24
 * @Desc: 文件导出;
 */
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import githubCssRaw from "github-markdown-css/github-markdown-light.css?raw";
import HTMLTemplate from "@/config/template.html?raw";
import html2canvas from "html2canvas";
import canvas2image from "@/utils/canvas2image";

export default function useExport({
  articleTitle,
  articleList,
  articleContent,
}) {
  const articleTitleDefault = `未命名`;

  const fileName = computed(() => articleTitle.value ?? articleTitleDefault);

  // 校验下可以导出吗；
  const exportValidator = () => {
    if (!("download" in document.createElement("a"))) {
      ElMessage.error("你的浏览器不支持文件导出，请更新浏览器！");
      return false;
    }
    if (!articleContent.value) {
      ElMessage.error("文章内容为空，导出不了哦！");
      return false;
    }
    return true;
  };

  /**
   * 文件导出;
   * @param {*} fileName 文件名，带后缀
   * @param {*} fileContent 文件内容，blob格式；
   */
  const fileDownload = (fileName, fileContent, isPicture) => {
    const elem = document.createElement("a");
    elem.download = fileName;
    elem.style.display = "none";
    // const blob = new Blob([this.$refs.code.getValue()], { type: 'text/plain' });
    elem.href = isPicture ? fileContent : URL.createObjectURL(fileContent);
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  };

  /**
   * 导出html文件；
   * @returns
   */
  const exportHTML = () => {
    if (!exportValidator()) return;
    const fileContent = new Blob(
      [
        HTMLTemplate.replace(
          "<!-- <title></title> -->",
          `<title>${articleTitle.value || articleTitleDefault}</title>`
        )
          .replace("<!-- <style></style> -->", `<style>${githubCssRaw}</style>`)
          .replace(
            `<!-- <main></main> -->`,
            document.querySelector(".bytemd-preview > .markdown-body").innerHTML
          ),
      ],
      { type: "text/plain" }
    );
    fileDownload(fileName.value + ".html", fileContent);
  };

  /**
   * 导出原格式文件；
   * @returns
   */
  const exportMarkdown = () => {
    if (!exportValidator()) return;
    const fileContent = new Blob([articleContent.value], {
      type: "text/plain",
    });
    fileDownload(fileName.value + ".md", fileContent);
  };

  const exportPDF = () => {
    if (!exportValidator()) return;
  };

  /**
   *
   * @returns 导出图片；
   */
  const exportImage = async () => {
    if (!exportValidator()) return;
    const canvas = await html2canvas(
      document.querySelector(".bytemd-preview > .markdown-body"),
      {
        scale: window.devicePixelRatio,
        useCORS: true,
        logging: false,
        backgroundColor: "#fff",
        allowTaint: false,
      }
    );

    fileDownload(fileName.value + ".png", canvas.toDataURL("image/png"), true);
  };

  return {
    exportHTML,
    exportMarkdown,
    exportPDF,
    exportImage,
  };
}
