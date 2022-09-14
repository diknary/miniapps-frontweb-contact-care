<template>
  <div class="menu collection">
    <div class="menu__content">
      <div class="menu__content-options">
        <!-- options -->
        <button
          class="opt1"
          v-bind:class="{ active: opt1 }"
          v-on:click="onClickOpt1"
        >
          Riwayat Penanganan
        </button>
        <button
          class="opt2"
          v-bind:class="{ active: opt2 }"
          v-on:click="onClickOpt2"
        >
          Riwayat Penarikan
        </button>
      </div>
      <div class="menu__content-form">
        <!-- form -->
        <riwayat-penanganan-form v-if="opt1" />
        <riwayat-penarikan-form v-else-if="opt2" />
      </div>
    </div>
  </div>
</template>

<script>
import RiwayatPenangananForm from "../Components/RiwayatPenangananForm";
import RiwayatPenarikanForm from "../Components/RiwayatPenarikanForm";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    "riwayat-penanganan-form": RiwayatPenangananForm,
    "riwayat-penarikan-form": RiwayatPenarikanForm,
  },
  data() {
    return {
      opt1: true,
      opt2: false,
    };
  },
  methods: {
    ...mapMutations({
      onChangeRiwayat: "changeRiwayat",
      clearRiwayat: "clearRiwayat",
    }),
    onClickOpt1() {
      this.opt1 = true;
      this.opt2 = false;
    },
    onClickOpt2() {
      this.opt1 = false;
      this.opt2 = true;
    },
  },
  props: ["data"],
  computed: {
    ...mapGetters({
      riwayat: "getRiwayat",
    }),
  },
  beforeDestroy() {
    this.clearRiwayat();
  },
};
</script>

<style scoped>
.menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
}

.menu__content-search {
  padding-left: 40px;
}

h1 {
  font-size: 12px;
  font-weight: bold;
  padding-left: 20px;
}

.collection {
  background-color: #f8f9fa;
}

.menu__content {
  height: calc(100vh - 170px);
}

.menu__content-options {
  padding: 20px;
  display: flex;
  justify-content: flex-start;
}

.menu__content-options .opt1,
.menu__content-options .opt2 {
  padding: 15px;
  margin: 0px 20px;
  width: 200px;
  border: none;
  background: none;
  font-weight: bold;
  opacity: 0.4;
}

.opt1.active,
.opt2.active {
  border-bottom: solid 3px black;
  opacity: 1;
}

.menu__content-form {
  height: calc(100vh - 310px);
  overflow: auto;
}
</style>
