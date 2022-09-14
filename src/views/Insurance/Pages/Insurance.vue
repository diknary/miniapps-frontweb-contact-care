<template>
  <div class="menu insurance">
    <base-error-modal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />
    <base-modal
      v-on:close="closeModal"
      v-bind:primary="showModal"
      label="Nama Konsumen"
      v-bind:header="custInfo.customer_FULLNAME"
      open
      isLarge
      isFooterRight
    >
      <template v-slot:content>
        <insurance-selection v-bind:data="viewInsurance" />
        <div class="d-flex justify-content-end mr-2 mt-2 mb-2">
          <base-button type="button" isDanger v-on:click="closeModal()"
            >Kembali
          </base-button>
        </div>
      </template>
    </base-modal>
    <menu-title v-bind:title="title" />
    <div class="menu__content">
      <div class="menu__content-search row d-flex justify-content-end mr-2">
        <label for="searchGrid" class="col-sm-2 col-form-label-sm"
          >No. Kontrak</label
        >
        <div class="col-sm-2">
          <input
            id="searchQuery"
            v-model="searchQuery"
            type="text"
            class="form-control form-control-sm"
          />
        </div>
      </div>

      <div class="menu__content-grid">
        <table style="width: 100%" class="table table-hover">
          <tbody>
            <tr>
              <th>No.</th>
              <th>No Kontrak</th>
              <th>Objek</th>
              <th>Merk</th>
              <th>No. Polisi</th>
              <th>No. Mesin</th>
              <th>Action</th>
            </tr>
            <tr v-if="isLoading">
              <td colspan="11"><base-spinner show dots /></td>
            </tr>
            <tr v-else-if="filtered.length === 0">
              <td colspan="11">No Data Found</td>
            </tr>
            <tr v-for="(data, index) in filtered" v-bind:key="index">
              <td>{{ data.rownum }}</td>
              <td>{{ data.nomorKontrak }}</td>
              <td>{{ data.colaObjtCode }}</td>
              <td>{{ data.colaMerk }}</td>
              <td>{{ data.colaPlatNo }}</td>
              <td>{{ data.colaEngNo }}</td>
              <td>
                <base-button
                  type="button"
                  isPrimary
                  ref="filtered"
                  v-on:click="
                    onViewInsurance(
                      {
                        nomorKontrak: data.nomorKontrak,
                        nomorMesin: data.colaEngNo,
                      },
                      index
                    )
                  "
                  >View</base-button
                >
              </td>
            </tr>
          </tbody>
        </table>
        <ul class="pagination justify-content-end">
          <li v-bind:class="{ 'page-item': true, disabled: onPrev }">
            <a class="page-link" v-on:click.prevent="onClickPrev" tabindex="-1"
              >Previous</a
            >
          </li>
          <li v-bind:class="{ 'page-item': true, disabled: onNext }">
            <a class="page-link" v-on:click.prevent="onClickNext">Next</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTitle from "../../../components/Layouts/MenuTitle/MenuTitle";
