<template>
  <div>
    <div class="box__contact" v-for="(item, index) in contact.row" :key="index">
      {{ item.title + ": " + item.value }}
    </div>
    <button
      class="box__button"
      @click="
        () => {
          this.$router.push({ path: '/contact/' + this.index });
        }
      "
    >
      Подробнее
    </button>
    <button class="box__button" @click="$emit('yes', index)">Удалить</button>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
    index: Number,
  },
};
</script>

<style>
.box__contact {
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.box__button {
  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  font-size: 1em;
}

@media screen and (min-width: 992px) {
}
</style>
