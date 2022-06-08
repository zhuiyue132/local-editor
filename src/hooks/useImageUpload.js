/*
 * @Author: chenghao 
 * @Date: 2022-06-06 22:45:28 
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-06 23:09:19
 */
import axios from 'axios';
import { CHEVERETO_KEY, CHEVERETO_URL } from '../config';
export default function useImageUpload () {
  const uploadImages = async (files) => {
    const urls = await Promise.all(files.map(async (file) => {
      const formData = new FormData();
      formData.append('source', file);
      formData.append('key', CHEVERETO_KEY);
      try {
        const { data: { image: {  display_url, name  } } } = await axios.post(CHEVERETO_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data; chartset=UTF-8',
          },
        });
        return { url: display_url, title: name,  }
      } catch (error) {
        return undefined;
      }
    }).filter(Boolean));
    return urls;
  }
  return {
    uploadImages
  }
}