<template>
  <div>
    <div class="search-container">
      <div class="d-flex justify-content-between">
        <div>
          <label for="searchGrid" class="search-label">Periode</label>
        </div>
        <div class="px-4">
          <EGRDatePicker
            id="periodeFrom"
            v-model="periodeFrom"
            @change="filterData"
          />
        </div>
        <div class="px-4">
          <EGRDatePicker
            id="periodeTo"
            v-model="periodeTo"
            @change="filterData"
          />
        </div>
      </div>
      <div class="d-flex justify-content-between pl-4">
        <div>
          <label for="searchGrid" class="search-label">Status</label>
        </div>
        <div>
          <EGRBaseSelect
            id="statusData"
            type="text"
            v-model="selectedStatus"
            :options="statusOptions"
            disabled
            @change="filterData"
          />
        </div>
      </div>
    </div>

    <b-overlay :show="isLoading" rounded="sm">
      <div class="menu-report__content-grid">
        <table id="tableReportGR" class="table table-hover pl-3">
          <tbody>
            <tr>
              <th>No</th>
              <th>Area</th>
              <th>Kode Cabang</th>
              <th>Nama Cabang</th>
              <th>OID</th>
              <th>No Kontrak</th>
              <th>Nama Field</th>
              <th>Data Lama</th>
              <th>Data Baru</th>
              <th>Tanggal PPD</th>
              <th>Tanggal Update</th>
              <th>Tanggal Submit</th>
              <th>Status</th>
            </tr>
            <tr v-if="this.filtered.length === 0">
              <td colspan="11">No Data Found</td>
            </tr>

            <tr v-for="(data, index) in itemsShow" v-bind:key="index">
              <td class="td-text">{{ getNo(index) }}</td>
              <td class="td-text">{{ data.area }}</td>
              <td class="td-text">{{ data.branch }}</td>
              <td class="td-text">{{ data.branchName }}</td>
              <td class="td-text">{{ data.oid }}</td>
              <td class="td-text">{{ data.contractNo }}</td>
              <td class="td-text">{{ data.grField }}</td>
              <td class="td-text">{{ data.grOldData }}</td>
              <td class="td-text">{{ data.grNewData }}</td>
              <td class="td-text">{{ data.ppdDate }}</td>
              <td class="td-text">{{ data.updatedDate }}</td>
              <td class="td-text">{{ data.submitDate }}</td>
              <td class="td-text">{{ getStatusText(data.status) }}</td>
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
import EGRDatePicker from "@/components/FormsElement/EvaluatorGR/EGRDatePicker.vue";
import EGRBaseSelect from "@/components/FormsElement/EvaluatorGR/EGRBaseSelect.vue";
import { format } from "date-fns";

export default {
  components: {
    EGRDatePicker,
    EGRBaseSelect,
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
      statusOptions: [
        {
          value: "",
          text: "",
        },
        {
          value: "0",
          text: "Need Check",
        },
        {
          value: "1",
          text: "Need Approval",
        },
        {
          value: "2",
          text: "Need Confirm",
        },
        {
          value: "3",
          text: "Done",
        },
      ],
      selectedStatus: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      periodeFrom: {
        value: "",
        isValid: false,
        error: "",
        validators: [],
      },
      periodeTo: {
        value: "",
        isValid: false,
        error: "",
        validators: [],
      },
      isValidated: false
    };
  },
  methods: {
    getNo(index) {
      return index + 1 + (this.currentPage - 1) * this.itemPerpage;
    },
    filterData() {
      this.currentPage = 1;
    },
    validation() {
      let today = format(new Date(), "dd-MM-yyyy");
      let validatePeriodeFrom = false;
      let validatePeriodeTo = false;

      if (this.periodeTo.value) {
        if (format(new Date(this.periodeTo.value), "dd-MM-yyyy") > today) {
          this.periodeTo.isValid = false;
          this.periodeTo.error = "Tidak boleh melebihi hari ini";
        } else {
          this.periodeTo.isValid = true;
          this.periodeTo.error = "";
          validatePeriodeTo = true;
        }
      }
      
      if (this.periodeFrom.value) {
        if (format(new Date(this.periodeFrom.value), "dd-MM-yyyy") > today) {
          this.periodeFrom.isValid = false;
          this.periodeFrom.error = "Tidak boleh melebihi hari ini";
        } else {
          this.periodeFrom.isValid = true;
          this.periodeFrom.error = "";
          validatePeriodeFrom = true;
        }
      }

      if(validatePeriodeFrom && validatePeriodeTo) {
        this.isValidated = true;
      } else { 
        this.isValidated = false;
      }
    }
  },
  computed: {
    getTotalPage() {
      let total = this.filtered
        ? Math.ceil(this.filtered.length / this.itemPerpage)
        : 1;
      return total == 0 ? 1 : total;
    },
    itemsShow() {
      let skip = (this.currentPage - 1) * this.itemPerpage;
      let take = this.currentPage * this.itemPerpage;
      return this.filtered.slice(skip, take);
    },
    filterStatus() {
      if (!this.listData.data) {
        return [];
      }
      if (!this.selectedStatus.value) {
        return this.listData.data;
      }
      return this.listData.data.filter(
        (data) => data.status === this.selectedStatus.value
      );
    },
    filterPeriode() {
      if (!this.periodeFrom.value && !this.periodeTo.value) {
        return this.filterStatus;
      }
      if (this.isValidated) {
        return this.filterStatus.filter(
          (data) =>
            data.updatedDate >=
              format(new Date(this.periodeFrom.value), "dd-MM-yyyy") &&
            data.updatedDate <=
              format(new Date(this.periodeTo.value), "dd-MM-yyyy")
        );
      }

      return this.filterStatus;
    },
    filtered() {
      this.validation();
      return this.filterPeriode;
    },
    getStatusText() {
      return (status) => {
        switch (status) {
          case "0":
            return "Need Check";
          case "1":
            return "Need Approval";
          case "2":
            return "Need Confirm";
          case "3":
            return "Done";
          default:
            return "";
        }
      };
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
  height: 40px;
}

th.th-status {
  padding: 0;
  padding-top: 5px;
}

td.td-button {
  padding: 5px;
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

#tableReportGR {
  width: 1600px !important;
}

#tableReportGR th {
  position: sticky;
  top: 0;
}

.menu-report__content-grid {
  overflow: auto;
  height: 500px;
  padding: 5px 20px 20px 20px;
  width: 1380px;
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
