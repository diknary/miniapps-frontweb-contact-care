<template>
  <div class="global-wrapper">
    <navigation-bar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "../../../components/Layouts/Navbar/Navbar";
import { mapMutations } from "vuex";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeToNasabah();
    });
  },
  components: {
    "navigation-bar": Navbar,
  },
  methods: {
    ...mapMutations([
      "changeToNasabah",
      "changeListCustDetail",
      "changeCustomerInfo",
      "unVerifiedUser",
      "onResetDataCustomer",
      "onResetDataVerifikasi",
      "onResetOldDataChange",
      "resetPdkConfig",
      "resetPdkMasking",
      "resetPdkSrc",
      "resetFormPengkinian",
    ]),
  },
  destroyed() {
    this.changeListCustDetail(null);
    this.changeCustomerInfo(null);
    this.unVerifiedUser();
    this.onResetDataCustomer();
    this.onResetDataVerifikasi();
    this.onResetOldDataChange();
    this.resetPdkConfig();
    this.resetPdkMasking();
    this.resetPdkSrc();
    this.resetFormPengkinian();
  },
};
</script>

<style scoped>
.global-wrapper {
  display: grid;
  grid-template-columns: 280px auto;
  padding: 0;
  height: calc(100vh - 70px);
}

.menu-enter-active {
  animation: menu 1s ease-out;
}

.menu-leave-active {
  animation: menu-close 1s ease-out;
}

@keyframes menu {
  from {
    opacity: 0;
    /* transform: translateY(-50px) scale(0.9); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0) scale(1); */
  }
}

@keyframes menu-close {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (min-width: 1920px) {
  .global-wrapper {
    grid-template-columns: 320px auto;
  }
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .global-wrapper {
    display: flex;
  }
}
</style>
