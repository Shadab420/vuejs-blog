<template>
  <div class="main-container">
    <h3>Register</h3>
    <register-form />
    <small
      >Already have an account?
      <router-link to="/login">Login</router-link></small
    >
  </div>
</template>

<script lang="ts">
import RegisterForm from "@/components/Auth/RegisterForm.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: { RegisterForm },
  name: "Register",
});
</script>

<style scoped></style>
