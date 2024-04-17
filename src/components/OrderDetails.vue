<template>
  <div class="order">
    <form>
      <div class="user-data">
        <p class="section-title">Seus Dados</p>
        <div class="input-field">
          <label for="">{{ formData.name.label }}</label>
          <input
            type="text"
            :placeholder="formData.name.placeholder"
            v-model="formData.name.value"
            @blur="formData.name.isValid"
            :class="{ error: !formData.name.valid }"
          />
          <p v-if="!formData.name.valid" class="error-message">
            {{ formData.name.errorMessage }}
          </p>
        </div>
        <div class="input-field">
          <label for="">{{ formData.phone.label }}</label>
          <input
            type="text"
            v-mask="'(##) # ####-####'"
            :placeholder="formData.phone.placeholder"
            v-model="formData.phone.value"
            @blur="formData.phone.isValid"
            :class="{ error: !formData.phone.valid }"
          />
          <p v-if="!formData.phone.valid" class="error-message">
            {{ formData.phone.errorMessage }}
          </p>
        </div>
      </div>
      <div class="address">
        <p class="section-title">Endereço</p>
        <div class="radio-container">
          <div class="radio-options">
            <input
              type="radio"
              name="delivery-type"
              id="store"
              value="store"
              checked
              v-model="deliveryType"
            />
            <label for="store">Retirar na Loja</label>
          </div>
          <div class="radio-options">
            <input
              type="radio"
              name="delivery-type"
              id="delivery"
              value="delivery"
              v-model="deliveryType"
            />
            <label for="delivery">Delivery</label>
          </div>
        </div>

        <div
          class="address-card"
          v-if="hasAddressInfo && isDeliveryType && savedAddress"
        >
          <p>{{ formData.street.value }}, {{ formData.number.value }}</p>
          <p>{{ formData.city.value }} - {{ formData.cep.value }}</p>
        </div>
        <a @click="onShowAdressModal" v-if="isDeliveryType">{{
          addressButtonLabel
        }}</a>
      </div>

      <div class="payment">
        <p class="section-title">Pagamento</p>
        <p>Método de pagamento:</p>
        <div class="radio-container">
          <div class="radio-options">
            <input
              type="radio"
              name="payment-type"
              id="credit-card"
              value="credit-card"
              v-model="paymentType"
            />
            <label for="delivery">Cartão</label>
          </div>
          <div class="radio-options">
            <input
              type="radio"
              name="payment-type"
              id="cash"
              value="cash"
              v-model="paymentType"
            />
            <label for="delivery">Dinheiro</label>
          </div>
        </div>
      </div>
    </form>
    <button class="primary-button" @click="orderItems">Concluir Pedido</button>
    <Modal :show="showAdressModal" @on-modal-close="hideAddressModal">
      <div class="modal-content">
        <h2>Adicionar Endereço</h2>
        <div class="input-field">
          <label for="">{{ formData.cep.label }}</label>
          <input
            type="text"
            :placeholder="formData.cep.placeholder"
            v-model="formData.cep.value"
            @blur="formData.cep.isValid"
            :class="{ error: !formData.cep.valid }"
          />
          <p v-if="!formData.cep.valid" class="error-message">
            {{ formData.cep.errorMessage }}
          </p>
        </div>
        <div class="input-field">
          <label for="">{{ formData.city.label }}</label>
          <input
            type="text"
            :placeholder="formData.city.placeholder"
            v-model="formData.city.value"
            @blur="formData.city.isValid"
            :class="{ error: !formData.city.valid }"
          />
          <p v-if="!formData.city.valid" class="error-message">
            {{ formData.city.errorMessage }}
          </p>
        </div>
        <div class="address-container">
          <div class="input-field">
            <label for="">{{ formData.street.label }}</label>
            <input
              type="text"
              :placeholder="formData.street.placeholder"
              v-model="formData.street.value"
              @blur="formData.street.isValid"
              :class="{ error: !formData.street.valid }"
            />
            <p v-if="!formData.street.valid" class="error-message">
              {{ formData.street.errorMessage }}
            </p>
          </div>
          <div class="input-field">
            <label for="">{{ formData.number.label }}</label>
            <input
              type="text"
              :placeholder="formData.number.placeholder"
              v-model="formData.number.value"
              @blur="formData.number.isValid"
              :class="{ error: !formData.number.valid }"
            />
            <p v-if="!formData.number.valid" class="error-message">
              {{ formData.number.errorMessage }}
            </p>
          </div>
        </div>
        <button class="primary-button" @click="validateAddressForm">
          Adicionar
        </button>
        <button class="secondary-button" @click="hideAddressModal">
          Cancelar
        </button>
      </div>
    </Modal>
    <Modal
      :show="showInvalidAdressModal"
      @on-modal-close="hideInvalidAddressModal"
    >
      <div class="invalid-address-modal">
        <span v-html="warningIcon" class="icon"></span>
        <span
          >Insira um endereço válido para prosseguir com o seu pedido pelo
          Delivery.</span
        >
        <button class="primary-button" @click="addAddressFromModalButton">
          Adicionar Endereço
        </button>
        <a class="general-link" @click="changeToTakeOutType">Retirar na Loja</a>
      </div>
    </Modal>
    <Modal :show="showSuccessModal" @on-modal-close="hideSuccessModal">
      <div class="success-address-modal">
        <span v-html="successIcon" class="icon"></span>
        <span>Pedido Realizado com sucesso!</span>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/ModalBox.vue";
