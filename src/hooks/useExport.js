/*
 * @Author: chenghao
 * @Date: 2022-06-13 23:26:52
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-23 18:57:44
 * @Desc: 文件导出;
 */
import { computed, ref, watch, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import githubCssRaw from 'github-markdown-css/github-markdown-light.css?raw';
import HTMLTemplate from '@/config/template.html?raw';
import html2canvas from 'html2canvas';
import PDF from 'jspdf';
import { ElLoading } from 'element-plus';

export default function useExport({ articleTitle, articleContent }) {
  const articleTitleDefault = `未命名`;
  const fileName = computed(() => articleTitle.value ?? articleTitleDefault);
  const loadingInstance = ref(null);

  // 校验下可以导出吗；
  const exportValidator = () => {
    if (!('download' in document.createElement('a'))) {
      ElMessage.error('你的浏览器不支持文件导出，请更新浏览器！');
      return false;
    }
    if (!articleContent.value) {
      ElMessage.error('文章内容为空，导出不了哦！');
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
    const elem = document.createElement('a');
    elem.download = fileName;
    elem.style.display = 'none';
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
        HTMLTemplate.replace('<!-- <title></title> -->', `<title>${articleTitle.value || articleTitleDefault}</title>`)
          .replace('<!-- <style></style> -->', `<style>${githubCssRaw}</style>`)
          .replace(`<!-- <main></main> -->`, document.querySelector('.bytemd-preview > .markdown-body').innerHTML)
      ],
      { type: 'text/plain' }
    );
    fileDownload(fileName.value + '.html', fileContent);
  };

  /**
   * 导出原格式文件；
   * @returns
   */
  const exportMarkdown = () => {
    if (!exportValidator()) return;
    const fileContent = new Blob([articleContent.value], {
      type: 'text/plain'
    });
    fileDownload(fileName.value + '.md', fileContent);
  };

  /**
   * pdf 文件导出；
   * @returns
   */
  const exportPDF = async () => {
    if (!exportValidator()) return;
    loadingInstance.value = ElLoading.service({
      lock: true,
      text: `正在导出PDF文件...`,
      background: 'rgba(255, 255, 255, 1)'
    });
    const canvas = await html2canvas(document.querySelector('.bytemd-preview > .markdown-body'), {
      scale: window.devicePixelRatio,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff',
      allowTaint: false
    });

    // 还没生成pdf的高度；
    let unRenderHeight = canvas.height;
    const a4Width = 595.28,
      A4H = 821.89;
    const A4PageHeight = Math.floor((canvas.width / a4Width) * A4H);
    const canvas2pdfData = canvas.toDataURL('image/jpeg', 2.0);
    const pdf = new PDF('x', 'pt', 'a4');
    const newCanvas = document.createElement('canvas');
    let height = 0;
    pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen');
    const pdfName = `${fileName.value}.pdf`;
    let position = 0;

    function createImpl(canvas) {
      if (unRenderHeight > 0) {
        let checkCount = 0;
        if (unRenderHeight > A4PageHeight) {
          let i = position + A4PageHeight;
          for (i; i >= position; i--) {
            let isWrite = true;
            for (let j = 0; j < canvas.width; j++) {
              const c = canvas.getContext('2d').getImageData(j, i, 1, 1).data;
              if (c[0] !== 0xff || c[1] !== 0xff || c[2] !== 0xff) {
                isWrite = false;
                break;
              }
            }
            checkCount = isWrite ? checkCount + 1 : 0;
            if (checkCount >= 10) {
              break;
            }
          }

          height = Math.round(i - position) || Math.min(unRenderHeight, A4PageHeight);
          if (height <= 0) {
            height = A4PageHeight;
          }
        } else {
          height = unRenderHeight;
        }
        newCanvas.width = canvas.width;
        newCanvas.height = height;
        const ctx = newCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, position, canvas.width, height, 0, 0, canvas.width, height);
        if (position !== 0) {
          pdf.addPage();
        }
        pdf.addImage(
          newCanvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          10,
          10,
          a4Width,
          (a4Width / newCanvas.width) * height
        );
        unRenderHeight -= height;
        position += height;

        if (unRenderHeight > 0) {
          setTimeout(createImpl, 500, canvas);
        } else {
          pdf.save(pdfName + '.pdf');
          loadingInstance.value?.close?.();
        }
      }
    }

    //当内容未超过pdf一页显示的范围，无需分页
    if (unRenderHeight < A4PageHeight) {
      pdf.addImage(canvas2pdfData, 'JPEG', 0, 0, a4Width, (a4Width / canvas.width) * unRenderHeight);
      pdf.save(pdfName + '.pdf');
      loadingInstance.value?.close?.();
    } else {
      try {
        pdf.deletePage(0);
        setTimeout(createImpl, 500, canvas);
      } catch (err) {
        console.log(err);
      }
    }
  };

  /**
   *
   * @returns 导出图片；
   */
  const exportImage = async () => {
    if (!exportValidator()) return;
    const canvas = await html2canvas(document.querySelector('.bytemd-preview > .markdown-body'), {
      scale: window.devicePixelRatio,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff',
      allowTaint: false
    });

    fileDownload(fileName.value + '.png', canvas.toDataURL('image/png'), true);
  };

  return {
    exportHTML,
    exportMarkdown,
    exportPDF,
    exportImage
  };
}
