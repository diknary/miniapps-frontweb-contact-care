<template>
  <div id="app">
    <the-background v-bind:home="getBackground" v-bind:login="!getBackground" />
    <the-header v-if="getShowHeaders" />
    <router-view />
  </div>
</template>

<script>
import TheBackground from "./components/Layouts/Background/TheBackground";
import TheHeader from "./components/Layouts/Header/TheHeader";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    "the-background": TheBackground,
    "the-header": TheHeader,
  },
  computed: {
    ...mapGetters(["getShowHeaders", "getBackground"]),
    isIdle() {
      return (
        this.$route.path.split("/")[1] != "login" &&
        this.$route.path.split("/")[1] != "sessiontimeout"
      );
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Nunito";
  src: local("Nunito"),
    url("./shared/fonts/Nunito-Regular.ttf") format("truetype");
}

* {
  padding: 0;
  margin: 0;
  outline: none;
  box-sizing: border-box;
  scrollbar-width: thin;
  font-family: "Nunito", Arial, Helvetica, sans-serif;
}

body {
  height: 100vh;
  width: 100vw;
  scroll-behavior: smooth;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .menu {
    width: calc(100vw - 280px);
  }
}

#app {
  height: 100vh;
  width: 100vw;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.form-control-xs {
  height: calc(1em + 0.375rem + 2px) !important;
  padding: 0.125rem 0.25rem !important;
  font-size: 0.75rem !important;
  line-height: 1.5;
  border-radius: 0.2rem;
}
</style>
