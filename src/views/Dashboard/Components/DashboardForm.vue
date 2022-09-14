<template>
  <div class="dashboard__content-form">
    <the-background v-bind:home="getBackground" v-bind:login="!getBackground" />
    <base-error-modal isSmall v-bind:error="error" v-on:close="clearError" />

    <!--MODAL OID LIST-->
    <modal-oid-list
      :oid="search"
      v-model="showOidList"
      :listData="{ data: listDataOid ? listDataOid.data : [] }"
      @onViewCustomer="searchCustomerAMAN"
    />

    <h4>Search Data Customer</h4>
    <form v-on:submit.prevent="submitHandler">
      <div class="row mb-3">
        <div class="col-sm-5">
          <select
            name="options"
            id="options"
            class="form-control form-control-sm"
            ref="selectOption"
          >
            <option selected value="">Pilih ...</option>
            <option
              v-for="opsi in getListOpsiDashboard"
              v-bind:key="opsi.value"
              v-bind:value="opsi.value"
            >
              {{ opsi.label }}
            </option>
          </select>
        </div>
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="search"
            ref="searchInput"
          />
        </div>
      </div>
      <div class="form__footer">
        <base-button type="submit" isPrimary v-bind:isLoading="isLoading">
          Cari
        </base-button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from "../../../components/UI/BaseButton";
import BaseErrorModal from "../../../components/UI/BaseErrorModal.vue";
import TheBackground from "../../../components/Layouts/Background/TheBackground.vue";
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
import ModalOidList from "./Modals/ModalOidList.vue";
import AmanAciSvc from "@/service/Aci/aman/amanAci";

