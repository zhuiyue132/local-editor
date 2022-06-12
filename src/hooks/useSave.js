/*
 * @Author: chenghao
 * @Date: 2022-06-06 22:37:01
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-12 23:37:45
 */
import { storeToRefs } from "pinia";
import useEditor from "../store/useEditor";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import dayjs from "dayjs";
import { getRandomCode } from '@/utils';

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
    const articleCreateTimes = articleList.value.map(
      ({ createTime }) => createTime
    );
    // if (articleCreateTimes.includes(dayjs().format("YYYY-MM-DD HH:mm"))) {
    //   // 每分钟限制保存一次；
    //   return ElMessage.warning("A Ha ? 每分钟只能保存一次哦！");
    // }
    articleList.value.unshift({
      name: title,
      content: articleContent.value,
      createTime: dayjs().format("YYYY-MM-DD HH:mm"),
      id: getRandomCode(),
    });

    ElMessage.success("Oh Yes, 保存成功!");
  };

  return {
    saveArticle,
  };
}
