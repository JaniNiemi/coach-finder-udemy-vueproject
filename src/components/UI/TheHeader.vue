<template>
  <header>
    <div>
      <router-link to="/">Find a coach!</router-link>
      <nav id="nav">
        <router-link to="/coaches">Coaches</router-link>
        <router-link to="/requests" v-if="isAuthenticated">
          Requests
        </router-link>
        <router-link to="/login" v-else>Login</router-link>
        <a @click="logout" v-if="isAuthenticated">Log out</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100vw;
  background-color: #2d9e2d;
  margin-bottom: 2rem;
  padding: 0 2rem;
}
div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 120rem;
  margin: 0 auto;
  padding: 3rem 0;
}

a {
  font-size: 2rem;
  font-weight: bold;
  color: whitesmoke;
  text-decoration: none;
  cursor: pointer;

  &.router-link-active,
  &:hover {
    text-decoration: underline;
    color: rgb(244, 250, 237);
    box-shadow: 0 2px 3px rgba($color: #000000, $alpha: 0.2);
  }
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
}
</style>