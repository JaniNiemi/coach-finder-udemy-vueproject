<template>
  <base-card>
    <base-spinner v-if="isLoading" />
    <div v-else-if="!isLoading && !error">
      <h1>Requests received:</h1>
      <ul v-if="hasRequests">
        <request-item
          v-for="request in receivedRequests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        />
      </ul>
      <h2 v-else>No requests received</h2>
    </div>
    <p v-else-if="error">{{ error }}</p>
  </base-card>
</template>

<script>
import RequestItem from "../components/requests/RequestItem.vue";
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/loadRequests");
      } catch (error) {
        console.log(error);
        this.error = "Failed to load requests.";
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style lang="scss" scoped>
h2,
p {
  margin: 2rem 0;
}
</style>