import router from "@/router";
import { State } from "@/types/vuex-state/State";
import axios from "axios";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// define your typings for the store state

export default createStore<State>({
  state: {
    isLoading: false,
    auth: {
      userEmail: "",
      token: "",
    },
    posts: [],
    searchKey: "dfdf",
    post: {},
    errors: {
      auth: null,
      post: null,
    },
  },
  mutations: {
    SET_LOADING_STATUS(state, value) {
      state.isLoading = value;
    },

    SET_AUTH(state, authData) {
      state.auth.userEmail = authData.user.email;
      state.auth.token = authData.accessToken;
    },

    RESET_AUTH(state) {
      state.auth = {
        ...state.auth,
        userEmail: "",
        token: "",
      };
    },
    SET_AUTH_ERR(state, err) {
      state.errors.auth = err.message;
    },
    SET_ALL_POSTS(state, data) {
      state.posts = data;
    },
    SET_POST(state, data) {
      state.post = data;
    },
    SET_SEARCH_KEY(state, searchKey) {
      state.searchKey = searchKey;
    },
    ADD_NEW_POST(state, newPost) {
      state.posts = [...state.posts, newPost];
    },
    REMOVE_POST(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    SET_POST_ERROR(state, err) {
      state.errors.post = err.message;
    },
  },
  actions: {
    loginAction(context, data) {
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

    logoutAction(context) {
      context.commit("SET_LOADING_STATUS", true);
      context.commit("RESET_AUTH");
      context.commit("SET_LOADING_STATUS", false);
    },

    getAllPostsAction(context) {
      context.commit("SET_LOADING_STATUS", true);
      axios
        .get("http://localhost:3000/posts")
        .then((res) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_ALL_POSTS", res.data);
        })
        .catch((err) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_POST_ERROR", err);
        });
    },

    setSearchKeyAction(context, searchKey) {
      context.commit("SET_SEARCH_KEY", searchKey);
    },

    getPostByIdAction(context, postId) {
      context.commit("SET_LOADING_STATUS", true);
      axios
        .get(`http://localhost:3000/posts/${postId}`)
        .then((res) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_POST", res.data);
        })
        .catch((err) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_POST_ERROR", err);
        });
    },

    clearPostDataAction(context) {
      context.commit("SET_POST", {});
    },

    createPostAction(context, newPost) {
      context.commit("SET_LOADING_STATUS", true);
      axios
        .post(`http://localhost:3000/posts`, newPost)
        .then((res) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("ADD_NEW_POST", res.data);
        })
        .catch((err) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_POST_ERROR", err);
        });
    },

    removePostAction(context, postId) {
      context.commit("SET_LOADING_STATUS", true);
      axios
        .delete(`http://localhost:3000/posts/${postId}`)
        .then((res) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("REMOVE_POST", postId);
        })
        .catch((err) => {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_POST_ERROR", err);
        });
    },
  },

  modules: {},

  plugins: [createPersistedState()],
});
