<template>
  <div class="global-wrapper">
    <navigation-bar />
    <router-view />
    <base-error-modal isSmall v-bind:error="error" v-on:close="clearError" />
  </div>
</template>

<script>
import Navbar from "../../components/Layouts/Navbar/Navbar.vue";
import { mapMutations } from "vuex";
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    "navigation-bar": Navbar,
    "base-error-modal": BaseErrorModal,
  },
  mounted() {
    this.initializeApp();
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    ...mapMutations([
      "changeUser",
      "login",
      "changeShowHeaders",
      "changeBackground",
      "onChangeNik",
      "onChangePassword",
      "onBlurNik",
      "onBlurPassword",
      "changeListMenu",
      "changeListOpsiDashboard",
      "changeUserName",
      "loginNik",
      "changeJobDesc",
      "changeJobGr",
      "resetPermissionMatrix",
    ]),

    async initializeApp() {
      const nik = this.$route.query.NIK;
      const brid = this.$route.query.BRID;
      try {
        // const responseMtx = await Ad1acc.getPermissionMatrixEGR(nik);
        // const responseAcc = await Ad1acc.getEmployeeInfo(nik); //"10018854", "10007876");
        
        const responseMtx = {
          status: 200,
          data: [
            {
              applicationAlias: "IDM.CONTACTCARE"
            }
          ]
        };

        const responseAcc = {
          status: 200,
          data: [
            {
              fullname: "TEST UUK"
            }
          ]
        };

        if (
          responseAcc.status == 200 &&
          responseAcc.data.length > 0 &&
          responseMtx.data.length > 0
        ) {
          this.changeUser(responseAcc.data[0].fullname);
          this.setJobMatrix(nik, brid, responseMtx.data);
          //const response = await EGRCommAci.getMenuEvaluatorGR();
          const response = {
            status: 200,
            data: {
              message: "OK",
              data: [
                {
                  value1: "/contact-care/create",
                  value2: "Case Create",
                  value3: "images/icons/data-kontrak",
                  value4: "IDM.CONTACTCARE"
                }
              ]
            }
          }
          if (response.status == 200) {
            let listMenu = [];
            // let listMenuAkses = this.getMenuAkses(
            //   responseMtx.data,
            //   response.data.data
            // );
            let listMenuAkses = response.data.data;
            for (const data of listMenuAkses) {
              const menu = {
                href: data.value1,
                title: data.value2,
                source: data.value3,
              };
              listMenu.push(menu);
            }

            this.changeListMenu(listMenu);
            this.login();
            this.changeBackground(true);
            this.changeShowHeaders(true);
            this.$router.push("/contact-care/create").catch(() => {});
          } else {
            this.error = { message: response.data.message };
          }
        } else {
          this.resetPermissionMatrix();
          this.$router.push("/unauthorized").catch(() => {});
        }
      } catch (err) {
        this.resetPermissionMatrix();
        this.$router.push("/unauthorized").catch(() => {});
      }
      this.isLoading = false;
    },
    setJobMatrix(nik, brid, matrix) {
      console.log("USER MATRIX : ", matrix);
      const dataParkirIdx = matrix.findIndex((item) => {
        return item.applicationAlias == "IDM.EVALUATORGR.DATAPARKIR";
      });
      const reportIdx = matrix.findIndex((item) => {
        return item.applicationAlias == "IDM.EVALUATORGR.REPORT";
      });
      if (dataParkirIdx > -1) {
        let job = "PIC_CABANG";
        if (reportIdx > -1) {
          brid = "0000";
          job = "PIC_HO";
        }
        this.loginNik({ nik: nik, brid: brid });
        this.changeJobGr(job);
      } else {
        this.resetPermissionMatrix();
        this.$router.push("/unauthorized").catch(() => {});
      }
    },
    getMenuAkses(userMatrix, listMenu) {
      return listMenu.filter((item) => {
        return (
          userMatrix.findIndex((mtx) => {
            return mtx.applicationAlias == item.value4;
          }) > -1
        );
      });
    },
    clearError() {
      this.error = null;
    },
  },
  computed: {
    ...mapGetters(["getNik", "getBranchId", "getJob"]),
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
