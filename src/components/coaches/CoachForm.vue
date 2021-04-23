<template>
  <form @submit.prevent="formSubmit">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="first-name">First name</label>
      <input
        type="text"
        id="first-name"
        v-model.trim="firstName.value"
        @blur="clearValidity('firstName')"
      />
    </div>
    <p class="invalid" v-if="!firstName.isValid">
      First name must not be empty
    </p>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="last-name">Last name</label>
      <input
        type="text"
        id="last-name"
        v-model.trim="lastName.value"
        @blur="clearValidity('lastName')"
      />
    </div>
    <p class="invalid" v-if="!lastName.isValid">Last name must not be empty</p>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly rate ($)</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.value"
        @blur="clearValidity('rate')"
      />
    </div>
    <p class="invalid" v-if="!rate.isValid">Hourly rate must be more than 0</p>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="4"
        v-model.trim="description.value"
        @blur="clearValidity('description')"
      ></textarea>
    </div>
    <p class="invalid" v-if="!description.isValid">
      Description must not be empty
    </p>
    <h3>Areas of expertise</h3>
    <div
      class="form-control checkbox-list"
      :class="{ invalid: !areas.isValid }"
    >
      <div>
        <label for="frontend">Frontend development</label>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @focus="clearValidity('areas')"
        />
      </div>
      <div>
        <label for="backend">Backend development</label>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
          @focus="clearValidity('areas')"
        />
      </div>
      <div>
        <label for="career">Career advice</label>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
          @focus="clearValidity('areas')"
        />
      </div>
      <div>
        <label for="design">Design</label>
        <input
          type="checkbox"
          id="design"
          value="design"
          v-model="areas.value"
          @focus="clearValidity('areas')"
        />
      </div>
    </div>
    <p class="invalid" v-if="!areas.isValid">
      You must select at least one area of expertise
    </p>
    <p class="invalid" v-if="!formIsValid">
      Please check the inputs for errors and submit again.
    </p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      rate: {
        value: 0,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  watch: {
    "rate.value"() {
      if (this.rate.value < 0) {
        this.rate.value = 0;
      }
    },
  },
  emits: ["coach-data"],
  methods: {
    formValidate() {
      this.formIsValid = true;
      // First name validation
      if (this.firstName.value === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      // Last name validation
      if (this.lastName.value === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      // Description validation
      if (this.description.value === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      // Hourly rate validation
      if (!this.rate.value || this.rate.value <= 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      // Areas of expertise validation
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    formSubmit() {
      this.formValidate();
      if (!this.formIsValid) return;
      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };
      this.$emit("coach-data", formData);
    },
    clearValidity(input) {
      this[input].isValid = true;
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
.checkbox-list {
  flex-direction: column;

  div {
    margin-bottom: 1rem;
  }
}
input[type="checkbox"] {
  width: auto;
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
.invalid input,
.invalid textarea {
  border-color: rgb(207, 13, 13);
}
</style>