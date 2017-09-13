<template>
  <div class="tmpl">
    <div class="photoShare">
      <ul class="ul1">
        <li @click="getPhotoNavData(0)">全 部</li>
        <li @click="getPhotoNavData(item.id)" v-for="item in PhotoShareData" :key="item.id">
          {{item.title}}
        </li>
      </ul>
    </div>
    <!-- 图文展示 -->
    <ul class="mui-table-view mui-grid-view" v-for="item in PhotoShareList" :key="item.id">
      <li class="mui-table-view-cell ">
        <router-link :to="'/photoShare/photoParticulars/'+item.id">
          <img class="mui-media-object" :src="item.img_url">
          <div class="photoText">
            <h5 class="photoTitle">{{item.seo_title}}</h5>
            <p>{{item.seo_description}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
/* 导航栏样式 */

.tmpl {
  overflow: hidden;
}

.photoShare {
  overflow-x: auto;
  padding: 5px 0 10px 5px;
  overflow-x: auto;
  font-size: 16px;
  color: blue;
  white-space: nowrap;
}

.ul1 {
  padding: 0px;
  margin: 0;
}

.ul1>li {
  list-style: none;
  display: inline;
}




/* 图片文字介绍 */

.mui-table-view.mui-grid-view .mui-table-view-cell {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: auto;
}

.mui-table-view.mui-grid-view {
  padding: 10px 5px;
  position: relative;
  border: none;
}

.mui-media-object {
  width: 100%;
}

.photoText {
  position: absolute;
  bottom: 5px;
  width: 100%;
  padding-left: 15px;
  white-space: normal;
}

.photoTitle {
  font-size: 16px;
  font-weight: bolder;
  color: white;
  text-align: left;
}

.photoText p {
  font-size: 12px;
  color: white;
  text-align: left;
}

</style>
<script>
import { Indicator } from 'mint-ui';
import common from '../../../statics/js/common.js';

export default {
  data() {
    return {
      PhotoShareData: [],
      PhotoShareList: []
    }
  },
  created() {
    this.getPhotoShareData();
    this.getPhotoNavData(0);
  },
  methods: {
    getPhotoShareData() {
      const url = common.apihost + 'api/getimgcategory';
      this.$http.get(url).then(response => {
        this.PhotoShareData = response.body.message;
      }, err => {

      })
    },
    getPhotoNavData(navId) {
      var nav_url = common.apihost + 'api/getimages/' + navId;
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.$http.get(nav_url).then(response => {
        Indicator.close();
        this.PhotoShareList = response.body.message;
      }, err => {
        Indicator.close();
      })
    }
  }
}
</script>
