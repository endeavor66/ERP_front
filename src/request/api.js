import {get} from './http'
import {post} from './http'

//1. 基础模块
export const login = (obj,msg) => post("/login", msg,obj);

export const getShopInfo = (msg) => get("/homepage/Info",msg);

//2. 销量模块
/**
 * (1) 获取总销量基本信息
 */
export const getallBasicSalesInfo = (msg) => get("/sales/all",msg);

/**
 * (2)获取销售金额走势
 */
export const getSalesTrend = (obj,msg) => get("/sales/all/getSalesTrend",msg,obj);

/**
 * (3)根据指定年份获取Top10商品的销售金额占比
 */
export const getYearSalesRate = (obj,msg) => get("/sales/all/getYearSalesRate",msg,obj);

/**
 * (4)根据指定月份获取Top5商品的销售占比
 */
export const getMonthSalesRate = (obj,msg) => get("/sales/all/getMonthSalesRate",msg,obj);

/**
 * (5)获取指定商品近年的销售额走势
 */
export const getCommoditySalesTrend = (obj,msg) => get("/sales/all/getCommoditySalesTrend",msg,obj);

/**
 * (6)获取销售订单
 */
export const getOrderList = (obj,msg) => get("/sales/all/getOrderList",msg,obj);

/**
 * (7)获取近日销量基本信息
 */
export const getRecentSalesInfo = (obj,msg) => get("/sales/recent",msg,obj);



//3. 库存模块
/**
 * (1) 成品类别信息查看
 */
export const showProductType = (msg) => get("/productType/show",msg);

/**
 * (2) 成品类别的添加
 */
export const addProductType = (obj,msg) => post("/productType/add",msg,obj);

/**
 * (3)成品类别的删除
 */
export const deleteProductType = (obj,msg) => get("/productType/delete",msg,obj);

/**
 * (4)成品类别的更新
 */
export const updateProductType = (obj,msg) => post("/productType/update",msg,obj);

/**
 * (5)原料类别信息查看
 */
export const showMaterialType = (msg) => get("/materialType/show",msg);

/**
 * (6)原料类别的添加
 */
export const addMaterialType = (obj,msg) => get("/materialType/add",msg,obj);

/**
 * (7)原料类别的删除
 */
export const deleteMaterialType = (obj,msg) => get("/materialType/delete",msg,obj);

/**
 * (8)原料类别的更新
 */
export const updateMaterialType = (obj,msg) => get("/materialType/update",msg,obj);

/**
 * (9)成品仓库的查看
 */
export const showProductRepository = (msg) => get("/productRepository/show",msg);

/**
 * (10)成品仓库的添加
 */
export const addProductRepository = (obj,msg) => get("/productRepository/add",msg,obj);

/**
 * (11)成品仓库的删除
 */
export const deleteProductRepository = (obj,msg) => get("/productRepository/delete",msg,obj);

/**
 * (12)成品仓库的更新数量
 */
export const updateProductRepository = (obj,msg) => get("/productRepository/update",msg,obj);

/**
 * (13)原料仓库的查看
 */
export const showMaterialRepository = (msg) => get("/materialRepository/show",msg);

/**
 * (14)原料仓库的添加
 */
export const addMaterialRepository = (obj,msg) => get("/materialRepository/add",msg,obj);

/**
 * (15)原料仓库的删除
 */
export const deleteMaterialRepository = (obj,msg) => get("/materialRepository/delete",msg,obj);

/**
 * (16)原料仓库的更新数量
 */
export const updateMaterialRepository = (obj,msg) => get("/materialRepository/update",msg,obj);

//4. 采购模块
/**
 * (1) 根据id获取原料信息
 */
export const getMaterial = (id,msg) => get("/purchase/getMaterial",msg,id);

/**
 * (2) 获取原料对应的供应商
 */
export const getSupplier = (materials,msg) => post("/purchase/getSupplier",msg,materials);

/**
 * (3) 提交采购清单
 */
export const submitPurchaseOrder = (purchaseDetail,msg) => post("/purchase/submitPurchaseOrder",msg,purchaseDetail);

/**
 * (4) 取消采购
 */
export const cancelPurchase = (id,msg) => get("/purchase/cancelPurchase",msg,id);

/**
 * (5) 管理员提交对某次采购订单的审核
 */
export const submitAudit = (checkInfo,msg) => post("/purchase/submitAudit",msg,checkInfo);

/**
 * (6) 送货进检
 */
export const checkCommodity = (checkList,msg) => post("/purchase/checkCommodity",msg,checkList);

/**
 * (7) 获取正在进行的采购清单
 */
export const getPurchaseOrderList = (msg) => get("/purchase/getPurchaseNowOrderList",msg);

/**
 * (8) 获取已经完成的采购清单
 */
export const getFinishedPurchaseOrderList = (obj,msg) => get("/purchase/getPurchaseDoneOrderList",msg,obj);

/**
 * (9) 根据管理员级别和采购id获取该采购审核状态
 */
export const getPurchaseStatus = (idObj,msg) => get ("/purchase/getPurchaseStatus",msg,idObj);

/**
 * (10) 更新采购操作的状态
 */
export const updatePurchaseStatus = (obj,msg) => get("/purchase/changePurchaseState",msg,obj);

/**
 * (11) 重新提交采购清单以进行审核
 */
export const reSubmitPurchaseOrder = (obj,msg) => post("/purchase/updatePurchaseOrder",msg,obj);

//5. 销量管理模块
/**
 * (1) 获取所有销量信息
 */
export const showSalesInfo = (msg) => get("/showSalesInfo",msg);

/**
 * (2)添加销量信息
 */
export const addSales = (obj,msg) => get("/addSales",msg,obj);

//6. 退货管理模块
/**
 * (1) 获取所有退货信息
 */
export const showReturnInfo = (msg) => get("/showReturnInfo",msg);

/**
 * (2) 添加退货信息
 */
export const addReturn = (obj,msg) => get("/addReturn",msg,obj);


/**
 * (10) 获取未被导出的销量和退货数据的日期
 */
export const getUnExportDate = (msg) => get("/getUnExportDate",msg);

/**
 * (11) 导出数据
 */
export const exportData = (obj,msg) => post("/exportData",msg,obj);

