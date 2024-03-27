<template>
  <div class="item--quantity">
    <button
      class="buttons"
      @click="onDecreaseButtonClick"
      :disabled="item.quantity === 0"
    >
      -
    </button>
    <span class="number"> {{ item.quantity }} </span>
    <button class="buttons" @click="onIncreaseButtonClick">+</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "QuantityButtons",
  props: {
    item: {},
    useStore: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onDecreaseButtonClick() {
      if (this.useStore) {
        this.decreaseQuantity(this.item.id);
        return;
      }
      this.$emit("decrease");
    },
    onIncreaseButtonClick() {
      if (this.useStore) {
        this.increaseQuantity(this.item.id);
        return;
      }
      this.$emit("increase");
    },
  },
};
</script>

<style lang="less" scoped>
.item--quantity {
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

    &:focus {
      outline: 0;
    }
  }
}

@media @tablets {
  .item--quantity {
    order: 3;
    padding: 0;
    width: 81px;
    justify-content: center;
  }
}
</style>
