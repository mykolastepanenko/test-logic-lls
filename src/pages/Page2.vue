<template>
  <div class="page2">
    <router-link to="/">Вернуться назад</router-link>
    <!-- компонент контакта -->
    <ContactRow2
      :contact="contact"
      @changeRow="changeRow"
      @removeRow="removeRow"
      @createRow="createRow"
      @copyToStorage="copyToStorage"
      @undo="undo"
    />
  </div>
</template>

<script>
import ContactRow2 from "../components/ContactRow2";

export default {
  data() {
    return {
      contact: this.contacts[this.$route.params.id],
    };
  },
  props: {
    contacts: [],
  },
  components: {
    ContactRow2,
  },
  methods: {
    // функция редактирования полей контакта (переименование)
    changeRow(params) {
      this.$emit("changeRow", params);
    },
    // функция удаления поля контакта
    removeRow(param) {
      this.$emit("removeRow", [this.$route.params.id, param]);
    },
    // функция создания нового поля контакта
    createRow(param) {
      this.$emit("createRow", [this.$route.params.id, param]);
    },
    // хранилище для запоминания последнего дейстивия
    // требуется для работы кнопки "Шаг назад"
    copyToStorage(param) {
      this.$emit("copyToStorage", param);
    },
    // функция "Шаг назад"
    undo(index, action) {
      this.$emit("undo", this.$route.params.id, index, action);
    },
  },
};
</script>

<style>
.page2 {
  width: 100%;
}
</style>
