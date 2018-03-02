<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted(){
    this.$store.dispatch('authenticate')
    this.$store.dispatch('getMyTunes')
  },
}
</script>

<style>
</style>
