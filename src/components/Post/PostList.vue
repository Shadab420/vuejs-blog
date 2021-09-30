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
import { computed, defineComponent, onMounted, ref } from "vue";
// import axios from "axios";
import Post from "@/types/Post";
import SinglePost from "@/components/Post/SinglePost.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PostList",
  components: { SinglePost },
  /**
   * options api
   */

  created() {
    this.$store.dispatch("getAllPostsAction");
  },

  computed: {
    isLoading(): boolean {
      return this.$store.state.isLoading;
    },

    allPosts(): Post[] {
      // return this.$store.state.posts;

      let searchKey = this.$store.state.searchKey;
      if (searchKey !== "") {
        return this.$store.state.posts.filter(
          (post: Post) =>
            post.title?.toLowerCase()?.indexOf(searchKey.toLowerCase()) !== -1
        );
      }

      return this.$store.state.posts;
    },
  },

  /**
   * composition api
   */

  // setup() {
  //   const store = useStore(); //vuex store

  //   let allPosts = ref<Post[]>([]);
  //   const isLoading = computed(() => store.state.isLoading);

  //   onMounted(() => {
  //     store.dispatch("getAllPostsAction").then(() => {
  //       allPosts.value = store.state.posts;
  //     });
  //   });

  //   return {
  //     allPosts,
  //     isLoading,
  //   };
  // },
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
