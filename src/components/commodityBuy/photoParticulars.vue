<template>
  <div class="tmpl">
    <div class="pageStyle" v-for="(item,index) in PhotoParticularsData" :key="index">
      <h5>
      {{item.title}}
    </h5>
    <div class="contentStyle" v-html="item.content"></div>
    </div>
  </div>
</template>
<style scoped>

h5{
  border-bottom: 1px solid rgba(92, 92, 92, .3);
  padding: 10px 0;
  font-size: 18px;
  color: blue;
  font-weight: bolder;
  margin:0 6px;
}
.contentStyle{
  padding: 10px 6px;
}
</style>
<script>
import common from'../../../statics/js/common.js';
export default {
  data(){
    return {
      PhotoParticularsData:[]
    }
  },
  created(){
    this.getPhotoParticularsData();
  },
  methods:{
    getPhotoParticularsData(){
      const url = common.apihost+'api/goods/getdesc/'+this.$route.params.id;
      this.$http.get(url).then(response=>{
        console.log(response)
        this.PhotoParticularsData = response.body.message;
      })
    }
  }
}
</script>
