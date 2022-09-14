<template>
  <div>
    <div class="rpt-sk-br__search-container">
      <div class="d-flex">
        <div class="d-flex justify-content-between">
          <div>
            <label for="searchGrid" class="search-label">Periode</label>
          </div>
          <div class="px-4">
            <DatePicker
              id="periodeFrom"
              v-model="periodeFrom"
              @change="filterData"
              :minDate="getMinDate"
              :maxDate="getMaxDate"
            />
          </div>
          <div class="px-4">
            <DatePicker
              id="periodeTo"
              v-model="periodeTo"
              @change="filterData"
              :minDate="getMinDate"
              :maxDate="getMaxDate"
            />
          </div>
        </div>
      </div>

      <div class="d-flex mt-4">
        <div class="d-flex justify-content-between">
          <div>
            <label for="searchGrid" class="search-label"
              >Jenis SK</label
            >
          </div>
          <div>
            <BaseSelect
              id="skType"
              type="text"
              v-model="selectedSkType"
              :options="skTypeOptions"
              @change="filterData"
            />
          </div>
        </div>
      </div>
    </div>

    <b-overlay :show="isLoading" rounded="sm">
      <div class="rpt-sk-br__content-grid">
        <table id="tableReportSkBr" class="table table-hover pl-3">
          <tbody>
            <tr>
              <th>No</th>
              <th>Nomor Surat</th>
              <th>Tanggal Surat</th>
              <th>No. Kontrak</th>
              <th>Nama</th>
              <th>Jenis SK</th>
            </tr>
            <tr v-if="this.filtered.length === 0">
              <td colspan="6">No Data Found</td>
            </tr>

            <tr v-for="(data, index) in itemsShow" v-bind:key="index">
              <td class="td-text">{{ getNo(index) }}</td>
              <td class="td-text">{{ data.docNo }}</td>
              <td class="td-text">{{ data.docDate }}</td>
              <td class="td-text">{{ data.contNo }}</td>
              <td class="td-text">{{ data.custName }}</td>
              <td class="td-text">{{ data.skTypeDesc }}</td>
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
import DatePicker from "@/components/FormsElement/DatePicker.vue";
import BaseSelect from "@/components/FormsElement/BaseSelect.vue";
import CommAciSvc from "@/service/Aci/common/commAci";

export default {
  components: {
    DatePicker,
    BaseSelect,
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
      skTypeOptions: [],
      selectedSkType: {
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
    };
  },
  async created() {
    let tmpSkTypeOptions = [
      {
        value: "",
        text: "All",
      },
    ];

    const responseJenisSk = await CommAciSvc.getDomainJenisSk();

    if (responseJenisSk.status && responseJenisSk.status == 200) {
      this.skTypeOptions = responseJenisSk.data.data;
    }

    this.skTypeOptions = tmpSkTypeOptions.concat(
      this.skTypeOptions.map((item) => ({
        value: item.domainSort,
        text: item.value2,
      }))
    );
  },
  methods: {
    getNo(index) {
      return index + 1 + (this.currentPage - 1) * this.itemPerpage;
    },
    filterData() {
      this.currentPage = 1;
    },
    getTranDate(date){
      const month = date.substring(3,5);
      const day = date.substring(0,2);
      const year = date.substring(6,10);
      const newDate = new Date(`${year}-${month}-${day}`);
      return newDate;
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
      
      this.$emit("onFilter", {
        skType: this.selectedSkType.value,
        periodeFrom: this.periodeFrom.value,
        periodeTo: this.periodeTo.value,
      });
      
      let skip = (this.currentPage - 1) * this.itemPerpage;
      let take = this.currentPage * this.itemPerpage;
      return this.filtered.slice(skip, take);
    },
    filterSkType() {
      if (!this.listData.data) {
        return [];
      }
      if (!this.selectedSkType.value) {
        return this.listData.data;
      }

      return this.listData.data.filter(
        (data) => data.skType === this.selectedSkType.value
      );
    },
    filterPeriode() {
      if (!this.periodeFrom.value || !this.periodeTo.value) {
        return this.filterSkType;
      }
      return this.filterSkType.filter(
        (data) =>
          this.getTranDate(data.docDate) >= new Date(this.periodeFrom.value) &&
          this.getTranDate(data.docDate) <= new Date(this.periodeTo.value)
      );
    },
    filtered() {
      return this.filterPeriode;
    },
    getMinDate() {
      const now = new Date();
      const minDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      return minDate;
    },
    getMaxDate() {
      const now = new Date();
      const maxDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      return maxDate;
    },
  },
};
</script>

<style>
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

#tableReportSkBr th {
  position: sticky;
  top: 0;
}

.rpt-sk-br__content-grid {
  overflow: auto;
  height: 400px;
  padding: 0px 20px 20px 20px;
  width: 1380px;
}

.col-form-label-sm {
  text-align: left;
  margin: 0;
  padding: 5px 5px 5px 35px;
}

.rpt-sk-br__search-container {
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
