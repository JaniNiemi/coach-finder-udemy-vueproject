let timer;

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      // Convert to boolean with double excalamation mark
      return !!state.token
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
    },

    setAutoLogout(state) {
      state.didAutoLogout = true;
    }
  },

  actions: {
    async login(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "login"
      });
    },

    async signup(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "signup"
      });
    },

    async auth(context, payload) {
      const mode = payload.mode;
      let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDG9J9aFJ4O2IBQjgKoZyS4HePjJuCnZL4";

      if (mode === "signup") {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDG9J9aFJ4O2IBQjgKoZyS4HePjJuCnZL4";
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log("Auth error", responseData);
        throw new Error(responseData.message || "Failed to authenticate.");
      }

      const expiresIn = Number(responseData.expiresIn * 1000);
      // Test value
      // const expiresIn = 5000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      timer = setTimeout(() => {
        context.dispatch("autoLogout");
      }, expiresIn);

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },

    logout(context) {
      clearTimeout(timer);

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      context.commit("setUser", {
        token: null,
        userId: null,
      });
    },

    tryAutoLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = Number(tokenExpiration) - new Date().getTime();

      if (expiresIn < 0) {
        return false;
      }

      setTimeout(() => {
        context.dispatch("autoLogout")
      }, expiresIn);

      if (token && userId) {
        context.commit("setUser", {
          token,
          userId,
        });
      }
    },

    autoLogout(context) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    }
  },
}