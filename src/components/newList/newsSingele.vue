<template>
  <div class="tmpl">
    <div v-for="item in NewsSingeleData" :key="item.id">
      <!-- 头部 -->
      <div class="titleStyle">
        <h5>{{item.title}}</h5>
        <div>
          <span>{{item.add_time | dmtDate('YYYY-MM-DD HH:mm:ss')}}</span>
          <span>{{item.click}}次浏览</span>
          <span>分类:民生经济</span>
        </div>
      </div>
      <!-- 内容 -->
      <div class="contentStyle">
        <p id="style" v-html="item.content"></p>
      </div>
    </div>
    <!-- 评论区 -->
    <commentComponent :commentId="this.$route.params.newsId"></commentComponent>
  </div>
</template>
<style scoped>
/* 头部样式 */

.titleStyle {
  padding-top: 5px;
  font-size: 12px;
  text-align: center;
  border-bottom: 1px solid #8f8f94;
}

.titleStyle div {
  text-align: left;
  margin-top: 10px;
}

.titleStyle h5 {
  color: blue;
  font-weight: bolder;
}

.titleStyle span {
  margin-left: 10px;
}

.contentStyle p{
  padding: 10px 10px 0 10px;
}

/* 内容样式 */
</style>

<script>

import common from '../../../statics/js/common.js';
import commentComponent from '../childComponents/commentComponent.vue';

export default {
  data: function() {
    return {
      NewsSingeleData: [],
    }
  },
  created: function() {
    this.getNewsSingeleData();
  },
  methods: {
    getNewsSingeleData: function() {
      const url = common.apihost + 'api/getnew/' + this.$route.params.newsId;
      this.$http.get(url).then(response => {
        this.NewsSingeleData = response.body.message;
      }, err => {
        console.log(err);
      })
    }
  },
  components: {
    commentComponent: commentComponent
  }
}
</script>