export default {
  components: {
    "base-button": BaseButton,
    "base-error-modal": BaseErrorModal,
    "the-background": TheBackground,
    "modal-oid-list": ModalOidList,
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      search: "",
      error: null,
      option: "",
      inputValue: "",
      showOidList: { showModal: false },
      listDataOid: null,
    };
  },
  methods: {
    ...mapMutations([
      "onSearchingData",
      "onDataFound",
      "onSubmitSearch",
      "onChangeSearchInput",
      "changeCustomerInfo",
      "changeListCustDetail",
      "changeCustOid",
      "onChangeDataVerifikasi",
      "changePdkConfig",
      "changePdkMasking",
      "changePdkSrc",
      "changeListOpsiDashboard",
      "changeStatusAdiraku",
      "changeAdiraPoin",
      "resetNote",
    ]),
    searchCustomerAMAN({ option, inputValue }) {
      this.showOidList.showModal = false;
      // get data customer
      axios({
        method: "post",
        url:
          process.env.VUE_APP_AMANACI_URI +
          //process.env.VUE_APP_AMANACI_PORT +
          "/api/aman-aci/search-customer",
        data: {
          refOne: option,
          refTwo: inputValue,
        },
        timeout: 120000,
      })
        .then((res) => {
          if (res.data.szflagresponse === "1") {
            if (res.data.szout[0]) {
              this.changeCustOid(res.data.szoidno);
              this.changeCustomerInfo(res.data.szout[0]);
              this.onChangeDataVerifikasi({
                tglLahirNasabah: res.data.szout[0].customer_BIRTHDATE,
                namaIbuKandung: res.data.szout[0].customer_MOTHER_NAME.trim(),
                nomorKTP: res.data.szout[0].ktp,
                nomorHP: res.data.szout[0].handphone,
              });

              // get status adiraku
              axios({
                method: "POST",
                url: process.env.VUE_APP_ADIRAKU_URI + "/token",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Basic ${process.env.VUE_APP_ADIRAKU_KEY}`, // `Basic ZXNiMjpmMmY5OGFiMS05YjY4LTExZWItYjc2NS0wMDE2M2UwMTA1ODU=`,
                },
                data: {
                  grant_type: "client_credentials",
                },
              })
                .then((res) => {
                  let responseData = res.data;
                  axios({
                    method: "POST",
                    url:
                      process.env.VUE_APP_ADIRAKU_URI +
                      "/ms-account/channel/info-status-user",
                    headers: {
                      Authorization: `${responseData.data.token_type} ${responseData.data.access_token}`,
                    },
                    data: {
                      oid: this.custOID,
                    },
                    timeout: 120000,
                  })
                    .then((res) => {
                      this.changeStatusAdiraku(res.data.data.status);
                      // this.adirakuStatus = res.data.data.status;
                      if (res.data.data.status === "1") {
                        axios({
                          method: "post",
                          url:
                            process.env.VUE_APP_AMANACI_URI +
                            //process.env.VUE_APP_AMANACI_PORT +
                            "/api/aman-aci/getloyalty",
                          data: {
                            refOne: this.custOID,
                          },
                          timeout: 120000,
                        })
                          .then((res) => {
                            if (res.data.flagResponse === "0") {
                              this.changeAdiraPoin(res.data.adiraPoin);
                            }
                          })
                          .catch((err) => {
                            console.log(err.message);
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(err.message);
                    });
                })
                .catch((err) => {
                  console.log(err.message);
                  // this.error = {
                  //   message: `Gagal mendapatkan status adiraku. ${err.message}`,
                  // };
                });

              // get masking PDK
              axios({
                method: "POST",
                url:
                  process.env.VUE_APP_COMMON_URI +
                  //process.env.VUE_APP_COMMON_PORT +
                  "/api/comm-aci/pdk-config",
                data: {
                  refOne: process.env.VUE_APP_PDKCONFIG_DOMID,
                  refTwo: process.env.VUE_APP_PDKMASKCONF_DOMVAL,
                  refThr: "1",
                  refFou: "1",
                },
                timeout: 120000,
              })
                .then((res) => {
                  let listConfigMasking = res.data;
                  let maskConfig = {};
                  for (const mask of listConfigMasking) {
                    maskConfig = { ...maskConfig, ...mask };
                  }
                  this.changePdkMasking(maskConfig);
                  this.resetNote();
                  this.$router.push("/customer/profilnasabah");
                })
                .catch((error) => {
                  this.error = { message: error.message };
                  this.isLoading = false;
                  return;
                });
            } else {
              throw new Error(`No Data Found`);
            }
          } else {
            throw new Error(`${res.data.szmessage}`);
          }
        })
        .catch((error) => {
          this.error = { message: error.message };
          this.isLoading = false;
        });
    },
    submitHandler() {
      this.isLoading = false;
      this.inputValue = "";
      this.option = "";

      if (this.$refs.selectOption.value.trim() === "") {
        this.error = { message: "Mohon pilih opsi terlebih dahulu" };
        return;
      }

      if (this.$refs.searchInput.value.trim() === "") {
        this.error = { message: "Mohon isi input terlebih dahulu" };
        return;
      }

      if (
        this.$refs.selectOption.value.trim() == "01" &&
        this.$refs.searchInput.value.trim().length > 12
      ) {
        this.error = {
          message: "Mohon input nomor kontrak tidak lebih dari 12 karakter",
        };
        return;
      } else if (
        this.$refs.selectOption.value.trim() == "02" &&
        this.$refs.searchInput.value.trim().length < 3
      ) {
        this.error = {
          message: "No. Polisi kurang dari 3 digit.",
        };
        return;
      } else if (
        this.$refs.selectOption.value.trim() == "03" &&
        this.$refs.searchInput.value.trim().length < 10
      ) {
        this.error = {
          message: "No. Rangka kurang dari 10 digit.",
        };
        return;
      } else if (
        this.$refs.selectOption.value.trim() == "04" &&
        this.$refs.searchInput.value.trim().length < 6
      ) {
        this.error = {
          message: "No. Mesin kurang dari 6 digit.",
        };
        return;
      }
      //ACI phase 2 by dikna
      else if (
        this.$refs.selectOption.value.trim() == "07" &&
        this.$refs.searchInput.value.trim().length < 10
      ) {
        this.error = {
          message: "OID kurang dari 10 digit.",
        };
        return;
      }

      this.isLoading = true;
      this.inputValue = this.$refs.searchInput.value.trim();
      this.option = this.$refs.selectOption.value.trim();

      if (this.option == "02" || this.option == "03" || this.option == "04") {
        // search by nopol, nosin, norang ke cms

        //  get no kontrak di CMS
        axios({
          method: "post",
          url:
            process.env.VUE_APP_COLLAACI_URI +
            //process.env.VUE_APP_AMANACI_PORT +
            "/api/colla-aci/getcontno",
          data: {
            refOne: this.option,
            refTwo: this.inputValue,
          },
          timeout: 120000,
        })
          .then((res) => {
            let data = res.data;
            if (data.flagResponse == "0") {
              this.searchCustomerAMAN({ option: "01", inputValue: data.nomorKontrak } );
            } else {
              this.searchCustomerAMAN({ option: this.option, inputValue: this.inputValue });
            }
          })
          .catch(() => {
            this.error = {
              message: "Gagal mencari data",
            };
            this.isLoading = false;
            return;
          });
      } 
      else if (this.option == "06") {
        //search by oid ACI phase 2 by dikna
        this.isLoading = false;
        this.getListDataOid();
        this.showModalByName("viewOidList");
      } 
      else {
        this.searchCustomerAMAN({ option: this.option, inputValue: this.inputValue });
      }
    },
    searchData() {
      this.onSearchingData();
      this.onDataFound();
    },
    onClickSearchHandler() {
      this.showModal = true;
    },
    onClearModal() {
      this.showModal = false;
    },
    clearError() {
      this.error = null;
    },
    showModalByName(name) {
      switch (name) {
        case "viewOidList":
          this.showOidList.showModal = true;
          break;
      }
    },
    async getListDataOid() {
      const params = {
        flag: "06",
        oid: this.search,
      };
      
      const response = await AmanAciSvc.getListOid(params);
      this.listDataOid = response.data;
    },
  },
  computed: {
    ...mapGetters([
      "checkLoading",
      "checkDataFound",
      "getSearchInput",
      "getListOpsiDashboard",
      "getBackground",
    ]),
    ...mapGetters({
      custOID: "getCustOID",
    }),
  },

  created() {
    // list opsi dashboard
    if (this.getListOpsiDashboard.length === 0) {
      axios({
        method: "post",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/list-domain",
        data: {
          refOne: process.env.VUE_APP_LISTOPSI_DASH_DOMID,
          refTwo: process.env.VUE_APP_LISTOPSI_DASH_DOMVAL,
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      })
        .then((res) => {
          // result getListOpsiPromise
          let listOpsi = [];
          let listResponse = res.data.data;
          for (const data of listResponse) {
            const opsi = {
              label: data.value1,
              value: data.value2,
            };
            listOpsi.push(opsi);
          }

          this.changeListOpsiDashboard(listOpsi);
        })
        .catch((error) => {
          this.error = { message: error.message };
        });
    }
  },
};
</script>

<style scoped>
.dashboard__content-form {
  width: 550px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 20px;
  padding: 20px;
  display: inline-block;
  background-color: #f5f5f5;
}

.form__footer {
  display: flex;
  justify-content: flex-end;
}

form {
  margin-top: 1rem;
}

select {
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
}

.search {
  text-align: end;
}

span.found {
  color: green;
}

@media (min-width: 1600px) and (max-width: 1920px) {
  form {
    margin-top: 3rem;
  }

  .dashboard__content-form {
    width: 700px;
  }
}
</style>
