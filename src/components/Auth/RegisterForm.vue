<template>
  <form @submit.prevent="sendForm" class="register-form w-50">
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

      <custom-input
        v-model="formData.confirmPass"
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
      />
    </div>
    <!-- <div>
      <label>Email:</label>
      <InputText v-model="formData.email" type="" placeholder="Location" />
    </div> -->
    <!-- <div>
      <label>Password:</label>
      <InputText v-model="formData.password" type="password" />
    </div> -->
    <Button type="submit" class="mt-2">Submit</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RegisterData } from "@/types/auth/Auth";
import CustomInput from "../FormElements/CustomInput.vue";
import axios from "axios";
import router from "@/router";

export default defineComponent({
  name: "RegisterForm",
  components: { CustomInput },
  setup() {
    const formData = ref<RegisterData>({
      email: "",
      password: "",
      confirmPass: "",
    });

    const sendForm = async () => {
      if (formData.value.password !== formData.value.confirmPass) {
        console.log("Password didn't match!");
        return;
      }

      //api call
      const res = await axios.post("http://localhost:3000/register", {
        email: formData.value.email,
        password: formData.value.password,
      });

      if (res.data) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            email: res.data.user.email,
            token: res.data.accessToken,
          })
        );
        router.push("/");
      }
    };

    return {
      formData,
      sendForm,
    };
  },
});
</script>

<style scoped lang="scss">
.register-form {
  margin: 20px 25%;
}
</style>
