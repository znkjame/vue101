<template>
  <div class="mb-20">
      Counter: {{ number }}
      <div>
          <label for="counter" :title="number">Counter: </label>
          <input type='text' v-model="number"/>
          <button @click="increase(1)">+</button>
          <button @click="increase(-1)">-</button>
          <button @click="increase(10)">+10</button>
          <button @click="increase(number)">x2</button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            number: this.initNumber === undefined ? 10 : this.initNumber , //initNumber || 10,
        }
    },
    props: ['initNumber'],
    methods: {
        increase(y){
            this.number = this.number+y;
        },
        decrease(){
            this.number--;
        },
        multiple2(){
            this.number*=2;
        }
    }
}
</script>

<style lang="scss" scoped>
.mb-20{
    margin-bottom: 20px;
}
</style>