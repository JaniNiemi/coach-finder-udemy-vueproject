<template>
  <the-header />
  <main>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";
export default {
  components: { TheHeader },

  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },

  watch: {
    didAutoLogout(currentVal, prevVal) {
      if (currentVal && currentVal !== prevVal) {
        this.$router.replace("/");
      }
    }
  },

  created() {
    this.$store.dispatch("tryAutoLogin");
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;700&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 67.5%;
}

body {
  font-family: "Chakra Petch", sans-serif;
  background-color: rgb(217, 223, 217);
  overflow-x: hidden;
}

h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.8rem;
}
h4 {
  font-size: 1.7rem;
}
p,
a,
li {
  font-size: 1.6rem;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #042202;
}
main {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-3rem);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(3rem);
}

.route-enter-active {
  transition: all 0.2s ease-out;
}
.route-leave-active {
  transition: all 0.2s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
