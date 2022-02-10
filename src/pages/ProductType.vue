<template>
  <div id="main">
    <sidebar></sidebar>

    <consolePanel>
      <div class="row d-flex justify-content-center">
        <div class="col-lg-12">
            <div class="card d-flex justify-content-center">

                <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="col-4"></div>
                      <h3 class="mb-3 col-3">成品类别</h3>
                      <div class="col-4 d-flex justify-content-end p-0">
                        <button type="button" class="btn  mb-1 iconBtn"  data-toggle="modal" data-target="#addModal">
                            <i class="menu-icon fa fa-plus"></i>
                        </button>
                        <button v-on:click="modifyCommodity" type="button" class="btn  mb-1 iconBtn" >
                            <i class="menu-icon fa fa-cogs"></i>
                        </button>
                        <div class="d-flex justify-content-between" id="modifyCol" style="display:none!important;">
                          <p class="col-3 modifyColItem" style="padding-top:3px">商品编号:</p>
                          <input type="text" placeholder="id" class="form-control col-5 mr-3 modifyColItem" style="margin-top:-3px">
                          <button type="button" class="btn  modifyColItem " style="height:fit-content ;margin-left:-1rem;">
                            <i class="menu-icon fa fa-search "></i>
                          </button>
                          <div>
                            <button type="submit" id="finishModifyBtn" @click="finishModifyingCommodity" class="modifyColItem btn btn-outline-primary btn-sm">
                              <i class="fa fa-dot-circle-o"></i> 完成
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--订单列表-->
                    <table class="table ">
                        <thead class="thead-dark">
                            <tr>
                              <th>#</th>
                              <th scope="col">编号</th>
                              <th scope="col">名称</th>
                              <th scope="col">查看</th>
                              <th id="tbModify" scope="auto" style="width:170px;display: none;">操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="showOrderList,index in showOrderLists">
                          <tr >
                              <th scope="row">#{{(currentPage-1)*12+index+1}}</th>
                              <td>{{showOrderList.id}}</td>
                              <td>{{showOrderList.productName}}</td>
                              <td style="text-align: center;">
                                <button type="button" class="btn btn-link p-0" @click="showSelectedSupplier($event)">查看原料</button>
                              </td>
                              <td class="tbModifyItem" style="display: none;">
                                <button type="button" :data-productTypeId="showOrderList.id" @click="setSelectProduct($event)" data-toggle="modal" data-target="#modifyModal" class="btn pt-0 pb-0 pl-2 " style="">
                                  <i :data-productTypeId="showOrderList.id" @click="setSelectProduct($event)" class="menu-icon fa fa-cog"></i>
                                </button>
                                <button type="button" class="btn pt-0 pb-0 pr-2 " :data-productTypeId="showOrderList.id" @click="setSelectProduct($event)" data-toggle="modal" data-target="#deleteModal">
                                  <i :data-productTypeId="showOrderList.id" @click="setSelectProduct($event)" class="menu-icon fa  fa-times"></i>
                                </button>
                              </td>
                          </tr>
                          <tr style="display:none" v-for="material,index in showOrderList.materials" class="showMaterialsTr">
                            <td colspan="5">
                              <div class="d-flex row justify-content-around">
                                <div  class="d-flex col-11 justify-content-space ">
                                   <div class="col-1"><p class="mb-0"><small>#{{index}}</small></p></div>
                                   <div class="col-2"><p class="mb-0"><small>编号:&emsp;{{material.id}}</small></p></div>
                                   <div class="col-2"><p class="mb-0"><small>名称:&emsp;{{material.name}}</small></p></div>
                                </div>
                              </div>
                            </td>
                          </tr>

                        </tbody>
                    </table>
                    <!--/订单列表-->
                    <!--分页栏-->
                    <nav aria-label="...">
                      <ul class="pagination d-flex justify-content-center mt-5" id="pagination">

                      </ul>
                    </nav>
                    <!--/分页栏-->
                </div>
            </div>
            <!--添加商品弹窗-->
            <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                        <div class="modal-header d-flex">
                            <div class="col-1"></div>
                            <h5 class="modal-title col-10" id="staticModalLabel">添加成品类别</h5>
                            <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group"><label for="company" class=" form-control-label" style="width:100%" align="left">名称</label><input type="text" id="productNameInput" placeholder="输入成品名称" class="form-control"></div>
                          <div class="form-group">
                            <label for="vat" class=" form-control-label" align="left">原料（按住ctrl可进行多选）</label>
                            <select name="select" id="addSelect" class="form-control" multiple="multiple">
                                <option v-for="allMaterial in allMaterials" :value="allMaterial.id">id:{{allMaterial.id}}&emsp;名称:{{allMaterial.rawMaterialName}}</option>
                            </select>
                          </div>
                          <!-- <div class="form-group"><label for="street" class=" form-control-label" align="left">单价</label><input type="text" id="street"  class="form-control"></div>
                          <div class="row form-group">
                              <div class="col-6">
                                  <div class="form-group"><label for="city" class=" form-control-label" align="left">数量</label><input type="text" id="city"  class="form-control"></div>
                              </div>
                              <div class="col-6">
                                  <div class="form-group"><label for="postal-code" class=" form-control-label" align="left">保质期</label><input type="text" id="postal-code" class="form-control"></div>
                              </div>
                          </div> -->
                          <div class="form-group"><label for="country" class=" form-control-label" align="left">备注</label><input type="text" id="country" placeholder="(选填)" class="form-control"></div>
                        </div>
                        <div class="modal-footer ">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="addProductType()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--/添加商品弹窗-->
            <!--修改商品弹窗-->
            <div class="modal fade" id="modifyModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="mediumModalLabel">成品类别修改</h5>
                            <small class="ml-2 mt-2">（成品编号：{{selectProductId}}）</small>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group"><label for="company" class=" form-control-label" style="width:100%" align="left">名称</label><input type="text" id="updateProductNameInput" placeholder="输入成品名称" class="form-control"></div>
                          <div class="form-group">
                            <label for="vat" class=" form-control-label" align="left">原料（按住ctrl可进行多选）</label>
                            <select name="select" id="updateSelect" class="form-control" multiple="multiple">
                                <option v-for="allMaterial in allMaterials" :value="allMaterial.id">id:{{allMaterial.id}}&emsp;名称:{{allMaterial.name}}</option>
                            </select>
                          </div>
                          <div class="form-group"><label for="country" class=" form-control-label" align="left">备注</label><input type="text" id="country" placeholder="(选填)" class="form-control"></div>
                        </div>
                        <div class="modal-footer ">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="updateProductType()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--/修改商品弹窗-->
            <!--删除商品弹窗-->
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm" role="document">
                        <div class="modal-content">
                            <div class="modal-header d-flex">
                                <div class="col-1"></div>
                                <h5 class="modal-title col-10" id="staticModalLabel">删除成品类别</h5>
                                <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>
                                   确定要删除该成品吗？<br><small class=" mt-2">（成品编号：{{selectProductId}}）</small>
                               </p>
                           </div>
                           <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="deleteProductType()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--/删除商品弹窗-->
        </div>
      </div>
    </consolePanel>
  </div>
