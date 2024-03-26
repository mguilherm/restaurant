<template>
  <div class="item">
    <div class="item--quantity">
      <button
        class="buttons"
        @click="decreaseQuantity(item.id)"
        :disabled="item.quantity === 0"
      > - </button>
      <span class="number"> {{ item.quantity }} </span>
      <button class="buttons" @click="increaseQuantity(item.id)"> + </button>
    </div>
    <div class="item--img-container">
      <img class="item--img" :src="imgPath" />
    </div>
    <div class="content">
      <h3 class="item--name">{{ item.name }}</h3>
      <a class="item--observation" href="">Adicionar Observação</a>
    </div>
    <p class="item--price">{{ item.price | currency }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CartItem",
  props: {
    item: {},
  },
  computed: {
    imgPath() {
      return require(`../assets/images/${this.item.id}.png`);
    },
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
  },
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid @light-grey;

  &--quantity {
    display: flex;
    align-items: center;
    padding-right: 40px;

    .number {
      font-weight: 500;
      font-size: 18px;
      color: @yellow;
      width: 28px;
      text-align: center;
    }

    .buttons {
      cursor: pointer;
      font-weight: 600;
      font-size: 18px;
      border: none;
      background: none;

      &:focus{
        outline: 0;
      }
    }
  }

  &--img-container {
    border-radius: 8px;
    background: @light-yellow;
    width: 81px;
    height: 66px;
    display: flex;
    align-items: center;
  }

  &--img {
    width: 65px;
    display: block;
    margin: auto;
  }

  &--name {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  &--observation {
    color: @dark-grey;
    font-weight: 500;
    font-size: 12px;
    text-decoration: underline;
  }

  &--price {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: @yellow;
  }

  .content {
    flex-grow: 1;
    padding: 0 20px;
  }
}

@media @tablets{
  .item{
    flex-wrap: wrap;

    &--img-container{
      order: 1;
    }

    .content{
      order: 2;
    }

    &--quantity{
      order: 3;
      padding: 0;
      width: 81px;
      justify-content: center;
    }

    &--price{
      order: 4;
      padding: 0 20px;
      margin: 5px 0;
    }
  }
}
</style>
