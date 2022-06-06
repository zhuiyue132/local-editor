<script setup>
import nodata from "../assets/images/nodata.svg";
</script>
<template>
  <div class="article-list">
    <h4>版本记录</h4>
    <el-empty class="empty" :image="nodata" description="没有记录" />
  </div>
</template>
<style lang="less" scoped>
.article-list {
  width: 200px;
  padding: 12px 16px 16px;

  h4 {
    margin: 0 0 4px;
    font-weight: normal;
    font-size: 14px;
    padding-bottom: 4px;
    border-bottom: 1px #c1c1c1 solid;
  }
  .empty {
    --el-empty-padding: 0;
    --el-empty-description-margin-top: 0;
  }
}
</style>