import BaseModal from "../../../components/UI/BaseModal";
import BaseErrorModal from "../../../components/UI/BaseErrorModal.vue";
import BaseButton from "../../../components/UI/BaseButton";
import BaseSpinner from "../../../components/UI/BaseSpinner.vue";
import InsuranceSelection from "../Components/InsuranceSelection.vue";
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    "menu-title": MenuTitle,
    "base-button": BaseButton,
    "base-modal": BaseModal,
    "base-error-modal": BaseErrorModal,
    "base-spinner": BaseSpinner,
    "insurance-selection": InsuranceSelection,
  },
  data() {
    return {
      title: "Insurance",
      searchQuery: "",
      showModal: false,
      increment: 5,
      startIndex: 0,
      endIndex: 5,
      lastIndex: 0,
      error: null,
      isLoading: false,
      custName: "",
    };
  },
  methods: {
    ...mapMutations({
      changeViewInsurance: "changeViewInsurance",
      changeInsuranceDetail: "changeInsuranceDetail",
      clearInsuranceDetail: "clearInsuranceDetail",
      changeListCustDetail: "changeListCustDetail",
      changeListContract: "changeListContract",
      replaceListCustDetail:"replaceListCustDetail"
    }),
    onClickPrev() {
      if (this.startIndex >= 0) {
        this.startIndex = this.startIndex - this.increment;
        this.endIndex = this.endIndex - this.increment;
        if (this.startIndex < 0) {
          this.startIndex = 0;
          this.endIndex = this.startIndex + this.increment;
        }
      }
    },
    onClickNext() {
      if (this.endIndex < this.lastIndex) {
        this.endIndex = this.endIndex + this.increment;
        this.startIndex = this.startIndex + this.increment;
      }
    },
    closeModal() {
      this.showModal = false;
    },
    clearError() {
      this.error = null;
    },
    onViewInsurance(payload, index) {
      this.$refs.filtered[index].isLoading = true;

      let filterContInfo = this.listContract.find(
        (element) => element.noKontrak == payload.nomorKontrak
      );

      this.custName = filterContInfo.custName;

      axios({
        method: "POST",
        url:
          process.env.VUE_APP_AMANACI_URI +
          //process.env.VUE_APP_AMANACI_PORT +
          "/api/aman-aci/getdtlinsr",
        data: {
          refOne: payload.nomorKontrak,
          refTwo: payload.nomorMesin,
        },
        timeout: 120000,
      })
        .then((res) => {
          if (res.data) {
            let data = res.data;
            this.changeInsuranceDetail(data);
            this.showModal = true;
          } else {
            this.error = { message: "Tidak ada data yang ditemukan" };
          }
          this.$refs.filtered[index].isLoading = false;
        })
        .catch((err) => {
          this.error = { message: err.message };
          this.$refs.filtered[index].isLoading = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      namaCustomer: "getNamaCustomer",
      listCustDetail: "getListCustDetail",
      viewInsurance: "getViewInsurance",
      custInfo: "getCustomerInfo",
      custOid: "getCustOID",
      listContract: "getListContract",
    }),
    filtered() {
      if (!this.listCustDetail) {
        return [];
      } else if (this.searchQuery === "") {
        return this.listCustDetail.slice(this.startIndex, this.endIndex);
      }
      return this.listCustDetail
        .filter((data) => {
          return data.nomorKontrak.startsWith(this.searchQuery);
        })
        .slice(this.startIndex, this.endIndex);
    },
    onNext() {
      return this.endIndex >= this.lastIndex;
    },
    onPrev() {
      return this.startIndex == 0;
    },
  },
  created() {
    // get cust detail
    if (!this.listCustDetail || this.listCustDetail.length === 0) {
      // get all contract by oid
      this.isLoading = true;

      this.$store.dispatch('getContByOID', this.custOid).then((res)=>{
          if (res.data.szFlagResponse === "0") {
            let listContno = [];
            this.changeListContract(res.data.listDetail);
            for (const dtl of res.data.listDetail) {
              listContno.push(dtl.noKontrak);
            }
            this.$store.dispatch('getCollaAman', listContno).then((res)=>{
                let listAman = res.data;
                this.lastIndex = res.data.length;

                this.$store.dispatch('getCollaCMS', listContno).then((res) => {
                  this.replaceListCustDetail({aman:listAman, cms:res.data});
                  this.isLoading = false;
                });
            });
          }
      }).catch((error) => {
          this.isLoading = false;
          this.error = { message: error.message };
        });
    } else {
      this.lastIndex = this.listCustDetail.length;
    }
  },
  watch: {
    searchQuery: function(newVal) {
      if (newVal !== "") {
        this.startIndex = 0;
        this.endIndex = this.startIndex + this.increment;
        this.lastIndex = this.filtered.length;
      } else {
        this.lastIndex = this.listCustDetail.length;
      }
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

.searchGrid {
  text-align: right;
}
/* .menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
  background-color: #f8f9fa;
} */

.menu__content-grid {
  padding: 20px;
}

h1 {
  font-size: 12px;
  font-weight: bold;
}

tr {
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

th {
  background-color: #ffc5bf;
}

form {
  text-align: right;
  padding-bottom: 10px;
}

label {
  text-align: end;
}

.page-item {
  cursor: pointer;
}

@media (min-width: 1920px) {
  .menu {
    width: calc(100vw - 320px);
  }
}
</style>
