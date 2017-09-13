<template>
    <div class="tmpl">
        <div class="slideShowStyle">
            <slideshow :slideShowGet='this.url_lunbo'></slideshow>
        </div>
        <div class="price" v-for="item in GoodsData" :key="item.id">
            <div>
                <p class="titleStyle">{{item.title}}</p>
                <p>
                    <span>市场价:¥</span>
                    <span class="oldPrice">{{item.market_price}}</span>
                    <span>销售价:</span>
                    <span class="newPrice">{{item.sell_price}}</span>
                </p>
            </div>
            <!-- !addAndSubtract! -->
            <div>
                <addAndSubtract @customIncident="receiveChild"></addAndSubtract>
            </div>
            <div>
                <mt-button type="primary" size='small'>立即购买</mt-button>
                <mt-button @click="shoppingCartIconCount" type="danger" size='small'>加入购物车</mt-button>
            </div>
        </div>
        <div class="goodsRepertory" v-for="item in GoodsData" :key="item.id">
            <p class="goodsParameter">商品参数</p>
            <div class="goodsTime">
                <p>商品货号:
                    <span>{{item.goods_no}}</span>
                </p>
                <p>库存情况:
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
                <p>上架时间:
                    <span>{{item.add_time | dmtDate('YYYY-MM-DD HH:mm:ss')}}</span>
                </p>
            </div>
        </div>
        <div class="btn-large" v-for="item in GoodsData" :key="item.id">
            <router-link :to="'/photoParticulars/'+item.id">
                <mt-button size="large" type="primary" plain>图文介绍</mt-button>
            </router-link>
            <router-link :to="'/commodityComment/'+item.id">
                <mt-button size="large" type="danger" plain>商品评论</mt-button>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
/* 轮播 */

.slideShowStyle {
    margin: 10px;
    padding: 6px;
    border: 1px solid rgba(92, 92, 92, .3);
    border-radius: 5px;
}


/* price */

.price {
    border: 1px solid rgba(92, 92, 92, .3);
    margin: 10px;
    border-radius: 5px;
    padding: 6px;
}

.titleStyle {
    border-bottom: 1px solid rgba(92, 92, 92, .3);
    font-size: 16px;
    font-weight: bolder;
    color: blue;
    margin-top: 10px;
    padding-bottom: 3px;
}

.oldPrice {
    text-decoration: line-through;
}

.newPrice {
    color: red;
    font-size: 16px;
}


/* 商品库存 */

.goodsRepertory {
    border: 1px solid rgba(92, 92, 92, .3);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}

.goodsRepertory p {
    margin-bottom: 0;
}

.goodsParameter {
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(92, 92, 92, .3);
    font-size: 16px;
}

.goodsTime {
    margin: 10px 0;
}

.goodsTime p {
    color: black;
}


/* buttom按钮 */

.btn-large {
    padding: 0 6px;
    border: 1px solid rgba(92, 92, 92, .3);
    margin: 0 10px;
    border-radius: 5px;
}

.btn-large button {
    margin: 5px 0;
}
</style>
<script>
import common from '../../../statics/js/common.js';
import slideshow from '../childComponents/slideshow.vue';
import addAndSubtract from '../childComponents/addAndSubtract.vue';
// import bus from '../../../statics/js/commonVue.js';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            url_lunbo: 'api/getthumimages/' + this.$route.params.commodityId,
            GoodsData: [],
            num: 1
        }
    },
    created() {
        this.getGoodsData();
    },
    components: {
        slideshow: slideshow,
        addAndSubtract: addAndSubtract
    },
    methods: {
        getGoodsData: function() {
            const url_goods = common.apihost + 'api/goods/getinfo/' + this.$route.params.commodityId;
            this.$http.get(url_goods).then(Response => {
                this.GoodsData = Response.body.message;
            })
        },
        receiveChild(n) {
            this.num = n;
        },
        shoppingCartIconCount() {
            Toast({
                message: '成功加入购物车',
                position: 'middle',
                duration: 2000
            });
            // bus.$emit('cartIconCount', this.num);
            // this.$store.commit('addToShopCart',{goodsId:this.$route.params.commodityId,count:this.num})
            const _this = this;
            setTimeout(function() {
                _this.$store.dispatch('asyncAddShopCart',{goodsId:_this.$route.params.commodityId,count:_this.num});
            }, 200);
        }
    },
    destroyed() {
        this.num = 1;
    }
}
</script>
