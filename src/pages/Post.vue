<template>
  <div class="main-container">
    <p v-if="isLoading">Loading...</p>
    <div v-else>
      <h3>{{ post.title }} by {{ post.author }}</h3>
      <p>{{ post.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Post from "@/types/Post";
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Post",
  components: {},

  setup() {
    const store = useStore();
    const route = useRoute();
    // const post = ref<Post>({});
    const isLoading: ComputedRef<boolean> = computed(
      (): boolean => store.state.isLoading
    );

    const post: ComputedRef<Post> = computed((): Post => store.state.post.post);

    onMounted(() => {
      const { postId } = route.params;

      store.dispatch("getPostByIdAction", postId);
    });

    onUnmounted(() => store.dispatch("clearPostDataAction"));

    return {
      isLoading,
      post,
    };
  },
});
</script>
