<template>
  <base-card>
    <h1>Register as a coach!</h1>
    <coach-form @coach-data="saveCoach" />
  </base-card>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveCoach(data) {
      this.$store.dispatch("coaches/registerCoach", data);
      this.$router.replace("/coaches");
    },
  },
};
</script>