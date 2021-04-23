<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  font-size: 1.7rem;
  box-shadow: 0 1rem 1rem rgba($color: #000000, $alpha: 0.3);
  padding: 0.5rem 1rem;
  margin: 1rem;
  display: inline-block;
  border-radius: 1rem;
}
.frontend {
  background-color: rgb(141, 183, 247);
  box-shadow: 0 0.7rem 1rem rgba(30, 28, 138, 0.4);
}
.backend {
  background-color: rgb(136, 241, 180);
  box-shadow: 0 0.7rem 1rem rgba(22, 117, 27, 0.4);
}
.career {
  background-color: rgb(247, 166, 160);
  box-shadow: 0 0.7rem 1rem rgba(119, 39, 19, 0.4);
}
.design {
  background-color: rgb(234, 151, 241);
  box-shadow: 0 0.7rem 1rem rgba(71, 13, 94, 0.4);
}
</style>