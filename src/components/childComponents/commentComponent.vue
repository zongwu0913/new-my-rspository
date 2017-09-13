<template>
  <div class="comment">
    <div class='buttonComment'>
      <p>提交评论</p>
      <div>
        <textarea ref="textval" cols="10" rows="5" placeholder="请输入要提交的内容"></textarea>
      </div>
      <mt-button @click.native="getBtnCommentComponentData" type="primary" size="large">提交评论</mt-button>
    </div>
    <div class="commentConent">
      <div>
        <div class="commentStyle">评论列表</div>
        <div class="commentConent-A" v-for="(item,index) in commentComponentData" :key="index">
          <p>{{item.content}}</p>
          <div class="commentConent-B">
            <span>{{item.user_name}}</span>
            <span>{{item.add_time | dmtDate("YYYY-MM-DD HH:mm:ss")}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btnLoadMore">
      <mt-button @click="loadMore" type="danger" size="large">点击加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import common from '../../../statics/js/common.js';
import { Button } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      commentComponentData: [],
      pageindex: 1
    }
  },
  created: function() {
    this.getcommentComponentData(this.commentId);
  },
  methods: {
    getcommentComponentData(id) {
      const url = common.apihost + 'api/getcomments/' + id + '?pageindex=' + this.pageindex;
      this.$http.get(url).then(response => {
        if(this.pageindex == 1){
          this.commentComponentData = response.body.message;
        }else{
          this.commentComponentData = this.commentComponentData.concat(response.body.message);
        }
      })
    },
    getBtnCommentComponentData() {
      let postContent = this.$refs.textval.value;
      const btn_Url = common.apihost + 'api/postcomment/' + this.commentId;

      if (postContent !== '') {
        this.$http.post(btn_Url, { content: postContent }, { emulateJSON: true }).then(response => {
          if (response.status == 200) {
            Toast({
              message: '评论提交成功',
              position: 'middle',
              duration: 500
            });
            this.$refs.textval.value = '';
          }
          this.getcommentComponentData();
        }, err => {

        })
      } else {
        Toast({
          message: '请输入正确的评论',
          position: 'middle',
          duration: 500
        });
      }
    },
    loadMore() {
      this.pageindex++;
      this.getcommentComponentData();
    }
  },
  props: ['commentId']
}
</script>

<style scoped>
.comment {
  padding: 10px;
}

.btnConment,
.buttonComment>p {
  border-bottom: 1px solid rgba(92, 92, 92, 0.2);
  color: black;
  font-size: 18px;
  padding-bottom: 5px;
  font-weight: bolder;
}

.commentStyle {
  padding: 20px 0 5px;
  font-size: 18px;
  font-weight: bolder;
}

.commentConent-A {
  border-top: 1px solid rgba(92, 92, 92, 0.2);
  border-bottom: 1px solid rgba(92, 92, 92, 0.2);
  font-size: 13px;
  height: 70px;
  
}

.commentConent-A p {
  color: black;
  padding: 5px 0;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
}

.commentConent-B {
  display: flex;
  justify-content: space-between;
  color: blue;
}

.btnLoadMore {
  padding-top: 15px;
}
</style>
