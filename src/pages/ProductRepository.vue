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
                      <h3 class="mb-3 col-3">成品库存</h3>
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
                              <th scope="col">库存编号</th>
                              <th scope="col">成品编号</th>
                              <th scope="col">名称</th>
                              <th scope="col">数量</th>
                              <th scope="col">制造日期</th>
                              <th id="tbModify" scope="auto" style="width:170px;display: none;">操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="showOrderList,index in showOrderLists">
                          <tr >
                              <th scope="row">#{{(currentPage-1)*12+index+1}}</th>
                              <td>{{showOrderList.id}}</td>
                              <td>{{showOrderList.productId}}</td>
                              <td>{{showOrderList.name}}</td>
                              <td>{{showOrderList.num}}</td>
                              <td>{{showOrderList.madeTime}}</td>
                              <td class="tbModifyItem" style="display: none;">
                                <button type="button" :data-productTypeId="showOrderList.id" @click="setSelectProduct($event)" data-toggle="modal" data-target="#modifyModal" class="btn pt-0 pb-0 pl-2 " style="">
                                  <i :data-productTypeId="showOrderList.id" @click="setSelectProduct($event)" class="menu-icon fa fa-cog"></i>
                                </button>
                                <button type="button" class="btn pt-0 pb-0 pr-2 " :data-productTypeId="showOrderList.id" @click="setSelectProduct($event)" data-toggle="modal" data-target="#deleteModal">
                                  <i :data-productTypeId="showOrderList.id" @click="setSelectProduct($event)" class="menu-icon fa  fa-times"></i>
                                </button>
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
                            <h5 class="modal-title col-10" id="staticModalLabel">添加成品</h5>
                            <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group">
                            <label for="vat" class=" form-control-label" align="left">请选择成品</label>
                            <select name="select" id="addSelect" class="form-control">
                                <option v-for="allProduct in allProducts" :data-id="allProduct.id" :data-name="allProduct.productName">id:{{allProduct.id}}&emsp;名称:{{allProduct.productName}}</option>
                            </select>
                          </div>
                          <div class="form-group"><label for="company" class=" form-control-label" style="width:100%" align="left">数量</label><input type="text" id="productQuantityInput" placeholder="请输入数量" class="form-control" oninput = "value=value.replace(/[^\d]/g,'')"></div>
                          <div class="form-group"><label for="country" class=" form-control-label" align="left">备注</label><input type="text" id="country" placeholder="(选填)" class="form-control"></div>
                        </div>
                        <div class="modal-footer ">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="addProduct()">确定</button>
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
                            <h5 class="modal-title" id="mediumModalLabel">成品库存修改</h5>
                            <small class="ml-2 mt-2">（库存编号：{{selectProductId}}）</small>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group"><label for="company" class=" form-control-label" style="width:100%" align="left">数量</label><input type="text" id="updateProductQuantityInput" placeholder="请输入数量" class="form-control" oninput = "value=value.replace(/[^\d]/g,'')" ></div>
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
                                <h5 class="modal-title col-10" id="staticModalLabel">删除成品库存</h5>
                                <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>
                                   确定要删除该成品吗？<br><small class=" mt-2">（库存编号：{{selectProductId}}）</small>
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
    name: 'productRepository',
    data () {
      return {
        products:[
          // {
          //   id:"001",
          //   name:"",
          //         materials:[
          //             {
          //             id:"",
          //             name:""
          //             },

          //           ]
          //   },

        ],
        allProducts:[
          // {
          // 			id:"11",
          // 			name:"成品1",

          // 		},

        ],
        selectProductId:"",     //这个应该是库存编号，而非成品编号，懒得改了
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
       * 3. 获取所有的成品库存
       */
      getProducts(){
        //发送请求
        api.showProductRepository("获取所有的成品库存失败").then(res => {
          console.log(res)
          if(res.data.status==0){
            this.products=res.data.data;
            this.getProductLists(1);
          }
        })
      },
      /**
       * 4. 增加成品库存
       */
      addProduct(){
        var id= $("#addSelect option:selected").attr("data-id");
        var name= $("#addSelect option:selected").attr("data-name");
        var quantity=$('#productQuantityInput').val();
        //封装数据
        var obj={productId:id,name:name,quantity:quantity};
        console.log(obj)
        //发送请求
        api.addProductRepository(obj,"添加成品库存失败").then(res=>{
          if(res.data.status==0){
            this.getProducts();
            this.getProductLists(1);
            $('#addModal').modal('hide');
          }
        })
      },

      /**
       * 5.获取被点击选中的成品id
       */
      setSelectProduct(e){

        this.selectProductId=e.target.getAttribute("data-productTypeId");

      },
      /**
       * 6.删除成品库存
       */
      deleteProductType(){
        var obj={id:this.selectProductId};
        console.log(obj)
        //发送请求
        api.deleteProductRepository(obj,"删除成品库存失败").then(res=>{
          if(res.data.status==0){
            //更新页面数据
            this.getProducts();
            this.getProductLists(1);
            $('#deleteModal').modal('hide');
          }
        })
      },
      /**
       * 7. 更新成品库存数量
       */
      updateProductType(){
        var quantity= $('#updateProductQuantityInput').val();
        //封装数据
        var obj={id:this.selectProductId,quantity:quantity};
        console.log(obj)
        //发送请求
        api.updateProductRepository(obj,"更新成品库存数量失败").then(res=>{
          if(res.data.status==0){
            //更新页面数据
            this.getProducts();
            this.getProductLists(1);
            //隐藏弹窗
            $('#modifyModal').modal('hide');
          }
        })
      },
      /**
       * 8. 获取当前页要显示的商品
       */
      getProductLists:function(currentPage){    //获取当前页要显示的物品，放入this.showOrderLists
        this.currentPage=currentPage;
        console.log("set Table");
        console.log(currentPage);

        this.showOrderLists.length=0;
        var list=this.products;
        var startIndex=(currentPage-1)*12;
        var lastIndex=this.products.length<=12*currentPage?this.products.length:12*currentPage;
        for(startIndex;startIndex<lastIndex;startIndex++){
          var item=(this.products)[startIndex];
          this.showOrderLists.push(item);

        }
        console.log(this.showOrderLists)

        this.makePagination('pagination',this.products.length,currentPage);

      },
      /**
       * 9.制作换页
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
      /**
       * 10. 获取所有的成品类别
       */
      getAllProducts(){
        api.showProductType("获取成品类别失败").then(res=>{
          if(res.data.status==0){
            this.allProducts=res.data.data;
          }
        })
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

      this.getAllProducts();
    }
  }
</script>

<style>
  .form-control-label{
    width:100%;

  }
</style>
