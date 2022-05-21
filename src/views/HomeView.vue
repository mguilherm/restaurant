<template>
  <div class="home">
    <CategoryMenu />
    <ItemsList />
    <CartMenu />
  </div>
</template>

<script>

import CategoryMenu from '@/components/CategoryMenu.vue';
import ItemsList from '@/components/ItemsList.vue';
import CartMenu from '@/components/CartMenu';


export default {
  name: 'HomeView',
  components: {
    CategoryMenu,
    ItemsList,
    CartMenu
  }
  
}
</script>
<style scoped lang='less'>
  .home{
    display: flex;

    @media @tablets {
      flex-direction: column;
    }
  }
</style>