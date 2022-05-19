<template>
  <div class="item">
    <div class="item--tag" v-if="item.offer">OFERTA</div>
    <img class="item--img" src="../assets/images/burger.png" alt="">
    <h2 class="item--name">{{item.name}}</h2>
    <p class="item--description">{{item.description}}</p>
    <p class="item--price">{{item.price | currency}}</p>
  </div>
</template>

<script>
  export default {
    name: 'EachItem',
    filters: {
      currency(value){
        return `R$ ${value.toLocaleString('pt-br', {minimumFractionDigits: 2})}`
      }
    },
    props: {
      item: {}
    }
  }
</script>

<style lang="less" scoped>
  .item{
    width: 215.95px;
    height: 290px;
    border-radius: 8px;
    background: white;
    position: relative;
    margin: 20px;
    padding: 0 20px;

    &--img{
     display: block;
     margin: 0 auto;
    }

    &--name{
      font-weight: 600;
      font-size: 18px;
      margin: 0 0 8px;
    }

    &--description{
      color: @dark-grey;
      font-weight: 300;
      font-size: 12px;
      margin: 0;
    }

    &--price{
      color: @yellow;
      margin: 0;

    }

    &--tag{
      position: absolute;
      background: @pink;
      border-radius: 8px;
      color: white;
      top: 15px;
      right: 15px;
      font-weight: 500;
      font-size: 12px;
      padding: 3px 8px;
    }

    
  }
</style>