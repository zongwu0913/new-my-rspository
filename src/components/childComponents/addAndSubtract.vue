<template>
  <div class="addAndSubtract">
    <button @click="sbutract">-</button>
    <input style="text" v-model="n">
    <button @click="add">+</button>
  </div>
</template>
<style scoped>
.addAndSubtract {
  padding: 0 0 10px 0;
}

.addAndSubtract input,button {
  margin-right: 3px;
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid rgba(92, 92, 92, .3);
}
</style>
<script>
export default {
  data() {
    return {
      n: 0
    }
  },
  created:function() {
    this.sbutract();
    this.add();
  },
  methods: {
    sbutract: function() {
       if(this.n > 1){
         this.n--;
       }
       this.$emit('customIncident',this.n);
    },
    add: function() {
       this.n++;
       this.$emit('customIncident',this.n);
    }
  }
}
</script>
