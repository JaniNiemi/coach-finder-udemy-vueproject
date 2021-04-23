<template>
  <base-card>
    <h1>{{ mode }}</h1>
    <base-spinner v-if="isLoading" />
    <form v-else @submit.prevent="formSubmit">
      <p v-if="error" class="invalid">{{ error }}</p>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model.trim="password"
          minlength="6"
          title="Needs to be at least 6 characters"
        />
      </div>
      <p v-if="!formIsValid" class="invalid">
        Please enter a valid email and password. Password needs to be at least 6
        characters
      </p>
      <base-button type="button" mode="flat" @click="switchAuthMode">
        {{ submitButtonText }}
      </base-button>
      <base-button>Login</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "Login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonText() {
      if (this.mode === "Login") return "Switch to Sign up";
      else return "Switch to Login";
    },
  },
  methods: {
    async formSubmit() {
      this.formIsValid = true;
      this.error = null;
      // Email validation
      if (this.email === "" || !this.email.includes("@")) {
        this.error = "Invalid email";
        this.formIsValid = false;
        return;
      }
      // Password validation
      if (this.password === "" || this.password.length < 6) {
        this.error = "Invalid password";
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;

      const payload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "Login") {
          await this.$store.dispatch("login", payload);
        } else {
          await this.$store.dispatch("signup", payload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "");
        this.$router.replace(redirectUrl);
      } catch (error) {
        console.log(error);
        this.error = error.message || "Failed to authenticate.";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "Login") this.mode = "Sign up";
      else this.mode = "Login";
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0.5rem;
  text-align: left;
}
label {
  font-size: 1.6rem;
  margin-right: 1rem;
  width: 100%;
  padding-left: 0.5rem;
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