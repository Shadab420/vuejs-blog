import router from "@/router";
import { AuthState } from "@/types/vuex-state/AuthState";
import { State } from "@/types/vuex-state/State";
import axios from "axios";
import { ActionContext } from "vuex";

const authStore = {
  state: (): AuthState => ({
    isLoading: false,
    auth: {
      userEmail: "",
      token: "",
    },
    error: {
      message: null,
    },
  }),
  mutations: {
    SET_LOADING_STATUS(state: AuthState, value: boolean): void {
      state.isLoading = value;
    },

    SET_AUTH(state: AuthState, authData: any): void {
      state.auth.userEmail = authData.user.email;
      state.auth.token = authData.accessToken;
    },

    RESET_AUTH(state: AuthState): void {
      state.auth = {
        ...state.auth,
        userEmail: "",
        token: "",
      };
    },
    SET_AUTH_ERR(state: AuthState, err: { message: string | null }): void {
      state.error.message = err.message;
    },
  },
  actions: {
    loginAction(context: ActionContext<State, State>, data: any): void {
      context.commit("SET_LOADING_STATUS", true);
      axios
        .post("http://localhost:3000/login", {
          email: data.value.email,
          password: data.value.password,
        })
        .then((res) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_AUTH", res.data);
          router.push("/");
        })
        .catch((err) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_AUTH_ERROR", err);
        });
    },

    logoutAction(context: ActionContext<State, State>): void {
      context.commit("SET_LOADING_STATUS", true);
      context.commit("RESET_AUTH");
      context.commit("SET_LOADING_STATUS", false);
    },
  },

  getters: {
    getState(state: AuthState): AuthState {
      return state;
    },
  },
};

export default authStore;
