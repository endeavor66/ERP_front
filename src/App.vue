<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  @import url("assets/css/index.css");
  /* @import url("assets/css/cs-skin-elastic.css"); */
  /* @import url("assets/css/style.css"); */
 @import url("assets/css/lib/chosen/chosen.css");
  @import url("assets/css/lib/chosen/chosen.min.css");
 @import url("assets/css/lib/datatable/buttons.bootstrap.min.css");
  @import url("assets/css/lib/datatable/buttons.dataTables.min.css");
  @import url("assets/css/lib/datatable/dataTables.bootstrap.min.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  /* margin-top: 60px; */
}
</style>
