<template>
  <div id="main">
    <sidebar></sidebar>

    <consolePanel>
      <!-- Animated -->
      <div class="animated fadeIn">
        <!--标题栏-->
        <div class="row">
          <div class="col-lg-12">
              <div class="card">
                  <div class="card-body d-flex justify-content-between">
                      <h4 class=" display-5 pt-1" align="left">导出数据</h4>
                      <div v-if="!isExporting">
                        <button type="submit" :class="['btn','btn-outline-primary','btn-sm',{'disabled':isExporting}]" data-toggle="modal" data-target="#exportModal">
                          <i class="fa fa-dot-circle-o"></i> 导出
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <!--/标题栏-->

        <!--进度条-->
        <div v-if="isExporting" class="row">
          <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <!-- <div class="col-12">导出中...</div> -->
                  <div class="progress">
                      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" :style="{width: progressWidth}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{progressWidth}}</div>
                  </div>
                </div>

              </div>
          </div>
        </div>
        <!--/进度条-->
        <!--提醒栏-->
        <div v-if="isExportSuccess" class="sufee-alert alert with-close alert-success alert-dismissible fade show" style="width:100%">
            <span class="badge badge-pill badge-success">通知</span>
            您已成功导出数据到本地，请查看！
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!--/提醒栏-->
        <!--content-->
        <div class="row">
          <!--面板-->
          <div class="col-12">
              <div class="card pt-5 pb-5" style="height:auto">
                <div class="row" style="height:100%">
                  <div class="card-body d-flex justify-content-between pt-2 pl-4" style="height:100%">
                    <div class="col-6 ml-5 d-flex">
                        <p class="col-3" style="padding-top:3px">数据类型:</p>
                        <div class="col-6" style="margin-top: -3px;">
                          <select name="selectSm" id="typeSelect2" class="form-control form-control" @click="getDateData()">
                            <option data-type="day" value="salesData">销量数据</option>
                            <option data-type="week" value="returnData">退货数据</option>
                            <option data-type="month" value="commodityData">商品数据</option>
                            <option data-type="month" value="supplierData">供应商数据</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-4 d-flex">
                        <p class="col-3" style="padding-top:3px">数据日期:</p>
                        <div class="col-6">
                            <div v-for="date in dates" class="checkbox mt-1 mb-2">
                                <label for="checkbox1" class="form-check-label ">
                                    <input type="checkbox" id="checkbox1" name="checkbox1" :value="date" class="form-check-input">{{date}}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex col-2 align-items-end">

                    </div>


                  </div>
                  <!-- <div class="col-12 d-flex justify-content-end pr-5">
                    <button type="button" @click="" class="btn btn-outline-primary btn-lg col-2" >导出</button>
                  </div> -->

                </div>
              </div>
          </div>

          <!--/面板-->
          <!--导出推荐单弹窗-->
          <div  class="modal fade" id="exportModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-md" role="document">
                      <div class="modal-content">
                          <div class="modal-header d-flex">
                              <div class="col-1"></div>
                              <h5 class="modal-title col-10" id="staticModalLabel">导出</h5>
                              <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div class="modal-body">
                             <p >
                                 确认导出数据文件到本地吗？<br><small class=" mt-2"></small>
                             </p>

                         </div>
                         <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                          <button type="button" class="btn btn-primary" @click="exportData()">确定</button>
                          </div>
                  </div>
              </div>
          </div>
          <!--/导出推荐单弹窗-->
        </div>
        <!--/content-->
      </div>

    </consolePanel>
  </div>
</template>

<script>
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  import * as api from "../request/api.js"
  export default {
    name: 'exportData',
    data () {
      return {
        dates:[],
        // salesDates:["2020-03-01","2020-02-28","2020-02-27","2020-02-26","2020-02-25"],
        // returnDates:["2020-03-01","2020-02-28","2020-02-27"],
        isExporting:false,
        progressWidth:"50%",
        isExportSuccess:false,
      }
    },
    methods:{
      /**
       * 1. 根据选择获取相应数据
       */
      getDateData(){
        var type=$("#typeSelect2").find("option:selected").attr("value");
        if(type=="salesData"){
          this.dates=this.salesDates;
        }
        else if(type=="returnData"){
          this.dates=this.returnDates;
        }
        else{
          this.dates=[];
        }
      },
      /**
       * 2. 获取数据
       */
      getData(){
        api.getUnExportDate("获取未被导出的销量和退货数据的日期失败").then(res=>{
          if(res.data.status==0){
            this.salesDates=res.data.data.salesDates;
            this.returnDates=res.data.data.returnDates;
          }
        })

      },
      /**
       * 3. 导出数据
       */
      exportData(){
        var type=$("#typeSelect2").find("option:selected").attr("value");
        var dates =[];
        $('input[id="checkbox1"]:checked').each(function(){
        dates.push($(this).val());
        });
        if(this.dates.length!=0&&dates.length==0){
          alert("请选择日期!")
          return
        }
        var obj={type:type,dates:dates};
        console.log(obj)
        $('#exportModal').modal('hide');
        this.isExporting=true;
        //发送请求
        api.exportData(obj,"导出数据失败").then(res=>{
          if(res.data.status==0){
            this.progressWidth="100%";
            this.isExportSuccess=true;
            this.isExporting=false;
          }
          else{
            alert("导出失败！")
            this.isExporting=false;
          }
        }).catch(failResponse => {
             //显示失败toast
             alert("导出失败！")
             this.isExporting=false;
         });

      }

    },
    components:{
      sidebar,
      consolePanel
    },
    mounted() {
      this.getData();
      this.dates=this.salesDates;
    }
  }
</script>

<style>
</style>
