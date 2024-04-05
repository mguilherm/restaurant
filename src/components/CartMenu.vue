<template>
  <div class="cart">
    <router-link to="/" class="cart--go-back" v-if="isMobile()">
      ⬅ Voltar
    </router-link>
    <div class="cart--content">
      <h2 class="cart--title">Seu pedido</h2>
      <p v-if="hasItems">Seu carrinho ainda está vazio!</p>
      <transition-group name="list">
        <CartItem
          v-for="item in cartList"
          :key="item.id"
          :item="item"
          @saveObservations="saveObservations"
        />
      </transition-group>
    </div>
    <div class="cart--total" v-if="!hasItems">
      <span>Total: </span>
      <span class="price">{{ getCartTotal | currency }}</span>
    </div>
    <button v-if="!hasItems" class="primary-button payment-button">Finalizar Pagamento</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartItem from "@/components/CartItem";
import Mixin from "@/mixins/mixins";

export default {
  name: "CartMenu",
  mixins: [Mixin],
  components: {
    CartItem,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(["getCartTotal"]),
    cartList() {
      return this.$store.state.cartList;
    },
    hasItems() {
      return !this.cartList.length;
    },
  },
  methods: {
    saveObservations(item) {
      this.$store.dispatch("addObservations", item);
      this.cartList;
    },
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
.cart {
  background: white;
  width: 580px;
  min-width: 580px;
  height: 90vh;
  padding: 50px;
  display: flex;
  flex-direction: column;

  &--title {
    font-weight: 600;
    font-size: 24px;
    margin-top: 20px;
    height: 30px;
  }

  &--content{
    flex-grow: 1;
    height: 75vh;
    overflow: scroll;
  }

  &--go-back {
    font-size: 18px;
    text-decoration: none;
    color: black;
  }

  &--total {
    font-weight: 600;
    font-size: 18px;
    text-align: right;
    margin-top: 30px;

    .price {
      color: @yellow;
      padding-left: 10px;
    }

  }

  .payment-button{
    width: 400px;
    margin: 20px auto;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
}

@media @tablets {
  .cart {
    width: 100%;
    min-width: unset;
    padding: 50px 20px 20px;

    &--content{
    height: 70vh;
  }

  .payment-button{
    width: 100%;
  }
  }

}
</style>
