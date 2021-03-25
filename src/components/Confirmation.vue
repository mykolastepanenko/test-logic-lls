<template>
  <div class="confirmation">
    <div class="confirmation__item">
      <h1>Вы действительно хотите удалить контакт?</h1>
      <button @click="yes(id)">Да</button>
      <!-- @ тоже самое что v-on, только укороченное -->
      <button v-on:click="no()">Нет</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    // функция подтверждения действия (удаления)
    yes(id) {
      this.$emit("removeContact", id);
    },
    // функция отмены действия
    no() {
      this.$emit("no");
    },
  },
};
</script>

<style>
.confirmation {
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

.confirmation__item {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 0 10px;
}

.confirmation__item button {
  width: 100%;
  font-size: 1em;
  margin: 5px auto;
  padding: 10px 0;
}
@media screen and (min-width: 768px) {
  .confirmation__item {
    width: 50%;
  }
}
@media screen and (min-width: 992px) {
  .confirmation__item {
    width: 35%;
  }
}
@media screen and (min-width: 1200px) {
  .confirmation__item {
    width: 25%;
  }
}
</style>
