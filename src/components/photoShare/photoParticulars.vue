<template>
    <div class="tmpl">
        <div v-for="item in PhotoParticularsData" :key="item.id">
            <h5>{{item.title}}</h5>
            <div class="time">
                <span>{{item.add_time | dmtDate('YYYY-MM-DD HH:mm:ss')}}</span>
                <span>{{item.click}}次浏览</span>
            </div>
        </div>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in PhotoThumbnailData" :key="index">
                    <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, PhotoThumbnailData)">
                </li>
            </ul>
        </div>
        <div>
            <p class="content" v-for="item in PhotoParticularsData" :key="item.id" v-html="item.content"></p>
        </div>
        <!-- 评论 -->
        <commentComponent :commentId="this.$route.params.photoId"></commentComponent>
    </div>
</template>
<style scoped>
h5 {
    margin: 0;
    padding: 10px;
    color: green;
    font-size: 18px;
}

.time span {
    font-size: 12px;
    margin-right: 10px;
    margin-left: 10px;
}




/* 缩略图 */

.mui-table-view {
    display: flex;
    flex-wrap: wrap;
}

.mui-table-view .mui-table-view-cell {
    text-align: center;
    padding: 10px 5px;
}

img {
    width: 100%;
    height: 80px;
}

.content{
    text-indent:2em;
    margin-top: 6px;
}
</style>
<script>
import { Indicator } from 'mint-ui';
import common from '../../../statics/js/common.js';
import commentComponent from'../childComponents/commentComponent.vue';

export default {
    data() {
        return {
            PhotoParticularsData: [],
            PhotoThumbnailData: []
        }

    },
    created() {
        this.getPhotoParticularsData();
        this.getPhotoThumbnailData();
    },
    methods: {
        getPhotoParticularsData() {
            const url = common.apihost + 'api/getimageInfo/' + this.$route.params.photoId;
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$http.get(url).then(response => {
                Indicator.close();
                this.PhotoParticularsData = response.body.message;
            }, err => {
                Indicator.close();
            })
        },
        getPhotoThumbnailData() {
            const url_Particulars = common.apihost + 'api/getthumimages/' + this.$route.params.photoId;
            this.$http.get(url_Particulars).then(response => {
                response.body.message.forEach(item => {
                    item.w = 600
                    item.h = 400
                })
                this.PhotoThumbnailData = response.body.message;
                console.log(response)
            }, err => {

            })
        }
    },
    components:{
        commentComponent:commentComponent
    }
}
</script>
