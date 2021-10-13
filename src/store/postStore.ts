import Post from "@/types/Post";
import { PostState } from "@/types/vuex-state/PostState";
import { State } from "@/types/vuex-state/State";
import axios from "axios";
import { ActionContext } from "vuex";

const postStore = {
  state: (): PostState => ({
    isLoading: false,
    posts: [],
    searchKey: "",
    post: {},
    error: {
      message: null,
    },
  }),
  mutations: {
    SET_LOADING_STATUS(state: PostState, value: boolean): void {
      state.isLoading = value;
    },
    SET_ALL_POSTS(state: PostState, data: any): void {
      state.posts = data;
    },
    SET_POST(state: PostState, data: any): void {
      state.post = data;
    },
    SET_SEARCH_KEY(state: PostState, searchKey: string): void {
      state.searchKey = searchKey;
    },
    ADD_NEW_POST(state: PostState, newPost: Post): void {
      state.posts = [...state.posts, newPost];
    },
    REMOVE_POST(state: PostState, postId: number | undefined): void {
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    SET_POST_ERROR(state: PostState, err: { message: string | null }): void {
      state.error.message = err.message;
    },
  },
  actions: {
    getAllPostsAction(context: ActionContext<State, State>): void {
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

    setSearchKeyAction(
      context: ActionContext<State, State>,
      searchKey: string
    ): void {
      context.commit("SET_SEARCH_KEY", searchKey);
    },

    getPostByIdAction(
      context: ActionContext<State, State>,
      postId: number | undefined
    ): void {
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

    clearPostDataAction(context: ActionContext<State, State>): void {
      context.commit("SET_POST", {});
    },

    createPostAction(
      context: ActionContext<State, State>,
      newPost: Post
    ): void {
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

    removePostAction(
      context: ActionContext<State, State>,
      postId: number
    ): void {
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
};

export default postStore;
