<script setup>
import { ref } from "vue";
import nodataImage from "../assets/images/nodata.svg";
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close"]);
const onBeforeClose = (done) => {
  emit("close");
  done();
};

const searchKey = ref("");
</script>
<template>
  <el-dialog
    :before-close="onBeforeClose"
    title="版本记录"
    width="1200px"
    custom-class="article-list"
    destroy-on-close
    model-value
  >
    <div v-if="data.length" class="search_wrapper">
      <el-input
        v-model="searchKey"
        placeholder="输入文章标题搜索"
        maxlength="25"
        clearable
      />
    </div>
    <el-table :data="data" :show-header="false" stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <div class="article-title" :title="row.name">{{ row.name }}</div>
          <div class="article-time">{{ row.createTime }}</div>
        </template>
      </el-table-column>
      <el-table-column width="160">
        <el-button type="primary" plain>编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
      <template #empty>
        <el-empty class="empty" :image="nodataImage" description="没有记录" />
      </template>
    </el-table>

    <template #footer> </template>
  </el-dialog>
</template>
<style lang="less" scoped>
.article-list {
  :deep(.el-dialog__body) {
    padding-top: 0;
  }
  .search_wrapper {
    width: 306px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    :deep(.el-input) {
      width: 240px;
      --el-input-border-radius: 2px;
    }
  }
  .article-title {
    font-size: 18px;
    line-height: 24px;
    + .article-time {
      margin-top: 4px;
      font-size: 12px;
      color: #999;
    }
  }
  .empty {
    --el-empty-image-width: 240px;
    :deep(.el-empty__description) {
      --el-font-size-base: 18px;
    }
  }
}
</style>
<style lang="less">
.article-list {
  .el-dialog__title::after {
    content: "所有数据均存储在indexDB中，清除浏览器缓存会导致数据丢失，请谨慎操作！";
    color: #c1c1c1;
    font-size: 14px;
    margin-left: 8px;
  }
  .el-dialog__body {
    padding-top: 8px;
  }
  .el-table {
    // --el-table-tr-hover-bg-color: red !important;
    .el-table__inner-wrapper::before {
      height: 0;
    }
  }
}
</style>
