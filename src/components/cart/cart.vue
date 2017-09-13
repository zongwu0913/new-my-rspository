<template>
    <div class="tmpl">
        <div>
            <div class="cartStyle" v-for="item in shopCartData" :key="item.id">
                <div>
                    <mt-switch @change="changeData" v-model="item.seleted"></mt-switch>
                </div>
                <div class="photo">
                    <img width="60px" height="60px" :src="item.thumb_path" alt="">
                </div>
                <div class="jianjie">
                    <h5>{{item.title}}</h5>
                    <p class="p0">
                        <span class="money">{{item.sell_price}}</span>
                        <span>商品数量:{{item.count}}</span>
                    </p>
                </div>
                <mt-button :disabled='!item.seleted' @click="delGoods(item.id)" class="btn" type="danger" size="small">删除</mt-button>
            </div>
            <div class="jiesuan">
                <div class="text">
                    <p class="p1">总计(不包含运费)</p>
                    <p class="p2">已经勾选商品
                        <span>{{totalNunber}}</span>件,总价
                        <span class="sp2">{{totalPrice}}</span>元</p>
                </div>
                <mt-button class="btn" type="danger" size="normal">结算</mt-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.cartStyle {
    display: flex;
    height: 100px;
    align-items: center;
    border-bottom: 1px solid rgba(92, 92, 92, .3);
}

.cartStyle div {
    margin-left: 5px;
}

.photo {
    border: 1px solid rgba(92, 92, 92, .3);
    padding: 5px;
    border-radius: 5px;
}

.img {
    width: 100%;
    height: 100%;
}

.jianjie {
    flex: 1;
}

.btn {
    margin: 0 5px;
}

h5 {
    color: blue;
}

.money {
    color: red;
    font-size: 16px;
}

.p0 {
    display: flex;
    justify-content: space-between;
}







/* 结算Style */

.jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    background-color: rgba(92, 92, 92, .3);
}

.text {
    margin-left: 5px;
}

.p1 {
    font-weight: bolder;
    color: black;
    font-size: 16px;
    margin-bottom: 5px;
}

.sp2 {
    color: red;
    font-size: 16px;
}
</style>
<script>
import { Switch } from 'mint-ui';
import { Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import common from '../../../statics/js/common.js';
export default {
    data() {
        return {
            shopCartData: [],
            totalNunber: 0,
            totalPrice: 0
        }
    },
    created() {
        this.getShopCartData();
        this.statistics();
    },
    methods: {
        getShopCartData() {
            const tempObj = this.$store.state.goodsList;
            if (tempObj.length <= 0) {
                return;
            }
            const newObj = {};
            tempObj.forEach(function(element) {
                if (newObj[element.goodsId]) {
                    newObj[element.goodsId] += element.count;
                } else {
                    newObj[element.goodsId] = element.count;
                }
            });
            const ids = [];
            for (const key in newObj) {
                ids.push(key);
            }
            let idsString = '';
            idsString = ids.join(',');
            const url = common.apihost + 'api/goods/getshopcarlist/' + idsString;
            this.$http.get(url).then(response => {
                response.body.message.forEach(item => {
                    item.count = newObj[item.id];
                    item.seleted = true;
                })
                this.shopCartData = response.body.message;
                this.statistics();
            })
        },
        statistics() {
            this.totalNunber = 0;
            this.totalPrice = 0;
            this.shopCartData.forEach(item => {
                if (item.seleted) {
                    this.totalNunber += item.count;
                    this.totalPrice += item.sell_price * item.count;
                }
            })
        },
        changeData() {
            this.statistics();
        },
        delGoods(id) {
            MessageBox.confirm('确定执行此操作?').then(action => {
                this.shopCartData = this.shopCartData.filter(item => {
                    if (item.id != id) {
                        return item;
                    }
                })
                this.$store.state.goodsList = this.$store.state.goodsList.filter(item => {
                    if (item.goodsId != id) {
                        return item;
                    }
                })
                this.statistics();
            },cancel => {
                
            });
        }
    }
}
</script>


