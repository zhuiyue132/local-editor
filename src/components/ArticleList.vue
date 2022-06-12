<script setup>
import { computed, ref, toRefs } from "vue";
import nodataImage from "../assets/images/nodata.svg";
import usePagination from "@/hooks/usePagination.js";
import { ElMessageBox } from "element-plus";
import "element-plus/es/components/message-box/style/css";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  keyword: {
    type: String,
    default: "",
  },
});
const { data } = toRefs(props);

const emit = defineEmits(["close", "recover", "delete", "search"]);
const onBeforeClose = (done) => {
  emit("close");
  done();
};
const searchKey = ref("");
const { current, total, page, onCurrentChange, pageSize } = usePagination(data);

// 编辑按钮点击；
const onRecovery = (row) => {
  ElMessageBox.confirm(
    `你需要自行确定是否有文本未保存！`,
    `恢复【${row.name}】到编辑器中`,
    {
      confirmButtonText: "确定",
      cancelButtonText: "再等等",
      type: "warning",
    }
  ).then(() => {
    emit("recover", row);
  });
};

// 搜索按钮点击;
const onSearchClick = () => {
  emit("search", searchKey.value);
};

// 删除点击事件
const handleDelBtnClick = (row) => {};

// 批量删除点击
const handleBatchDelBtnClick = () => {};
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
    <div v-if="data.length || keyword" class="search_wrapper">
      <el-input
        v-model="searchKey"
        placeholder="输入文章标题搜索"
        maxlength="25"
        clearable
      />

      <el-button type="primary" style="margin-left: 16px" @click="onSearchClick">搜索</el-button>
      <el-button type="danger" style="margin-left: 16px">删除所选</el-button>
    </div>
    <el-table :data="current" :show-header="false" stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <div class="article-title" :title="row.name">{{ row.name }}</div>
          <div class="article-time">{{ row.createTime }}</div>
        </template>
      </el-table-column>
      <el-table-column width="160">
        <template #default="{ row }">
          <el-button type="primary" plain @click="onRecovery(row)">
            编辑</el-button
          >
          <el-button type="danger" @click="handleDelBtnClick(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <template #empty>
        <el-empty class="empty" :image="nodataImage" description="没有记录" />
      </template>
    </el-table>

    <div v-if="current && current.length" class="pagination">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="onCurrentChange"
      />
    </div>

    <template #footer> </template>
  </el-dialog>
</template>
<style lang="less" scoped>
.article-list {
  .search_wrapper {
    width: auto;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    :deep(.el-input) {
      width: 240px;
      --el-input-border-radius: 2px;
    }
  }
  .pagination {
    padding-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
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
  .el-dialog__footer {
    display: none;
  }
  .el-table {
    .el-table__inner-wrapper::before {
      height: 0;
    }
  }
}
</style>
