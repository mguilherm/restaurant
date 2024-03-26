<template>
  <div class="home">
    <router-link to="/cart" class="cart-icon" v-if="isMobile()">
      <CartIcon/>
    </router-link>
    <CategoryMenu />
    <ItemsList />
    <CartMenu v-if="isDesktop()" />
  </div>
</template>

<script>

import CategoryMenu from '@/components/CategoryMenu.vue';
import ItemsList from '@/components/ItemsList.vue';
import CartMenu from '@/components/CartMenu';
import Mixin from '../mixins/mixins';

import CartIcon from '../assets/icons/cart.svg';

export default {
  name: 'HomeView',
  components: {
    CategoryMenu,
    ItemsList,
    CartMenu,
    CartIcon,
  },
  mixins: [Mixin],
}
</script>
<style scoped lang='less'>
  .home{
    display: flex;
    .cart-icon{
      display: flex;
      align-items: center;
      justify-content: center;

      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: @pink;

      margin: 20px 20px 20px auto;
    }
    @media @tablets {
      flex-direction: column;
    }
  }
</style>