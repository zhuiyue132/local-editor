<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created() {
    console.log('东西要买第一眼看中的，老婆要娶自己喜欢的！')
  }
}
</script>
