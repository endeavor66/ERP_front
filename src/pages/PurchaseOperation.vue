<template>
  <div id="main">

    <sidebar></sidebar>

    <consolePanel>
      <!-- Animated -->
      <!--FirstStep-->
      <div class="animated fadeIn first" :style="{display: step1}">
        <!--步骤导航-->
        <nav class="breadcrumb" style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>采购操作</b></h4>
          <span class="breadcrumb-item isActive"><strong>生成物料单</strong></span>
          <span class="breadcrumb-item noActive" >选择供应商</span>
          <span class="breadcrumb-item noActive">生成采购单</span>
          <span class="breadcrumb-item noActive">一键采购</span>
          <span class="breadcrumb-item noActive">物流运输</span>
          <span class="breadcrumb-item noActive">进货送检</span>
          <span class="breadcrumb-item noActive">完成采购</span>
          <div class="col-md-12 d-flex justify-content-end mr-0  "  style="margin-top:-2rem">
            <button type="submit"   class="cancelPurchaseBtn  btn btn-outline-primary btn-sm" style="display: block;" data-toggle="modal" data-target="#cancelPurchaseModal">
              <i class="fa fa-minus-circle"></i> 取消采购
            </button>
          </div>
        </nav>
        <!--/步骤导航-->
        <!--content-->
        <div class="card d-flex justify-content-center">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="col-4"></div>
                  <h3 class="mb-3 col-3">物料清单</h3>
                  <div class="col-4 d-flex justify-content-end p-0">
                    <button type="button" class="btn  mb-1 iconBtn"  data-toggle="modal" data-target="#addModal">
                        <i class="menu-icon fa fa-plus"></i>
                    </button>
                    <button v-on:click="modifyCommodity" type="button" class="btn  mb-1 iconBtn" >
                        <i class="menu-icon fa fa-cogs"></i>
                    </button>
                    <div class="d-flex justify-content-between" id="modifyCol" style="display:none!important;">
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
                          <th scope="col">#</th>
                          <th scope="col">编号</th>
                          <th scope="col">名称</th>
                          <th scope="col">数量</th>
                          <th scope="col">备注</th>
                          <th id="tbModify" scope="auto" style="width:190px;display: none;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="material,index in materials">
                          <th scope="row">{{index+1}}</th>
                          <td>{{material.id}}</td>
                          <td>{{material.name}}</td>
                          <td>{{material.count}}</td>
                          <td>{{material.comment}}</td>
                          <td class="tbModifyItem " style="display: none;">
                            <button type="button" @click="material.count>1?material.count--:material.count" class="btn pt-0 pb-0 pl-2 " style="height:fit-content">
                              <i class="menu-icon fa fa-minus"></i>
                            </button>
                            <p class="mb-0" style="display: inline;">数量</p>
                            <button type="button" @click="material.count++" class="btn pt-0 pb-0 pl-2 " style="height:fit-content">
                              <i class="menu-icon fa fa-plus"></i>
                            </button>
                            <button type="button" class="btn pt-0 pb-0 pr-2 " @click="step1ClickIndex=index" data-toggle="modal" data-target="#deleteModal" style="height:fit-content">
                              <i class="menu-icon fa  fa-times"></i>
                            </button>
                          </td>
                      </tr>
                    </tbody>
                </table>
                <!--/订单列表-->

                <!--分页栏-->
                <!-- <nav aria-label="...">
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
                </nav> -->
                <!--/分页栏-->
            </div>

        </div>
        <!--/content-->
        <!--foot-->
        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-end">
              <button type="button" @click="step1='none';step2='block';showAllSuppliers()" class="btn btn-outline-primary btn-lg col-2" >下一步</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>
        <!--/foot-->
      </div>
      <!--/FirstStep-->
      <!--SecondStep-->
      <div class="animated fadeIn second" :style="{display: step2}">
        <!--步骤导航-->
        <nav class="breadcrumb" style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>采购操作</b></h4>
          <span class="breadcrumb-item noActive">生成物料单</span>
          <span class="breadcrumb-item isActive" ><strong>选择供应商</strong></span>
          <span class="breadcrumb-item noActive">生成采购单</span>
          <span class="breadcrumb-item noActive">一键采购</span>
          <span class="breadcrumb-item noActive">物流运输</span>
          <span class="breadcrumb-item noActive">进货送检</span>
          <span class="breadcrumb-item noActive">完成采购</span>
          <div class="col-md-12 d-flex justify-content-end mr-0  "  style="margin-top:-2rem">
            <button type="submit"   class="btn btn-outline-primary btn-sm" style="display: block;" data-toggle="modal" data-target="#cancelPurchaseModal">
              <i class="fa fa-minus-circle"></i> 取消采购
            </button>
          </div>
        </nav>
        <!--/步骤导航-->

        <!--content-->
        <div class="card d-flex justify-content-center">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="col-4"></div>
                  <h3 class="mb-3 col-3">供应商列表</h3>
                  <div class="col-4 d-flex justify-content-end p-0 mb-2">
                    <button type="submit" data-toggle="modal" data-target="#recommendOrder" class="mr-3 btn btn-outline-info btn-sm" style="display: block;">
                      <i class="fa fa-filter"></i> 智能推荐
                    </button>
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
                          <th scope="col" >选择</th>
                        </tr>
                    </thead>
                    <tbody v-for="material,index in materials">


                      <tr >
                          <th scope="row">{{index+1}}</th>
                          <td>{{material.id}}</td>
                          <td>{{material.name}}</td>
                          <td>{{material.count}}</td>
                          <td>{{material.comment}}</td>
                          <td style="text-align: center;">
                            <button type="button" class="btn btn-link p-0" @click="showSupplier($event)">选择供应商</button>
                          </td>
                      </tr>
                      <tr style="display:none" >
                        <td colspan="6">
                          <div class="d-flex row justify-content-end">
                            <div  class="d-flex col-11 justify-content-space" v-for="allSupplier,index in material.allSuppliers">
                               <div col-1><p>({{index+1}})</p></div>
                               <div class="col-2"><p>{{allSupplier.name}}</p></div>
                               <div class="col-2"><p><small>位置:{{allSupplier.location}}</small></p></div>
                               <div class="col-2"><p><small>单价:￥{{allSupplier.price}}</small></p></div>
                               <div class="col-2"><p><small>权值:{{allSupplier.weight}}</small></p></div>
                               <div class="col-2"><p><small>运输价格:￥{{allSupplier.transportPrice}}元/公里</small></p></div>
                               <div class="col-1">
                                 <input type="radio" id="checkbox1" :name="material.id" :ref="material.id" :data-id="allSupplier.id" :data-name="allSupplier.name" :data-location="allSupplier.location" :data-price="allSupplier.price" :data-weight="allSupplier.weight" :data-transportPrice="allSupplier.transportPrice" value="option1" :class="['form-check-input','ml-0','selectRadio',material.id]">
                               </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                </table>
                <!--/订单列表-->
                <!--分页栏-->
                <!-- <nav aria-label="...">
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
                </nav> -->
                <!--/分页栏-->
            </div>
        </div>
        <!--/content-->
        <!--foot-->
        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-between">
              <button type="button" @click="step2='none';step1='block'" class="btn btn-outline-primary btn-lg col-2" >上一步</button>
              <button type="button" @click="selectSuppliers()" class="btn btn-outline-primary btn-lg col-2" >下一步</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>
        <!--/foot-->
      </div>
      <!--/SecondStep-->
      <!--ThirdStep-->
      <div class="animated fadeIn second" :style="{display: step3}">
        <!--步骤导航-->
        <nav class="breadcrumb" style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>采购操作</b></h4>
          <span class="breadcrumb-item noActive">生成物料单</span>
          <span class="breadcrumb-item noActive" >选择供应商</span>
          <span class="breadcrumb-item isActive"><strong>生成采购单</strong></span>
          <span class="breadcrumb-item noActive">一键采购</span>
          <span class="breadcrumb-item noActive">物流运输</span>
          <span class="breadcrumb-item noActive">进货送检</span>
          <span class="breadcrumb-item noActive">完成采购</span>
          <div class="col-md-12 d-flex justify-content-end mr-0  "  style="margin-top:-2rem">
            <button type="submit"   class="cancelPurchaseBtn  btn btn-outline-primary btn-sm" style="display: block;" data-toggle="modal" data-target="#cancelPurchaseModal">
              <i class="fa fa-minus-circle"></i> 取消采购
            </button>
          </div>
        </nav>
        <!--/步骤导航-->
        <!--提示toast-->
        <div v-if="submitSuccess" class=" alert with-close alert-primary alert-dismissible fade show">
            <span class="badge badge-pill badge-primary">提交成功！</span>
            3秒后将自动跳转到采购记录...
            <button type="button" class="close" @click="submitSuccess=!submitSuccess;" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div v-if="submitFail" class=" alert with-close alert-danger alert-dismissible fade show">
            <span class="badge badge-pill badge-danger">提交失败！</span>
            请稍后重试...
            <button type="button" class="close" @click="submitFail=!submitFail;" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!--/提示toast-->
        <!--content-->
        <div class="card d-flex justify-content-center">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="col-4"></div>
                  <h3 class="mb-3 col-3">采购清单</h3>
                  <div class="col-4 d-flex justify-content-end pt-2">
                    <p>操作人：{{operator}}</p>
                    <p class="ml-4">时间：{{date}}</p>
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
                    <tbody v-for="material,index in materials">
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
                               <div class="col-2"><p><small>{{material.selectedSupplier.name}}</small></p></div>
                               <div class="col-2"><p><small>位置:{{material.selectedSupplier.location}}</small></p></div>
                               <div class="col-2"><p><small>单价:￥{{material.selectedSupplier.price}}</small></p></div>
                               <div class="col-2"><p><small>权值:{{material.selectedSupplier.weight}}</small></p></div>
                               <div class="col-2"><p><small>运输价格:￥{{material.selectedSupplier.transportPrice}}元/公里</small></p></div>

                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                </table>
                <!--/订单列表-->
                <!--提交审核按钮-->
                <div class="d-flex justify-content-end">
                  <button type="button" :class="['btn','btn-outline-primary','btn-lg','col-2',{'disabled':status=='1'||status=='3'||status=='4'||status=='5'||status=='6'||status==''||status==null}]" data-toggle="modal" data-target="#submitOrderModal" >提交审核</button>
                </div>
                <!--/提交审核按钮-->
            </div>
        </div>
        <!--/content-->
        <!--审核模块-->
        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <div class="d-flex justify-content-start">
              <strong class="col-3" align="left">审核情况</strong>

            </div>
            <div class="d-flex ">
              <div class=" justify-content-start col-4 mt-3">
                <div class="d-flex">
                  <div class="col-2">
                    <span v-if="checkInfo[0].result=='通过'" class="badge badge-success pt-2" style="border-radius: 50%;width:30px;height:30px">✔</span>
                    <span v-else-if="checkInfo[0].result=='未通过'" class="badge badge-danger pt-2" style="border-radius: 50%;width:30px;height:30px">x</span>
                    <span v-if="checkInfo[0].result=='-'" class="badge badge-secondary pt-2" style="border-radius: 50%;width:30px;height:30px">-</span>
                  </div>
                  <div class="col-8" align="left">
                    <strong>一级审核</strong>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="col-2"></div>
                  <div class="col-8" align="left">
                    <p class="mb-1">负责人：{{checkInfo[0].operator}}</p>
                    <p class="mb-1">时间：{{checkInfo[0].date}}</p>
                    <p class="mb-1">备注：{{checkInfo[0].comment}}</p>
                    <p class="mb-1">审核结果：{{checkInfo[0].result}}</p>
                  </div>
                </div>
              </div>
              <div class=" justify-content-start col-4 mt-3">
                <div class="d-flex">
                  <div class="col-2">
                    <span v-if="checkInfo[1].result=='通过'" class="badge badge-success pt-2" style="border-radius: 50%;width:30px;height:30px">✔</span>
                    <span v-else-if="checkInfo[1].result=='未通过'" class="badge badge-danger pt-2" style="border-radius: 50%;width:30px;height:30px">x</span>
                    <span v-if="checkInfo[1].result=='-'" class="badge badge-secondary pt-2" style="border-radius: 50%;width:30px;height:30px">-</span>
                  </div>
                  <div class="col-8" align="left">
                    <strong>二级审核</strong>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="col-2"></div>
                  <div class="col-8" align="left">
                    <p class="mb-1">负责人：{{checkInfo[1].operator}}</p>
                    <p class="mb-1">时间：{{checkInfo[1].date}}</p>
                    <p class="mb-1">备注：{{checkInfo[1].comment}}</p>
                    <p class="mb-1">审核结果：{{checkInfo[1].result}}</p>
                  </div>
                </div>
              </div><div class=" justify-content-start col-4 mt-3">
                <div class="d-flex">
                  <div class="col-2">
                    <span v-if="checkInfo[2].result=='通过'" class="badge badge-success pt-2" style="border-radius: 50%;width:30px;height:30px">✔</span>
                    <span v-else-if="checkInfo[2].result=='未通过'" class="badge badge-danger pt-2" style="border-radius: 50%;width:30px;height:30px">x</span>
                    <span v-if="checkInfo[2].result=='-'" class="badge badge-secondary pt-2" style="border-radius: 50%;width:30px;height:30px">-</span>
                  </div>
                  <div class="col-8" align="left">
                    <strong>三级审核</strong>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="col-2"></div>
                  <div class="col-8" align="left">
                    <p class="mb-1">负责人：{{checkInfo[2].operator}}</p>
                    <p class="mb-1">时间：{{checkInfo[2].date}}</p>
                    <p class="mb-1">备注：{{checkInfo[2].comment}}</p>
                    <p class="mb-1">审核结果：{{checkInfo[2].result}}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <!--/审核模块-->
        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-between">
              <button type="button" @click="step3='none';step2='block';showAllSuppliers()" :class="['btn','btn-outline-primary','btn-lg','col-2',{'disabled':status=='1'||status=='3'||status==''||status==null}]" >上一步</button>
              <button type="button" @click="step3='none';step4='block'" :class="['btn','btn-outline-primary','btn-lg','col-2',{'disabled':status=='1'||status=='2'||status=='0'||status==''||status==null}]" >下一步</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>

      </div>
      <!--/ThirdStep-->
      <!--FourthStep-->
      <div class="animated fadeIn second" :style="{display: step4}">
        <!--步骤导航-->
        <nav class="breadcrumb " style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>采购操作</b></h4>
          <span class="breadcrumb-item noActive">生成物料单</span>
          <span class="breadcrumb-item noActive" >选择供应商</span>
          <span class="breadcrumb-item noActive">生成采购单</span>
          <span class="breadcrumb-item isActive"><strong>一键采购</strong></span>
          <span class="breadcrumb-item noActive">物流运输</span>
          <span class="breadcrumb-item noActive">进货送检</span>
          <span class="breadcrumb-item noActive">完成采购</span>

          <div class="col-md-12 d-flex justify-content-end mr-0  "  style="margin-top:-2rem">
            <button type="submit"   class="cancelPurchaseBtn  btn btn-outline-primary btn-sm" style="display: block;" data-toggle="modal" data-target="#cancelPurchaseModal">
              <i class="fa fa-minus-circle"></i> 取消采购
            </button>
          </div>
        </nav>
        <!--/步骤导航-->

        <!--content-->
        <div class="card d-flex justify-content-center">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="col-4"></div>
                  <h3 class="mb-3 col-3">过审的采购清单</h3>
                  <div class="col-4 d-flex justify-content-end pt-2">
                    <p>操作人：{{operator}}</p>
                    <p class="ml-4">时间：{{date}}</p>
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
                    <tbody v-for="material,index in materials">
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
                               <div class="col-2"><p><small>{{material.selectedSupplier.name}}</small></p></div>
                               <div class="col-2"><p><small>位置:{{material.selectedSupplier.location}}</small></p></div>
                               <div class="col-2"><p><small>单价:￥{{material.selectedSupplier.price}}</small></p></div>
                               <div class="col-2"><p><small>权值:{{material.selectedSupplier.weight}}</small></p></div>
                               <div class="col-2"><p><small>运输价格:￥{{material.selectedSupplier.transportPrice}}元/公里</small></p></div>

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

        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-between">
              <button type="button" @click="step4='none';step3='block'" class="btn btn-outline-primary btn-lg col-2">上一步</button>
              <button type="button" @click="confirmPurchase()"  class="btn btn-outline-primary btn-lg col-2">一键采购</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>

      </div>
      <!--/FourthStep-->
      <!--FifthStep-->
      <div class="animated fadeIn second" :style="{display: step5}">
        <!--步骤导航-->
        <nav class="breadcrumb " style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>采购操作</b></h4>
          <span class="breadcrumb-item noActive">生成物料单</span>
          <span class="breadcrumb-item noActive" >选择供应商</span>
          <span class="breadcrumb-item noActive">生成采购单</span>
          <span class="breadcrumb-item noActive">一键采购</span>
          <span class="breadcrumb-item isActive"><strong>物流运输</strong></span>
          <span class="breadcrumb-item noActive">进货送检</span>
          <span class="breadcrumb-item noActive">完成采购</span>
        </nav>
        <!--/步骤导航-->

        <!--content-->
        <div class="card d-flex justify-content-center" style="height:45rem">
            <div class="card-body">
              <!--地图-->
              <div id="container"></div>

            </div>
        </div>
        <!--/content-->

        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-end">

              <button type="button" @click="confirmReceit()" class="btn btn-outline-primary btn-lg col-2">确认收货</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>

      </div>
      <!--/FifthStep-->
      <!--SixthStep-->
      <div class="animated fadeIn second" :style="{display: step6}">
        <!--步骤导航-->
        <nav class="breadcrumb " style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>采购操作</b></h4>
          <span class="breadcrumb-item noActive">生成物料单</span>
          <span class="breadcrumb-item noActive" >选择供应商</span>
          <span class="breadcrumb-item noActive">生成采购单</span>
          <span class="breadcrumb-item noActive">一键采购</span>
          <span class="breadcrumb-item noActive">物流运输</span>
          <span class="breadcrumb-item isActive"><strong>进货送检</strong></span>
          <span class="breadcrumb-item noActive">完成采购</span>
        </nav>
        <!--/步骤导航-->

        <!--content-->
        <div class="card d-flex justify-content-center">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="col-4"></div>
                <h3 class="mb-3 col-3">进货检验表</h3>
                <div class="col-4 d-flex justify-content-end p-0">

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
                        <th scope="col" style="width:210px">合格&emsp;&emsp;&emsp;不合格</th>
                      </tr>
                  </thead>
                  <tbody v-for="material,index in materials">
                    <tr >
                        <th scope="row">{{index+1}}</th>
                        <td>{{material.id}}</td>
                        <td>{{material.name}}</td>
                        <td>{{material.count}}</td>
                        <td>{{material.comment}}</td>
                        <td style="text-align: center;">
                          <button type="button" class="btn btn-link p-0" @click="showSelectedSupplier($event)">查看供应商</button>
                        </td>
                        <td>
                          <div class="form-check-inline form-check mr-0 d-flex justify-content-around">
                            <input type="radio" id="inline-radio1" :name="index" value="1" class="form-check-input" checked>
                            <input type="radio" id="inline-radio2" :name="index" value="0" class="form-check-input">
                          </div>
                        </td>
                    </tr>
                    <tr style="display:none">
                      <td colspan="7">
                        <div class="d-flex row justify-content-end">
                          <div  class="d-flex col-11 justify-content-space ">
                             <div col-1><p><small>详情:</small></p></div>
                             <div class="col-2"><p><small>{{material.selectedSupplier.name}}</small></p></div>
                             <div class="col-2"><p><small>位置:{{material.selectedSupplier.location}}</small></p></div>
                             <div class="col-2"><p><small>单价:￥{{material.selectedSupplier.price}}</small></p></div>
                             <div class="col-2"><p><small>权值:{{material.selectedSupplier.weight}}</small></p></div>
                             <div class="col-2"><p><small>运输价格:￥{{material.selectedSupplier.transportPrice}}元/公里</small></p></div>
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

        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-end">

              <button type="button" @click="checkCommodity()" class="btn btn-outline-primary btn-lg col-2">确认进货</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>

      </div>
      <!--/SixthStep-->
      <!--SeventhStep-->
      <div class="animated fadeIn second" :style="{display: step7}">
        <!--步骤导航-->
        <nav class="breadcrumb " style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>采购操作</b></h4>
          <span class="breadcrumb-item noActive">生成物料单</span>
          <span class="breadcrumb-item noActive" >选择供应商</span>
          <span class="breadcrumb-item noActive">生成采购单</span>
          <span class="breadcrumb-item noActive">一键采购</span>
          <span class="breadcrumb-item noActive">物流运输</span>
          <span class="breadcrumb-item noActive">进货送检</span>
          <span class="breadcrumb-item isActive"><strong>完成采购</strong></span>
        </nav>
        <!--/步骤导航-->

        <!--content-->
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
                 <p align="left" class="mb-0 mr-3" style="font-size:0.8rem">负责人：{{operator}}</p>
                 <p align="left" class="mb-0" style="font-size:0.8rem">时间：{{date}}</p>
               </div>
              <div v-for="qualifiedMaterial in qualifiedMaterials" class="row mb-1 " style="margin-left:30px">
                <div class=" d-flex col-12 p-0">
                  <div class=" d-flex col-10 p-0">
                    <span class="fa fa-dot-circle-o pt-2 mr-2" style="font-size: 5px;"></span>
                    <span class="pt-1" style="font-size: 15px;">{{qualifiedMaterial.name}}</span>
                    <p class="m-0"><small>（商品编号：{{qualifiedMaterial.id}}，数量：{{qualifiedMaterial.count}}，备注：{{qualifiedMaterial.comment}})</small></p>
                  </div>
                  <button type="button" class="btn btn-link p-0 col" @click="showSelectedSupplier2($event)" style="font-size:10px;">查看供应商</button>
                </div>
                <div class=" d-flex col-12 p-0" style="display: none!important;height:25px">
                  <div class="col-2"><p><small>{{qualifiedMaterial.selectedSupplier.name}}</small></p></div>
                  <div class="col-3"><p><small>位置:{{qualifiedMaterial.selectedSupplier.location}} </small></p></div>
                  <div class="col-2"><p><small>单价:￥{{qualifiedMaterial.selectedSupplier.price}}</small></p></div>
                  <div class="col-2"><p><small>权值:{{qualifiedMaterial.selectedSupplier.weight}}</small></p></div>
                  <div class="col-3"><p><small>运费:￥{{qualifiedMaterial.selectedSupplier.transportPrice}}元/公里</small></p></div>
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
                 <p align="left" class="mb-0 mr-3" style="font-size:0.8rem">负责人：{{operator}}</p>
                 <p align="left" class="mb-0" style="font-size:0.8rem">时间：{{date}}</p>
               </div>
              <div v-for="disQualifiedMaterial in disQualifiedMaterials" class="row mb-1 " style="margin-left:30px">
                <div class=" d-flex col-12 p-0">
                  <div class=" d-flex col-10 p-0">
                    <span class="fa fa-dot-circle-o pt-2 mr-2" style="font-size: 5px;"></span>
                    <span class="pt-1" style="font-size: 15px;">{{disQualifiedMaterial.name}}</span>
                    <p class="m-0"><small>（商品编号：{{disQualifiedMaterial.id}}，数量：{{disQualifiedMaterial.count}}，备注：{{disQualifiedMaterial.comment}})</small></p>
                  </div>
                  <button type="button" class="btn btn-link p-0 col" @click="showSelectedSupplier2($event)" style="font-size:10px;">查看供应商</button>
                </div>
                <div class=" d-flex col-12 p-0" style="display: none!important;height:25px">
                  <div class="col-2"><p><small>{{disQualifiedMaterial.selectedSupplier.name}}</small></p></div>
                  <div class="col-3"><p><small>位置:{{disQualifiedMaterial.selectedSupplier.location}} </small></p></div>
                  <div class="col-2"><p><small>单价:￥{{disQualifiedMaterial.selectedSupplier.price}}</small></p></div>
                  <div class="col-2"><p><small>权值:{{disQualifiedMaterial.selectedSupplier.weight}}</small></p></div>
                  <div class="col-3"><p><small>运费:￥{{disQualifiedMaterial.selectedSupplier.transportPrice}}元/公里</small></p></div>
                </div>
              </div>

              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-info mt-3">一键退货</button>
              </div>

            </div>
          </div>
          <!--/退货单-->
        </div>
        <!--/content-->

        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-end">

              <button type="button" @click="finishPurchase()" class="btn btn-outline-primary btn-lg col-2">完成采购</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>

      </div>
      <!--/SeventhStep-->

      <!--添加商品弹窗-->
      <div  class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm" role="document">
              <div class="modal-content">
                  <div class="modal-header d-flex">
                      <div class="col-1"></div>
                      <h5 class="modal-title col-10" id="staticModalLabel">添加原料</h5>
                      <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <form>
                    <div class="modal-body addMaterial">
                      <!-- <div class="form-group"><label for="company" class=" form-control-label" style="width:100%" align="left">编号</label><input type="text" id="materialId" name="id" placeholder="输入商品编号" class="form-control"  required="required"></div> -->
                      <div class="form-group">
                        <label for="vat" class=" form-control-label" align="left">原料</label>
                        <select name="select" id="addSelect" class="form-control">
                            <option v-for="allMaterial in allMaterials" :value="allMaterial.id">id:{{allMaterial.id}}&emsp;名称:{{allMaterial.rawMaterialName}}</option>
                        </select>
                      </div>
                      <div class="form-group"><label for="vat" class=" form-control-label" style="width: 100%;" align="left">数量</label><input type="text" id="materialCount" name="count" class="form-control"  required="required" oninput = "value=value.replace(/[^\d]/g,'')"></div>
                      <div class="form-group"><label for="country" class=" form-control-label" style="width: 100%;" align="left">备注</label><input type="text" id="materialComment" placeholder="(选填)" class="form-control"></div>
                    </div>
                    <div class="modal-footer ">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="addMaterial()" >确定</button>
                    </div>
                  </form>
              </div>
          </div>
      </div>
      <!--/添加商品弹窗-->
      <!--删除商品弹窗-->
      <div  class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm" role="document">
              <div class="modal-content">
                  <div class="modal-header d-flex">
                      <div class="col-1"></div>
                      <h5 class="modal-title col-10" id="staticModalLabel">删除商品</h5>
                      <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <form>
                    <div class="modal-body addMaterial">
                      <span>确定删除该商品吗？</span>
                    </div>
                    <div class="modal-footer ">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="deleteMaterial()">确定</button>
                    </div>
                  </form>
              </div>
          </div>
      </div>
      <!--/删除商品弹窗-->
      <!--取消采购弹窗-->
      <div  class="modal fade" id="cancelPurchaseModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm" role="document">
                  <div class="modal-content">
                      <div class="modal-header d-flex">
                          <div class="col-1"></div>
                          <h5 class="modal-title col-10" id="staticModalLabel">取消采购</h5>
                          <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <p>
                             确定要取消此次采购操作吗？
                         </p>
                     </div>
                     <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                      <button type="button" class="btn btn-primary" @click="cancelPurchase()" >确定</button>
                  </div>
              </div>
          </div>
      </div>
      <!--/取消采购弹窗-->
      <!--提交审核弹窗-->
      <div  class="modal fade" id="submitOrderModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-md" role="document">
                  <div class="modal-content">
                      <div class="modal-header d-flex">
                          <div class="col-1"></div>
                          <h5 class="modal-title col-10" id="staticModalLabel">提交审核</h5>
                          <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                         <p v-if="status=='0'">
                             提交后此采购清单将给上级审核，确定提交吗？<br><small class=" mt-2">（提交后可在"采购记录"里查看审核结果）</small>
                         </p>
                         <p v-if="status=='2'">
                             上次审核未通过，确定重新提交吗？<br><small class=" mt-2">（提交将删除原有订单，发起一个新的订单）</small>
                         </p>
                     </div>
                     <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                      <button type="button" class="btn btn-primary" @click="submitAudit()">确定</button>
                  </div>
              </div>
          </div>
      </div>
      <!--/提交审核弹窗-->
    </consolePanel>
  </div>
