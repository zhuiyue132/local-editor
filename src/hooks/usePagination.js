/*
 * @Author: chenghao 
 * @Date: 2022-06-10 00:15:39 
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-19 18:36:50
 */
import { ref, watch, computed } from 'vue';
import { chunk } from '@/utils';

export default function usePagination (list) {
  const pageSize = ref(5);
  const page = ref(1);
  const total = computed(() => list.value.length);
  const paging = ref(chunk(list.value, pageSize.value));
  const current = ref(paging.value[0])

  const onCurrentChange = () => {
    current.value = paging.value[page.value - 1];
  };

  watch(page, onCurrentChange);

  watch(list, () => {
    page.value = 1;
    paging.value = chunk(list.value, pageSize.value);
    total.value = list.value.length;
    onCurrentChange()
  }, { deep: true })

  return {
    current, total, page, pageSize, onCurrentChange
  }
}