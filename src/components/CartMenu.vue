<template>
  <div class="cart">
  <router-link to="/" class="cart--go-back" v-if="isMobile()"> ⬅ Voltar </router-link>
  <h2 class="cart--title">Seu pedido</h2>
  <p v-if="hasItems">Seu carrinho ainda está vazio!</p>
  <transition-group name="list">
    <CartItem v-for= "item in cartList" :key="item.id" :item="item"/> 
  </transition-group>
  <div class="cart--total" v-if="!hasItems">
    <span>Total: </span>
    <span class="price">{{ getCartTotal | currency }}</span>
  </div>
  <ModalBox :show="showModal" @on-modal-close="showModal = false">
    Teste
  </ModalBox>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem';
import ModalBox from '@/components/ModalBox';
import Mixin from '@/mixins/mixins';

  export default {
    name: 'CartMenu',
    mixins: [Mixin],
    components: {
      CartItem,
      ModalBox
    },
    data(){
      return {
        showModal: false,
      }
    },
    computed: {
      ...mapGetters([
        'getCartTotal'
      ]),
      cartList(){
        return this.$store.state.cartList;
      },
      hasItems(){
        return !this.cartList.length;
      }
    },
    filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  }
</script>

<style lang="less" scoped>
  .cart {
    background: white;
    width: 643px;
    min-width: 643px;
    padding: 50px;

    &--title{
      font-weight: 600;
      font-size: 24px;
      margin-top: 50px;
    }

    &--go-back{
      font-size: 18px;
      text-decoration: none;
      color: black
    }

    &--total{
      font-weight: 600;
      font-size: 18px;
      text-align: right;
      margin-top: 30px;

      .price{
        color: @yellow;
        padding-left: 10px;
      }
    }

    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }

    .list-enter, .list-leave-to{
      opacity: 0;
      transform: translateX(-30px);
    }
  }

  @media @tablets{
    .cart{
      width: 100%;
      min-width: unset;
      padding: 50px 20px 20px;
    }
  }
</style>