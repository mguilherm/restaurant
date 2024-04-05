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
    <ModalBox :show="showModal" @on-modal-close="onCancelButtonClick">
      <div class="modal--content">
        <h2>Deseja remover este item do Carrinho?</h2>
        <button class="primary-button" @click="onCancelButtonClick">Cancelar</button>
        <button class="secondary-button" @click="onRemoveButtonClick">Sim, Remover</button>
      </div>
    </ModalBox>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ModalBox from "@/components/ModalBox";

export default {
  name: "QuantityButtons",
  components:{
    ModalBox,
  },
  props: {
    item: {},
    useStore: {
      type: Boolean,
      default: true,
    },
  },
  data(){
    return {
      showModal: false
    }
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onDecreaseButtonClick() {
      if (this.useStore) {
        this.decreaseQuantity(this.item.id);

        if (!this.item.quantity) this.showModal = true;
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
    onCancelButtonClick(){
      this.onIncreaseButtonClick();
      this.showModal = false;
    },
    onRemoveButtonClick(){
      this.showModal = false;
      //executing this after DOM manipulating $nextTick
      this.$nextTick(()=> {
        this.$store.dispatch('removeFromCart', this.item.id);
      })
    }
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

  .modal--content{
    text-align: center;

    button + button{
      margin-left: 10px;
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

  .modal--content{
    h2{
      font-size: 18px;
    }
  }
}
</style>
