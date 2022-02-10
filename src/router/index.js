import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/login"
      // name: 'Index',
      // component: () => import("@/pages/console.vue"),
      // name: 'HelloWorld',
      // component: HelloWorld
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/pages/Login.vue"),
    },
    {
        path: '/index/console',
        name: 'Console',
        component: () => import("@/pages/Console.vue"),
    },
    // {
    //     path: '/console',
    //     name: 'Console',
    //     component: () => import("@/pages/Console.vue"),
    // },
    {
        path: '/console/alert',
        name: 'Alert',
        component: () => import("@/pages/Alert.vue"),
    },
    {
        path: '/console/sales/salesTotal',
        name: 'SalesTotal',
        component: () => import("@/pages/SalesTotal.vue"),
    },
    {
        path: '/console/sales/salesRecent',
        name: 'SalesRecent',
        component: () => import("@/pages/SalesRecent.vue"),
    },
    {
        path: '/console/repository/productRepository',
        name: 'ProductRepository',
        component: () => import("@/pages/ProductRepository.vue"),
    },
    {
        path: '/console/repository/materialRepository',
        name: 'MaterialRepository',
        component: () => import("@/pages/MaterialRepository.vue"),
    },
    {
        path: '/console/repository/productType',
        name: 'ProductType',
        component: () => import("@/pages/ProductType.vue"),
    },
    {
        path: '/console/repository/materialType',
        name: 'MaterialType',
        component: () => import("@/pages/MaterialType.vue"),
    },
    {
        path: '/console/purchase/purchaseOperation',
        name: 'PurchaseOperation',
        component: () => import("@/pages/PurchaseOperation.vue"),
    },
    {
        path: '/console/purchase/purchaseOrder',
        name: 'PurchaseOrder',
        component: () => import("@/pages/PurchaseOrder.vue"),
    },
    {
        path: '/console/purchase/finishedPurchaseOrder',
        name: 'FinishedPurchaseOrder',
        component: () => import("@/pages/FinishedPurchaseOrder.vue"),
    },
    {
        path: '/console/salesManage',
        name: 'SalesManage',
        component: () => import("@/pages/SalesManage.vue"),
    },
    {
        path: '/console/returnManage',
        name: 'ReturnManage',
        component: () => import("@/pages/ReturnManage.vue"),
    },
    {
        path: '/console/exportData',
        name: 'ExportData',
        component: () => import("@/pages/ExportData.vue"),
    },
    
   
  ]
})
