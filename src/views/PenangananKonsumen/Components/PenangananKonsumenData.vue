<template>
  <div class="menu__content mt-2">
    <div class="menu__content-search row d-flex justify-content-lg-end">
      <label for="tglPengkinianData" class="col-sm-3 col-form-label-sm"
        >Periode Pengkinian Data</label
      >
      <div class="col-sm-3">
        <date-picker
          id="tglPengkinianData1"
          v-bind:format="formatDate"
          v-model="tglPengkinianData1"
          v-bind:language="language"
          wrapper-class="col-sm-12"
          input-class="form-control form-control-sm"
        ></date-picker>
      </div>
      <div class="col-sm-1 text-center">
        s.d.
      </div>
      <div class="col-sm-3">
        <date-picker
          id="tglPengkinianData2"
          v-bind:format="formatDate"
          v-model="tglPengkinianData2"
          v-bind:language="language"
          wrapper-class="col-sm-12"
          input-class="form-control form-control-sm"
        ></date-picker>
      </div>
      <div class="col-sm-1">
        <!-- <base-button
          type="button"
          v-bind:isDisabled="!btnExport"
          v-on:click="downloadCSV"
          >Export</base-button
        > -->
        <!-- <vue-excel-xlsx
          v-bind:disabled="!btnExport"
          v-bind:data="listData"
          v-bind:columns="columns"
          v-bind:filename="`history `"
          v-bind:sheetname="'sheetname'"
          v-bind:class="'btnExport primary'"
        >
          Export
        </vue-excel-xlsx> -->
        <button class="btnExport primary" v-on:click="exportExcel">
          Export
        </button>
      </div>
    </div>
    <div class="menu__content-grid">
      <div class="table-wrapper">
        <table class="table table-hover">
          <tbody>
            <tr>
              <th>No.</th>
              <!-- <th>OID</th> -->
              <th nowrap>No. Transaksi</th>
              <th nowrap>Tanggal Pengkinian</th>
              <th nowrap>Data Yg Dikinikan</th>
              <th nowrap>Data Lama</th>
              <th nowrap>Data Baru</th>
              <th nowrap>Nama PIC</th>
              <th nowrap>Jabatan PIC</th>
              <th nowrap>Sumber</th>
              <th nowrap>Note</th>
              <th nowrap>Tanggal Pengiriman Notifikasi</th>
              <th nowrap>Media Notifikasi</th>
              <th nowrap>Status Notifikasi</th>
              <th nowrap>Detail Notifikasi</th>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="13">No Data Found</td>
              <!-- <td colspan="11"><base-spinner show dots /></td> -->
            </tr>
            <tr v-for="(listData, index) in filtered" v-bind:key="index">
              <td>{{ listData.rownum }}</td>
              <!-- <td>{{ listData.noOid }}</td> -->
              <td nowrap>{{ listData.noTrans }}</td>
              <td>{{ listData.tglPengkinian }}</td>
              <td>{{ listData.pdkTypeDesc }}</td>
              <td>{{ listData.oldData }}</td>
              <td>{{ listData.newData }}</td>
              <td>{{ listData.userName }}</td>
              <td>{{ listData.userJob }}</td>
              <td>{{ listData.sumber }}</td>
              <td>{{ listData.note }}</td>
              <td>{{ listData.tglNotifikiasi }}</td>
              <td>{{ listData.mediaNotifikasi }}</td>
              <td>{{ listData.statusNotifikasi }}</td>
              <td>{{ listData.detailNotifikasi }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="pagination justify-content-end mt-4">
        <li v-bind:class="{ 'page-item': true, disabled: btnPrev }">
          <a class="page-link" v-on:click.prevent="onClickPrev" tabindex="-1"
            >Previous</a
          >
        </li>
        <li v-bind:class="{ 'page-item': true, disabled: btnNext }">
          <a class="page-link" v-on:click.prevent="onClickNext">Next</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
import { saveAs } from "file-saver";
import { mapGetters } from "vuex";
import axios from "axios";
import DatePicker from "vuejs-datepicker";
// import BaseButton from "../../../components/UI/BaseButton.vue";
import { HELPER_DEFAULTDATE } from "../../../shared/utils/helpers";
// import BaseSpinner from "../../../components/UI/BaseSpinner.vue";
import { id } from "vuejs-datepicker/dist/locale";
import _ from "lodash";

export default {
  components: {
    "date-picker": DatePicker,
    // "base-button": BaseButton,
    // "base-spinner": BaseSpinner,
  },
  data() {
    return {
      title: "History Pengkinian Data",
      formatDate: "dd MMMM yyyy",
      language: id,
      increment: 5,
      startIndex: 0,
      btnPrev: true,
      endIndex: 5,
      btnNext: false,
      lastIndex: 0,
      tglPengkinianData: "",
      tglPengkinianData1: "",
      tglPengkinianData2: "",
      isTouched: "",
      listData: [],
      excel_type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      excel_extension: ".xlsx",
    };
  },
  methods: {
    exportExcel() {
      let tempData = [];
      for (const data of this.listData) {
        let temp = {
          rownum: data.rownum,
          noTrans: data.noTrans,
          tglPengkinian: data.tglPengkinian,
          pdkType: data.pdkTypeDesc,
          oldData: data.oldData,
          newData: data.newData,
          userName: data.userName,
          userJob: data.userJob,
          sumber: data.sumber,
          note: data.note,
          tglNotifikiasi: data.tglNotifikiasi,
          mediaNotifikasi: data.mediaNotifikasi,
          statusNotifikasi: data.statusNotifikasi,
          detailNotifikasi: data.detailNotifikasi,
        };
        tempData.push(temp);
      }

      const header = [
        [
          "",
          "No. Transaksi",
          "Tanggal Pengkinian",
          "Data Yg Dikinikan",
          "Data Lama",
          "Data Baru",
          "Nama PIC",
          "Jabatan PIC",
          "Sumber",
          "Note",
          "Tanggal Pengiriman Notifikasi",
          "Media Notifikasi",
          "Status Notifikasi",
          "Detail Notifikasi",
        ],
      ];

      let wb = xlsx.utils.book_new();

      let ws = xlsx.utils.json_to_sheet(tempData, {
        origin: "A2",
        skipHeader: true,
      });
      xlsx.utils.sheet_add_aoa(ws, header); //heading: array of arrays

      xlsx.utils.book_append_sheet(wb, ws);

      const workbook = {
        Sheets: {
          data: ws,
        },
        SheetNames: ["data"],
      };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcel(excelBuffer, "history");
      // console.log(excelBuffer);
    },
    saveAsExcel(buffer, filename) {
      const data = new Blob([buffer], { type: this.excel_type });
      const periode1 = new Date(this.tglPengkinianData1);
      const periode2 = new Date(this.tglPengkinianData2);

      let date1 = `${periode1.getDate()}-${periode1.getMonth() +
        1}-${periode1.getFullYear()}`;
      let date2 = `${periode2.getDate()}-${periode2.getMonth() +
        1}-${periode2.getFullYear()}`;

      saveAs(
        data,
        filename + "_export_" + date1 + "_" + date2 + this.excel_extension
      );
    },
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
    getDate() {
      this.tglPengkinianData = Date.now();
      this.tglPengkinianData1 = Date.now();
      this.tglPengkinianData2 = Date.now();
    },
    onViewHistory() {
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/history/pengkinian",
        data: {
          refOne: HELPER_DEFAULTDATE(this.tglPengkinianData1),
          refTwo: HELPER_DEFAULTDATE(this.tglPengkinianData2),
          refThr: this.custOID,
        },
        timeout: 120000,
      })
        .then((res) => {
          this.listData = res.data;
          this.lastIndex = res.data.length;
          this.btnNext = this.endIndex >= this.listData.length;
        })
        .catch((error) => {
          this.error = { message: error.message };
        });
    },
    onResizeHandler() {
      if (screen.height > 800) {
        this.increment = 8;
        this.endIndex = 8;
      } else {
        this.increment = 5;
        this.endIndex = 5;
      }
      this.onViewHistory();
    },
    convertToCSV(objArray) {
      const array =
        typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
      let str = "";
      for (let i = 0; i < array.length; i++) {
        // eslint-disable-line
        let line = "";
        for (const index in array[i]) {
          // eslint-disable-line
          if (line !== "") line += ",";
          line += array[i][index];
        }
        str += line + "\r\n"; // eslint-disable-line
      }
      return str;
    },
    exportCSVFile(headers, items, fileTitle) {
      if (headers) {
        items.unshift(headers);
      }
      const jsonObject = JSON.stringify(items);
      const csv = this.convertToCSV(jsonObject);
      const exportedFilenmae = fileTitle + ".csv" || "export.csv"; // eslint-disable-line
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    downloadCSV() {
      let headers = {
        no: "No",
        noOid: "Nomor OID",
        noTrans: "Nomor Transaksi",
        noSeq: "Sequence",
        tglPengkinian: "Tanggal Pengkinian Data",
        pdkType: "Tipe PDK",
        oldData: "Data Lama",
        newData: "Data Baru",
        userId: "User ID",
      };

      let tanggalRiwayat = HELPER_DEFAULTDATE(this.tglPengkinianData);

      let filename = `RiwayatPengkinian-${tanggalRiwayat}`;

      let historyData = [];

      for (const data of this.listData) {
        historyData.push(data);
      }

      this.exportCSVFile(headers, historyData, filename);
    },
  },

  computed: {
    ...mapGetters({
      namaCustomer: "getNamaCustomer",
      custOID: "getCustOID",
    }),
    filtered() {
      return this.listData.slice(this.startIndex, this.endIndex);
    },
    btnExport() {
      return this.listData.length > 0;
    },
  },

  watch: {
    tglPengkinianData: _.debounce(function(newVal) {
      this.tglPengkinianData = newVal;
      this.onResizeHandler();
    }, 200),
    tglPengkinianData1: _.debounce(function(newVal) {
      this.tglPengkinianData1 = newVal;
      this.onResizeHandler();
    }, 200),
    tglPengkinianData2: _.debounce(function(newVal) {
      this.tglPengkinianData2 = newVal;
      this.onResizeHandler();
    }, 200),
    endIndex: function(newVal) {
      if (newVal > this.lastIndex) {
        this.btnNext = true;
      } else {
        this.btnNext = false;
      }
    },
    startIndex: function(newVal) {
      if (newVal > 0) {
        this.btnPrev = false;
      } else {
        this.btnPrev = true;
      }
    },
  },
  created() {
    window.addEventListener("resize", this.onResizeHandler);
    if (screen.height > 800) {
      this.increment = 8;
      this.endIndex = 8;
    } else {
      this.increment = 5;
      this.endIndex = 5;
    }
    this.getDate();
    this.onViewHistory();
  },
  destroyed() {
    window.removeEventListener("resize", this.onResizeHandler);
  },
};
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-y: hidden;
  padding: 0;
  margin: 0;
}

