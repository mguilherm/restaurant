<template>
  <div class="item">
    <div class="item--container">
      <div class="item--tag" v-if="item.offer">OFERTA</div>
      <img class="item--img" :src="imagePath" alt="" />
    </div>
    <div class="content">
      <h2 class="item--name">{{ item.name }}</h2>
      <p class="item--description">{{ item.description }}</p>
      <p class="item--price">{{ item.price | currency }}</p>
    </div>
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
  },
  computed: {
     selectedCategory() {
      return this.$store.state.selectedCategory;
    },
    imagePath(){
      return require(`../assets/images/${this.selectedCategory}/${this.item.id}.png`)
    }
  },
  
}
</script>

<style lang="less" scoped>
.item {
  width: 215.95px;
  height: 290px;
  border-radius: 8px;
  background: white;
  position: relative;
  margin: 20px;
  padding: 0 20px;

  &--img {
    display: block;
    margin: auto;
    width: 100%;
  }

  &--name {
    font-weight: 600;
    font-size: 18px;
    margin: 0 0 8px;
  }

  &--description {
    color: @dark-grey;
    font-weight: 300;
    font-size: 12px;
    margin: 0;
  }

  &--price {
    color: @yellow;
    margin: 0;
  }

  &--tag {
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
  @media @tablets {
    width: 100%;
    height: fit-content;
    border: 1px solid @light-grey;
    display: flex;
    margin: 10px 0;
    padding: 5px 10px;

    &--img {
      height: 70px;
      order: 0;
      margin: 0 0 10px 0;
    }

    &--price {
      margin: 0 auto;
      text-align: right;
    }

    &--tag {
      position: static;
      order: 1;
      width: fit-content;
    }

    &--container {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
