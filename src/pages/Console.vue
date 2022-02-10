<template>

  <div id="main">
    <sidebar></sidebar>

<!-- Right Panel -->
    <consolePanel>

      <!-- Animated -->
      <div class="animated fadeIn">
          <!--Title-->
          <div class="row">
              <div class="col-lg-12">
                  <div class="card">
                      <div class="card-body">
                          <h2 class="pb-2 display-5">{{data1.name}}</h2>
                      </div>
                      <div class="row d-flex justify-content-center">
                        <div class="col-10" >
                          <p align="left">
                            <strong style="color: #000000;">简介：</strong>{{data1.synopsis}}
                          </p>
                        </div>

                      </div>
                      <div class="row d-flex justify-content-around">
                        <div class="col-3">
                          <div class="d-flex flex-column justify-content-center">
                            <p>{{data1.director}}</p>
                            <strong>负责人</strong>
                          </div>
                        </div>
                        <div class="border-left"></div>
                        <div class="col-3">
                          <div class="d-flex flex-column justify-content-center">
                            <p>{{data1.location}}</p>
                            <strong>地理位置</strong>
                          </div>
                        </div>
                        <div class="border-left"></div>
                        <div class="col-3">
                          <div class="d-flex flex-column justify-content-center">
                            <p>{{data1.found}}</p>
                            <strong>成立日期</strong>
                          </div>
                        </div>
                      </div> <!-- /.row -->
                      <div class="card-body"></div>
                  </div>
              </div><!-- /# column -->
          </div>
          <!--/Title-->
          <!-- Widgets  -->
          <div class="row">
              <div class="col-lg-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="stat-widget-five">
                              <div class="stat-icon dib flat-color-1">
                                  <i class="pe-7s-cash"></i>
                              </div>
                              <div class="stat-content">
                                  <div class="text-left dib">
                                      <div class="stat-text">￥<span class="count">{{data1.capital}}</span></div>
                                      <div class="stat-heading">注册资本</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="stat-widget-five">
                              <div class="stat-icon dib flat-color-2">
                                  <i class="pe-7s-cart"></i>
                              </div>
                              <div class="stat-content">
                                  <div class="text-left dib">
                                      <div class="stat-text"><span class="count">-</span></div>
                                      <div class="stat-heading">商品数量</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="stat-widget-five">
                              <div class="stat-icon dib flat-color-3">
                                  <i class="pe-7s-browser"></i>
                              </div>
                              <div class="stat-content">
                                  <div class="text-left dib">
                                      <div class="stat-text"><span class="count">-</span></div>
                                      <div class="stat-heading">订单数量</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="stat-widget-five">
                              <div class="stat-icon dib flat-color-4">
                                  <i class="pe-7s-users"></i>
                              </div>
                              <div class="stat-content">
                                  <div class="text-left dib">
                                      <div class="stat-text"><span class="count">-</span></div>
                                      <div class="stat-heading">员工数量</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Widgets -->
          <!--今日-->
          <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body d-flex justify-content-between">
                        <h4 class=" pt-2 display-5" align="left">{{type}}销量</h4>
                        <div class="col-5 d-flex justify-content-end p-0">
                          <p class="col-2" style="margin-left: -1rem; margin-right: -25px;">时间:</p>
                          <div class="col-3">
                            <select name="selectSm" id="typeSelect" class="form-control-sm form-control">
                              <option data-type="今日" value="day">今日</option>
                              <option data-type="本周" value="week">本周</option>
                              <option data-type="本月" value="month">本月</option>
                            </select>
                          </div>
                          <div>
                            <button type="submit" class="btn btn-outline-primary btn-sm" @click="getAllData()">
                              <i class="fa fa-dot-circle-o"></i> Submit
                            </button>
                          </div>
                        </div>
                    </div>

                </div>
                <div class="row d-flex justify-content-around ">
                  <div class="col-lg-3 col-md-6">
                      <div class="card">
                          <div class="card-body">
                              <div class="stat-widget-one">
                                  <div class="stat-icon dib"><i class="ti-money text-success border-success"></i></div>
                                  <div class="stat-content dib">
                                      <div class="stat-text">销售额</div>
                                      <div class="stat-digit"><small>￥</small>{{basicInfo.totalSale}}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="col-lg-3 col-md-6">
                      <div class="card">
                          <div class="card-body">
                              <div class="stat-widget-one">
                                  <div class="stat-icon dib"><i class="ti-layout-grid2 text-warning border-warning"></i></div>
                                  <div class="stat-content dib">
                                      <div class="stat-text">订单数</div>
                                      <div class="stat-digit">{{basicInfo.orderCount}}<small> 笔</small></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="col-lg-3 col-md-6">
                      <div class="card">
                          <div class="card-body">
                              <div class="stat-widget-one">
                                  <div class="stat-icon dib"><i class="ti-user text-primary border-primary"></i></div>
                                  <div class="stat-content dib">
                                      <div class="stat-text">用户数</div>
                                      <div class="stat-digit">{{basicInfo.userNum}}<small> 人</small></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="col-lg-3 col-md-6">
                      <div class="card">
                          <div class="card-body">
                              <div class="stat-widget-one">
                                  <div class="stat-icon dib"><i class="ti-link text-danger border-danger"></i></div>
                                  <div class="stat-content dib">
                                      <div class="stat-text">客单价</div>
                                      <div class="stat-digit">{{basicInfo.perMoney}}<small> 元/人</small></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          <!--/今日-->

          <div class="row">
            <!--商品占比饼图-->
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body" style="height:55vh">
                        <h4 class="mb-3">Top10商品销售额占比</h4>
                        <canvas id="doughutChart"></canvas>
                    </div>
                </div>
            </div>
            <!--/商品占比饼图-->
            <!--实际与预测对比折线图-->
            <div class="col-6">
                <div class="card">
                  <div class="card-body">
                        <h4 class=" pt-2 display-5" align="left" style="display: inline; ">实际销量与预测销量对比图</h4>

                  </div>
                  <div class="card-body" style="height: 47vh; width: 100%;">
                      <canvas id="sales-chart"></canvas>
                  </div>
                </div>
            </div>
            <!--/实际与预测对比折线图-->

            <div class="col-12">
              <!--order列表-->
              <div class="card">
                <div class="col-lg-12 p-0">
                  <!-- <div class="card"> -->

                      <div class="card-header d-flex pt-4">
                        <div class="col-5"></div>
                        <strong class="card-title col-2">{{type}}销售订单</strong>
                        <div class="col-5 d-flex justify-content-end p-0">

                        </div>
                      </div>
                      <div class="table-stats order-table ov-h container-table">
                          <table class="table " id="salesListTable">
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th data-sortable="true">订单号</th>
                                      <th data-sortable="true">商品名称</th>
                                      <th data-sortable="true">商品编号</th>
                                      <th>数量</th>
                                      <th>单价</th>
                                      <th style="text-align:center">日期</th>
                                  </tr>
                              </thead>
                              <tbody  id="dataBody">
                                  <tr v-for="showOrderList,index in showOrderLists">
                                      <td>{{(currentPage-1)*12+index+1}}</td>
                                      <td>
                                          {{showOrderList.id}}
                                      </td>
                                      <td>{{showOrderList.product_name}}</td>
                                      <td>  <span class="name">{{showOrderList.product_id}}</span> </td>
                                      <td> <span class="product">{{showOrderList.num}}</span> </td>
                                      <td><span class="count">{{showOrderList.price}}</span></td>
                                      <td style="text-align:center"><span class="count">{{showOrderList.sales_date}}</span></td>
                                  </tr>

                              </tbody>
                          </table>
                      </div> <!-- /.table-stats -->

                  <!-- </div> -->
                </div>
                <!--分页栏-->
                <nav aria-label="...">
                  <ul class="pagination d-flex justify-content-center mt-5" id="pagination">

                  </ul>
                </nav>
                <!--/分页栏-->

              </div>
              <!--/order列表-->

            </div>
          </div>
      </div>
      <!-- .animated -->
    </consolePanel>
    <!-- /#right-panel -->
  </div>


