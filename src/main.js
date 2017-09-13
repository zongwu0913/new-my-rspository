//导包
import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui';
import VueRouter from'vue-router';
import VueResource from'vue-resource';
import VuePreview from 'vue-preview';
import Vuex from'vuex';
//导入第三方包
import Moment from'moment';

//mint-ui样式导入
import 'mint-ui/lib/style.min.css'

//mui样式导入
import '../statics/mui/css/mui.min.css';
import '../statics/mui/fonts/mui.ttf';

//自己通用样式导入
import '../statics/css/common.css'
//依赖
Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuePreview)
Vue.use(Vuex);

//导入组件
import recommend from'./components/recommend/recommend.vue';
import catergry from'./components/catergry/catergry.vue';
import find from'./components/find/find.vue';
import cart from'./components/cart/cart.vue';
import me from'./components/me/me.vue';
import newList from'./components/newList/newList.vue';
import newsSingele from'./components/newList/newsSingele.vue';
import commodityBuy from'./components/commodityBuy/commodityBuy.vue';
import commodityBuyParticulars from'./components/commodityBuy/commodityBuyParticulars.vue';
import commodityBuyPhotoParticulars from'./components/commodityBuy/photoParticulars.vue';
import commodityComment from'./components/commodityBuy/commodityComment.vue';
import contactUs from'./components/contactUs/contactUs.vue';
import feedDack from'./components/feedDack/feedDack.vue';
import photoShare from'./components/photoShare/photoShare.vue';
import photoParticulars from'./components/photoShare/photoParticulars.vue';
import videoGallery from'./components/videoGallery/videoGallery.vue';

//创建路由和定义路由规则
const router = new VueRouter({
  routes: [
    {path:'/',redirect:'/recommend'},
    {path:'/recommend',component:recommend},
    {path:'/catergry',component:catergry},
    {path:'/find',component:find},
    {path:'/cart',component:cart},
    {path:'/me',component:me},
    {path:'/newList',component:newList},
    {path:'/newList/newsSingele/:newsId',component:newsSingele},
    {path:'/commodityBuy',component:commodityBuy},
    {path:'/commodityBuy/:commodityId',component:commodityBuyParticulars},
    {path:'/commodityComment/:id',component:commodityComment},
    {path:'/photoParticulars/:id',component:commodityBuyPhotoParticulars},
    {path:'/contactUs',component:contactUs},
    {path:'/feedDack',component:feedDack},
    {path:'/photoShare',component:photoShare},
    {path:'/photoShare/photoParticulars/:photoId',component:photoParticulars},
    {path:'/videoGallery',component:videoGallery}
  ]
})

//定义全局过滤器
Vue.filter('dmtDate',(input,formatString)=>{
  //formatString参数为传进来的事件格式，如果不传就为默认的'YYYY-MM-DD HH:mm:ss'
  const lastFormatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return Moment(input).format(lastFormatString);
})

const store = new Vuex.Store({
  state:{
    goodsList:[]
  },
  mutations:{
    addToShopCart(state,goods){
      state.goodsList.push(goods);
    }
  },
  getters:{
    getGoodsListTotalCount(state){
      let totalCount = 0;
      state.goodsList.forEach(item=>{
        totalCount += item.count;
      })
      return totalCount;
    }
  },
  actions:{
    asyncAddShopCart(context,goods){
      context.commit('addToShopCart',goods);
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})