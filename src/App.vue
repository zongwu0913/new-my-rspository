<template>
  <div>
    <!-- 顶部 -->
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a v-show="flayTopBack" @click='goBack' icon="back">&lt;&nbsp;返回</a>
      </div>
      <h1 class="mint-header-title">Vue项目</h1>
      <div class="mint-header-button is-right"></div>
    </header>
    <!-- 路由根元素 -->
    <router-view></router-view>
    <!-- 底部tabbar -->
    <mt-tabbar v-show='flayTabber'>
      <mt-tab-item id="推荐">
        <router-link to="/recommend">
          <img src="./assets/a-recommend.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="分类">
        <router-link to="/catergry">
          <img src="./assets/n-catergry.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="发现">
        <router-link to="/find">
          <img src="./assets/n-find.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="购物车">
        <router-link to="/cart">
          <img src="./assets/n-cart.png">
          <span v-show="num!=0" class="badgeStyle">{{num}}</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <router-link to="/me">
          <img src="./assets/n-me.png">
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import common from '../statics/js/common.js';
import { TabContainer, TabContainerItem } from 'mint-ui'
// import bus from'../statics/js/commonVue.js';
export default {
  name: 'app',
  data: function() {
    return {
      flayTopBack: false,
      flayTabber: true,
      num:0
    }
  },
  created: function() {
    this.isShowBackAndTabber(this.$route.path);
    // const _this = this;
    // bus.$on('cartIconCount',function(n){
    //   _this.num += n;
    // })
  },
  updated(){
    this.num = this.$store.getters.getGoodsListTotalCount;
  },
  watch: {
    $route: function(newval) {
      //监听返回，和tabber显示隐藏
      this.isShowBackAndTabber(newval.path);
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    },
    isShowBackAndTabber: function(newval) {
      this.flayTopBack = newval == '/recommend' ? false : true;
      this.flayTabber = !this.flayTopBack;
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-button {
  color: white;
}

.mint-tab-item {
  padding: 0;
  margin: 0;
}

img {
  display: block;
  width: 52px;
  height: 40px;
  margin-left: 6px;
}

  /** 徽标的样式 **/
  .badgeStyle{
      font-size: 11px;
      line-height: 1.3;  
      position: absolute;
      top: 7px;
      left: 70%;
      text-align: center;
      padding: 1px 5px; 
      color: #fff;
      border-radius: 11px; 
      background: red;
    }
</style>
