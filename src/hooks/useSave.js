/*
 * @Author: chenghao 
 * @Date: 2022-06-06 22:37:01 
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-08 23:31:45
 */
import { storeToRefs } from "pinia";
import useEditor from "../store/useEditor";
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

export default function useArticleSave() { 
  const state = useEditor();
  const { articleTitle, articleList } = storeToRefs(state);
  const saveArticle = async () => {
    if(articleTitle.value.replace(/\s+/g, '') === '') {
      return  ElMessage.error('Oops, 你是不是忘了输入文章标题啊？');
    } 
  };

  return { 
    saveArticle
  }
}

