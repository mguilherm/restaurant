<template>
  <div class="add-cart">
    <router-link to="/" class="add-cart--go-back">
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
    <textarea v-model="item.observations" rows="5"></textarea>
    <button class="primary-button" @click="onAddToCartButtonClick">
      Adicionar ao Carrinho
    </button>
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
    };
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },
  created(){
    if(this.isDesktop()){
      this.$router.push({name: 'Home'});
    }
  },
  mounted() {
    axios
      .get(`http://localhost:3000/${this.selectedCategory}/${this.id}`)
      .then((response) => {
        this.item = { quantity: 1, observations: '', ...response.data };
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
      this.$router.push({name: 'Home'});
    }
  },
};
</script>

<style lang="less" scoped>
.add-cart {
  max-width: 600px;
  margin: auto;
  padding: 50px 20px;

  &--go-back {
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    color: black;
  }

  &--item {
    margin: 20px auto 0;
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
    display: block;
    width: calc(100% - 40px);
    max-width: 300px;
    margin: 30px auto;
  }

}
@media @small-desktops{
  .add-cart{
    button{
      max-width: unset;
    }
  }
}

@media @smartphones{
  button{
    position: fixed;
    bottom: 20px;
    width: calc(100% - 40px);
  }
}
</style>
