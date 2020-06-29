<template>
  <div class="md-table-size-selector">
    你选择了 {{ this.row }} 行 {{ this.col }} 列
    <template v-for="r in 6">
      <div :key="r">
        <div
          v-for="c in 10"
          :key="c"
          :data-row="r"
          :data-col="c"
          :class="selected(r, c)"
          class="selector-item"
          @click="handleClick(r, c)"
          @mouseenter="handleHover(r, c)"
          @mouseleave="reset"
        />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'TableSizeSelector',
  data() {
    return {
      row: 2,
      col: 2,
      ROW_MIN: 2,
      COL_MIN: 2
    }
  },
  methods: {
    handleHover(r, c) {
      console.log('r, c :>> ', r, c)
      if (r < this.ROW_MIN) {
        r = this.ROW_MIN
      }
      if (c < this.COL_MIN) {
        c = this.COL_MIN
      }
      this.row = r
      this.col = c
    },
    reset() {
      this.row = this.ROW_MIN
      this.col = this.COL_MIN
    },
    handleClick(r, c) {
      if (r < this.ROW_MIN || c < this.COL_MIN) return
      this.$emit('assit', { row: r, col: c, type: 'table' })
    },
    selected(r, c) {
      return {
        selected: r <= this.row && c <= this.col
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.md-table-size-selector {
  box-sizing: content-box;

  width: 200px;
  height: 140px;
  .selector-item {
    width: 20px;
    height: 20px;
    float: left;
    border: 1px #eee solid;
    cursor: pointer;
  }
  .selected {
    background: orange;
  }
}
</style>
