<template>
  <form @submit.prevent="sendForm" class="login-form w-50">
    <h3 v-if="isLoading">Loading...</h3>
    <div class="d-flex flex-column">
      <custom-input
        v-model="formData.email"
        label="Email"
        type="email"
        placeholder="Email"
      />

      <custom-input
        v-model="formData.password"
        label="Password"
        type="password"
        placeholder="Password"
      />
      <!-- <div>
      <label>Email:</label>
      <InputText v-model="formData.email" type="" placeholder="Location" />
    </div> -->
      <!-- <div>
      <label>Password:</label>
      <InputText v-model="formData.password" type="password" />
    </div> -->
    </div>
    <Button type="submit" class="mt-2">Submit</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { LoginData } from "@/types/auth/Auth";
import CustomInput from "../FormElements/CustomInput.vue";
// import axios from "axios";
import router from "@/router";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginForm",
  components: { CustomInput },
  setup() {
    const store = useStore();
    const formData = ref<LoginData>({ email: "", password: "" });
    const isLoading = store.state.isLoding;

    const sendForm = async () => {
      //api call
      // const res = await axios.post("http://localhost:3000/login", {
      //   email: formData.value.email,
      //   password: formData.value.password,
      // });

      await store.dispatch("loginAction", formData);
      await router.push("/");
    };

    return {
      formData,
      sendForm,
      isLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-form {
  margin: 20px 25%;
}
</style>
