<template>
  <base-card>
    <h1>Contact this coach</h1>
    <base-spinner v-if="isLoading" />
    <form @submit.prevent="formSubmit" v-else-if="!error && !isLoading">
      <div class="form-control">
        <label for="email">Your email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message" rows="3" v-model.trim="message" />
      </div>
      <p v-if="!formIsValid" class="invalid">
        Please check the inputs for errors and try again
      </p>
      <div class="actions">
        <base-button>Send message</base-button>
      </div>
    </form>
    <h3 v-else-if="error">
      Failed to send request. Try refreshing the page and send your request
      again.
    </h3>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
      error: false,
      isLoading: false,
    };
  },
  methods: {
    async formSubmit() {
      this.formIsValid = true;
      // Validate form - Simple validation
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return false;
      }
      this.error = false;
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/contactCoach", {
          email: this.email,
          message: this.message,
          coachId: this.$route.params.id,
        });
        this.isLoading = false;
        this.$router.replace("/");
      } catch (error) {
        console.log("ERROR", error);
        this.error = true;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 40rem;
  margin: 0 auto;
}
.form-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0.5rem;
}
label {
  font-size: 1.6rem;
  margin-right: 1rem;
  width: 12rem;
  text-align: right;
}
input,
textarea {
  font-family: inherit;
  font-size: 1.5rem;
  flex: 1;
  margin: 0 0.2rem;
  padding: 0.6rem;
  border: 1px solid rgba($color: #154117, $alpha: 0.5);
  border-radius: 0.7rem;
  width: 100%;

  &:focus {
    background-color: rgb(229, 243, 217);
    outline: none;
  }
}
p {
  margin-bottom: 0.5rem;
}
.invalid {
  color: rgb(207, 13, 13) !important;
}
h3 {
  padding: 2rem 0;
}
</style>