</template>

<script>
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  import * as api from "../request/api.js"
  // import { lazyAMapApiLoaderInstance } from 'vue-amap'
  export default {
    name: 'purchaseOperation',
    data () {
      return {
        id:"",      //采购id
        operator:"未知人员",
        date:"",
        materials:[       //采购原料（对应供应商）
          // {
          //   id:"001",
          //   name:"五金工具",
          //   count:10,
          //   comment:"要求：最新一批",
          //   checkedResult:true,
          //   allSuppliers:[
          //     // {
          //     //   id:suppliers[k].id,
          //     //   name:suppliers[k].name,
          //     //   location:suppliers[k].location,
          //     //   price:suppliers[k].price,   //todo
          //     //   weight:suppliers[k].star,     //合作分值
          //     //   timeData:time_parameter,    //运输时间系数
          //     //   transportPrice:suppliers[k].fare_parameter, //运输价格系数
          //     // }
          //       {
          //       name:"供应商A",
          //       location:"上海",
          //       price:28,
          //       weight:4,
          //       transportPrice:20
          //     },
          //     {
          //       name:"供应商B",
          //       location:"浙江",
          //       price:35,
          //       weight:2,
          //       transportPrice:10
          //     },
          //   ],
          //   selectedSupplier:{
          //     name:"供应商A",
          //     location:"上海",
          //     price:28,
          //     weight:4,
          //     transportPrice:20
          //   }
          // },
          // {
          //   id:"002",
          //   name:"锤子",
          //   count:10,
          //   comment:"po部门需要的",
          //   checkedResult:true,
          //   allSuppliers:[
          //     {
          //     id:"",
          //     name:"供应商A",
          //     location:"宁波",
          //     price:28,
          //     weight:4,
          //     transportPrice:20
          //   },
          //   {
          //     id:"",
          //     name:"供应商B",
          //     location:"新疆",
          //     price:35,
          //     weight:2,
          //     transportPrice:10
          //   },
          //   ],
          //   selectedSupplier:{
          //     id:"",
          //     name:"供应商A",
          //     location:"宁波",
          //     price:28,
          //     weight:4,
          //     transportPrice:20
          //   }
          // },
        ],
        checkInfo:[       //该采购的三级审核状态数据
          {
            level:1,
            operator:"-",
            date:"-",
            result:"-",
            comment:"-"
          },
          {
            level:2,
            operator:"-",
            date:"-",
            result:"-",
            comment:"-"
          },
          {
            level:3,
            operator:"-",
            date:"-",
            result:"-",
            comment:"-"
          }
        ],
        status:"0" ,       //该采购的状态（进行到的步骤）。1审核中，2审核未通过，3审核通过，4运输中，5已收货，6已完成，0未开始
        step1:"block",
        step2:"none",
        step3:"none",
        step4:"none",
        step5:"none",
        step6:"none",
        step7:"none",
        submitSuccess:false,
        submitFail:false,
        step1ClickIndex:0,
        isShowSupplier:false,
        qualifiedMaterials:[],
        disQualifiedMaterials:[],
        allMaterials:[
          // {
          // 			id:"11",
          // 			rawMaterialName:"铁",

          // 		},
          ],

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
       * 3. 取消此次采购操作
       */
      cancelPurchase(){
         this.initial();
         $('#cancelPurchaseModal').modal('hide');

      },
      /**
       * 4.添加原料商品
       */
      addMaterial(){
//         $('.addMaterial').bootstrapValidator({
// 　　　　　　　　message: 'This value is not valid',
//             　feedbackIcons: {
//                 　　　　　　　　valid: 'glyphicon glyphicon-ok',
//                 　　　　　　　　invalid: 'glyphicon glyphicon-remove',
//                 　　　　　　　　validating: 'glyphicon glyphicon-refresh'
//             　　　　　　　　   },
//             fields: {
//                 id: {
//                     message: '用户名验证失败',
//                     validators: {
//                         notEmpty: {
//                             message: '用户名不能为空'
//                         }
//                     }
//                 },
//                 count: {
//                     validators: {
//                         notEmpty: {
//                             message: '邮箱地址不能为空'
//                         }
//                     }
//                 }
//             }
//         });
        var mId= $("#addSelect option:selected").attr("value");
        //var mId=$("#materialId").val().trim();
        var mCount=$("#materialCount").val().trim()
        var mComment=$("#materialComment").val()
        if(mId==""||!mId||mCount==""||!mCount){
          alert("商品编号和数量为必填字段");
          return;
        }

        if(mComment==""||!mComment){
          mComment="无"
        }
        var idObj={id:mId};
        console.log(idObj)
        //发送get请求,根据id获取原料信息
        api.getMaterial(idObj,"根据id获取原料信息失败").then(res => {
          console.log(res)
          if(res.data.status==0){
            var obj={
              id:mId,
              name:res.data.data.name,
              count:mCount,
              comment:mComment,
              allSuppliers:[],
              selectedSupplier:{}
            }
            this.materials.push(obj);
            //隐藏弹窗
            $('#addModal').modal('hide');
          }
        })
      },
      /**
       * 5. 删除商品
       */
      deleteMaterial(){
        this.materials.splice(this.step1ClickIndex,1);
        $('#deleteModal').modal('hide');
      },
      /**
       * 6. 初始化所有商品对应可选择的供应商
       */
      showAllSuppliers(){
        var materialsId=[]
        var i;
        for(i=0;i<this.materials.length;i++){
          materialsId.push(this.materials[i].id);
        }
        //调用请求，获取每个商品对应的供应商,并填入相应materials数组里的每个allSuppliers属性里

        api.getSupplier(materialsId,"获取每个商品对应的供应商失败").then( res => {
          console.log(res)
          var resMaterials=res.data.data;
          if (res.data.status == 0) {
            for(var i=0;i<this.materials.length;i++){
              for(var j=0;j<resMaterials.length;j++){
                if(this.materials[i].id==resMaterials[j].materialId){
                  var suppliers=resMaterials[j].suppliers;
                  var curAllSuppliers=[];
                  for(var k=0;k<suppliers.length;k++){
                    var curSupplier={
                      id:suppliers[k].id,
                      name:suppliers[k].name,
                      location:suppliers[k].location,
                      price:suppliers[k].price,   //todo
                      weight:suppliers[k].star,     //合作分值
                      timeData:suppliers[k].time_parameter,    //运输时间系数
                      transportPrice:suppliers[k].fare_parameter, //运输价格系数
                    }
                    curAllSuppliers.push(curSupplier);
                  }

                  this.materials[i].allSuppliers=curAllSuppliers; //变化，allSuppliers和selectedSupplier参数改变
                }
              }
            }
          }
        })

      },
      /**
       * 7.显示供应商详情
       */
      showSupplier(e){
        var detail=e.target.parentNode.parentNode.nextElementSibling;
        if(detail.style.display=="none"){
          detail.style.display="table-row";
        }
        else{
          detail.style.display="none";
        }
      },
      /**
       * 8. 选择原料商品对应的供应商
       */
      selectSuppliers(){
        var i=0;
        let materialList=this.materials;
        //检查是否存在未选择供应商的商品
        for(i=0;i<materialList.length;i++){ //遍历每个Material原料，获取对应选中的供应商
          var material=materialList[i];
          if(material.allSuppliers.length==0){
            alert("该商品（编号："+material.id+"）暂且没有被供应商提供，请重新选择商品！");
            return;
          }
          var selectedRadio=$("."+material.id+":checked")   //该原料里选中的供应商放入该对象里，最多只有一个，因为是radio
          if(selectedRadio.length==0){
            alert("存在未选中供应商的商品，请选择供应商！");
            return;
          }
          this.materials[i].selectedSupplier={
            id:selectedRadio.attr("data-id"),
            name:selectedRadio.attr("data-name"),
            location:selectedRadio.attr("data-location"),
            price:selectedRadio.attr("data-price"),
            weight:selectedRadio.attr("data-weight"),
            transportPrice:selectedRadio.attr("data-transportPrice"),
          }


          //方法二：较复杂
          /* let suppliers=this.$refs[material.id];  //该变量存放该原料的所有供应商选项的html的input代码
          for( let j=0;j<suppliers.length;j++){
            if(suppliers[j].checked){
              // console.log(suppliers[j]);
              // console.log((suppliers[j]).attr("name"));
              break;
            }
            else if(j==suppliers.length-1){
              alert("存在未选中供应商的商品，请选择供应商！");
              return;
            }
          } */
        }

        this.date=this.getDateTime();
        this.step2='none';this.step3='block';

      },
      /**
       * 9. 显示已经选好的供应商
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
       * 9. 显示已经选好的供应商(用在第七步)
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
      /**
       * 10. 提交采购清单进行审核
       */
      submitAudit(){
        //先把this.materials里的allSuppliers清空
        var i
        for(i=0;i<this.materials.length;i++){
          this.materials[i].allSuppliers=[];
        }


        var materialOrderForms=[];
        for(var i=0;i<this.materials.length;i++){
          materialOrderForms.push({
            id:this.materials[i].id,
            nums:this.materials[i].count,
            supplierId:this.materials[i].selectedSupplier.id,
          });
        }
        //把该采购的所有数据封装在一个对象里
        var materialOverOrderForms={
          //id:this.id,       //由后端自生成
          managerName:this.$store.getters.userInfo.name,
          materialOrderForms:materialOrderForms       //修改materials的count为num
        }

         if(this.id==""||!this.id){
           console.log("新增的提交")
           //发送post请求，把materials数据发送给后端，若成功则显示提交成功的toast
             api.submitPurchaseOrder(materialOverOrderForms,"提交采购清单失败").then(res=>{
             console.log(res)
             if(res.data.status==0){
               //显示成功toast
               this.submitSuccess=true;
               //更新状态到1，审核中
               this.status="1";
               $('#submitOrderModal').modal('hide');
               //自动跳转
                 //setTimeout(func(),3000)
                 this.timer = setTimeout(()=>{  //设置延迟执行
                   this.$router.push('/console/purchase/purchaseOrder');
                 },3000);
             }
           }).catch(failResponse => {
             //显示失败toast
             this.submitFail=true;
             console.log("提交采购清单失败")
             console.error(failResponse);
           });
         }
         else{  //之前审核不过，重新进行提交审核
           var obj={purchaseId:this.id}
           console.log("先删除订单，obj是：")
           console.log(obj)
           api.cancelPurchase(obj,"删除采购订单失败").then(res=>{
             console.log(res)
             if(res.data.status==0){
                console.log("重新提交")
                console.log(materialOverOrderForms)
               //发送post请求，把materials数据发送给后端，若成功则显示提交成功的toast
                 api.submitPurchaseOrder(materialOverOrderForms,"提交采购清单失败").then(res=>{
                 console.log(res)
                 if(res.data.status==0){
                   //显示成功toast
                   this.submitSuccess=true;
                   //更新状态到1，审核中
                   this.status="1";
                   $('#submitOrderModal').modal('hide');
                   //自动跳转
                     this.timer = setTimeout(()=>{  //设置延迟执行
                       this.$router.push('/console/purchase/purchaseOrder');
                     },3000);
                 }
               }).catch(failResponse => {
                 //显示失败toast
                 this.submitFail=true;
                 console.log("提交采购清单失败")
                 console.error(failResponse);
               });
             }
           })
         }
      },
      /**
       * 11. 一键采购的更新这次采购操作的状态 （当一键采购和确认收货时需要调用）
       */
      confirmPurchase(){
        var obj={id:this.id,state:"4"}
        console.log(obj)
        //发送请求，更新状态
        api.updatePurchaseStatus(obj,"一键采购的更新采购状态失败").then(res => {
          if(res.data.status==0){
            //更新状态
            this.status="4";
            //成功后才能跳转到下一步骤
            this.step4='none';this.step5='block';getMap();
          }
        })
      },
      /**
       * 12. 确认收货的更新这次采购操作的状态 （当一键采购和确认收货时需要调用）
       */
      confirmReceit(){
        var obj={id:this.id,state:"5"}
        //发送请求，更新状态
        api.updatePurchaseStatus(obj,"确认收货的更新采购状态失败").then(res => {
          if(res.data.status==0){
            //更新状态
            this.status="5"
            //成功后才能跳转到下一步骤
            this.step5='none';this.step6='block';
          }
        })

      },
      /**
       * 13. 检验每个货物是否合格
       */
      checkCommodity(){
        var i=0;
        let materialList=this.materials;
        var materialCheckResultForms=[];
        for(i=0;i<materialList.length;i++){ //遍历每个Material原料，更新对应的检验结果属性
          var material=materialList[i];
          var result=$("input[name='"+i+"']:checked").attr("value");
          if(result==1)
            result=true;
          else
            result=false;
          this.materials[i].checkedResult=result;
          var obj={id:material.id,result:result};
          materialCheckResultForms.push(obj);
        }
        var checkList={
          purchaseId:this.id,
          materialCheckResultForms:materialCheckResultForms,
        }
        //发送post请求给后端，更新表里每个物料的检验结果，后端要更新采购状态为已完成6
        api.checkCommodity(checkList,"更新原料检验状态失败").then(res => {
          if(res.data.status==0){
            console.log("更新原料检验状态成功！")
            //执行跳转
            this.getQualifiedAndDisQualified();
              //更新采购状态为已完成
            this.status="6"
            this.step6='none';this.step7='block';
          }
        })
      },
      /**
       * 14. 获取合格和未合格的商品（进货单和退货单）
       */
      getQualifiedAndDisQualified(){
        var i;
        for(i=0;i<this.materials.length;i++){
          if(this.materials[i].checkedResult){  //合格
            this.qualifiedMaterials.push(this.materials[i]);
          }
          else{ //不合格
            this.disQualifiedMaterials.push(this.materials[i]);
          }

        }
      },
      /**
       * 15.完成采购
       */
      finishPurchase(){
        //跳转
        this.$router.push('/console/purchase/finishedPurchaseOrder');
        // step7='none';step1='block'
      },
      /**
       * 16. 生成物流地图
       */
      getMap(){
        //创建地图
        var map = new AMap.Map('container', {
           resizeEnable: true, //是否监控地图容器尺寸变化
               zoom: 8, //初始化地图层级
               center: [116.28924, 40.04599], //初始化地图中心点
               zoomEnable: true,//禁止缩放
               dragEnable: true,//禁止拖动
               cursor: 'hand' // 鼠标在地图上的表现形式，小手

        });


        //测试
        function getJson(key,jsonObj){
        // var jsonObj={"name":"傅红雪","age":"24","profession":"刺客"};


         //1、使用eval方法
         var eValue=eval('jsonObj.'+key);
         return eValue;


         //2、遍历Json串获取其属性
         /* for(var item in jsonObj){
          if(item==key){ //item 表示Json串中的属性，如'name'
           var jValue=jsonObj[item];//key所对应的value
           console.log(jValue);
          }
         } */


         //3、直接获取
         // console.log(jsonObj[''+key+'']);
        }
        var geoCoordMap = {
            '海门': [121.15, 31.89],
            '鄂尔多斯': [109.781327, 39.608266],
            '招远': [120.38, 37.35],
            '舟山': [122.207216, 29.985295],
            '齐齐哈尔': [123.97, 47.33],
            '盐城': [120.13, 33.38],
            '赤峰': [118.87, 42.28],
            '青岛': [120.33, 36.07],
            '乳山': [121.52, 36.89],
            '金昌': [102.188043, 38.520089],
            '泉州': [118.58, 24.93],
            '莱西': [120.53, 36.86],
            '日照': [119.46, 35.42],
            '胶南': [119.97, 35.88],
            '南通': [121.05, 32.08],
            '拉萨': [91.11, 29.97],
            '云浮': [112.02, 22.93],
            '梅州': [116.1, 24.55],
            '文登': [122.05, 37.2],
            '上海': [121.48, 31.22],
            '攀枝花': [101.718637, 26.582347],
            '威海': [122.1, 37.5],
            '承德': [117.93, 40.97],
            '厦门': [118.1, 24.46],
            '汕尾': [115.375279, 22.786211],
            '潮州': [116.63, 23.68],
            '丹东': [124.37, 40.13],
            '太仓': [121.1, 31.45],
            '曲靖': [103.79, 25.51],
            '烟台': [121.39, 37.52],
            '福州': [119.3, 26.08],
            '瓦房店': [121.979603, 39.627114],
            '即墨': [120.45, 36.38],
            '抚顺': [123.97, 41.97],
            '玉溪': [102.52, 24.35],
            '张家口': [114.87, 40.82],
            '阳泉': [113.57, 37.85],
            '莱州': [119.942327, 37.177017],
            '湖州': [120.1, 30.86],
            '汕头': [116.69, 23.39],
            '昆山': [120.95, 31.39],
            '宁波': [121.56, 29.86],
            '湛江': [110.359377, 21.270708],
            '揭阳': [116.35, 23.55],
            '荣成': [122.41, 37.16],
            '连云港': [119.16, 34.59],
            '葫芦岛': [120.836932, 40.711052],
            '常熟': [120.74, 31.64],
            '东莞': [113.75, 23.04],
            '河源': [114.68, 23.73],
            '淮安': [119.15, 33.5],
            '泰州': [119.9, 32.49],
            '南宁': [108.33, 22.84],
            '营口': [122.18, 40.65],
            '惠州': [114.4, 23.09],
            '江阴': [120.26, 31.91],
            '蓬莱': [120.75, 37.8],
            '韶关': [113.62, 24.84],
            '嘉峪关': [98.289152, 39.77313],
            '广州': [113.23, 23.16],
            '延安': [109.47, 36.6],
            '太原': [112.53, 37.87],
            '清远': [113.01, 23.7],
            '中山': [113.38, 22.52],
            '昆明': [102.73, 25.04],
            '寿光': [118.73, 36.86],
            '盘锦': [122.070714, 41.119997],
            '长治': [113.08, 36.18],
            '深圳': [114.07, 22.62],
            '珠海': [113.52, 22.3],
            '宿迁': [118.3, 33.96],
            '咸阳': [108.72, 34.36],
            '铜川': [109.11, 35.09],
            '平度': [119.97, 36.77],
            '佛山': [113.11, 23.05],
            '海口': [110.35, 20.02],
            '江门': [113.06, 22.61],
            '章丘': [117.53, 36.72],
            '肇庆': [112.44, 23.05],
            '大连': [121.62, 38.92],
            '临汾': [111.5, 36.08],
            '吴江': [120.63, 31.16],
            '石嘴山': [106.39, 39.04],
            '沈阳': [123.38, 41.8],
            '苏州': [120.62, 31.32],
            '茂名': [110.88, 21.68],
            '嘉兴': [120.76, 30.77],
            '长春': [125.35, 43.88],
            '胶州': [120.03336, 36.264622],
            '银川': [106.27, 38.47],
            '张家港': [120.555821, 31.875428],
            '三门峡': [111.19, 34.76],
            '锦州': [121.15, 41.13],
            '南昌': [115.89, 28.68],
            '柳州': [109.4, 24.33],
            '三亚': [109.511909, 18.252847],
            '自贡': [104.778442, 29.33903],
            '吉林': [126.57, 43.87],
            '阳江': [111.95, 21.85],
            '泸州': [105.39, 28.91],
            '西宁': [101.74, 36.56],
            '宜宾': [104.56, 29.77],
            '呼和浩特': [111.65, 40.82],
            '成都': [104.06, 30.67],
            '大同': [113.3, 40.12],
            '镇江': [119.44, 32.2],
            '桂林': [110.28, 25.29],
            '张家界': [110.479191, 29.117096],
            '宜兴': [119.82, 31.36],
            '北海': [109.12, 21.49],
            '西安': [108.95, 34.27],
            '金坛': [119.56, 31.74],
            '东营': [118.49, 37.46],
            '牡丹江': [129.58, 44.6],
            '遵义': [106.9, 27.7],
            '绍兴': [120.58, 30.01],
            '扬州': [119.42, 32.39],
            '常州': [119.95, 31.79],
            '潍坊': [119.1, 36.62],
            '重庆': [106.54, 29.59],
            '台州': [121.420757, 28.656386],
            '南京': [118.78, 32.04],
            '滨州': [118.03, 37.36],
            '贵阳': [106.71, 26.57],
            '无锡': [120.29, 31.59],
            '本溪': [123.73, 41.3],
            '克拉玛依': [84.77, 45.59],
            '渭南': [109.5, 34.52],
            '马鞍山': [118.48, 31.56],
            '宝鸡': [107.15, 34.38],
            '焦作': [113.21, 35.24],
            '句容': [119.16, 31.95],
            '北京': [116.46, 39.92],
            '徐州': [117.2, 34.26],
            '衡水': [115.72, 37.72],
            '包头': [110, 40.58],
            '绵阳': [104.73, 31.48],
            '乌鲁木齐': [87.68, 43.77],
            '枣庄': [117.57, 34.86],
            '杭州': [120.19, 30.26],
            '淄博': [118.05, 36.78],
            '鞍山': [122.85, 41.12],
            '溧阳': [119.48, 31.43],
            '库尔勒': [86.06, 41.68],
            '安阳': [114.35, 36.1],
            '开封': [114.35, 34.79],
            '济南': [117, 36.65],
            '德阳': [104.37, 31.13],
            '温州': [120.65, 28.01],
            '九江': [115.97, 29.71],
            '邯郸': [114.47, 36.6],
            '临安': [119.72, 30.23],
            '兰州': [103.73, 36.03],
            '沧州': [116.83, 38.33],
            '临沂': [118.35, 35.05],
            '南充': [106.110698, 30.837793],
            '天津': [117.2, 39.13],
            '富阳': [119.95, 30.07],
            '泰安': [117.13, 36.18],
            '诸暨': [120.23, 29.71],
            '郑州': [113.65, 34.76],
            '哈尔滨': [126.63, 45.75],
            '聊城': [115.97, 36.45],
            '芜湖': [118.38, 31.33],
            '唐山': [118.02, 39.63],
            '平顶山': [113.29, 33.75],
            '邢台': [114.48, 37.05],
            '德州': [116.29, 37.45],
            '济宁': [116.59, 35.38],
            '荆州': [112.239741, 30.335165],
            '宜昌': [111.3, 30.7],
            '义乌': [120.06, 29.32],
            '丽水': [119.92, 28.45],
            '洛阳': [112.44, 34.7],
            '秦皇岛': [119.57, 39.95],
            '株洲': [113.16, 27.83],
            '石家庄': [114.48, 38.03],
            '莱芜': [117.67, 36.19],
            '常德': [111.69, 29.05],
            '保定': [115.48, 38.85],
            '湘潭': [112.91, 27.87],
            '金华': [119.64, 29.12],
            '岳阳': [113.09, 29.37],
            '长沙': [113, 28.21],
            '衢州': [118.88, 28.97],
            '廊坊': [116.7, 39.53],
            '菏泽': [115.480656, 35.23375],
            '合肥': [117.27, 31.86],
            '武汉': [114.31, 30.52],
            '大庆': [125.03, 46.58]
        };
        var location1=getJson("广州",geoCoordMap)
        var location2=getJson("合肥",geoCoordMap);

        //测试

        AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
            // 设置缩放级别和中心点
             //map.setZoomAndCenter(2, [116.205467, 39.907761]);
            if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
            }

            var pathSimplifierIns = new PathSimplifier({
                zIndex: 100,
                autoSetFitView:true,
                map: map, //所属的地图实例

                getPath: function(pathData, pathIndex) {

                    return pathData.path;
                },
                getHoverTitle: function(pathData, pathIndex, pointIndex) {

                    if (pointIndex >= 0) {
                        //point
                        return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                    }

                    return pathData.name + '，点数量' + pathData.path.length;
                },
                renderOptions: {

                    renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
                }
            });

            window.pathSimplifierIns = pathSimplifierIns;


            //设置数据
            pathSimplifierIns.setData([{
                name: '运输路径',
                path: [
                    [113,23],
                    [117,31]
                ]
            }]);

            //对第一条线路（即索引 0）创建一个巡航器
            var navg1 = pathSimplifierIns.createPathNavigator(0, {
                loop: true, //循环播放
                speed: 150000 //巡航速度，单位千米/小时
            });

            navg1.start();
        });
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
      /**
       * 18.生成地图
       */
      setMap(){
        lazyAMapApiLoaderInstance.load().then(() => {
              this.map = new AMap.Map('myMap', {

                zooms: [13, 18], // 地图缩放范围
                center: new AMap.LngLat(116.397428, 39.90923)
              })
              AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {
                if (!PathSimplifier.supportCanvas) {
                  alert('当前环境不支持 Canvas！')
                  return
                }
                // 创建组件实例
                var pathSimplifierIns = new PathSimplifier({
                  map: this.map,
                  zIndex: 100, // 图层叠加顺序
                  data: this.path, // 巡航路径
                  // 获取巡航路径中的路径坐标数组
                  getPath: (pathData, pathIndex) => {
                    return pathData.path
                  }
                })
                // 创建巡航器
                var pathNavigator = pathSimplifierIns.createPathNavigator(0, {
                  loop: true, // 是否循环
                  speed: 2000 // 速度(km/h)
                })
                pathNavigator.start()
              })
            })
      },
      /**
       * 19. 初始化所有数据
       */
      initial(){
        this.status="0"        //该采购的状态（进行到的步骤）。1审核中，2审核未通过，3审核通过，4运输中，5已收货，6已完成，0未开始
        this.step1="block";
        this.step2="none"
        this.step3="none"
        this.step4="none"
        this.step5="none"
        this.step6="none"
        this.step7="none"
        this.submitSuccess=false
        this.submitFail=false
        this.step1ClickIndex=0
        this.isShowSupplier=false
        this.qualifiedMaterials=[]
        this.disQualifiedMaterials=[]
        this.id="";      //采购id
        this.materials=[ ];
        this.checkInfo=[{
            level:1,
            operator:"-",
            date:"-",
            result:"-",
            comment:"-"
          },
          {
            level:2,
            operator:"-",
            date:"-",
            result:"-",
            comment:"-"
          },
          {
            level:3,
            operator:"-",
            date:"-",
            result:"-",
            comment:"-"
          }];
        this.operator=this.$store.getters.userInfo.name;
        this.date=this.getDateTime();
        this.getAllMaterials();
      },
      /**
       * 20. 获取所有原料
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
      if(this.$route.query.refresh){
        console.log("重置采购数据")
        this.initial()
      }
      else{  //接收从purchaseOrder页面跳转过来的采购数据
        console.log("从purchaseOrder页面跳转过来了");
        var step=this.$route.query.step
        console.log(step)
        this.step1="none";
        if(step=="3"){
          this.step3="block";
        }
        else if(step=="5"){
          this.getMap();
          this.step5="block"
        }
        else if(step=="6"){
          this.step6="block";
        }
        this.status=this.$route.query.status;
        this.id=this.$route.query.id;
        this.materials=this.$route.query.materials;
        this.checkInfo=this.$route.query.checkInfo;
        this.operator=this.$route.query.operator;
        this.date=this.$route.query.date;
        this.getAllMaterials();
      }
    }
  }

</script>

<style>
  .breadcrumb-item + .breadcrumb-item::before {
    content: ">";
  }
  .isActive{
    color:#007bff!important;
  }
  .noActive{
    color: #6c757d!important;
  }
  #map {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
  }

  .mytitle {
      z-index: 1000;
      color: #fff;
      font-size: 16px;
      text-align: center;
      position: absolute;
      top: 10px;
      left: 40%;
      width: 20%;
  }
  #myap{
      height: 650px;
    }
</style>
