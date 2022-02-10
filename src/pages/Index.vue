<template>
  <div id="main" class="pl-1">


    <!-- Right Panel -->
    <div id="right-panel" class="right-panel" style="margin-left:-0.1rem;height: 100%;padding-top:1rem">
      <navbar></navbar>
    <!-- <navbar class="mb-1"></navbar> -->
      <div class="container-fluid pl-5 pt-4 pb-2 text-dark " style="background-color:#ffffff;">
        <div class="row">
          <h3>门店</h3>
        </div>
        <div class="row mt-4">
          <p>智能数据中台提供决策、预测分析等...</p>
        </div>
      </div>


      <div class="d-flex flex-row flex-wrap justify-content-around mt-2">
        <!-- <div class="card mb-1 mt-1 col-3" v-for="object in objects" style="max-height:fit-content">
          <div class="row no-gutters" >
            <div class="col-4 p-2 " style="">
              <img src="https://picsum.photos/400/400/?image=20" class="card-img" alt="..." >
            </div>
            <div class="col-8 pt-0">
              <div class="card-body d-flex justify-content-start flex-column">
                <h5 class="card-title mb-2 mt-1">{{object.title}}</h5>
                <p class="card-text mb-1" ><small class="text-muted">{{object.id}}</small></p>
                <p class="card-text mb-1"><small class="text-muted">{{object.type}}</small></p>
                <p class="card-text mb-1"><small class="text-muted">{{object.location}}</small></p>
              </div>
            </div>
          </div>
        </div> -->
        <div class="col-md-3" v-for="object in objects">
            <aside class="profile-nav alt">
                <section class="card">
                    <div class="card-header user-header alt " style="background-color: white;">
                        <div class="media d-flex">
                            <div style="height:12rem;  " class="align-self-center d-flex">
                              <img alt="" src="https://picsum.photos/400/400/?image=20" class="align-self-center rounded-circle " style="width: 120px; height: 120px;">
                            </div>
                            <div class="media-body">
                                <h2 class="text-dark display-6">{{object.title}}</h2>
                                <p>{{object.id}}</p>
                                <p>负责人</p>
                                <p>{{object.type}}</p>
                                <p>{{object.location}}</p>
                            </div>
                        </div>
                    </div>




                    <!-- <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <a href="#"> <i class="fa fa-envelope-o"></i> Mail Inbox <span class="badge badge-primary pull-right">10</span></a>
                        </li>
                        <li class="list-group-item">
                            <a href="#"> <i class="fa fa-tasks"></i> Recent Activity <span class="badge badge-danger pull-right">15</span></a>
                        </li>
                        <li class="list-group-item">
                            <a href="#"> <i class="fa fa-bell-o"></i> Notification <span class="badge badge-success pull-right">11</span></a>
                        </li>
                        <li class="list-group-item">
                            <a href="#"> <i class="fa fa-comments-o"></i> Message <span class="badge badge-warning pull-right r-activity">03</span></a>
                        </li>
                    </ul> -->

                </section>
            </aside>
        </div>
      </div>
    </div>

  </div>





</template>

<script>
  import navbar from "../components/Navbar.vue"
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  export default {
    name: 'index',
    data () {
      return {
        objects:[
          {
            title:"门店1",
            id:"编号",
            type:"类型",
            location:"位置"
          },
          {
           title:"门店2",
           id:"编号",
           type:"类型",
           location:"位置"
          },{
            title:"门店3",
            id:"编号",
            type:"类型",
            location:"位置"
          },
          {
            title:"门店4",
            id:"编号",
            type:"类型",
            location:"位置"
          },
          {
            title:"门店5",
            id:"编号",
            type:"类型",
            location:"位置"
          },
        ]

      }
    },
    components:{
      navbar,
      sidebar,
      consolePanel
    }
  }
</script>

<style>
  #main{

    background-color:#f1f2f7;
  }
  .card-title{
    width:fit-content;
  }
  .card-text{
    width:fit-content;
  }
  .card-img{
    margin: 0 auto; /*水平居中*/
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);/*通过设置div的transform: translateY(-50%)，意思是使得div向上平移（translate）自身高度的一半(50%)*/
    /* width:105px;
    height:105px; */
  }
</style>
