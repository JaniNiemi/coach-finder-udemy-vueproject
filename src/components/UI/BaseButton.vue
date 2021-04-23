<template>
  <button v-if="!link" :class="mode">
    <slot />
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
a,
button {
  cursor: pointer;
  outline: none;
  border: 2px solid rgb(3, 117, 3);
  border-radius: 1rem;
  color: rgb(1, 32, 1);
  background-color: transparent;
  transition: all 0.3s;
  padding: 0.8rem 1rem;
  margin: 0 0.8rem;
  display: inline-block;
  text-decoration: none;
  font-size: 1.8rem;
}
a:hover,
a:active,
button:active,
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 1rem 1rem rgba(18, 233, 18, 0.3);
  border-color: rgb(73, 219, 5);
}

.flat {
  background-color: rgb(30, 92, 2);
  border-color: rgb(30, 92, 2);
  color: rgb(244, 250, 244);
}
</style>