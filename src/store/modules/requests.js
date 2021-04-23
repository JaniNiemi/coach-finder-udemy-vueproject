export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    }
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter(request => request.coachId === coachId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    }
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    }
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        email: payload.email,
        message: payload.message,
      }
      const response = await fetch(`https://vue-coach-finder-5a8ed-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
        method: "POST",
        body: JSON.stringify(newRequest),
      });
      const responseData = response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to send request.");
        throw error;
      }
      newRequest.id = responseData.name;
      newRequest.coachId = payload.coachId;
      context.commit("addRequest", newRequest);
    },
    async loadRequests(context) {
      const userId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      const response = await fetch(`https://vue-coach-finder-5a8ed-default-rtdb.europe-west1.firebasedatabase.app/requests/${userId}.json?auth=${token}`);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.meesage || "Failed to load requests.");
      }
      const requests = [];
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: userId,
          email: responseData[key].email,
          message: responseData[key].message
        }
        requests.push(request);
      }
      context.commit("setRequests", requests);
    }
  },
}