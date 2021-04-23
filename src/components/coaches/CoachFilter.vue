<template>
  <base-card>
    <h2>Find your coach</h2>
    <div class="filter-options">
      <div>
        <label for="frontend">Frontend</label>
        <input
          type="checkbox"
          id="frontend"
          checked
          v-model="filters.frontend"
          @change="emitFilters"
        />
      </div>

      <div>
        <label for="backend">Backend</label>
        <input
          type="checkbox"
          id="backend"
          checked
          v-model="filters.backend"
          @change="emitFilters"
        />
      </div>

      <div>
        <label for="career">Career</label>
        <input
          type="checkbox"
          id="career"
          checked
          v-model="filters.career"
          @change="emitFilters"
        />
      </div>

      <div>
        <label for="design">Design</label>
        <input
          type="checkbox"
          id="design"
          checked
          v-model="filters.design"
          @change="emitFilters"
        />
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
        design: true,
      },
    };
  },
  methods: {
    emitFilters() {
      this.$emit("change-filter", this.filters);
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-weight: normal;
  text-decoration: underline;
}
.filter-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 0.7rem 0;

  div {
    display: flex;
    align-items: center;
    margin: 0 0.3rem;
  }
}
label {
  font-size: 1.7rem;
  margin-right: 0.7rem;
  user-select: none;
}
</style>