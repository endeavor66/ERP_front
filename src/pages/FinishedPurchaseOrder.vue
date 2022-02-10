<template>
  <div id="main">
    <sidebar></sidebar>

    <consolePanel>
      <!-- Animated -->
      <div class="animated fadeIn">

        <!--已经完成的采购-->
        <div class="d-flex card">
          <!--已经完成的order列表-->
          <div class="col-lg-12 p-0">
              <!-- <div class="card"> -->
                  <div class="card-header d-flex pt-4">
                    <div class="col-5"></div>
                    <strong class="card-title col-2">已经完成的采购订单</strong>
                    <div class="col-5 d-flex justify-content-end p-0">
                      <p class="col-2" style="margin-left:-1rem;margin-right:-1rem">年份:</p>
                      <div class="col-3">
                          <select name="selectSm" id="yearSelect" class="form-control-sm form-control">
                            <option value="2021" >2021</option>
                            <option value="2020" >2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                          </select>
                      </div>
                      <p class="col-2" style="margin-left:-1rem;margin-right:-1rem">月份:</p>
                      <div class="col-3">
                          <select name="selectSm" id="monthSelect" class="form-control-sm form-control">
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
                      <div >
                          <button type="submit" @click="getPurchaseDetailLists()" class="btn btn-outline-primary btn-sm">
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
                                  <th class="avatar">编号</th>
                                  <th>操作人</th>
                                  <th>时间</th>
                                  <th>状态</th>
                                  <th style="text-align: center;width:190px">操作</th>
                              </tr>
                          </thead>
                          <tbody v-for="purchaseDetailList,index in purchaseDetailLists">
                              <tr >
                                  <td>#{{index+1}}</td>
                                  <td>{{purchaseDetailList.id}}</td>
                                  <td>{{purchaseDetailList.operator}}</td>
                                  <td>{{purchaseDetailList.date}}</td>
                                  <td>

                                      <span v-if="purchaseDetailList.status=='6'" class="badge badge-complete">已完成</span>

                                  </td>
                                  <td style="text-align: center;">
                                    <button type="button" class="btn btn-link" @click="getDetail($event)" :data-purchaseID="index">详情</button>
                                    <button type="button" class="btn btn-link">物流</button>
                                  </td>
                              </tr>
                              <tr style="display:none;background-color:#f1f2f7">
                                <td colspan="6" class="p-0 pt-4">
                                  <div class="d-flex justify-content-between">
                                    <!--进货单-->
                                    <div class="card" style="width:48%">
                                      <div class="card-body">
                                        <div class="d-flex">
                                          <div class="fa fa-sign-in mr-3" style="font-size:1.5rem;margin-top:0.2rem"></div>
                                          <h4 style="font-size: 1.5rem;font-weight:700" align="left">进货单</h4>
                                        </div>
                                        <div class="border-bottom d-flex mt-3 mb-2"></div>
                                         <div class="d-flex mb-3" style="margin-left:30px">
                                           <p align="left" class="mb-0 mr-3" style="font-size:0.8rem">负责人：{{purchaseDetailList.operator}}</p>
                                           <p align="left" class="mb-0" style="font-size:0.8rem">时间：{{purchaseDetailList.date}}</p>
                                         </div>
                                         <div v-for="material in purchaseDetailList.materials" v-if="material.checkedResult" class="row mb-1 " style="margin-left:30px">
                                           <div class=" d-flex col-12 p-0">
                                             <div class=" d-flex col-10 p-0">
                                               <span class="fa fa-dot-circle-o pt-2 mr-2" style="font-size: 5px;"></span>
                                               <span class="pt-1" style="font-size: 15px;">{{material.name}}</span>
                                               <p class="m-0"><small>（商品编号：{{material.id}}，数量：{{material.count}}，备注：{{material.comment}})</small></p>
                                             </div>
                                             <button type="button" class="btn btn-link p-0 col" @click="showSelectedSupplier2($event)" style="font-size:10px;">查看供应商</button>
                                           </div>
                                           <div  class=" d-flex col-12 p-0" style="display: none!important;height:25px">
                                             <div class="col-2"><p><small>{{material.supplier.name}}</small></p></div>
                                             <div class="col-3"><p><small>位置:{{material.supplier.location}} </small></p></div>
                                             <div class="col-2"><p><small>单价:￥{{material.supplier.price}}</small></p></div>
                                             <div class="col-2"><p><small>权值:{{material.supplier.star}}</small></p></div>
                                             <div class="col-3"><p><small>运费:￥{{material.supplier.fare_parameter}}元/公里</small></p></div>
                                           </div>
                                         </div>
                                      </div>
                                    </div>
                                    <!--/进货单-->
                                    <!--退货单-->
                                    <div class="card" style="width:48%">
                                      <div class="card-body">
                                        <div class="d-flex">
                                          <div class="fa fa-sign-out mr-3" style="font-size:1.5rem;margin-top:0.2rem"></div>
                                          <h4 style="font-size: 1.5rem;font-weight:700" align="left">退货单</h4>
                                        </div>
                                        <div class="border-bottom d-flex mt-3 mb-2"></div>
                                        <div class="d-flex mb-3" style="margin-left:30px">
                                           <p align="left" class="mb-0 mr-3" style="font-size:0.8rem">负责人：{{purchaseDetailList.operator}}</p>
                                           <p align="left" class="mb-0" style="font-size:0.8rem">时间：{{purchaseDetailList.date}}</p>
                                         </div>
                                         <div v-for="material in purchaseDetailList.materials" v-if="!material.checkedResult" class="row mb-1 " style="margin-left:30px">
                                           <div class=" d-flex col-12 p-0">
                                             <div class=" d-flex col-10 p-0">
                                               <span class="fa fa-dot-circle-o pt-2 mr-2" style="font-size: 5px;"></span>
                                               <span class="pt-1" style="font-size: 15px;">{{material.name}}</span>
                                               <p class="m-0"><small>（商品编号：{{material.id}}，数量：{{material.count}}，备注：{{material.comment}})</small></p>
                                             </div>
                                             <button type="button" class="btn btn-link p-0 col" @click="showSelectedSupplier2($event)" style="font-size:10px;">查看供应商</button>
                                           </div>
                                           <div  class=" d-flex col-12 p-0" style="display: none!important;height:25px">
                                             <div class="col-2"><p><small>{{material.supplier.name}}</small></p></div>
                                             <div class="col-3"><p><small>位置:{{material.supplier.location}} </small></p></div>
                                             <div class="col-2"><p><small>单价:￥{{material.supplier.price}}</small></p></div>
                                             <div class="col-2"><p><small>权值:{{material.supplier.star}}</small></p></div>
                                             <div class="col-3"><p><small>运费:￥{{material.supplier.fare_parameter}}元/公里</small></p></div>
                                           </div>
                                         </div>
                                        <div class="d-flex justify-content-end">
                                          <button type="button" class="btn btn-outline-info mt-3">一键退货</button>
                                        </div>

                                      </div>
                                    </div>
                                    <!--/退货单-->
                                  </div>
                                </td>
                              </tr>


                          </tbody>
                      </table>
                  </div> <!-- /.table-stats -->
              <!-- </div> -->
          </div>
          <!--/已经完成的order列表-->
          <!--分页栏-->
          <nav aria-label="...">
            <ul class="pagination d-flex justify-content-center mt-5">
              <li class="page-item disabled">
                <span class="page-link">Previous</span>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item active">
                <span class="page-link">
                  2
                  <span class="sr-only">(current)</span>
                </span>
              </li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
          <!--/分页栏-->
        </div>
        <!--/已经完成的采购-->
      </div>
      <!-- /Animated -->


    </consolePanel>
  </div>
