<template>
  <div class="menu penanganan-konsumen">
    <menu-title v-bind:title="title" />
    <!-- content -->
    <div class="menu__content-options">
      <!-- options -->
      <button
        class="opt1"
        v-bind:class="{ active: opt1 }"
        v-on:click="onClickOpt1"
      >
        History
      </button>
    </div>
    <div class="menu__content-form">
      <!-- form -->
      <history v-if="opt1" />
    </div>
  </div>
</template>

<script>
import MenuTitle from "../../../components/Layouts/MenuTitle/MenuTitle";
import History from "../Components/PenangananKonsumenData.vue";

export default {
  components: {
    "menu-title": MenuTitle,
    history: History,
  },
  data() {
    return {
      title: "Lainnya",
      opt1: true,
    };
  },
  methods: {
    onClickOpt1() {
      this.opt1 - true;
    },
  },
};
</script>

<style scoped>
.menu {
  border-radius: 10px;
  height: inherit;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px 0px 0px 20px;
  width: calc(100vw - 280px);
}

.menu__content-options .opt1 {
  padding: 15px;
  margin: 0px 20px;
  width: 150px;
  border: none;
  background: none;
  font-weight: bold;
  opacity: 0.4;
}

.opt1.active {
  border-bottom: solid 3px black;
  opacity: 1;
}

@media (min-width: 1920px) {
  .menu {
    width: calc(100vw - 320px);
  }
}
</style>
