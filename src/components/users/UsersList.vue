<template>
  <ul>
    <UserItem
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    />
    <button @click="changesSaved = true">Saved Change</button>
  </ul>
</template>

<script>
import UserItem from "./UserItem.vue";

export default {
  components: {
    UserItem,
  },
  inject: ["users"],
  data() {
    return {
      changesSaved: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log("before route leave");
    if (this.changesSaved) {
      return next();
    }
    const answ = confirm("Are you sure? You got unsaved change");
    next(answ);
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
