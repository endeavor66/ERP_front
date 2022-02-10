<template>
  <div id="main">
    <sidebar></sidebar>

    <consolePanel>
      <!-- Animated -->
      <div class="animated fadeIn">
        <!--总览-->
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body d-flex justify-content-between">
                        <h4 class=" pt-2 display-5" align="left">总览</h4>
                        <div>
                          <button type="submit" class="btn btn-outline-primary btn-sm" @click="exportData()">
                            <i class="fa fa-dot-circle-o"></i> 导出
                          </button>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-around pl-3 pr-3">
                      <div class="col" >
                          <div class="card text-white bg-flat-color-1" style="background: #00c292">
                              <div class="card-body">
                                  <div class=" pt-1 ">
                                      <h3 class="mb-0 fw-r">
                                          <small>￥</small>
                                          <span class="count">{{basicInfo.totalSale}}</span>
                                      </h3>
                                      <p class="text-light mt-1 m-0">销售总额</p>
                                  </div><!-- /.card-left -->
                              </div>
                          </div>
                      </div>
                      <!--/.col-->
                      <div class="col">
                          <div class="card text-white bg-flat-color-6" style="background: #5c6bc0;">
                              <div class="card-body">
                                  <div class=" pt-1 ">
                                      <h3 class="mb-0 fw-r">
                                          <span class="count">{{basicInfo.orderCount}}</span>
                                          <small>笔</small>
                                      </h3>
                                      <p class="text-light mt-1 m-0">订单总数</p>
                                  </div><!-- /.card-left -->
                              </div>
                          </div>
                      </div>
                      <!--/.col-->
                      <div class="col">
                          <div class="card text-white bg-flat-color-3" style="background: #03a9f3;">
                              <div class="card-body">
                                  <div class=" pt-1 ">
                                      <h3 class="mb-0 fw-r">
                                          <span class="count">{{basicInfo.customerCount}}</span>
                                          <small>人</small>
                                      </h3>
                                      <p class="text-light mt-1 m-0">客户总数</p>
                                  </div><!-- /.card-left -->
                              </div>
                          </div>
                      </div>
                      <!--/.col-->
                      <div class="col">
                          <div class="card text-white bg-flat-color-2" style="background-color: #FF6600;">
                              <div class="card-body">
                                  <div class=" pt-1 ">
                                      <h3 class="mb-0 fw-r">
                                          <span class="count">{{basicInfo.perCustomerSale}}</span>
                                          <small>元/人</small>
                                      </h3>
                                      <p class="text-light mt-1 m-0">客单价</p>
                                  </div><!-- /.card-left -->
                              </div>
                          </div>
                      </div>
                      <!--/.col-->
                      <div class="col">
                          <div class="card text-white bg-flat-color-2" style="    background: #ab8ce4;">
                              <div class="card-body">
                                  <div class=" pt-1 ">
                                      <h3 class="mb-0 fw-r">

                                          <span class="count">{{basicInfo.commodityCount}}</span>
                                          <small>件</small>
                                      </h3>
                                      <p class="text-light mt-1 m-0">商品总数</p>
                                  </div><!-- /.card-left -->
                              </div>
                          </div>
                      </div>
                      <!--/.col-->
                    </div> <!-- /.row -->
                </div>
            </div><!-- /# column -->
        </div>
        <!--/总览-->

        <div class="row">
          <!--销售金额折线图-->
          <div class="col-12">
              <div class="card">
                <div class="card-body">
                    <!-- <div class="row"> -->
                      <h4 class=" pt-2 display-5" align="left" style="display: inline; float:left">销售额走势</h4>
                      <div class="d-flex justify-content-end" style="">
                        <p class="col-1 mt-1 p-0" style="margin-right:-1rem">按单位：</p>
                        <div class="col-2">
                          <select name="selectSm" id="salesChartSelect" class="form-control-sm form-control">
                            <option value="year" data-type="year">年销售额</option>
                            <option value="month" data-type="month">月销售额</option>
                            <option value="day" data-type="day">日销售额</option>
                          </select>
                        </div>
                        <div>
                          <button type="submit" class="btn btn-outline-primary btn-sm" @click="setSalesChart()">
                            <i class="fa fa-dot-circle-o"></i> Submit
                          </button>
                        </div>
                      </div>
                    <!-- </div> -->

                </div>
                <div class="card-body" style="height: 45vh; width: 100%;">
                    <canvas id="sales-chart" ></canvas>
                    <!-- <canvas id="sales-chart" height="327" width="655" class="chartjs-render-monitor" style="display: block; height: 252px; width: 504px;"></canvas> -->
                </div>
              </div>
          </div>
          <!--/销售金额折线图-->
          <!--年饼图-->
          <div class="col-lg-6" >
              <div class="card">
                  <div class="card-body">
                    <h4 class="mb-3 ">Top10商品的销售金额占比（年）</h4>
                    <div class="d-flex justify-content-end col-12" style="margin-top:-39px">
                      <div class="col-3 " style="margin-right:-10px">
                        <select name="selectSm" id="yearPieSelect" class="form-control-sm form-control">
                          <option value="2021" >2021</option>
                          <option value="2020" >2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                        </select>
                      </div>
                      <div style="margin-right:-20px">
                        <button type="submit" class="btn btn-outline-primary btn-sm" @click="setYearPieChart()">
                          <i class="fa fa-dot-circle-o"></i>
                        </button>
                      </div>
                    </div>
                    <canvas id="yearPieChart" height="160"></canvas>
                  </div>
              </div>
          </div>
          <!--/年饼图-->
          <!--月饼图-->
          <div class="col-lg-6" >
              <div class="card">
                  <div class="card-body">
                    <h4 class="mb-3 ">Top5商品的销售金额占比（月）</h4>
                    <div class="d-flex justify-content-end col-12" style="margin-top:-39px">
                      <div class="p-0 mr-1 " style="margin-right:-10px">
                        <select name="selectSm2" id="monthPieSelectYear" class="form-control-sm form-control">
                          <option value="2021" >2021</option>
                          <option value="2020" >2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                        </select>
                      </div>
                      <div class="mr-1 pl-0" style="margin-right:-10px;width:11%">
                        <select name="selectSm" id="monthPieSelect" class="form-control-sm form-control">
                          <option value="0" data-type="1">1</option>
                          <option value="1" data-type="2">2</option>
                          <option value="2" data-type="3">3</option>
                          <option value="2" data-type="4">4</option>
                          <option value="2" data-type="5">5</option>
                          <option value="2" data-type="6">6</option>
                          <option value="2" data-type="7">7</option>
                          <option value="2" data-type="8">8</option>
                          <option value="2" data-type="9">9</option>
                          <option value="2" data-type="10">10</option>
                          <option value="2" data-type="11">11</option>
                          <option value="2" data-type="12">12</option>
                        </select>
                      </div>
                      <div style="margin-right:-20px">
                        <button type="submit" class="btn btn-outline-primary btn-sm" @click="setMonthPieChart()">
                          <i class="fa fa-dot-circle-o"></i>
                        </button>
                      </div>
                    </div>
                    <canvas id="monthPieChart" height="160" ></canvas>
                  </div>
              </div>
          </div>
          <!--/月饼图-->
          <!--商品销售金额折线图-->
          <div class="col-12">
              <div class="card">
                <div class="card-body d-flex justify-content-between">
                  <h4 align="left" class=" pt-2 display-5 col-4" style="display: inline; float: left;">商品销售额走势</h4>
                  <div class="col-5 d-flex p-1 justify-content-end">
                    <p class="col-3 " style="padding-top:3px">商品编号:</p>
                    <input type="text" id="commodityIdInput" placeholder="id" onFocus="this.value=''" value="0001"  class="form-control col-5 mr-3" style="margin-top:-3px">
                    <div>
                      <button type="submit" class="btn btn-outline-primary btn-sm" @click="setGoodsSalesChart()">
                        <i class="fa fa-dot-circle-o"></i> Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body" style="height: 43vh; width: 100%;">
                    <canvas id="goods-sales-chart"></canvas>
                </div>
              </div>
          </div>
          <!--/商品销售金额折线图-->
          <!--order列表-->
          <div class="col-lg-12">
              <div class="card">
                  <div class="card-header d-flex">
                    <div class="col-5"></div>
                    <strong class="card-title col-2">销售订单</strong>
                    <div class="col-5 d-flex justify-content-end p-0">
                      <p class="col-2" style="margin-left:-1rem;margin-right:-1rem">年份:</p>
                      <div class="col-3">
                          <select name="selectSm2" id="salesOrderListYearSelect" class="form-control-sm form-control">
                              <option value="2021" >2021</option>
                              <option value="2020" >2020</option>
                              <option value="2019" >2019</option>
                              <option value="2018" >2018</option>
                              <option value="2017" >2017</option>
                              <option value="2016" >2016</option>
                          </select>
                      </div>
                      <p class="col-2" style="margin-left:-1rem;margin-right:-1rem">月份:</p>
                      <div class="col-3">
                          <select name="selectSm" id="salesOrderListMonthSelect" class="form-control-sm form-control">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                          </select>
                      </div>
                      <div >
                          <button type="submit" class="btn btn-outline-primary btn-sm" @click="getSalesOrderList()">
                              <i class="fa fa-dot-circle-o"></i> Submit
                          </button>

                      </div>
                    </div>
                  </div>
                  <div class="table-stats order-table ov-h">
                      <table class="table ">
                          <thead>
                              <tr>
                                  <th class="serial">#</th>
                                  <th class="avatar">订单编号</th>
                                  <th>商品编号</th>
                                  <th>名称</th>
                                  <th>数量</th>
                                  <th>价格</th>
                                  <th style="text-align: center;">日期</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="orderList,index in orderLists">
                                  <td class="serial">{{index}}.</td>
                                  <td >{{orderList.id}}</td>
                                  <td> {{orderList.product_id}} </td>
                                  <td>  <span class="name">{{orderList.product_name}}</span> </td>
                                  <td> <span class="product">{{orderList.num}}</span> </td>
                                  <td><span class="count">{{orderList.price}}</span></td>
                                  <td style="text-align: center;">
                                    {{orderList.sales_date}}
                                     <!-- <span class="badge badge-complete"></span> -->
                                  </td>
                              </tr>

                          </tbody>
                      </table>
                  </div> <!-- /.table-stats -->
              </div>
          </div>
          <!--/order列表-->
        </div>


      </div>
      <!--/Animated-->

    </consolePanel>
  </div>