</template>

<script>
  import Chart from 'chart.js';
  import navbar from "../components/Navbar.vue"
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  import * as api from "../request/api.js"
  var piechart;
  var compareSalesChart;
  export default {
    name: 'console',
    data () {
      return {
        data1:{
          id:"",
          name:"",
          location:"",
          type:"",
          synopsis:"",
          found:"",
          director:"",
          capital:0,
          // String id;//id
          //     String name;//店铺名称
          //     String location;//店铺位置
          //     String type;//店铺类型
          //     String synopsis;//店铺简介
          //     Date found;//店铺成立日期
          //     String director;//店铺负责人
          //     int capital;//注册资本
        },

        type:"今日",
        currentPage:1,
        showOrderLists:[],
        orderLists:[],
        basicInfo:{
          totalSale:0,
          orderCount:0,
          userNum:0,
          perMoney:0,
        },
        salesCompareChart:{  //销量折线图
          times:[ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
          actual:[ 0, 30, 15, 110, 50, 63, 120 ],
          predict:[]
        },
        pieChart:{    //年份饼图
          commocity:[ "暂无数据" ],
          rate:[ 100],
        },

      }
    },
    methods:{
      /**
       * 1. 生成商品销售额占比饼图
       */
      setDoughHutChart(){
        if(piechart){
          piechart.destroy()
        }
        //doughut chart
        var ctx = document.getElementById( "doughutChart" );
        //ctx.height = 150;
        piechart=new Chart( ctx, {
            type: 'doughnut',
            data: {
                datasets: [ {
                    data: this.pieChart.rate,
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
                labels: this.pieChart.commocity
            },
            options: {
                responsive: true,

            }
        } );
      },
      /**
       2. 生成预测与实际销量对比折线图
       */
      setSalesChart(){
        if(compareSalesChart){
          compareSalesChart.destroy();
        }
        //Sales chart
            var ctx = document.getElementById( "sales-chart" );
            //ctx.height = 290;
            compareSalesChart = new Chart( ctx, {
                type: 'line',
                data: {
                    labels: this.salesCompareChart.times,
                    type: 'line',
                    defaultFontFamily: 'Montserrat',
                    datasets: [ {
                        label: "实际销量",
                        data: this.salesCompareChart.actual,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(220,53,69,0.75)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(220,53,69,0.75)',
                            }, {
                        label: "预测销量",
                        data: this.salesCompareChart.predict,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(40,167,69,0.75)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(40,167,69,0.75)',
                            } ]
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
      },
      /**
       * 3. 设置最近的类型
       */
      setType(){
        var recentType=$("#typeSelect").find("option:selected").attr("data-type");
        console.log(recentType)
        this.type=recentType;
      },
      /**
       * 4. 获取当前页要显示的销量订单列表
       */
      getSalesOrderList:function(currentPage){
        // this.currentPage=page;
        this.currentPage=currentPage;
        var noResultInfo = '';
        noResultInfo += '<h3>空物料单</h3>';

        // if(!this.orderLists||this.orderLists.count==0){
        //   $('#container-table').html(noResultInfo);
        // }
        this.showOrderLists.length=0;
        var list=this.orderLists;
        var startIndex=(currentPage-1)*12;
        var lastIndex=this.orderLists.length<=12*currentPage?this.orderLists.length:12*currentPage;
        for(startIndex;startIndex<lastIndex;startIndex++){
          var item=(this.orderLists)[startIndex];
          this.showOrderLists.push(item);

        }




        this.makePagination('pagination',this.orderLists.length,currentPage);



        //换页栏
            // makePagination('pagination', content.count, page, (page) => {
            //     return makeHref(content, page)
            // })


      },
      /**
       * 5.制作换页
       * * @param {id of .pagination} paginationId
         * @param {list的数量} totalItems
         * @param {current page index} page
         * @param {function of how to make a href,it should receive a param represent page} linkFunc
         * @param {how many items should be rendered in one page} maxcount
       */
       makePagination(paginationId, totalItems, page, maxcount = 12) {
          var lastPage = Math.floor(totalItems / maxcount) + 1
          page = Number(page)
          var paginationLeft = '<li class="page-item"><a class="page-link" href="#" onclick="getSalesOrderList(\'1\')">First</a></li>' +
              '<li class="page-item"><a class="page-link" href="#" onclick="getSalesOrderList(\'' + (page <= 1 ? 1 : page - 1) + '\')">&laquo;</a></li>';
          var paginationRight = '<li class="page-item"><a class="page-link" href="#" onclick="getSalesOrderList(\'' + (page >= lastPage ? lastPage : page + 1) + '\')">&raquo;</a></li>' +
              '<li class="page-item"><a class="page-link" href="#" onclick="getSalesOrderList(\'' + lastPage + '\')">Last</a></li>';

          var pagination = '<li class="page-item active"><a class="page-link page-num" href="#">' + page + '</a></li>';
          var leftCount = 0;
          var i;
          for (i = page - 1; i >= page - 4 && i > 0; i--) {
              pagination = '<li class="page-item"><a class="page-link page-num" href="#" onclick="getSalesOrderList(\'' + i + '\')">' + i + '</a></li>' + pagination;
              leftCount++;
          }
          var j;
          for (j = page + 1; j <= page + (8 - leftCount) && j <= lastPage; j++) {
              pagination += '<li class="page-item"><a class="page-link page-num" href="#" onclick="getSalesOrderList(\'' + j + '\')">'+ j + '</a></li>';

          }

          pagination = (page <= 1 ? '' : paginationLeft) + pagination + (page >= lastPage ? '' : paginationRight);


          $('#' + paginationId).html(pagination);
      },
      /**
       * 8. 获取门店基本信息
       */
        getShopInfo1(){
          console.log("获取门店基本信息")
          api.getShopInfo("获取门店基本信息失败").then(res=>{
            console.log(res)
            if(res.data.status==0){
              this.data1=(res.data.data)[0];
            }
          })
        },
      /**
       * 6. 获取最近的总数据
       */
      getAllData(){
        this.setType();
        var type=$("#typeSelect").find("option:selected").attr("value");
        var obj={type:type};
        console.log(obj)
        api.getRecentSalesInfo(obj,"获取最近销量失败").then(res=>{
          console.log(res);
          if(res.data.status==1){
            alert(this.type+"暂无销量数据");
            //初始化数据
            this.initial()
          }
          else if(res.data.status=="0"){
            var content=res.data.data;
            //初始化basicInfo
            this.basicInfo={
              totalSale:content.totalSale,
              orderCount:content.orderCount,
              userNum:"-",
              perMoney:"-"
            }
            //初始化piechart
            this.pieChart={
              commocity:content.commocity,
              rate:content.rate,
            }
            //初始化对比折线图
            this.salesCompareChart={
              times:content.times,
              actual:content.actual,
              predict:content.predict,
            }
            //初始化订单
            this.orderLists=content.salesLists;

            this.setDoughHutChart();
            this.setSalesChart()
            this.getSalesOrderList("1");
          }
        })
      },

      /**
       * 7. 初始化数据
       */
      initial(){
        console.log("initiallll")
        this.salesCompareChart={};
        this.pieChart={};
        this.basicInfo={}
        this.currentPage=1;
        this.showOrderLists=[];
        this.orderLists=[];
        this.setSalesChart();
        this.setDoughHutChart();

      },

      },
    components:{
      navbar,
      sidebar,
      consolePanel
    },
    created() {
      let _this=this;
      window.getSalesOrderList=_this.getSalesOrderList; //对于使用原生onclick的元素要调用vue的方法，必须用此步骤将vue方法设置成原生
    },
    mounted() {
      this.getShopInfo1();
      this.getAllData();



    }
  }
</script>

<style scoped>


</style>
