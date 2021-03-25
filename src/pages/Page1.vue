<template>
  <div>
    <!-- скрытый компонент добавления новых контактов -->
    <Registration
      v-if="seenReg"
      @seenReg="seenRegMethod"
      @addContact="addContact"
    />
    <!-- скрытый компонент для подтверждения действия (удаления) -->
    <Confirmation
      v-if="seen"
      @no="no"
      @returnTrue="returnTrue"
      @removeContact="removeContact"
      :id="id"
    />
    <button class="box__button" @click="seenRegMethod">
      Добавить новый контакт
    </button>
    <h1>Список контактов</h1>
    <div class="container">
      <ContactRow
        class="box"
        v-for="(contact, index) in contacts"
        :key="index"
        :contact="contact"
        :index="index"
        @removeContact="removeContact"
        @yes="yes"
      />
    </div>
  </div>
</template>

<script>
import ContactRow from "../components/ContactRow";
import Confirmation from "../components/Confirmation";
import Registration from "../components/Registration";
export default {
  props: ["contacts"],
  data() {
    return {
      seen: false,
      seenReg: false,
      id: Number,
    };
  },
  components: {
    ContactRow,
    Confirmation,
    Registration,
  },
  methods: {
    addContact(contact) {
      this.$emit("addContact", contact);
    },
    removeContact(id) {
      this.$emit("removeContact", id);
      this.seen = false;
    },
    //функция подтвеждения удаления
    yes(id) {
      this.seen = true;
      this.id = id;
    },
    //функция отмены удаления
    no() {
      this.seen = false;
      this.id = null;
    },
    //функция открытия/скрытия компонента добавления нового контакта
    seenRegMethod() {
      this.seenReg = !this.seenReg;
    },
  },
};
</script>

<style>
.box {
  width: 100%;
  max-width: 250px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 5px solid black;
  border-radius: 10px;
  padding: 10px;
}

.container {
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

@media screen and (min-width: 576px) {
  .box {
    max-width: 450px;
  }
}

@media screen and (min-width: 768px) {
  .container {
    width: 85%;
    flex-direction: row;
    justify-content: space-between;
  }
  .box {
    margin: 20px auto;
  }
}
@media screen and (min-width: 992px) {
  .container {
    width: 960px;
    flex-direction: row;
    justify-content: space-between;
  }
  .box {
    max-width: 250px;
  }
}
@media screen and (min-width: 1200px) {
  .container {
    width: 1140px;
    flex-direction: row;
    justify-content: space-between;
  }
  .box {
    justify-content: space-around;
  }
}
</style>
