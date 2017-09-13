<template>
  <div class="tmpl">
    <ul class="mui-table-view">
      <li v-for='item in newListData' :key='item.id' class="mui-table-view-cell mui-media">
        <router-link :to="'/newList/newsSingele/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <p class="mui-ellipsis">{{item.title}}</p>
            <p class="mui-ellipsis">
              <span>{{item.add_time | dmtDate('YYYY-MM-DD HH:mm:ss')}}</span>
              <span class='span2'>点击数{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>

.mui-media-object.mui-pull-left {
  width: 42px;
}

.mui-table-view p {
  font-size: 13px;
  color: black;
  text-overflow:ellipsis;overflow:hidden;
}

.mui-table-view .mui-table-view-cell a {
  margin: -18px -15px;
}

.mui-ellipsis {
  display: flex;
  justify-content: space-between;
}

.mui-ellipsis span {
  font-size: 10px;
  margin-top: 6px;

}
</style>
<script>

//导入公共的js
import common from '../../../statics/js/common.js';

export default {
  data: function() {
    return {
      newListData: []
    }
  },
  created: function() {
    this.getNewListData();
  },
  methods: {
    getNewListData: function() {
      const url = common.apihost + 'api/getnewslist';
      this.$http.get(url).then(function(response) {
        this.newListData = response.body.message;
      }, function(err) {

      })
    }
  }
}
</script>