</template>

<script>
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  import * as api from "../request/api.js"
  export default {
    name: 'finishedPurchaseOrder',
    data () {
      return {
        purchaseDetailLists:[   //从后端接收的采购的所有详细数据
          // {
          //   id:"003",
          //   operator:"隔壁小王",
          //   date:"20200128",
          //   status:"1",
          //   checkInfo:[  //审核状态，此处用不到
          //     {
          //       level:3,
          //       operator:"周沛辰",
          //       date:"2021.02.01 13:58",
          //       result:"通过",
          //       comment:"挺好的"
          //     },
          //     {
          //       level:2,
          //       operator:"BensonCHou",
          //       date:"2021.02.02 13:58",
          //       result:"未通过",
          //       comment:"我觉得不行"
          //     },
          //     {
          //       level:1,
          //       operator:"-",
          //       date:"-",
          //       result:"-",
          //       comment:"-"
          //     }
          //     ],
          //   materials:[           //此采购的所有物料商品详情
          //     {
          //       id:"001",
          //       name:"小猪筒",
          //       count:2,
          //       comment:"要好多钱钱",
          //       checkedResult:true,
          //       selectedSupplier:{
          //         name:"大润发",
          //         location:"上海",
          //         price:100,
          //         weight:4,
          //         transportPrice:15
          //       }
          //     },
          //     {
          //       id:"002",
          //       name:"小狗",
          //       count:19,
          //       comment:"要2公斤内",
          //       checkedResult:false,
          //       selectedSupplier:{
          //         name:"供应商Z",
          //         location:"温州",
          //         price:28,
          //         weight:4,
          //         transportPrice:20
          //       }
          //     },
          //   ],
          //   qualifiedMaterials:[],
          //   disQualifiedMaterials:[],
          // },

        ],




      }
    },
    methods:{
      /**
       * 1.显示此采购的详情（进货、退货单）
       */
      getDetail(e){
        var detail=e.target.parentNode.parentNode.nextElementSibling;
        if(detail.style.display=="none"){
          detail.style.display="table-row";
        }
        else{
          detail.style.display="none";
        }
        // this.getSelectePurchaseDetail(e);
        // this.getQualifiedAndDisQualified(e);

      },
      /**
       * 2. 设置purchaseDetailLists
       */
      getPurchaseDetailLists(){
        this.purchaseDetailLists=[];
        var year=$("#yearSelect").find("option:selected").attr("value");
        var month=$("#monthSelect").find("option:selected").attr("data-type");
        var obj={year:year,month:month}
        console.log(obj)
        //get请求,获取所有详细数据
        api.getFinishedPurchaseOrderList(obj,"获取已完成的采购订单失败").then(res=>{
          console.log(res)
          var PDLists=res.data.data;    //所有在进行的采购对象数组

          //遍历每条采购信息
          for(var j=0;j<PDLists.length;j++){
            var PDList=PDLists[j];
            //获取materials
            var materials=[];
            for(var i=0;i<PDList.materials.length;i++){
              materials.push({
                id:PDList.materials[i].materialId,
                name:PDList.materials[i].name,
                count:PDList.materials[i].num,
                comment:"数据库里暂且没有存备注",
                supplier:PDList.materials[i].supplier,
                checkedResult:PDList.materials[i].checkedResult,
              })
            }
            //获取checkInfo
            var checkInfo=[];
            //封装一条采购信息并push到this.purchaseDetailLists
            this.purchaseDetailLists.push({
              id:PDList.id,
              operator:PDList.operator,
              date:PDList.inDate,
              status:PDList.status,
              checkInfo:checkInfo,
              materials:materials,
            })
          }
          console.log(this.purchaseDetailLists)
        })

      },
      /**
       * 3. 在进货退货单中显示已经选好的供应商
       */
      showSelectedSupplier2(e){
        var detail=e.target.parentNode.nextElementSibling;


        if(detail.style.display=="none"){
          detail.style.setProperty('display', 'block');
        }
        else{
          detail.style.setProperty('display', 'none', 'important');
        }
      },


      // /**
      //  * 4. 获取合格和未合格的商品（进货单和退货单）
      //  */
      // getQualifiedAndDisQualified(e){
      //   var purchaseId=e.target.getAttribute("data-purchaseID");
      //   var i;
      //   this.qualifiedMaterials=[];
      //   this.disQualifiedMaterials=[];

      //   for(i=0;i<this.purchaseDetailLists[purchaseId].materials.length;i++){
      //     if(this.purchaseDetailLists[purchaseId].materials[i].checkedResult){  //合格
      //       this.purchaseDetailLists[purchaseId].qualifiedMaterials.push(this.purchaseDetailLists[purchaseId].materials[i]);
      //     }
      //     else{ //不合格
      //       this.purchaseDetailLists[purchaseId].disQualifiedMaterials.push(this.purchaseDetailLists[purchaseId].materials[i]);
      //     }

      //   }
      // },

    },
    components:{
      sidebar,
      consolePanel
    },
    mounted() {
      this.getPurchaseDetailLists();  //先调用后端获取所有的详情数据
    }
  }
</script>

<style scoped>
</style>