</template>

<script>
  import * as api from "../request/api.js"
  import Chart from 'chart.js';
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  var salesChart;
  var yearPieChart;
  var monthPieChart;
  var commoditySalesChart;
  export default {
    name: 'salesTotal',
    data () {
      return {
        basicInfo:{},
        salesChart:{  //销量折线图

          // time:[ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
          // trend:[ 0, 30, 15, 110, 50, 63, 120 ],
        },
        yearPieChart:{    //年份饼图
          // commocity:[ "暂无数据" ],
          // rate:[ 100],
        },
        monthPieChart:{    //月份饼图
          commocity:[  "暂无数据" ],
          rate:[ 100],
        },
        commoditySalesTrendChart:{
          time:[  ],
          trend:[ ],
        },
        orderLists:[
          {
            id:"",
            product_id:"",
            product_name:"",
            num:1,
            price:1,
            date:""
          }
        ],


      }
    },
    components:{
      sidebar,
      consolePanel
    },
    methods:{
      /**
      1. 生成销量折线图
      */
     setSalesChart(){
       //获取type类型
       var type=$("#salesChartSelect").find("option:selected").attr("data-type");
       var obj={type:type};

       //发送请求
       api.getSalesTrend(obj,"获取销售金额走势失败").then(res => {
         console.log("生成销量折线图");
         console.log(obj);
         console.log(res)
         if(res.data.status==0){  //成功
            this.salesChart=res.data.data
            if (salesChart) {
              salesChart.destroy();
            }
                //Sales chart
              var ctx = document.getElementById( "sales-chart" );
              //ctx.height = 300;
              salesChart = new Chart( ctx, {
                  type: 'line',
                  data: {
                      labels: this.salesChart.time,
                      type: 'line',
                      defaultFontFamily: 'Montserrat',
                      datasets: [ {
                          label: "销量",
                          data: this.salesChart.trend,
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(220,53,69,0.75)',
                          borderWidth: 3,
                          pointStyle: 'circle',
                          pointRadius: 5,
                          pointBorderColor: 'transparent',
                          pointBackgroundColor: 'rgba(220,53,69,0.75)',
                              },  ]
                  },
                  options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      tooltips: {
                          mode: 'index',
                          titleFontSize: 12,
                          titleFontColor: '#000',
                          bodyFontColor: '#000',
                          backgroundColor: '#fff',
                          titleFontFamily: 'Montserrat',
                          bodyFontFamily: 'Montserrat',
                          cornerRadius: 3,
                          intersect: false,
                      },
                      legend: {
                          display: false,
                          labels: {
                              usePointStyle: true,
                              fontFamily: 'Montserrat',
                          },
                      },
                      scales: {
                          xAxes: [ {
                              display: true,
                              gridLines: {
                                  display: false,
                                  drawBorder: false
                              },
                              scaleLabel: {
                                  display: false,
                                  labelString: 'Month'
                              }
                                  } ],
                          yAxes: [ {
                              display: true,
                              gridLines: {
                                  display: false,
                                  drawBorder: false
                              },
                              scaleLabel: {
                                  display: true,
                                  labelString: 'Value'
                              }
                                  } ]
                      },
                      title: {
                          display: false,
                          text: 'Normal Legend'
                      }
                  }

            })
         }
       } );

     },
      /**
      2. 生成年份饼图
      */
     setYearPieChart(){
       var year=$("#yearPieSelect").find("option:selected").attr("value");
       var obj={year:year};

       //发送请求
       api.getYearSalesRate(obj,"根据指定年份获取Top10商品的销售金额占比失败").then(res=>{
         console.log("生成年份饼图");
         console.log(obj);
         console.log(res)
         if(res.data.status==0){
           this.yearPieChart=res.data.data;
           this.yearPieChart=res.data.data;
           if (yearPieChart) {
             yearPieChart.destroy();
           }
           //pie chart
           var ctx = document.getElementById( "yearPieChart" );
           //ctx.height = 150;
            yearPieChart = new Chart( ctx, {
               type: 'pie',
               data: {
                   datasets: [ {
                       data: this.yearPieChart.rate,
                       backgroundColor: [
                                           "rgba(0, 194, 146,0.9)",
                                           "rgba(0, 194, 146,0.7)",
                                           "rgba(0, 194, 146,0.5)",
                                           "rgba(0,0,0,0.07)"
                                       ],
                       hoverBackgroundColor: [
                                           "rgba(0, 194, 146,0.9)",
                                           "rgba(0, 194, 146,0.7)",
                                           "rgba(0, 194, 146,0.5)",
                                           "rgba(0,0,0,0.07)"
                                       ]

                                   } ],
                   labels: this.yearPieChart.commocity
               },
               options: {
                   responsive: true,
               }
           } );
           console.log(myChart)
         }
       })

     },
     /**
      3. 生成月份饼图
      */
     setMonthPieChart(){
       var year=$("#monthPieSelectYear").find("option:selected").attr("value");
       var month=$("#monthPieSelect").find("option:selected").attr("data-type");
       var obj={year:year,month:month};
       //发送请求
       api.getMonthSalesRate(obj,"根据指定月份获取Top5商品的销售金额占比失败").then(res=>{
         console.log("生成月份饼图");
         console.log(obj);
         if(res.data.status==0){
           this.monthPieChart=res.data.data;
           if (monthPieChart) {
             monthPieChart.destroy();
           }
           //pie chart
           var ctx = document.getElementById( "monthPieChart" );
           //ctx.height = 150;
           monthPieChart = new Chart( ctx, {
               type: 'pie',
               data: {
                   datasets: [ {
                       data: this.monthPieChart.rate,
                       backgroundColor: [
                                           "rgba(0, 194, 146,0.9)",
                                           "rgba(0, 194, 146,0.7)",
                                           "rgba(0, 194, 146,0.5)",
                                           "rgba(0,0,0,0.07)",
                                           "rgba(15, 7, 255, 0.1)"
                                       ],
                       hoverBackgroundColor: [
                                           "rgba(0, 194, 146,0.9)",
                                           "rgba(0, 194, 146,0.7)",
                                           "rgba(0, 194, 146,0.5)",
                                           "rgba(0,0,0,0.07)",
                                           "rgba(15, 7, 255, 0.1)"
                                       ]

                                   } ],
                   labels: this.monthPieChart.commocity
               },
               options: {
                   responsive: true
               }
           } );
         }
       })


     },
     /**
      * 4.商品销售额折线图
      */
     setGoodsSalesChart(){
       var commodityId=document.getElementById("commodityIdInput").value;
       var obj={product_id:commodityId}
       var content=[];
       //发送请求
       api.getCommoditySalesTrend(obj,"获取指定商品近年的销售额走势失败").then(res=>{
         console.log("商品销售额折线图");
         if(res.data.status==0){
           content=res.data.data;
           this.commoditySalesTrendChart={time:[],trend:[]}
           for(var i=0;i<content.length;i++){
               this.commoditySalesTrendChart.time.push(content[i].year);
               this.commoditySalesTrendChart.trend.push(content[i].salesAmount);
             }
           if (commoditySalesChart) {
             commoditySalesChart.destroy();
           }

           //Sales chart
               var ctx = document.getElementById( "goods-sales-chart" );
               //ctx.height = 100;
               commoditySalesChart = new Chart( ctx, {
                   type: 'line',
                   data: {
                       labels:this.commoditySalesTrendChart.time,
                       type: 'line',
                       defaultFontFamily: 'Montserrat',
                       datasets: [ {
                           label: commodityId,
                           data: this.commoditySalesTrendChart.trend,
                           backgroundColor: 'transparent',
                           borderColor: 'rgba(220,53,69,0.75)',
                           borderWidth: 3,
                           pointStyle: 'circle',
                           pointRadius: 5,
                           pointBorderColor: 'transparent',
                           pointBackgroundColor: 'rgba(220,53,69,0.75)',
                               }, ]
                   },
                   options: {
                       responsive: true,
                       maintainAspectRatio: false,
                       tooltips: {
                           mode: 'index',
                           titleFontSize: 12,
                           titleFontColor: '#000',
                           bodyFontColor: '#000',
                           backgroundColor: '#fff',
                           titleFontFamily: 'Montserrat',
                           bodyFontFamily: 'Montserrat',
                           cornerRadius: 3,
                           intersect: false,
                       },
                       legend: {
                           display: false,
                           labels: {
                               usePointStyle: true,
                               fontFamily: 'Montserrat',
                           },
                       },
                       scales: {
                           xAxes: [ {
                               display: true,
                               gridLines: {
                                   display: false,
                                   drawBorder: false
                               },
                               scaleLabel: {
                                   display: false,
                                   labelString: 'Month'
                               }
                                   } ],
                           yAxes: [ {
                               display: true,
                               gridLines: {
                                   display: false,
                                   drawBorder: false
                               },
                               scaleLabel: {
                                   display: true,
                                   labelString: 'Value'
                               }
                                   } ]
                       },
                       title: {
                           display: false,
                           text: 'Normal Legend'
                       }
                   }
               } );
         }
       })

     },
     /**
      * 5. 获取总销量基本信息
      */
     getBasicInfo(){
       //发送请求
       api.getallBasicSalesInfo("获取总销量基本信息失败").then(res=>{
         console.log("获取总销量基本信息")
         console.log(res)
         if(res.data.status==0){
           this.basicInfo=res.data.data;
         }
       })
      },

     /**
      * 6.根据月份获取销售订单
      */
     getSalesOrderList(){
       var year=$("#salesOrderListYearSelect").find("option:selected").attr("value");
       var month=$("#salesOrderListMonthSelect").find("option:selected").attr("value");
       var obj={year:year,month:month};
       console.log("根据月份获取销售订单");
       console.log(obj);
       api.getOrderList(obj,"根据月份获取销售订单失败").then(res=>{
         console.log("根据月份获取销售订单")
         console.log(res)
         if(res.data.status==0){
           this.orderLists=res.data.data;
         }
       })

     },
    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {
      this.getBasicInfo();
      this.setSalesChart();
      this.setYearPieChart();
      this.setMonthPieChart();
      this.setGoodsSalesChart();
      this.getSalesOrderList();
    },
    beforeUpdate() {

    },
    updated() {

    }
  }

</script>

<style scoped>
</style>