import feather from "feather-icons";
import { mapGetters } from "vuex";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      formData: {
        name: {
          value: "",
          placeholder: "Digite seu nome",
          errorMessage: "O nome é obrigatório!",
          label: "Nome *",
          valid: true,
          isValid: () => {
            this.formData.name.valid = this.formData.name.value.length;
          },
        },
        phone: {
          value: "",
          placeholder: "Digite seu Celular",
          errorMessage: "O celular é obrigatório!",
          label: "Celular *",
          valid: true,
          isValid: () => {
            this.formData.phone.valid = this.formData.phone.value.length === 16;
          },
        },
        cep: {
          value: "",
          placeholder: "Digite seu CEP",
          errorMessage: "O CEP é obrigatório!",
          label: "CEP *",
          valid: true,
          isValid: () => {
            this.formData.cep.valid = !!this.formData.cep.value.length;
          },
        },
        city: {
          value: "",
          placeholder: "Digite sua Cidade",
          errorMessage: "A cidade é obrigatória!",
          label: "Cidade *",
          valid: true,
          isValid: () => {
            this.formData.city.valid = !!this.formData.city.value.length;
          },
        },
        street: {
          value: "",
          placeholder: "Digite sua Rua",
          errorMessage: "A Rua é obrigatória!",
          label: "Rua *",
          valid: true,
          isValid: () => {
            this.formData.street.valid = !!this.formData.street.value.length;
          },
        },
        number: {
          value: "",
          placeholder: "Digite seu Número",
          errorMessage: "O Número é obrigatório!",
          label: "Número*",
          valid: true,
          isValid: () => {
            this.formData.number.valid = !!this.formData.number.value.length;
          },
        },
      },
      showAdressModal: false,
      showSuccessModal: false,
      showInvalidAdressModal: false,
      deliveryType: "store",
      paymentType: "credit-card",
      savedAddress: false,
    };
  },
  computed: {
    ...mapGetters(["getCartTotal"]),
    warningIcon() {
      return feather.icons["alert-triangle"].toSvg();
    },
    successIcon() {
      return feather.icons["check-circle"].toSvg();
    },
    isAddressFormValid() {
      let isValid = true;
      isValid &= this.formData.cep.valid;
      isValid &= this.formData.city.valid;
      isValid &= this.formData.street.valid;
      isValid &= this.formData.number.valid;
      return isValid;
    },
    isUserDataValid() {
      let isValid = true;
      isValid &= !!this.formData.name.valid;
      isValid &= !!this.formData.phone.valid;
      return isValid;
    },
    isDeliveryType() {
      return this.deliveryType === "delivery";
    },
    hasAddressInfo() {
      return (
        this.formData.cep.value &&
        this.formData.city.value &&
        this.formData.street.value &&
        this.formData.number.value
      );
    },
    addressButtonLabel() {
      return this.hasAddressInfo ? "Editar Endereço" : "Adicionar Endereço";
    },
    isAllInfoNeeded() {
      let isAllInfoNeeded = true;
      isAllInfoNeeded &=
        this.isUserDataValid &&
        ((this.isDeliveryType && this.isAddressFormValid) ||
          !this.isDeliveryType);
      return isAllInfoNeeded;
    },
  },
  methods: {
    triggerValidations() {
      this.formData.name.isValid();
      this.formData.phone.isValid();
      if (this.isDeliveryType) {
        this.triggerAddressFormValidations();
        this.showInvalidAdressModal = !this.isAddressFormValid;
      }
    },
    triggerAddressFormValidations() {
      this.formData.cep.isValid();
      this.formData.city.isValid();
      this.formData.street.isValid();
      this.formData.number.isValid();
    },

    orderItems() {
      this.triggerValidations();
      if (this.isAllInfoNeeded) {
        this.showSuccessModal = true;

        const phone = 5561983420512;
        let text = `

          *Cliente:* ${this.formData.name.value}
          *Contato:* ${this.formData.phone.value}
          ----------------------------------
          *Pedido:*
          ${this.$store.state.cartList.map(item => {
            return `
              ${item.quantity}x ${item.name}
              Obs: ${item.observations}
              ----------------------------------
            `
          })}
          *TOTAL:* R$ ${this.getCartTotal}
        `
        text = window.encodeURIComponent(text);
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`);

        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      }
    },
    onShowAdressModal() {
      this.showAdressModal = true;
    },
    hideAddressModal() {
      this.showAdressModal = false;
    },
    hideSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push("/");
    },
    hideInvalidAddressModal() {
      this.showInvalidAdressModal = false;
    },
    validateAddressForm() {
      this.triggerAddressFormValidations();
      if (!this.isAddressFormValid) return;
      this.savedAddress = true;
      this.showAdressModal = false;
    },
    addAddressFromModalButton() {
      this.hideInvalidAddressModal();
      this.onShowAdressModal();
    },
    changeToTakeOutType() {
      this.deliveryType = "store";
      this.hideInvalidAddressModal();
    },
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 90%;
  margin: 30px auto;
  background: white;
  border-radius: 8px;
  padding: 30px 50px;

  .input-field {
    display: flex;
    flex-direction: column;

    label {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 5px;
    }

    + .input-field {
      margin-top: 15px;
    }
  }

  .address-container {
    display: flex;
    margin-top: 15px;

    .input-field {
      margin: 0;
      width: 100%;

      & + .input-field {
        width: 30%;
        margin-left: 15px;
      }
    }
  }

  .error-message {
    font-size: 12px;
    color: @error-color;
    margin-top: 0;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 20px;
    }

    .radio-container {
      display: flex;
    }
    .address {
      a {
        color: @pink;
        font-weight: normal;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
        margin: 15px 0;
        display: block;
        width: fit-content;
      }

      .address-card {
        border-radius: 8px;
        border: 1px solid @dark-grey;
        padding: 10px 20px;
        margin: 5px 0;
        width: fit-content;
        p {
          font-weight: normal;
          font-size: 14px;
          color: @dark-grey;
          margin: 0;
        }
      }
    }

    .radio-options {
      display: flex;
      align-items: center;

      & + .radio-options {
        margin-left: 25px;
      }
      label {
        padding-left: 10px;
        margin: 0;
      }
    }
  }

  .modal-content {
    button {
      text-align: center;
      margin: 30px auto;

      & + button {
        margin-left: 15px;
      }
    }
  }

  .invalid-address-modal,
  .success-address-modal {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding-bottom: 10px;

    button {
      margin-top: 10px;
    }

    .icon {
      margin-bottom: 5px;
      color: @error-color;
    }
  }

  .success-address-modal {
    .icon {
      margin-bottom: 5px;
      color: @yellow;
    }
  }

  @media @tablets {
    width: 100%;
    padding: 0;
    margin: 0;

    .modal-content {
      button + button {
        margin-left: 5px;
      }
    }

    .address-container {
      .input-field + .input-field {
        margin-left: 5px;
      }
    }
  }
}
</style>
