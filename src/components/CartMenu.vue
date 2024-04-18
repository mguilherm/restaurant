<template>
  <div class="cart">
    <router-link to="/" class="cart--go-back"> ⬅ Voltar </router-link>
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
    <button
      v-if="!hasItems && !isPaymentScreen"
      @click="goToPaymentView"
      class="primary-button payment-button"
    >
      Finalizar Pagamento
    </button>
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
    isPaymentScreen(){
      return this.$route.name === 'Payment';
    }
  },
  methods: {
    saveObservations(item) {
      this.$store.dispatch("addObservations", item);
      this.cartList;
    },
    goToPaymentView() {
      this.$router.push({ name: "Payment" });
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
  width: 520px;
  min-width: 520px;
  height: 100vh;
  padding: 30px;
  display: flex;
  flex-direction: column;

  &--title {
    font-weight: 600;
    font-size: 24px;
    margin-top: 20px;
    height: 30px;
  }

  &--content {
    flex-grow: 1;
    height: 75vh;
    overflow: scroll;
  }

  &--go-back {
    display: none;
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

  .payment-button {
    width: 400px;
    margin: 20px auto 0;
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
@media @small-desktops {
  .cart {
    width: 100%;
    max-width: 800px;
    margin: auto;
    min-width: unset;
    padding: 50px 20px 20px;

    &--content {
      height: 70vh;
    }

    &--go-back {
      display: block;
      font-size: 18px;
      text-decoration: none;
      color: black;
    }

    .payment-button {
      width: 100%;
    }
  }
}

</style>
