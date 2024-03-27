<template>
  <div class="add-cart">
    <router-link to="/" class="add-cart--go-back" v-if="isMobile()">
      ⬅ Voltar
    </router-link>
    <EachItem :item="item" class="add-cart--item" />
    <div class="add-cart--container">
      <span>Quantidade</span>
      <QuantityButtons
        :item="item"
        :useStore="false"
        @decrease="decreaseItemQuantity"
        @increase="increaseItemQuantity"
      />
    </div>
    <p class="add-cart--observations">Observações</p>
    <textarea v-model="observations" rows="10"></textarea>
    <button class="primary-button" @click="onAddToCartButtonClick">Adicionar ao Carrinho</button>
  </div>
</template>

<script>
import axios from "axios";

import Mixin from "@/mixins/mixins";
import EachItem from "./EachItem.vue";
import QuantityButtons from "../components/QuantityButtons.vue";

export default {
  props: ["id"],
  mixins: [Mixin],
  components: {
    EachItem,
    QuantityButtons,
  },
  data() {
    return {
      item: {},
      observations: "",
    };
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/${this.selectedCategory}/${this.id}`)
      .then((response) => {
        this.item = { quantity: 1, ...response.data };
      });
  },
  methods: {
    increaseItemQuantity() {
      ++this.item.quantity;
    },
    decreaseItemQuantity() {
      --this.item.quantity;
    },
    onAddToCartButtonClick(){
      this.$store.dispatch('addToCart', this.item);
      this.$router.push({name: 'home'});
    }
  },
};
</script>

<style lang="less" scoped>
.add-cart {
  padding: 50px 20px;

  &--go-back {
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    color: black;
  }

  &--item {
    margin-top: 50px;
  }

  &--container {
    display: flex;
    border: 1px solid @light-grey;
    padding: 10px 20px;
    border-radius: 8px;
    margin: 20px 0;

    span {
      margin-right: auto;
      font-weight: 600;
      font-size: 16px;
    }
  }

  &--observations {
    font-weight: 600;
    font-size: 16px;
  }

  textarea {
    width: 100%;
    border: 1px solid @light-grey;
    border-radius: 8px;
  }

  button{
    width: calc(100% - 40px);
    position: fixed;
    bottom: 30px;
    left: 20px;
    right: 20px;
  }
}
</style>
