/*
 * @Author: chenghao
 * @Date: 2022-06-06 22:37:01
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-09 13:03:51
 */
import { storeToRefs } from "pinia";
import useEditor from "../store/useEditor";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import dayjs from "dayjs";

export default function useArticleSave() {
  const state = useEditor();
  const {
    articleTitle,
    articleList,
    value: articleContent,
  } = storeToRefs(state);
  const saveArticle = async () => {
    const title = articleTitle.value.replace(/\s+/g, "");
    if (title === "") {
      return ElMessage.error("Oops, 你是不是忘了输入文章标题啊？");
    }
    if (!articleContent.value.replace(/\s+/g, "")) {
      return ElMessage.error("Oops, 你是不是忘了输入文章内容啊？");
    }
    const acticleNames = articleList.value.map(({ name }) => name);
    articleList.value.push({
      name: title,
      content: articleContent,
      createTime: dayjs().format("YYYY-MM-DD HH:mm"),
    });

    ElMessage.success("Yes, 保存成功,请到版本记录中去查看");
  };

  return {
    saveArticle,
  };
}
