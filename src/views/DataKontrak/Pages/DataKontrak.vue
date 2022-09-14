<template>
  <div class="menu data-kontrak">
    <!-- modal error -->
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
      v-bind:header="custName"
      title="Detail Kontrak"
      open
      isLarge
      isFooterRight
    >
      <template v-slot:header> </template>
      <template v-slot:content>
        <data-kontrak-detail />
        <div class="d-flex justify-content-end mr-2 mt-3">
          <base-button type="button" isDanger v-on:click="closeModal"
            >Kembali
          </base-button>
          <base-button
            type="button"
            isSuccess
            v-on:click="printSK"
            v-bind:isLoading="loadingSk"
            >Print SK Konsumen</base-button
          >
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
                    onViewKontrak(
                      {
                        nomorKontrak: data.nomorKontrak,
                        colaNo: data.colaNo,
                        colaId: data.colaId,
                        colaPlatNo: data.colaPlatNo,
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
import BaseButton from "../../../components/UI/BaseButton";
import BaseModal from "../../../components/UI/BaseModal";
import BaseErrorModal from "../../../components/UI/BaseErrorModal.vue";
import BaseSpinner from "../../../components/UI/BaseSpinner.vue";
import DataKontrakDetail from "../Components/DataKontrakDetail";
import { generateDocumentSK } from "../../../shared/utils/document";
import axios from "axios";
// import https from "https";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    "menu-title": MenuTitle,
    "base-button": BaseButton,
    "base-modal": BaseModal,
    "base-error-modal": BaseErrorModal,
    "base-spinner": BaseSpinner,
    "data-kontrak-detail": DataKontrakDetail,
  },
  data() {
    return {
      title: "Data Kontrak",
      searchQuery: "",
      showModal: false,
      increment: 5,
      startIndex: 0,
      endIndex: 5,
      lastIndex: 0,
      loadingSk: false,
      error: null,
      isLoading: false,
      custName: "",
    };
  },
  methods: {
    ...mapMutations({
      changeViewKontrak: "changeViewKontrak",
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
    printSK() {
      this.loadingSk = true;
      // generateDocumentSK;
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_AMANACI_URI +
          //process.env.VUE_APP_AMANACI_PORT +
          "/api/aman-aci/doc/documentsk",
        data: {
          refOne: this.brid,
          refTwo: this.viewKontrak.noKontrak,
        },
        timeout: 120000,
      })
        .then((res) => {
          if (res.data && res.data.length > 0) {
            if (res.data[0].flagresponse === "4") {
              this.error = { message: res.data[0].errormessage };
            } else {
              generateDocumentSK(res.data[0]);
            }
          } else {
            throw new Error(
              "Gagal generate document, silahkan mencoba kembali di lain waktu"
            );
          }

          this.loadingSk = false;
        })
        .catch((error) => {
          this.error = { message: error.message };
          this.loadingSk = false;
        });
    },
    closeModal() {
      this.showModal = false;
    },
    clearError() {
      this.error = null;
    },
    onViewKontrak(payload, index) {
      this.$refs.filtered[index].isLoading = true;

      let filterContInfo = this.listContract.find(
        (element) => element.noKontrak == payload.nomorKontrak
      );

      this.custName = filterContInfo.custName;

      axios({
        method: "post",
        url:
          process.env.VUE_APP_AMANACI_URI +
          //process.env.VUE_APP_AMANACI_PORT +
          "/api/aman-aci/get-dtl-cont",
        data: {
          refOne: payload.nomorKontrak,
        },
        timeout: 120000,
      })
        .then((res) => {
          if (res.data) {
            this.changeViewKontrak(res.data);
            this.showModal = true;
          } else {
            this.error = { message: "Tidak ada data yang ditemukan" };
          }
          this.$refs.filtered[index].isLoading = false;
        })
        .catch((error) => {
          this.error = { message: error.message };
          this.$refs.filtered[index].isLoading = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      namaCustomer: "getNamaCustomer",
      listCustDetail: "getListCustDetail",
      custInfo: "getCustomerInfo",
      viewKontrak: "getViewKontrak",
      brid: "getBranchId",
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
      this.isLoading = true;
      // get all contract by oid
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
  padding: 20px 20px 0px;
  height: inherit;
  background-color: #f8f9fa;
}

.menu__content-grid {
  padding: 20px;
}

label {
  text-align: end;
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

.page-item {
  cursor: pointer;
}
</style>
