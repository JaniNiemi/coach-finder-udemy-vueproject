<template>
  <li>
    <div>
      <span>Request from: </span>
      <a :href="emailLink"> {{ email }} </a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ["email", "message"],
  computed: {
    emailLink() {
      return `mailto:${this.email}`;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  margin: 0.5rem 0;
}
li {
  list-style: none;
  margin-bottom: 2rem;
  padding-bottom: 1rem;

  &:not(:last-child) {
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  }
}
</style>