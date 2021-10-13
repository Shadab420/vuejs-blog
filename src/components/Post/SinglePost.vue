<template>
  <div class="single-post" @click="postDetails(post.id)">
    <div>
      <p class="post-title">{{ post.title }}</p>
      <small> Author: {{ post.author }} </small>
    </div>
  </div>

  <span v-if="authorized" class="remove-icon" @click="removePost(post.id)">
    <i class="pi pi-trash"></i>
  </span>
</template>

<script lang="ts">
import router from "@/router";
import Post from "@/types/Post";
import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
} from "@vue/runtime-core";
import { mapActions, mapState, useStore } from "vuex";

export default defineComponent({
  name: "SinglePost",
  props: {
    post: Object as PropType<Post>,
  },

  /**
   * options api
   */
  // methods: {
  //   postDetails(postId: number): void {
  //     router.push(`/post/${postId}`);
  //   },

  //   ...mapActions(["removePostAction"]),
  // },

  // computed: {
  //   authorized() {
  //     return this.auth.userEmail.length > 0;
  //   },

  //   ...mapState(["auth"]),
  // },

  /**
   * composition api
   */

  setup(props) {
    const store = useStore(); //vuex store
    const authorized: ComputedRef<boolean> = computed(() => {
      return store.state.auth.auth.userEmail.length > 0;
    });

    const postDetails = (postId: number): void => {
      router.push(`/post/${postId}`);
    };

    const removePost = (postId: number): void => {
      store.dispatch("removePostAction", postId);
    };

    return {
      authorized,
      postDetails,
      removePost,
    };
  },
});
</script>

<style scoped lang="scss">
.single-post {
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
}

.remove-icon {
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
}
</style>
