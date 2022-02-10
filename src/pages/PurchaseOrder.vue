<template>
  <div id="main">
    <sidebar></sidebar>

    <consolePanel>
      <!-- Animated -->
      <div class="animated fadeIn">
        <!--正在进行的采购-->
        <div class="d-flex card">
          <!--已经完成的order列表-->
          <div class="col-lg-12 p-0">
              <!-- <div class="card"> -->

                  <div class="card-header d-flex pt-4">
                    <div class="col-5"></div>
                    <strong class="card-title col-2">正在进行的采购订单</strong>
                    <div class="col-5 d-flex justify-content-end p-0">

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
                          <tbody>
                              <tr v-for="purchaseList,index in purchaseLists">
                                  <td>#{{index+1}}</td>
                                  <td>{{purchaseList.id}}</td>
                                  <td>{{purchaseList.operator}}</td>
                                  <td>{{purchaseList.date}}</td>
                                  <td>
                                      <span v-if="purchaseList.status=='审核中'" class="badge badge-pending">{{purchaseList.status}}</span>
                                      <span v-if="purchaseList.status=='待审核'" class="badge badge-primary">{{purchaseList.status}}</span>
                                      <span v-if="purchaseList.status=='审核未通过'" class="badge badge-danger">{{purchaseList.status}}</span>
                                      <span v-if="purchaseList.status=='审核通过'" class="badge badge-complete">{{purchaseList.status}}</span>
                                      <span v-if="purchaseList.status=='运输中'" class="badge badge-warning">{{purchaseList.status}}</span>
                                      <span v-if="purchaseList.status=='已到货'" class="badge badge-success">{{purchaseList.status}}</span>
                                  </td>
                                  <td style="text-align: center;">
                                    <button type="button" :class="['btn','btn-link',{'disabled':purchaseList.status!='待审核'}]" @click="getSelectePurchaseDetail($event)" :data-purchaseID="index" data-toggle="modal" data-target="#auditModal" >审核</button>
                                    <button type="button" class="btn btn-link" @click="getDetailStep($event)" :data-purchaseID="purchaseList.id">详情</button>
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
        <!--/正在进行的采购-->

      </div>
      <!-- /Animated -->

      <!--审核弹窗-->
      <div class="modal fade" id="auditModal" tabindex="-1" role="dialog" aria-labelledby="scrollmodalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                  <div class="modal-header d-flex">
                      <div class="col-1"></div>
                      <h5 class="modal-title col-10" id="scrollmodalLabel">审核清单</h5>
                      <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <!--content-->
                      <div class="card d-flex justify-content-center">
                          <div class="card-body">
                              <div class="d-flex justify-content-between">
                                <div class="col-5"></div>
                                <strong class="mb-3 col-2" style="font-size:20px">采购清单</strong>
                                <div class="col-5 d-flex justify-content-end pt-2">
                                  <small class="col-6">操作人：{{selectedPurchaseDetail.operator}}</small>
                                  <small class="ml-1">时间：{{selectedPurchaseDetail.date}}</small>
                                </div>
                              </div>

                              <!--订单列表-->
                              <table class="table ">
                                  <thead class="thead-dark">
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">编号</th>
                                        <th scope="col">名称</th>
                                        <th scope="col">数量</th>
                                        <th scope="col">备注</th>
                                        <th scope="col">查看</th>
                                      </tr>
                                  </thead>
                                  <tbody v-for="material,index in selectedPurchaseDetail.materials">
                                    <tr >
                                        <th scope="row">{{index+1}}</th>
                                        <td>{{material.id}}</td>
                                        <td>{{material.name}}</td>
                                        <td>{{material.count}}</td>
                                        <td>{{material.comment}}</td>
                                        <td style="text-align: center;">
                                          <button type="button" class="btn btn-link p-0" @click="showSelectedSupplier($event)">查看供应商</button>
                                        </td>
                                    </tr>
                                    <tr style="display:none">
                                      <td colspan="6">
                                        <div class="d-flex row justify-content-end">
                                          <div  class="d-flex col-11 justify-content-space ">
                                             <div col-1><p><small>详情:</small></p></div>
                                             <div class="col-2"><p><small>{{material.selectSupplier.name}}</small></p></div>
                                             <div class="col-2"><p><small>位置:{{material.selectSupplier.location}}</small></p></div>
                                             <div class="col-2"><p><small>单价:￥{{material.selectSupplier.price}}</small></p></div>
                                             <div class="col-2"><p><small>权值:{{material.selectSupplier.star}}</small></p></div>
                                             <div class="col-3"><p><small>运输价格:￥{{material.selectSupplier.fare_parameter}}元/公里</small></p></div>

                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                              </table>
                              <!--/订单列表-->

                          </div>
                      </div>
                      <!--/content-->

                      <!--审核结果-->
                      <div class="row form-group">
                        <div class="col col-md-2" align="left">
                          <label class=" form-control-label">审核结果 :</label>
                        </div>
                        <div class="col col-md-9 ml-0 pl-0" align="left">
                          <div class="form-check-inline form-check">
                            <label for="inline-radio1" class="form-check-label  mr-5">
                              <input type="radio" id="inline-radio1" name="check-radio" value="1" class="form-check-input">通过
                            </label>
                            <label for="inline-radio2" class="form-check-label ">
                              <input type="radio" id="inline-radio2" name="check-radio" value="0" class="form-check-input">不通过
                            </label>
                          </div>
                        </div>
                      </div>
                      <!--/审核结果-->
                      <!--审核备注-->
                      <div class="form-group">
                        <label for="country" align="left" class=" form-control-label" style="width:100%">备注</label>
                        <input type="text" id="checkCommentInput" placeholder="(选填)" class="form-control">
                      </div>
                      <!--/审核备注-->
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                      <button type="button" class="btn btn-primary" @click="submitAudit(selectedPurchaseDetail.id)">确定</button>
                  </div>
              </div>
          </div>
      </div>
      <!--审核弹窗-->
    </consolePanel>
  </div>
