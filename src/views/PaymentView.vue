<template>
  <div class="payment">
    <div class="payment--content">
      <router-link to="/" class="payment--go-back"> ⬅ Voltar </router-link>
      <OrderDetails/>
    </div>
    <CartMenu v-if="isDesktop()" />
  </div>
</template>

<script>
import CartMenu from "@/components/CartMenu.vue";
import OrderDetails from "@/components/OrderDetails.vue"
import Mixin from "@/mixins/mixins";
export default {
  components: {
    CartMenu,
    OrderDetails,
  },
  mixins: [Mixin],
};
</script>

<style lang="less" scoped>
.payment {
  display: flex;

  &--content {
    flex-grow: 1;
    padding: 20px;

    .payment--go-back {
      padding: 50px 20px;
      font-size: 18px;
      font-weight: 600;
      text-decoration: none;
      color: black;
    }
  }

  @media @tablets{
    .payment--go-back{
      padding: 0;
    }
  }
}



</style>
