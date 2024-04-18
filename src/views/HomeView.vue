<template>
  <div class="home">
    <router-link to="/cart" class="cart-icon">
      <CartIcon />
    </router-link>
    <CategoryMenu />
    <ItemsList />
    <CartMenu class="cart-menu" />
  </div>
</template>

<script>
import CategoryMenu from "@/components/CategoryMenu.vue";
import ItemsList from "@/components/ItemsList.vue";
import CartMenu from "@/components/CartMenu";
import Mixin from "../mixins/mixins";

import CartIcon from "../assets/icons/cart.svg";

export default {
  name: "HomeView",
  components: {
    CategoryMenu,
    ItemsList,
    CartMenu,
    CartIcon,
  },
  mixins: [Mixin],
};
</script>
<style scoped lang="less">
.home {
  display: flex;

  .cart-icon {
    display: none;
  }

  @media @small-desktops {
    flex-direction: column;

    .cart-menu {
      display: none;
    }

    .cart-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      position: fixed;
      bottom: 0;
      right: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;

      width: fit-content;
      height: 42px;
      margin: 20px 20px 20px auto;
      padding: 5px 10px;

      background-color: @pink;
      text-decoration: none;
      border-radius: 8px;
      z-index: 3;

      &::after {
        content: "Seus Pedidos";
        width: fit-content;
        padding: 0 5px;
        color: #fff;
        font-weight: bold;        
      }
    }
  }

  @media @smartphones {
    .cart-icon {
      width: 100%;
      height: 50px;
      margin: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
  }
}
</style>
