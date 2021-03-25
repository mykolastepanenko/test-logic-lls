<template>
  <div class="contact">
    <h1 class="contact__h1">Контакт "{{ contact.row[0].value }}"</h1>
    <div class="contact__table">
      <div
        class="contact__row"
        v-for="(item, index) in contact.row"
        :key="index"
      >
        <span class="contact__span">{{ item.title + ": " + item.value }}</span>
        <button
          class="contact__button"
          @click="
            seen = !seen;
            changeIndex = index;
          "
        >
          Редактировать поле
        </button>
        <button class="contact__button" @click="removeRow(index)">
          Удалить поле
        </button>
      </div>
    </div>

    <button class="contact__button2" @click="seenCreateRow = !seenCreateRow">
      Добавить поле
    </button>
    <button class="contact__button2" @click="undo">Шаг назад</button>
    <div class="contact__form__seen" v-if="seen">
      <form @submit.prevent>
        <input v-model="input1" type="text" placeholder="Название" required />
        <input v-model="input2" type="text" placeholder="Значение" required />
        <button @click="change">Изменить</button>
        <button @click="confirmation">Отменить</button>
        <button @click="close">
          Закрыть
        </button>
      </form>
    </div>
    <div class="contact__form__seen" v-if="seenCreateRow">
      <form @submit.prevent="createRow">
        <input v-model="input1" type="text" placeholder="Название" required />
        <input v-model="input2" type="text" placeholder="Значение" required />
        <button>Создать</button>
        <button @click="close">
          Закрыть
        </button>
      </form>
    </div>
    <div class="contact__form__seen" v-if="seenConfirm">
      Подтвердить отмену?
      <button class="contact__button" @click="cancel">Отменить</button>
      <button class="contact__button" @click="change">Изменить</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //объект контакта
    contact: {
      type: Object,
      required: true,
    },
    //поля формы
    input1: String,
    input2: String,
  },
  data() {
    return {
      //определить редактируемую строку
      changeIndex: Number,
      //определить последнее действие
      lastAction: String,
      //триггеры для скрытых форм
      seen: false,
      seenConfirm: false,
      seenCreateRow: false,
    };
  },
  methods: {
    //метод редактирования строки контакта
    change() {
      //lastAction = change чтобы программа запомнила последнее действие
      this.lastAction = "change";
      //последний измененный элемент заполняется в хранилище
      //для возможности "отмены последнего действия"
      this.copyToStorage(this.contact.row[this.changeIndex]);
      //собрать данные формы
      this.contact.row[this.changeIndex].title = this.input1;
      this.contact.row[this.changeIndex].value = this.input2;
      //метод редактирования
      this.$emit("changeRows", this.contact);
      //чистка
      (this.seen = false), (this.seenConfirm = false);
      this.input1 = null;
      this.input2 = null;
    },
    //метод удаления строки контакта
    removeRow(index) {
      //через встроенную функцию confirm можно сделать подтверждение
      //также можно сделать через свой компонент, у меня это реализовано на странице 1
      if (confirm("Действительно удалить поле?")) {
        this.lastAction = "remove";
        this.copyToStorage(this.contact.row[index]);
        this.$emit("removeRow", index);
      }
    },
    //метод для подтверждения действия
    confirmation() {
      this.seenConfirm = true;
    },
    //метод для закрытия окна подтверждения
    close() {
      this.input1 = null;
      this.input2 = null;
      this.seen = false;
      this.seenCreateRow = false;
      this.seenCreateRow = false;
    },
    //метод для отмены действия
    cancel() {
      this.seenConfirm = false;
      this.seen = false;
      this.input1 = null;
      this.input2 = null;
    },
    //метод создания новой строки в контакте
    createRow() {
      this.lastAction = "create";
      this.changeIndex = this.contact.row.length;
      const newRow = { title: this.input1, value: this.input2 };
      this.$emit("createRow", newRow);
      this.seenCreateRow = false;
    },
    //метод "запоминания последнего действия"
    //передача объекта в хранилище
    copyToStorage(object) {
      this.$emit("copyToStorage", object);
    },
    //метод "отмены последнго действия"
    undo() {
      this.$emit("undo", this.changeIndex, this.lastAction);
      this.lastAction = null;
      this.index = null;
      this.changeIndex = null;
    },
  },
};
</script>

<style>
.contact {
  border: 5px solid black;
  border-radius: 10px;
  min-height: 400px;
  margin: 20px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.contact__h1 {
  width: 100%;
  text-align: center;
}
.contact__table {
  width: 100%;
  min-height: 150px;
}
.contact__row {
  display: flex;
  flex-direction: column;
  font-size: 1.25em;
  margin-bottom: 20px !important;
}
.contact__button,
.contact__button2 {
  width: 100%;
  margin: 10px auto !important;
  padding: 5px 0;
}
.contact__form__seen {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
}
.contact__form__seen form {
  width: 50%;
  margin: auto;
}
.contact__form__seen form * {
  width: 100%;
  display: block;
  padding: 10px 0;
  margin-bottom: 10px;
}
.layer2__button {
  width: 50%;
  padding: 10px 0;
  margin-bottom: 10px;
}

@media screen and (min-width: 768px) {
  .contact {
    align-items: flex-start;
  }
  .contact__row {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 0;
    text-align: left;
  }
  .contact__span {
    min-width: 50%;
    display: inline-block;
  }
  .contact__button {
    max-width: 250px;
    margin: 0 10px;
  }
  .contact__button2 {
    margin-top: -20px;
  }
}
@media screen and (min-width: 992px) {
  .contact {
    width: 960px;
  }
}
</style>
