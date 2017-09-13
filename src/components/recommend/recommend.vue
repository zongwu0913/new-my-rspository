<template>
    <div class="tmpl">
        <!-- 轮播图 -->
        <slideshow :slideShowGet='url_lunbo'></slideshow>
        <!-- 九宫格列表 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/newList">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻咨询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photoShare">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/commodityBuy">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/feedDack">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/VideoGallery">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/contactUs">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
/* 轮播图样式 */





/* 九宫格样式 */

.mui-content {
    background-color: white;
}

.mui-table-view {
    background-color: white;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell,
.mui-grid-view.mui-grid-9 {
    border: none;
}

.mui-grid-view.mui-grid-9 .mui-media {
    color: #dd524d;
}
</style>

<script>
import slideshow from'../childComponents/slideshow.vue';
export default {
    data(){
        return {
            url_lunbo : 'api/getlunbo' 
        }
    },
    components:{
        slideshow:slideshow
    }
}
</script>