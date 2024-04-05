import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PaymentView from '@/views/PaymentView.vue'
import Cart from '@/components/CartMenu.vue';
import AddToCart from '@/components/AddToCart.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentView
  },
  {
    path: '/addToCart/:id',
    name: 'AddToCart',
    component: AddToCart,
    props: true,
  },
]

const router = new VueRouter({
  routes
})

export default router
