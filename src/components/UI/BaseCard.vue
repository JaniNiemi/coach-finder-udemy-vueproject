<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin: 4rem 0;
  padding: 1rem;
  box-shadow: 0 2rem 2rem rgba($color: #000000, $alpha: 0.25);
  border-radius: 1rem;
  background-color: rgb(242, 247, 238);
  color: rgb(10, 19, 10);
}
</style>