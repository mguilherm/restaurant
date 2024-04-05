<template>
  <div class="item">
    <QuantityButtons :item="item" />
    <div class="item--img-container">
      <img class="item--img" :src="imgPath" />
    </div>
    <div class="content">
      <h3 class="item--name">{{ item.name }}</h3>
      <p class="item--observation-text">{{ item.observations }}</p>
      <a class="item--observation" href="#" @click="onShowObservationModal">
        {{ observationsLabel }}
      </a>
    </div>
    <p class="item--price">{{ item.price | currency }}</p>
    <ModalBox class="modal" :show="showModal" @on-modal-close="onCloseObservationModal">
        <h2>Observação:</h2>
        <textarea rows="4" v-model="changeObservation"></textarea>
        <button class="primary-button" @click="saveObservation">Salvar</button>
        <button class="secondary-button" @click="onCloseObservationModal">
          Cancelar
        </button>
    </ModalBox>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import QuantityButtons from "../components/QuantityButtons.vue";
import ModalBox from "./ModalBox.vue";

export default {
  name: "CartItem",
  components: {
    QuantityButtons,
    ModalBox,
  },
  props: {
    item: {},
  },
  data() {
    return {
      showModal: false,
      observations: '',
    };
  },
  computed: {
    imgPath() {
      return require(`../assets/images/${this.item.id}.png`);
    },
    observationsLabel() {
      return this.item.observations
        ? "Editar Observação"
        : "Adicionar Observação";
    },
    changeObservation: {
      get() {
        return this.item.observations;
      },
      set(e) {
        this.observations = e;
        this.observationsLabel;
      },
    },
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onShowObservationModal() {
      this.showModal = true;
    },
    onCloseObservationModal() {
      this.showModal = false;
    },
    saveObservation() {
      var itemWithNewObservations = {
        ...this.item,
        observations: this.observations,
      };
      this.$emit("saveObservations", itemWithNewObservations);
      this.onCloseObservationModal();
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
.item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid @light-grey;

  &--img-container {
    border-radius: 8px;
    background: @light-yellow;
    width: 81px;
    height: 66px;
    display: flex;
    align-items: center;
  }

  &--img {
    width: 65px;
    display: block;
    margin: auto;
  }

  &--name {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  &--observation {
    color: @dark-grey;
    font-weight: 500;
    font-size: 12px;
    text-decoration: underline;

    &-text {
      font-size: 12px;
      color: @dark-grey;
      margin: 0;
    }
  }

  &--price {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: @yellow;
  }

  .content {
    flex-grow: 1;
    padding: 0 20px;
  }

  textarea {
    width: 100%;
    border: 1px solid @light-grey;
    border-radius: 8px;
    padding: 10px 20px;
  }

  button + button {
    margin-left: 10px;
  }
}

@media @tablets {
  .item {
    flex-wrap: wrap;

    &--img-container {
      order: 1;
    }

    .content {
      order: 2;
    }

    &--price {
      order: 4;
      padding: 0 20px;
      margin: 5px 0;
    }
  }

  .modal{
    h2{
      font-size: 16px;
    }
    button {
      margin: 0;
      padding: 8px 16px;
    }
  }
}
</style>
