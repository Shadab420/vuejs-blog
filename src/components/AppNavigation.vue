<template>
  <nav
    class="navbar navbar-light navbar-expand-lg p-2"
    style="background-color: #e3f2fd"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Vue Blog</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <span
            class="nav-link"
            v-if="authorized !== 'guest'"
            @click="triggerCreatePostDialog"
            >Create Post</span
          >

          <create-post-dialog :testProp="display" />

          <router-link
            class="nav-link"
            v-for="(link, i) in navLinks"
            :key="i"
            :to="link.link"
            >{{ link.name }}
          </router-link>

          <span class="nav-link" v-if="authorized !== 'guest'" @click="logout"
            >logout</span
          >

          <!-- <a class="nav-link" href="#"></a>
          <a class="nav-link" href="#">Pricing</a>
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            >Disabled</a
          > -->
        </div>
      </div>
    </div>
    <div class="d-flex">
      <InputText
        class="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model:value="searchKey"
        @input="setSearchKey"
      />
      <!-- <button class="btn btn-outline-success">
        <i class="pi pi-search"></i>
      </button> -->
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import NavLink from "@/types/NavLink";
import { useStore } from "vuex";
import CreatePostDialog from "./Post/CreatePostDialog.vue";

export default defineComponent({
  components: { CreatePostDialog },
  name: "AppNavigation",
  setup() {
    const store = useStore();
    // const userEmail: string = JSON.parse(
    //   localStorage.getItem("auth") as string
    // )?.email;
    const display = ref<boolean>(true);
    const searchKey = ""; //computed(() => store.state.searchKey);
    const authState = computed(() => store.state.auth.auth);
    const authorized = computed(() => {
      return authState.value.userEmail.length > 0 ? "auth" : "guest";
    });
    const allNavLinks: NavLink[] = [
      {
        name: "home",
        title: "home",
        link: "/",
        authorized: "all",
      },

      {
        name: "login",
        title: "login",
        link: "/login",
        authorized: "guest",
      },
      {
        name: "register",
        title: "register",
        link: "/register",
        authorized: "guest",
      },
      {
        name: "profile",
        title: "profile",
        link: "/profile",
        authorized: "auth",
      },
    ];

    const navLinks = computed(() =>
      allNavLinks.filter((link) => link.authorized === authorized.value)
    );

    const logout = () => {
      store.dispatch("logoutAction");
    };

    const triggerCreatePostDialog = () => {
      display.value = !display.value;
    };

    const setSearchKey = (e: Event) => {
      let eventTargetValue = (e.target as HTMLInputElement).value; // not mentioned in docs :|
      store.dispatch("setSearchKeyAction", eventTargetValue);
    };

    return {
      navLinks,
      logout,
      authorized,
      display,
      searchKey,
      triggerCreatePostDialog,
      setSearchKey,
    };
  },
});
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  .nav-link {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
