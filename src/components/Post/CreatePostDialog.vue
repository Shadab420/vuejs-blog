<template>
  <!-- <Button label="Show" icon="pi pi-external-link" @click="openBasic" /> -->
  <Toast />
  <!-- <span class="nav-link" @click="openBasic" v-bind="$attrs">Create Post</span> -->
  <Dialog
    header="New Post"
    v-model:visible="display"
    :style="{ width: '50vw' }"
  >
    <p v-if="success.length" class="text-success">{{ success }}</p>
    <p v-if="error.length" class="text-danger">{{ error }}</p>
    <div class="d-flex flex-column">
      <custom-input
        v-model="formData.title"
        label="Title"
        type="text"
        placeholder="Title"
      />
      <custom-input
        v-model="formData.description"
        label="Description"
        type="text"
        placeholder="Description"
      />
    </div>
    <template #footer>
      <Button
        label="Reset"
        icon="pi pi-times"
        @click="reset"
        class="p-button-text"
      />
      <Button label="Submit" icon="pi pi-check" @click="submitPost" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts">
import Post from "@/types/Post";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
} from "@vue/runtime-core";
import Dialog from "primevue/dialog";
import { useStore } from "vuex";
import CustomInput from "../FormElements/CustomInput.vue";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "CreatePostDialog",
  components: { Dialog, CustomInput },
  props: {
    testProp: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },

  /**
   * compostition api
   */
  setup(props) {
    const display = ref<boolean>(false);
    const success = ref<string>("");
    const error = ref<string>("");
    const timeout = ref<ReturnType<typeof setTimeout>>();
    const formData = ref<Post>({
      title: "",
      description: "",
    });

    const store = useStore();
    const toast = useToast();

    const openBasic = () => {
      display.value = true;
    };
    const closeBasic = () => {
      display.value = false;
    };
    const reset = () => {
      formData.value = {
        title: "",
        description: "",
      };
    };

    const showMessage = (
      severity: string,
      summary: string,
      detail: string
    ): void => {
      toast.add({
        severity,
        summary,
        detail,
        life: 3000,
      });
    };

    //lifecycle hooks

    onUnmounted(() => {
      console.log("timeout cleared!");
      clearTimeout(timeout.value);
    });

    watch(
      () => props.testProp,
      (newVal, oldVal) => {
        console.log("From parent: display = ", newVal, oldVal);
        openBasic();
      }
    );

    // methods

    const submitPost = () => {
      if (formData.value.title === "") {
        showMessage("error", "Title is blank!", "Please fillup 'title' field.");
        return;
      }

      store
        .dispatch("createPostAction", {
          ...formData.value,
          author: store.state.auth.userEmail,
        })
        .then(() => {
          //   success.value = "Post added!";
          showMessage("success", "Post added!", "Post added successfully!");

          reset();

          timeout.value = setTimeout(() => closeBasic(), 1000);
        })
        .catch(() => {
          error.value = "Error occured!";
        });
    };

    const sayHello = () => {
      console.log("hello shadab! I am child!");
    };

    return {
      display,
      success,
      error,
      formData,
      openBasic,
      closeBasic,
      reset,
      submitPost,
      sayHello,
    };
  },
});
</script>

<style scoped></style>
