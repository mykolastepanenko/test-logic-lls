<template>
  <!-- компонент регистрации нового контакта -->
  <div class="containerReg">
    <form class="form" @submit.prevent="onSubmit">
      <h1>Создание нового контакта</h1>
      <input
        class="form__input"
        type="text"
        v-model="contact.firstName"
        placeholder="Имя"
        minlength="1"
        required
      />
      <input
        class="form__input"
        type="text"
        v-model="contact.lastName"
        placeholder="Фамилия"
        minlength="1"
        required
      />
      <input
        class="form__input"
        type="text"
        v-model="contact.phone"
        placeholder="Телефон"
        minlength="13"
        maxlength="13"
        required
      />
      <button class="form__input" type="submit">Добавить</button>
      <button class="form__input" type="reset" @click="$emit('seenReg')">
        Отмена
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        firstName: "",
        lastName: "",
        phone: "+380",
      },
    };
  },
  methods: {
    onSubmit() {
      if (
        this.contact.firstName == "" ||
        this.contact.lastName == "" ||
        this.contact.firstName == null
      ) {
        alert("Ошибка! Малая длина данных формы");
      } else {
        const newContact = {
          row: [
            { title: "Имя", value: this.contact.firstName },
            { title: "Фамилия", value: this.contact.lastName },
            { title: "Телефон", value: this.contact.phone },
          ],
        };
        this.$emit("addContact", newContact);
        this.contact.firstName = null;
        this.contact.lastName = null;
        this.contact.phone = null;
        this.$emit("seenReg");
      }
    },
  },
};
</script>

<style>
.containerReg {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 0;
}
.form {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 0 10px;
}
.form__input {
  width: 100%;
  height: 35px;
  display: block;
  font-size: 1em;
  margin: 10px 20px;
  border: 3px solid black;
}
.form__input:first-child {
  margin-top: 20px;
}
.form__input:last-child {
  margin-bottom: 20px;
}
@media screen and (min-width: 768px) {
  .form {
    width: 50%;
  }
}
@media screen and (min-width: 992px) {
  .form {
    width: 35%;
  }
}
@media screen and (min-width: 1200px) {
  .form {
    width: 25%;
  }
}
</style>
