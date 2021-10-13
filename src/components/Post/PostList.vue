<template>
  <h3>List of Posts</h3>
  <p v-if="isLoading === true">Loading...</p>
  <p v-else-if="!allPosts.length">No Posts!</p>
  <div
    v-else
    v-for="post in allPosts"
    :key="post.id"
    class="
      single-post-container
      d-flex
      justify-content-between
      align-items-center
    "
  >
    <SinglePost :post="post" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from "vue";
// import axios from "axios";
import Post from "@/types/Post";
import SinglePost from "@/components/Post/SinglePost.vue";
import { mapActions, mapState, useStore } from "vuex";
import { PostState } from "@/types/vuex-state/PostState";

export default defineComponent({
  name: "PostList",
  components: { SinglePost },
  /**
   * options api
   */

  // created() {
  //   this.getAllPostsAction();
  // },

  // methods: {
  //   ...mapActions(["getAllPostsAction"]),
  // },

  // computed: {
  //   isLoading(): boolean {
  //     return this.post.isLoading;
  //   },

  //   allPosts(): Post[] {
  //     // return this.$store.state.posts;

  //     let searchKey = this.post.searchKey;
  //     if (searchKey !== "") {
  //       return this.post.posts.filter(
  //         (post: Post) =>
  //           post.title?.toLowerCase()?.indexOf(searchKey.toLowerCase()) !== -1
  //       );
  //     }

  //     return this.post.posts;
  //   },

  //   ...mapState(["post"]),
  // },

  /**
   * composition api
   */

  setup() {
    const store = useStore(); //vuex store

    const postState: PostState = store.state.post; //post

    let allPosts = computed(() => {
      if (postState.searchKey !== "") {
        return postState.posts.filter(
          (post: Post) =>
            post.title
              ?.toLowerCase()
              ?.indexOf(postState.searchKey.toLowerCase()) !== -1
        );
      }

      return postState.posts;
    });
    const isLoading: ComputedRef<boolean> = computed(
      () => store.state.isLoading
    );

    onMounted(() => {
      store.dispatch("getAllPostsAction");
    });

    return {
      allPosts,
      isLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.single-post-container {
  background: honeydew;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 5px;
  background: honeydew;
  color: royalblue;
  transition: 0.3s all ease-in-out;

  &:hover {
    background: rgb(203, 247, 203);
  }
}
</style>
