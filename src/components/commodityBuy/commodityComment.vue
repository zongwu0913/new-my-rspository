<template>
  <div class="tmpl">
    <commentComponent :commentId = 'id'></commentComponent>
  </div>
</template>
<script>
import commentComponent from'../../components/childComponents/commentComponent.vue';
export default {
  data(){
    return {
      id:this.$route.params.id
    }
  },
  components:{
    commentComponent:commentComponent
  }
}
</script>
