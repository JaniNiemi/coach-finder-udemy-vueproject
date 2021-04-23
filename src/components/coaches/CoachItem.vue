<template>
  <li>
    <base-card>
      <h3>{{ fullName }}</h3>
      <h4>${{ hourlyRate }}/hour</h4>
      <div class="areas">
        <p>Areas of expertise:</p>
        <div>
          <base-badge
            v-for="area in areas"
            :key="area"
            :title="area"
            :type="area"
          ></base-badge>
        </div>
      </div>
      <div class="actions">
        <base-button :link="true" :to="coachContact">Contact</base-button>
        <base-button :link="true" :to="coachDetails">View details</base-button>
      </div>
    </base-card>
  </li>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "hourlyRate", "areas"],
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    coachContact() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    coachDetails() {
      return `${this.$route.path}/${this.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  // margin: 4rem 0;
  // padding: 1rem;
  // box-shadow: 0 2rem 2rem rgba($color: #000000, $alpha: 0.25);
  // border-radius: 1rem;
  // background-color: rgb(242, 247, 238);
  // color: rgb(10, 19, 10);
}
h3 {
  font-size: 2rem;
}
.areas {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  p {
    font-weight: bold;
    font-size: 1.7rem;
  }
}
.actions {
  display: flex;
  justify-content: flex-end;
  a {
    margin: 0.5rem 1rem;
  }
}
</style>