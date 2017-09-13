<template>
  <div class="tmpl">
    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in CommodityBuyData" :key='item.id'>
        <div class="borders">
          <router-link :to="'/commodityBuy/'+item.id">
            <div>
              <img class="mui-media-object" :src="item.img_url">
            </div>
            <div class="contentStyel">
              <h5 class=" titleStyle">{{item.title}}</h5>
              <p class="price">
                <span class="newPrice">{{item.sell_price}}元</span>&nbsp&nbsp
                <span class="oldPrice">{{item.market_price}}元</span>
              </p>
              <p class="hotSale">
                <span>热卖中</span>
                <span>剩余{{item.stock_quantity}}件</span>
              </p>
            </div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.borders {
  border: 1px solid rgba(92, 92, 92, .3);
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(92, 92, 92, .3);
  margin: 0;
  padding: 10px;
}

.contentStyel {
  height: 100px;
}

.titleStyle{
  height: 35px;
  font-size: 12px;
  color: black;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.price {
  text-align: left;
  padding-top: 10px;
  background-color: #f0f0f0;
}

.newPrice {
  color: red;
  font-size: 16px;
}

.oldPrice {
  text-decoration: line-through;
  font-size: 14px;
}

.hotSale {
  text-align: left;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding-top: 10px;
  color: black;
  background-color: #f0f0f0;
}
</style>
<script>
import common from '../../../statics/js/common.js';

export default {
  data() {
    return {
      CommodityBuyData: []
    }
  },
  created() {
    this.getCommodityBuyData();
  },
  methods: {
    getCommodityBuyData() {
      const url = common.apihost + 'api/getgoods';
      this.$http.get(url).then(response => {
        this.CommodityBuyData = response.body.message;
      })
    }
  }
}
</script>
