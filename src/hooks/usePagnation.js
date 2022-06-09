/*
 * @Author: chenghao 
 * @Date: 2022-06-10 00:15:39 
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-10 00:24:04
 */
import { ref, watch } from 'vue';
import { chunk } from '@/utils';

export default function usePagnation (list) {

  const pageSize = ref(10);
  const page = ref(1);
  const total = ref(list.length);
  const paging = ref(chunk(list.value, pageSize.value));
  const current = ref(paging.value[0])

  const onCurrentChange = () => {
    current.value = paging.value[page.value - 1];
  };

  watch(page, onCurrentChange);

  return {
    current, total, page, pageSize, onCurrentChange
  }

}