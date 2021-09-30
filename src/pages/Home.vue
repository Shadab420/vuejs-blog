<template>
  <div class="main-container">
    <PostList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostList from "@/components/Post/PostList.vue";
export default defineComponent({
  name: "HomePage",
  components: { PostList },
});
</script>

<style scoped></style>
