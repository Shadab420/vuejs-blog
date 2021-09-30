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
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "SinglePost",
  props: {
    post: Object as PropType<Post>,
  },

  methods: {
    postDetails(postId: number): void {
      router.push(`/post/${postId}`);
    },

    removePost(postId: number): void {
      this.$store.dispatch("removePostAction", postId);
    },
  },

  computed: {
    authorized() {
      return this.$store.state.auth.userEmail.length > 0;
    },
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
