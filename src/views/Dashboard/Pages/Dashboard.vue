<template>
  <div class="dashboard">
    <base-modal
      v-on:close="closeModal"
      v-bind:primary="showModal"
      open
      isMedium
      isFooterRight
    >
      <template v-slot:header>
        <div class="row">
          <div class="col-sm-12">
            <h3>Verifikasi Data</h3>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <verifikasi-data-form v-on:close="closeModal" />
      </template>
    </base-modal>

    <!--MODAL OID LIST-->
    <ModalDashboardMenu
      v-model="showDashboardMenu"
    />

    <div class="dashboard__content">
      <!-- <dashboard-title /> -->
      <div class="dashboard__content-wrapper">
        <slider />
        <div class="dashboard__footer">
          <dashboard-form v-on:onSubmit="onSubmitFormHandler" />
          <img src="@/assets/images/icon-magic-words.png" alt="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DashboardTitle from "../Components/DashboardTitle";
import DashboardForm from "../Components/DashboardForm";
import BaseModal from "../../../components/UI/BaseModal";
import Slider from "../Components/Slider";
import VerifikasiDataForm from "../Components/VerifikasiDataForm";
import { mapMutations } from "vuex";
import ModalDashboardMenu from "../Components/Modals/ModalDashboardMenu.vue";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeToAdira();
    });
  },
  components: {
    // "dashboard-title": DashboardTitle,
    "dashboard-form": DashboardForm,
    "base-modal": BaseModal,
    "verifikasi-data-form": VerifikasiDataForm,
    Slider,
    ModalDashboardMenu
  },
  data() {
    return {
      showModal: false,
      showDashboardMenu: { showModal: true }
    };
  },
  methods: {
    ...mapMutations(["changeToAdira"]),
    closeModal() {
      this.showModal = false;
    },
    onSubmitFormHandler() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: grid;
  padding: 0;
  height: calc(100vh - 70px);
  padding: 0px 0px 0px;
}

.dashboard__content {
  height: 100%;
  background-color: transparent;
  border-radius: 10px;
  box-sizing: border-box;
  padding-right: 5px;
  overflow: auto;
}

.dashboard__footer {
  display: flex;
  justify-content: space-around;
  padding: 10px 25px 0px;
  margin-top: 0.5rem;
}
img {
  width: 500px;
  height: 185px;
}

.dashboard__content-wrapper {
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: calc(100vh - 190px);
}

h1 {
  z-index: 1;
}
/* 
@media (min-width: 1600px) {
  img {
    width: 550px;
    height: 200px;
  }
  .dashboard__footer {
    padding-left: 50px;
    padding-right: 50px;
    margin-top: 1rem;
  }
} */

@media (min-width: 1600px) {
  img {
    width: 700px;
    height: 250px;
  }
  .dashboard__footer {
    justify-content: space-evenly;
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 1.5rem;
  }
}

@media (max-width: 1600px) and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  .dashboard__footer {
    padding: 10px 25px 0px;
    margin-top: 0px;
  }
}
</style>
