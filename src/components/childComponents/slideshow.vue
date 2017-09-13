<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for='(item,index) in slideShow' :key='index'>
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<style scoped>
.mint-swipe {
    width: 100%;
    height: 250px;
}

img {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
<script>
import common from'../../../statics/js/common.js';
export default {
    data(){
        return {
            slideShow:[]
        }
    },
    created() {
        this.getSlideShow(this.slideShowGet);
    },
    methods: {
        getSlideShow: function(get) {
            const url = common.apihost+get;
            this.$http.get(url).then(function(reponse) {
                this.slideShow = reponse.body.message;
            }, function(err) {
            })
        }
    },
    props:['slideShowGet']
}
</script>
