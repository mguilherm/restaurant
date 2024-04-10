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
        <div class="delivery-type">
          <div class="radio-options">
            <input type="radio" name="delivery-type" id="store" checked />
            <label for="store">Retirar na Loja</label>
          </div>
          <div class="radio-options">
            <input type="radio" name="delivery-type" id="delivery" />
            <label for="delivery">Delivery</label>
          </div>
        </div>
        <a @click="onShowAdressModal">Adicionar Endereço</a>
      </div>
    </form>
    <button class="primary-button" @click="orderItems">Concluir Pedido</button>
    <Modal :show="showAdressModal" @on-modal-close="hideAdressModal">
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
        <button class="primary-button">Adicionar</button>
        <button class="secondary-button" @click="hideAdressModal">Cancelar</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/ModalBox.vue";
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
            this.formData.cep.valid = this.formData.cep.value.length;
          },
        },
        city: {
          value: "",
          placeholder: "Digite sua Cidade",
          errorMessage: "A cidade é obrigatória!",
          label: "Cidade *",
          valid: true,
          isValid: () => {
            this.formData.city.valid = this.formData.city.value.length;
          },
        },
        street: {
          value: "",
          placeholder: "Digite sua Rua",
          errorMessage: "A Rua é obrigatória!",
          label: "Rua *",
          valid: true,
          isValid: () => {
            this.formData.street.valid = this.formData.street.value.length;
          },
        },
        number: {
          value: "",
          placeholder: "Digite seu Número",
          errorMessage: "O Número é obrigatório!",
          label: "Número*",
          valid: true,
          isValid: () => {
            this.formData.number.valid = this.formData.number.value.length;
          },
        },
      },
      showAdressModal: false,
    };
  },
  methods: {
    triggerValidations() {
      this.formData.name.isValid();
    },
    orderItems() {
      this.triggerValidations();
    },
    onShowAdressModal() {
      this.showAdressModal = true;
    },
    hideAdressModal() {
      this.showAdressModal = false;
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

  .address-container{
    display: flex;
    margin-top: 15px;

    .input-field{
      margin: 0;
      width: 100%;

      & + .input-field{
        width: 30%;
        margin-left: 15px;
      }
    }
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

    .error-message {
      font-size: 12px;
      color: @error-color;
      margin-top: 0;
      font-weight: bold;
    }

    .address {
      .delivery-type {
        display: flex;
      }

      a {
        color: @pink;
        font-weight: normal;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
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

  .modal-content{
    button{
      text-align: center;
      margin: 30px auto;

      & + button{
        margin-left: 15px;
      }
    }
  }
}
</style>
