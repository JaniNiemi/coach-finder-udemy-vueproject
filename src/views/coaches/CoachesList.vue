<template>
  <div>
    <coach-filter @change-filter="setFilters"></coach-filter>
    <section>
      <div class="controls">
        <base-button mode="flat" @click="loadCoaches(true)">
          Refresh
        </base-button>
        <base-button
          v-if="!isCoach && isAuthenticated"
          :link="true"
          mode="flat"
          to="register"
        >
          Register as a coach
        </base-button>
        <base-button
          v-if="!isAuthenticated"
          :link="true"
          mode="flat"
          to="login?redirect=register"
        >
          Login to register as a coach
        </base-button>
      </div>
      <div v-if="!error">
        <base-spinner v-if="isLoading" />
        <ul v-else-if="hasCoaches && !isLoading">
          <transition-group name="fade-slide">
            <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :firstName="coach.firstName"
              :lastName="coach.lastName"
              :hourlyRate="coach.hourlyRate"
              :areas="coach.areas"
            />
          </transition-group>
        </ul>
        <h3 v-else>No coaches available</h3>
      </div>
      <base-card v-if="error">
        <p>{{ error }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
        design: true,
      },
      isLoading: false,
      error: null,
    };
  },

  computed: {
    ...mapGetters("coaches", ["coaches", "hasCoaches", "isCoach"]),
    ...mapGetters(["isAuthenticated"]),
    filteredCoaches() {
      return this.$store.getters["coaches/coaches"].filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend"))
          return true;
        if (this.activeFilters.backend && coach.areas.includes("backend"))
          return true;
        if (this.activeFilters.career && coach.areas.includes("career"))
          return true;
        if (this.activeFilters.design && coach.areas.includes("design"))
          return true;
        return false;
      });
    },
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(forceRefresh = false) {
      this.error = null;
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", { forceRefresh });
      } catch (error) {
        this.error = "Something went wrong! Try refreshing the page.";
      }
      this.isLoading = false;
    },
  },

  created() {
    this.loadCoaches();
  },
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
p {
  font-size: 1.6rem;
  padding: 1rem 0;
}

.fade-slide-move {
  transition: transform 0.3s ease-in;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-in;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-3rem);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(3rem);
}
</style>