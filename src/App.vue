<template>
  <div id="app">
    <router-view
      v-bind:contacts="contacts"
      v-on:removeContact="removeContact"
      v-on:addContact="addContact"
      @changeRow="changeRow"
      @removeRow="removeRow"
      @createRow="createRow"
      @copyToStorage="copyToStorage"
      @undo="undo"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      contacts: [
        {
          row: [
            { title: "Имя", value: "Николай" },
            { title: "Фамилия", value: "Степаненко" },
            { title: "Телефон", value: "+380988819107" },
          ],
        },
        {
          row: [
            { title: "Имя", value: "Иван" },
            { title: "Фамилия", value: "Иванович" },
            { title: "Телефон", value: "+380000000000" },
          ],
        },
        {
          row: [
            { title: "Имя", value: "Вася" },
            { title: "Фамилия", value: "Пупкин" },
            { title: "Телефон", value: "+388005553535" },
          ],
        },
      ],
      storage: { title: "", value: "", index: 0 },
    };
  },
  methods: {
    addContact(contact) {
      this.contacts.push(contact);
    },
    removeContact(id) {
      this.contacts.splice(id, 1);
    },
    changeRow(params) {
      this.contacts = params;
    },
    removeRow(param) {
      this.storage.index = param[1];
      this.contacts[param[0]].row.splice([param[1]], 1);
    },
    createRow(param) {
      this.contacts[param[0]].row.push(param[1]);
    },
    copyToStorage(param) {
      this.storage.title = param.title;
      this.storage.value = param.value;
    },
    undo(item, index, action) {
      switch (action) {
        case "change":
          this.contacts[item].row[index].title = this.storage.title;
          this.contacts[item].row[index].value = this.storage.value;
          break;
        case "create":
          this.contacts[item].row.splice([index], 1);
          break;
        case "remove":
          this.contacts[item].row.splice(this.storage.index, 0, {
            title: this.storage.title,
            value: this.storage.value,
          });
          break;
      }
      this.storage.title = null;
      this.storage.value = null;
      this.storage.index = null;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
button{
  cursor: pointer;
}
</style>