</template>

<script>
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  import * as api from "../request/api.js"
  export default {
    name: 'productType',
    data () {
      return {
        products:[
          // {
          //   id:"001",
          //   name:"adfdas",
          //         materials:[
          //             {
          //             id:"222",
          //             name:"asdfsdaf"
          //             },

          //           ]
          //   },

        ],
        allMaterials:[
          // {
          // 			id:"11",
          // 			rawMaterialName:"铁",

          // 		},

        ],
        selectProductId:"",
        currentPage:1,
        showOrderLists:[],
      }
    },
    methods:{
      /**
       * 1. 修改商品
       */
      modifyCommodity(){
        var tbModify=document.getElementById( "tbModify" );
        tbModify.style.display="table-cell";

        var tbModifyItems=document.getElementsByClassName("tbModifyItem");
        var i;
        for (i = 0; i < tbModifyItems.length; i++) {
            tbModifyItems[i].style.display = "table-cell";
        }
        var iconBtns=document.getElementsByClassName("iconBtn");
        for (i = 0; i < iconBtns.length; i++) {
            iconBtns[i].style.display = "none";
        }
        document.getElementById("modifyCol").style.display="block";
        var items=document.getElementsByClassName("modifyColItem");
        var i;
        for (i = 0; i < items.length; i++) {
            items[i].style.display = "block";
        }
      },
      /**
       * 2. 完成修改商品
       */
      finishModifyingCommodity(){
        document.getElementById("modifyCol").style.display="none";
        var items=document.getElementsByClassName("modifyColItem");
        var i;
        for (i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        var tbModify=document.getElementById( "tbModify" );
        tbModify.style.display="none";

        var tbModifyItems=document.getElementsByClassName("tbModifyItem");
        var i;
        for (i = 0; i < tbModifyItems.length; i++) {
            tbModifyItems[i].style.display = "none";
        }

        var iconBtns=document.getElementsByClassName("iconBtn");
        var i;
        for (i = 0; i < iconBtns.length; i++) {
            iconBtns[i].style.display = "block";
        }
      },
      /**
       * 3. 显示已经选好的原料
       */
      showSelectedSupplier(e){
        console.log(e)
        var detail=e.target.parentNode.parentNode.nextElementSibling;
        console.log(detail)
        if(detail.style.display=="none"){
          detail.style.display="table-row";
        }
        else{
          detail.style.display="none";
        }
      },
      /**
       * 4. 获取所有的成品种类
       */
      getProducts(){
        //发送请求
        api.showProductType("获取所有的成品类别失败").then(res => {
          console.log(res)
          if(res.data.status==0){
            this.products=res.data.data;
			this.getProductLists(1);
          }
        })
      },
      /**
       * 5. 增加成品类别
       */
      addProductType(){
        var materials=[];
        $("#addSelect option:selected").each(function() {
          materials.push($(this).val());
        });
        var name= $('#productNameInput').val();
        //封装数据
        var obj={productName:name,materials:materials,price:100}; //todo
        console.log(obj)
        //发送请求
        api.addProductType(obj,"添加成品类别失败").then(res=>{
          if(res.data.status==0){
            this.getProducts();
            this.getProductLists(1)
            $('#addModal').modal('hide');
          }
        })
      },
      /**
       * 6. 获取所有原料
       */
      getAllMaterials(){
        //发送请求
        api.showMaterialType("获取原料信息失败").then(res=>{
          console.log(res)
          if(res.data.status==0){
            this.allMaterials=res.data.data;
          }
        })
      },
      /**
       * 7.获取被点击选中的成品id
       */
      setSelectProduct(e){

        this.selectProductId=e.target.getAttribute("data-productTypeId");

      },
      /**
       * 8.删除成品种类
       */
      deleteProductType(){
        var obj={productID:this.selectProductId};
        console.log(obj)
        //发送请求
        api.deleteProductType(obj,"删除成品种类失败").then(res=>{
          if(res.data.status==0){
            this.getProducts();
            this.getProductLists()
            $('#deleteModal').modal('hide');
          }
        })
      },
      /**
       * 9. 更新成品种类
       */
      updateProductType(){
        var materials=[];
        $("#updateSelect option:selected").each(function() {
          materials.push($(this).val());
        });
        var name= $('#updateProductNameInput').val();
        //封装数据
        var obj={id:this.selectProductId,productName:name,materials:materials};
        console.log(obj)
        //发送请求
        api.updateProductType(obj,"更新成品类别失败").then(res=>{
          if(res.data.status==0){
            this.getProducts();
            this.getProductLists()
            $('#modifyModal').modal('hide');
          }
        })
      },
      /**
       * 10. 获取当前页要显示的商品
       */
      getProductLists:function(currentPage){    //获取当前页要显示的物品，放入this.showOrderLists
        this.currentPage=currentPage;
        console.log(currentPage);

        this.showOrderLists.length=0;
        var list=this.products;
        var startIndex=(currentPage-1)*12;
        var lastIndex=this.products.length<=12*currentPage?this.products.length:12*currentPage;
        for(startIndex;startIndex<lastIndex;startIndex++){
          var item=(this.products)[startIndex];
          this.showOrderLists.push(item);

        }

        this.makePagination('pagination',this.products.length,currentPage);
        //把原料详情收起来 showMaterialsTr
        var tbModifyItems=document.getElementsByClassName("showMaterialsTr");
        for (var i = 0; i < tbModifyItems.length; i++) {
            tbModifyItems[i].style.display = "none";
        }

      },
      /**
       * 11.制作换页
       * * @param {id of .pagination} paginationId
         * @param {list的数量} totalItems
         * @param {current page index} page
         * @param {function of how to make a href,it should receive a param represent page} linkFunc
         * @param {how many items should be rendered in one page} maxcount
       */
       makePagination(paginationId, totalItems, page, maxcount = 12) {
          var lastPage = Math.floor(totalItems / maxcount) + 1
          page = Number(page)
          var paginationLeft = '<li class="page-item"><a class="page-link" href="#" onclick="getProductLists(\'1\')">First</a></li>' +
              '<li class="page-item"><a class="page-link" href="#" onclick="getProductLists(\'' + (page <= 1 ? 1 : page - 1) + '\')">&laquo;</a></li>';
          var paginationRight = '<li class="page-item"><a class="page-link" href="#" onclick="getProductLists(\'' + (page >= lastPage ? lastPage : page + 1) + '\')">&raquo;</a></li>' +
              '<li class="page-item"><a class="page-link" href="#" onclick="getProductLists(\'' + lastPage + '\')">Last</a></li>';

          var pagination = '<li class="page-item active"><a class="page-link page-num" href="#">' + page + '</a></li>';
          var leftCount = 0;
          var i;
          for (i = page - 1; i >= page - 4 && i > 0; i--) {
              pagination = '<li class="page-item"><a class="page-link page-num" href="#" onclick="getProductLists(\'' + i + '\')">' + i + '</a></li>' + pagination;
              leftCount++;
          }
          var j;
          for (j = page + 1; j <= page + (8 - leftCount) && j <= lastPage; j++) {
              pagination += '<li class="page-item"><a class="page-link page-num" href="#" onclick="getProductLists(\'' + j + '\')">'+ j + '</a></li>';

          }

          pagination = (page <= 1 ? '' : paginationLeft) + pagination + (page >= lastPage ? '' : paginationRight);


          $('#' + paginationId).html(pagination);
      },
    },
    components:{
      sidebar,
      consolePanel
    },
    created() {
      let _this=this;
      window.getProductLists=_this.getProductLists; //对于使用原生onclick的元素要调用vue的方法，必须用此步骤将vue方法设置成原生
    },
    mounted() {
      this.getProducts();

      this.getAllMaterials();
    }
  }
</script>

<style>
  .form-control-label{
    width:100%;

  }
</style>
