<template>
  <div class="main-container">
    <h3>Login</h3>
    <login-form />
    <small
      >Don't have an account?
      <router-link to="/register">Register</router-link></small
    >
  </div>
</template>

<script lang="ts">
import LoginForm from "@/components/Auth/LoginForm.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: { LoginForm },
  name: "Login",
});
</script>

<style scoped lang="scss"></style>
