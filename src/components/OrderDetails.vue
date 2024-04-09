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
            <input type="radio" name="delivery-type" id="store" checked>
            <label for="store">Retirar na Loja</label>
          </div>
          <div class="radio-options">
            <input type="radio" name="delivery-type" id="delivery">
            <label for="delivery">Delivery</label>
          </div>
        </div>
      </div>
    </form>
    <button class="primary-button" @click="orderItems">Concluir Pedido</button>
  </div>
</template>

<script>
export default {
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
      },
    };
  },
  methods: {
    triggerValidations() {
      this.formData.name.isValid();
    },
    orderItems() {
      this.triggerValidations();
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

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    .input-field {
      display: flex;
      flex-direction: column;

      + .input-field {
        margin-top: 15px;
      }
    }

    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 20px;
    }

    label {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 5px;
    }

    .error-message {
      font-size: 12px;
      color: @error-color;
      margin-top: 0;
      font-weight: bold;
    }

    .delivery-type{
      display: flex;
    }

    .radio-options{
      display: flex;
      align-items: center;

      &+.radio-options{
        margin-left: 25px;
      }
      label{
        padding-left: 10px;
        margin: 0;
      }

    }
  }
}
</style>