.searchGrid {
  text-align: right;
}

.menu__content {
  height: calc(100vh - 220px);
  width: calc(100vw - 350px);
}

.menu__content-grid {
  position: relative;
  width: calc(100vw - 350px);
  height: calc(100vh - 40vh);
}

.menu__content-search {
  width: 95%;
}

.pagination a {
  cursor: pointer;
}

@media (max-width: 1920px) {
  table,
  table td,
  table tr {
    padding: 5px 5px;
    margin: 0;
  }

  .menu__content-grid {
    width: calc(100vw - 350px);
    height: calc(100vh - 40vh);
  }

  .menu__content {
    height: calc(100vh - 220px);
    width: calc(100vw - 350px);
  }
}

.col-form-label-sm {
  text-align: right;
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
  padding: 5px 25px;
}

td {
  font-size: 12px;
}

form {
  text-align: right;
  padding-bottom: 10px;
}

label {
  text-align: end;
}

.btnExport {
  padding: 2px 10px;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 2px #999;
}

.btnExport:hover {
  background-color: #d4d4d4;
}

.btnExport:active {
  background-color: #bfbfbf;
  box-shadow: 0 2px #666;
  transform: translateY(2px);
}

.primary {
  background-color: #ffc5bf;
  color: black;
}
/* ffc5bf */
.primary:hover {
  background-color: #ffc8dd;
  color: black;
}

.primary:active {
  background-color: #ffc8dd;
}

.primary:disabled:active {
  background-color: #ffc5bf;
}
</style>
