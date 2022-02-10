<template>
  <!-- Left Panel -->
      <aside id="left-panel" class="left-panel">
          <nav class="navbar navbar-expand-sm navbar-default">
              <div id="main-menu" class="main-menu collapse navbar-collapse">
                  <ul class="nav navbar-nav">
                      <li class="active" @click="$router.push('/index/console');">
                          <a href="#"><i class="menu-icon fa fa-laptop" ></i>门店名 </a>
                      </li>
                      <li class="menu-title" style="text-align:left;">提醒</li><!-- /.menu-title -->
                      <li @click="$router.push('/console/alert');">
                          <a href="#"> <i class="menu-icon fa fa-bell"></i>智能提醒</a>
                      </li>
                      <li class="menu-title">综合信息</li><!-- /.menu-title -->
                      <li class="menu-item-has-children dropdown">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-bar-chart"></i>销量信息</a>
                          <ul class="sub-menu children dropdown-menu">
                              <li @click="$router.push('/console/sales/salesTotal');"><i class="menu-icon fa fa-arrow-circle-o-right"></i><a href="#">总体销量</a></li>
                              <li @click="$router.push('/console/sales/salesRecent');"><i class="menu-icon fa fa-arrow-circle-o-right"></i><a href="#">最近销量</a></li>
                          </ul>
                      </li>
                      <li class="menu-item-has-children dropdown">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-th"></i>类别信息</a>
                          <ul class="sub-menu children dropdown-menu">
                              <li @click="$router.push('/console/repository/productType');"><i class="menu-icon fa fa-arrow-circle-o-right"></i><a href="#">成品类别</a></li>
                              <li @click="$router.push('/console/repository/materialType');"><i class="menu-icon fa fa-arrow-circle-o-right"></i><a href="#">原料类别</a></li>
                          </ul>
                      </li>
                      <li class="menu-item-has-children dropdown">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-list-alt"></i>库存信息</a>
                          <ul class="sub-menu children dropdown-menu">
                              <li @click="$router.push('/console/repository/productRepository');"><i class="menu-icon fa fa-arrow-circle-o-right"></i><a href="#">成品库存</a></li>
                              <li @click="$router.push('/console/repository/materialRepository');"><i class="menu-icon fa fa-arrow-circle-o-right"></i><a href="#">原料库存</a></li>
                          </ul>
                      </li>

                      <li class="menu-item-has-children dropdown">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-truck"></i>采购信息</a>
                          <ul class="sub-menu children dropdown-menu">
                              <li @click="$router.push('/console/purchase/purchaseOrder');"><i class="menu-icon fa fa-arrow-circle-o-right"></i><a href="#">进行中</a></li>
                              <li @click="$router.push('/console/purchase/finishedPurchaseOrder');"><i class="menu-icon fa fa-arrow-circle-o-right"></i><a href="#">已完成</a></li>
                          </ul>
                      </li>
                      <li class="menu-title" style="text-align:left;">业务操作</li><!-- /.menu-title -->
                      <li @click="jumpToPurchaseOperation()">
                          <a href="#"> <i class="menu-icon fa fa-shopping-cart"></i>采购操作</a>
                      </li>
                      <li @click="$router.push('/console/salesManage');">
                          <a href="#"> <i class="menu-icon fa  fa-tasks"></i>销量管理</a>
                      </li>
                      <li @click="$router.push('/console/returnManage');">
                          <a href="#"> <i class="menu-icon fa fa-suitcase"></i>退货管理</a>
                      </li>
                      <li @click="$router.push('/console/exportData');">
                          <a href="#"> <i class="menu-icon fa fa-mail-forward"></i>数据导出</a>
                      </li>
                  </ul>
              </div><!-- /.navbar-collapse -->
          </nav>
      </aside>
      <!-- /#left-panel -->
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {

      }
    },
    methods:{
      jumpToPurchaseOperation(){
        this.$router.replace({ path: "/console/purchase/purchaseOperation",query:{refresh:true,}});
      }
    }
  }
</script>

<style scoped>

</style>
