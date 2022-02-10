<template>
  <div id="right-panel" class="right-panel" style="height:fit-content">
    <navbar></navbar>
    <!-- Content -->
    <div class="content" style="height:100%">
      <slot>

      </slot>
    </div>
    <!-- /.content -->
    <div class="clearfix"></div>
    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-inner bg-white">
            <div class="row">
                <div class="col-sm-6">
                    Copyright &copy; 2020.Company name All rights reserved.
                </div>
                <div class="col-sm-6 text-right">

                </div>
            </div>
        </div>
    </footer>
    <!-- /.site-footer -->
  </div>

</template>

<script>
  import navbar from "./Navbar.vue"
  export default {
    name: 'consolePanel',
    data () {
      return {

      }
    },
    components:{
      navbar
    }
  }
</script>

<style scoped>
</style>
