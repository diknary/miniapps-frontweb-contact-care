<template>
  <div>
    <b-overlay :show="isLoading" rounded="sm">
      <div class="list-pdk__content-grid">
        <table id="tablePdkCart" class="table table-hover pl-3">
          <tbody>
            <tr>
              <th>No</th>
              <th>Data Yang Dikinikan</th>
              <th>Data Baru</th>
              <th>File</th>
              <th>Status Verifikasi Dukcapil</th>
              <th>Action</th>
            </tr>
            <tr v-if="this.getPdkData.length === 0">
              <td colspan="5">No Data Found</td>
            </tr>

            <tr v-for="(data, index) in itemsShow" v-bind:key="index">
              <td class="td-text">{{ getNo(index) }}</td>
              <td class="td-text">{{ getPdkKind(data.refFou) }}</td>
              <td class="td-text">{{ data.refThr }}</td>
              <td>
                <tr v-if="data.fileOneName"> 
                  <td class="td-text"> {{ data.fileOneName }} </td>
                </tr>
                <tr v-if="data.fileTwoName"> 
                  <td class="td-text"> {{ data.fileTwoName }} </td>
                </tr>
              </td>
              <td class="td-text">
                {{ getStatusDukcapil(data.statusDukcapil) }}
              </td>
              <td class="td-button">
                <BaseButton
                  type="button"
                  isPrimary
                  ref="getPdkData"
                  v-on:click="deleteRow(data)"
                  >Delete</BaseButton
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="pagination justify-content-end py-3 pr-4">
        <b-pagination-nav
          v-model="currentPage"
          :number-of-pages="getTotalPage"
          base-url="#"
          first-number
          last-number
          class="pagination"
        ></b-pagination-nav>
      </ul>
    </b-overlay>
  </div>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    BaseButton,
  },
  props: {
    listData: {
      type: Object,
      default: function () {
        return {
          data: [],
        };
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemPerpage: 10,
      isValidated: false,
    };
  },
  methods: {
    ...mapMutations(["changeCartItem", "resetStatusPernikahan"]),
    getNo(index) {
      return index + 1 + (this.currentPage - 1) * this.itemPerpage;
    },
    deleteRow(inputValue) {
      console.log(inputValue);
      this.listData.data = this.getCartItem.filter(
        (item) => item.refFou != inputValue.refFou
      );
      this.changeCartItem(this.listData.data);

      this.resetStatus(inputValue);
    },

    getPdkKind(value) {
      const config = this.getPdkConfig.find((c) => c.pdkKind == value);

      return config.label;
    },

    getStatusDukcapil(status) {
      switch (status.toUpperCase()) {
        case "UNMATCH":
          return "Tidak Sesuai";
        case "MATCH":
          return "Sesuai";
        default:
          return status;
      }
    },

    resetStatus(inputValue) {
      switch (inputValue.refFou) {
        case "42":
          this.resetStatusPernikahan({
            id: inputValue.refEig,
            text: inputValue.oldData,
            desc: inputValue.oldData,
          });
          break;
        default:
          break;
      }
    },
  },
  computed: {
    ...mapGetters(["getCartItem", "getPdkConfig", "getOldDataChange"]),
    getTotalPage() {
      let total = this.getPdkData
        ? Math.ceil(this.getPdkData.length / this.itemPerpage)
        : 1;
      return total == 0 ? 1 : total;
    },
    itemsShow() {
      let skip = (this.currentPage - 1) * this.itemPerpage;
      let take = this.currentPage * this.itemPerpage;
      return this.getPdkData.slice(skip, take);
    },
    getPdkData() {
      if (!this.listData.data) {
        return [];
      }

      return this.listData.data;
    },
  },
};
</script>

<style scoped>
.status-options {
  border: none;
  background-color: #ffc5bf;
  padding: 0;
  text-align: center;
  font-weight: bold;
  width: 85%;
  color: black;
  font-size: 14px;
  cursor: pointer;
}

.status-options option {
  background-color: white;
  font-size: 1rem;
}

.status-options:focus {
  box-shadow: none;
}

td.td-text {
  padding: 12px 12px 0 12px;
  height: 50px;
  vertical-align: middle;
}

th.th-status {
  padding: 0;
  padding-top: 5px;
}

td.td-button {
  padding: 5px;
  vertical-align: middle;
}
.td-button .primary {
  border-radius: 4px;
  width: 50%;
}
.td-button .primary:hover {
  background-color: #95a5a6;
}
.primary.btn-needcheck {
  background-color: #e74c3c;
}
.primary.btn-needapproval {
  background-color: #2ecc71;
}
.primary.btn-needconfirm {
  background-color: #f1c40f;
}
.menu {
  border-radius: 10px;
  padding-top: 20px;
  height: inherit;
  background-color: #f8f9fa;
}

#tablePdkCart {
  width: 930px !important;
}

#tablePdkCart th {
  position: sticky;
  top: 0;
}

.list-pdk__content-grid {
  overflow: auto;
  height: 200px;
  padding: 5px 20px 20px 20px;
}

.col-form-label-sm {
  text-align: left;
  margin: 0;
  padding: 5px 5px 5px 35px;
}

.search-container {
  display: flex;
  margin: 5px;
}

.search-label {
  margin: 0;
  padding: 5px 15px 5px 25px;
  font-size: 1rem;
}

.search-input {
  margin-left: 5px;
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
  text-align: center;
}

form {
  text-align: right;
  padding-bottom: 10px;
}

.page-item {
  cursor: pointer;
}

.background {
  background-color: transparent;
}

.page-item.active .page-link {
  background-color: #ffc5bf;
  border-color: #ffc5bf;
  color: rgba(0, 0, 0, 0.795);
}
.pagination .page-link {
  color: rgba(0, 0, 0, 0.795);
}
</style>