</template>

<script>
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  import * as api from "../request/api.js"
  export default {
    name: 'purchaseOrder',
    data () {
      return {
        purchaseDetailLists:[   //从后端接收的采购的所有详细数据
          // {
          //   id:"003",
          //   operator:"隔壁小王",
          //   date:"20200128",
          //   status:"1",
          //   checkInfo:[  //审核状态
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
          //       selectedSupplier:{
          //         name:"供应商Z",
          //         location:"温州",
          //         price:28,
          //         weight:4,
          //         transportPrice:20
          //       }
          //     },
          //   ],
          // },
          // {
          //   id:"004",
          //   operator:"小明",
          //   date:"20200128",
          //   status:"2",
          //   checkInfo:[  //审核状态
          //     {
          //       level:3,
          //       operator:"-",
          //       date:"-",
          //       result:"-",
          //       comment:"-"
          //     },
          //     {
          //       level:2,
          //       operator:"-",
          //       date:"-",
          //       result:"-",
          //       comment:"-"
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
          //       name:"五金工具",
          //       count:10,
          //       comment:"要求：最新一批",
          //       selectedSupplier:{
          //         name:"供应商A",
          //         location:"上海",
          //         price:28,
          //         weight:4,
          //         transportPrice:20
          //       }
          //     },
          //     {
          //       id:"002",
          //       name:"锤子",
          //       count:10,
          //       comment:"po部门需要的",
          //       selectedSupplier:{
          //         name:"供应商A",
          //         location:"宁波",
          //         price:28,
          //         weight:4,
          //         transportPrice:20
          //       }
          //     },
          //   ],
          // },
          // {
          //   id:"005",
          //   operator:"小明",
          //   date:"20200128",
          //   status:"1",
          //   checkInfo:[  //审核状态
          //     {
          //       level:3,
          //       operator:"-",
          //       date:"-",
          //       result:"-",
          //       comment:"-"
          //     },
          //     {
          //       level:2,
          //       operator:"-",
          //       date:"-",
          //       result:"-",
          //       comment:"-"
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
          //       name:"五金工具",
          //       count:10,
          //       comment:"要求：最新一批",
          //       selectedSupplier:{
          //         name:"供应商A",
          //         location:"上海",
          //         price:28,
          //         weight:4,
          //         transportPrice:20
          //       }
          //     },
          //     {
          //       id:"002",
          //       name:"锤子",
          //       count:10,
          //       comment:"po部门需要的",
          //       selectedSupplier:{
          //         name:"供应商A",
          //         location:"宁波",
          //         price:28,
          //         weight:4,
          //         transportPrice:20
          //       }
          //     },
          //   ],
          // },

        ],
        selectedPurchaseDetail:{  //被选中的采购详细信息对象
          id:"",
          operator:"",
          date:"",
          materials:[]
        },
        purchaseLists:[   //简单的显示所有采购信息
          // {
          //   id:"001",
          //   operator:"周沛辰",
          //   date:"2021-01-31 20:26:54",
          //   status:"审核中"
          // },
          // {
          //   id:"002",
          //   operator:"陈均然",
          //   date:"2021-02-31 20:26:54",
          //   status:"待审核"
          // }
        ],
        status:["审核中","待审核","审核未通过","审核通过","运输中","已到货"],
        // materials:[           //被选中的某次采购的所有物料详情(用于放在审核弹窗里的清单列表table)  //不需要？
        //   // {
        //   //   id:"001",
        //   //   name:"五金工具",
        //   //   count:10,
        //   //   comment:"要求：最新一批",
        //   //   selectedSupplier:{
        //   //     name:"供应商A",
        //   //     location:"上海",
        //   //     price:28,
        //   //     weight:4,
        //   //     transportPrice:20
        //   //   }
        //   // },
        //   // {
        //   //   id:"002",
        //   //   name:"锤子",
        //   //   count:10,
        //   //   comment:"po部门需要的",
        //   //   selectedSupplier:{
        //   //     name:"供应商A",
        //   //     location:"宁波",
        //   //     price:28,
        //   //     weight:4,
        //   //     transportPrice:20
        //   //   }
        //   // },
        // ],

        auditInfo:{         //审核结果
          purchaseId:"",

          result:false,
          comment:"",
          date:""
        },
        level:"",

      }
    },
    methods:{
      /**
       * 1.对指定的采购跳转到相应的采购步骤
       */
      getDetailStep(e){
        var purchaseId=e.target.getAttribute("data-purchaseID");
        console.log(purchaseId)
        console.log("-------")
        //获取curMaterials
        var materials;
        var curStatus;
        var curId;
        var curOperator;
        var curDate;
        var curCheckInfo;
        var i;
        for(i=0;i<this.purchaseDetailLists.length;i++){
          if(this.purchaseDetailLists[i].id==purchaseId){
            console.log(this.purchaseDetailLists[i])  //todo:operator和status后端还没传过来
            materials=this.purchaseDetailLists[i].materials;
            console.log(this.purchaseDetailLists[i])
            curStatus=this.purchaseDetailLists[i].status;
            console.log(curStatus)
            curId=this.purchaseDetailLists[i].id;
            curOperator=this.purchaseDetailLists[i].operator;
            curDate=this.purchaseDetailLists[i].date;
            curCheckInfo=this.purchaseDetailLists[i].checkInfo;
            //初始化剩余的checkInfo
            for(var k=0;k<curCheckInfo.length;k++){
              if(curCheckInfo[k].result){
                curCheckInfo[k].result="通过"
              }else{
                curCheckInfo[k].result="未通过"
              }
            }
            for(var j=curCheckInfo.length;j<3;j++){
              curCheckInfo.push({
                  level:j+1,
                  operator:"-",
                  date:"-",
                  result:"-",
                  comment:"-"
              })
            }

            break;
          }
        }
        console.log(materials)
        for(i=0;i<materials.length;i++){
          materials[i].selectedSupplier={
            id:materials[i].selectSupplier.id,
            name:materials[i].selectSupplier.name,
            location:materials[i].selectSupplier.location,
            price:materials[i].selectSupplier.price,
            weight:materials[i].selectSupplier.star,
            transportPrice:materials[i].selectSupplier.fare_parameter,
          }
          materials[i].allSuppliers=[];
        }
        //获取第几步
        var curStep="3";
        if(curStatus=="1"||curStatus=="2"||curStatus=="3"){
          curStep="3"
        }
        else if(curStatus=="4"){
          curStep="5"
        }
        else if(curStatus=="5"){
          curStep="6"
        }
        console.log(curStep)

        //跳转到采购步骤，传curMaterials和审核情况数组、step
        this.$router.push({
          path: "/console/purchase/purchaseOperation",
          query: {
            step:curStep,   //要跳转到采购的第几个步骤页面
            status:curStatus,
            materials:materials,
            checkInfo:curCheckInfo,
            id:curId,
            operator:curOperator,
            date:curDate,
            //checkedResult:true,
          }
        });

      },
      /**
       * 2. 显示已经选好的供应商
       */
      showSelectedSupplier(e){
        var detail=e.target.parentNode.parentNode.nextElementSibling;
        if(detail.style.display=="none"){
          detail.style.display="table-row";
        }
        else{
          detail.style.display="none";
        }
      },
      /**
       * 3. 获取在进行的采购订单的简单信息
       */
      getPurchaseLists(){
        console.log(this.$store.getters.userInfo.level)
        this.purchaseLists=[];
        for(let i=0;i<this.purchaseDetailLists.length;i++){
          var obj={purchaseId:this.purchaseDetailLists[i].id,userId:this.$store.getters.userInfo.id}
          var pStatus;  //必须是整数！bug
          console.log("根据管理员id和purchaseId获取采购状态");
          console.log(obj)
          //请求，根据管理员id和purchaseId获取该条采购订单的status.["审核中","待审核","审核未通过","审核通过","运输中","已到货"],
          api.getPurchaseStatus(obj,"根据管理员id和purchaseId获取采购状态失败").then(res => {
            console.log(this.purchaseDetailLists[i].id)
            console.log(res)
            if(res.data.status==0){ //status是0代表成功
              pStatus=res.data.data;
              var resultStatus;
              if(pStatus<3){
                resultStatus=this.status[pStatus];
              }
              else{
                resultStatus=this.status[pStatus-1];
              }
              console.log(resultStatus)
              //给purchaseLists赋值
              var purchaseItem={
                id:this.purchaseDetailLists[i].id,
                operator:this.purchaseDetailLists[i].operator,
                date:this.purchaseDetailLists[i].date,
                status:resultStatus,
              }
              this.purchaseLists.push(purchaseItem);

            }


          })

        }

      },
      /**
       * 4. 获取此条采购订单的详情
       */
      getSelectePurchaseDetail(e){ //data-purchaseID
        //console.log(e.target)
         var purchaseId=e.target.getAttribute("data-purchaseID");
         var purchaseDetail={
           id:this.purchaseDetailLists[purchaseId].id,
           operator:this.purchaseDetailLists[purchaseId].operator,
           date:this.purchaseDetailLists[purchaseId].date,
           materials:this.purchaseDetailLists[purchaseId].materials,
         }
         this.selectedPurchaseDetail=purchaseDetail;
         console.log(this.selectedPurchaseDetail);

      },
      /**
       * 5. 提交对某笔采购订单的审核
       */
      submitAudit(purchaseId){
        //获取数据
        var result=$("input[name='check-radio']:checked").attr("value");
        if(result=="1")
          result=true;
        else
          result=false;
        var comment = $('#checkCommentInput').val();
        //post请求，提交审核结果
        var oneCheckInfo={
          userId:this.$store.getters.userInfo.id,
          result:result,
          date:this.getDateTime(),  //todo:后端存数据库格式可能不对
          info:comment,
          purchaseId:purchaseId    //？？
        }
        console.log(oneCheckInfo)
        api.submitAudit(oneCheckInfo,"管理员提交对某次采购的审核失败").then(res => {
          if(res.data.status==0){
            console.log("最低级别管理员提交审核成功");
            $('#auditModal').modal('hide');
            this.getPurchaseDetailLists();
          }
        })

      },
      /**
       * 6. 设置purchaseDetailLists,获取所有数据
       */
      getPurchaseDetailLists(){
        this.purchaseDetailLists=[];
        //get请求，获取在进行的采购订单
        api.getPurchaseOrderList("获取正在进行的采购订单失败").then(res=>{
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
                selectSupplier:PDList.materials[i].supplier,
              })
            }
            //获取checkInfo
            var checkInfo=PDList.checkInfo;
            //封装一条采购信息并push到this.purchaseDetailLists
            this.purchaseDetailLists.push({
              id:PDList.id,
              operator:PDList.operator,
              date:PDList.inDate,
              status:PDList.status,
              checkInfo:PDList.checkInfo,
              materials:materials,
            })
          }

          console.log(this.purchaseDetailLists)
          this.getPurchaseLists();
        })


      },
      /**
       * 17. 获取当前时间
       */
      getDateTime(){
        var myDate= new Date();
            var realYear = myDate.getFullYear();
            var myMonth = myDate.getMonth()+1;
            var realMonth=myMonth;
            var myDay = myDate.getDate();
            var realDay = myDay;
            var myHour = myDate.getHours();
            var realHours =myHour;
            var myMinute =myDate.getMinutes();
            var realMinute = myMinute;
            var mySecond =myDate.getSeconds();
            var realSecond = mySecond;
            if(myMonth<10){
                realMonth="0"+myMonth;
            }
            if(myDay<10){
                realDay= "0"+myDay;
            }
            if(myMinute<10){
                realMinute="0"+myMinute;
            }
            if(myHour<10){
                realHours="0"+myHour;
            }
            if(mySecond<10){
                realSecond="0"+mySecond;
            }
            var realDate = realYear +'-'+realMonth+'-'+realDay+' '+realHours+':'+realMinute+':'+realSecond;
            return realDate;
      },

    },
    components:{
      sidebar,
      consolePanel
    },
    mounted() {
      var operatorName=this.$store.getters.userInfo.name;
      if(!operatorName||operatorName=="未知人员"){
        alert("请重新登录！")
        this.$router.push('/login');
      }

      this.level=this.$store.getters.userInfo.level;

      this.getPurchaseDetailLists();  //先调用后端获取所有的详情数据



    },
    updated() {

    }
  }
</script>

<style>
</style>
