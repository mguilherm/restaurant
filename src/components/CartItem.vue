<template>
  <div class='item'>
    <div class="item--img-container">
      <img class="item--img" :src="imgPath" >
    </div>
    <div class="content">
      <h3 class="item--name">{{item.name}}</h3>
      <a class="item--observation" href="">Adicionar Observação</a>
    </div>
    <p class="item--price">{{item.price | currency}}</p>
  </div>
</template>

<script>
  export default {
    name: 'CartItem',
    props: {
      item: {}
    },
    computed: {
     
      imgPath(){
        return require(`../assets/images/${this.item.id}.png`)
      }
    },
    filters: {
      currency(value){
        return `R$ ${value.toLocaleString('pt-br', {minimumFractionDigits: 2})}`
      }
    }
  }
</script>

<style lang="less" scoped>
  .item{
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid @light-grey;

    &--img-container{
      border-radius: 8px;
      background: @light-yellow;
      width: 81px;
      height: 66px;
      display: flex;
      align-items: center;
    }

    &--img{
      width: 65px;
      display: block;
      margin: auto;
    }

    &--name{
     font-size: 18px;
     font-weight: 600;
     margin: 0;
    }

    &--observation{
      color: @dark-grey;
    }

    &--price{
      font-weight: 600;
      font-size: 18px;
      line-weight: 27px;
      color: @yellow;
    }

    .content{
      flex-grow: 1;
      padding: 0 20px;
    }
  }
</style>