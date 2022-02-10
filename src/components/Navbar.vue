<template>
  <!-- Header-->
  <header id="header" class="header pl-0">
      <div class="top-left">
          <div class="navbar-header">
              <a class="navbar-brand" href="./"><img src="../assets/images/logo.png" alt="Logo"></a>
              <a class="navbar-brand hidden" href="./"><img src="images/logo2.png" alt="Logo"></a>
              <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
          </div>
      </div>
      <div class="top-right">
          <div class="header-menu">
              <div class="header-left pt-3">
                  <div v-if="$store.getters.userInfo.name=='未知人员'">
                    <button type="button" class="btn btn-link p-0" @click="$router.push('/login');">请登录</button>
                  </div>
                  <div v-if="$store.getters.userInfo.name!='未知人员'">
                    <strong  style="font-size:13px">您好，{{$store.getters.userInfo.name}}</strong>
                  </div>

              </div>

              <div class="user-area dropdown float-right">
                  <a href="#" class="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img class="user-avatar rounded-circle" src="../assets/images/profile.jpg" alt="User Avatar">
                  </a>

                  <div class="user-menu dropdown-menu">
                      <a class="nav-link" href="#"><i class="fa fa- user"></i>My Profile</a>

                      <a class="nav-link" href="#"><i class="fa fa- user"></i>Notifications <span class="count">13</span></a>

                      <a class="nav-link" href="#"><i class="fa fa -cog"></i>Settings</a>

                      <a class="nav-link" href="#"><i class="fa fa-power -off"></i>Logout</a>
                  </div>
              </div>

          </div>
      </div>
  </header>
  <!-- /#header -->
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
</style>
