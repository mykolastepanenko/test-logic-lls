<template>
  <div class="page2">
    <router-link to="/">Вернуться назад</router-link>
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
    changeRow(params) {
      this.$emit("changeRow", params);
    },
    removeRow(param) {
      this.$emit("removeRow", [this.$route.params.id, param]);
    },
    createRow(param) {
      this.$emit("createRow", [this.$route.params.id, param]);
    },
    copyToStorage(param) {
      this.$emit("copyToStorage", param);
    },
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
