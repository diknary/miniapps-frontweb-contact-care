<template>
  <div class="menu collection">
    <base-modal
      v-on:close="closeModal"
      v-bind:primary="showModal"
      label="Nama Konsumen"
      v-bind:header="custInfo.customer_FULLNAME"
      open
      isLarge
      isFooterRight
    >
      <template v-slot:header> </template>
      <template v-slot:content>
        <collection-selection v-bind:data="viewCollection" />
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
            <tr v-if="filtered.length === 0">
              <td colspan="11">No Data Found</td>
            </tr>
            <tr v-for="(data, index) in filtered" v-bind:key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ data.nomorKontrak }}</td>
              <td>{{ data.colaObjtCode }}</td>
              <td>{{ data.colaMerk }}</td>
              <td>{{ data.colaPlatNo }}</td>
              <td>{{ data.colaEngNo }}</td>
              <td>
                <base-button
                  type="button"
                  isPrimary
                  v-on:click="
                    onViewCollection({
                      nomorKontrak: data.nomorKontrak,
                      colaNo: data.colaNo,
                      colaId: data.colaId,
                      colaPlatNo: data.colaPlatNo,
                    })
                  "
                  >View</base-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTitle from "../../../components/Layouts/MenuTitle/MenuTitle";
import BaseModal from "../../../components/UI/BaseModal";
import BaseButton from "../../../components/UI/BaseButton";
import CollectionSelection from "../Components/CollectionSelection.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    "menu-title": MenuTitle,
    "base-button": BaseButton,
    "base-modal": BaseModal,
    "collection-selection": CollectionSelection,
  },
  data() {
    return {
      title: "Collection",
      searchQuery: "",
      showModal: false,
    };
  },
  methods: {
    ...mapMutations({
      changeViewCollection: "changeViewCollection",
      initCollection: "changeCollection",
      changeRiwayat: "changeRiwayat",
      clearRiwayat: "clearRiwayat",
    }),
    closeModal() {
      this.showModal = false;
    },
    onViewCollection(payload) {
      this.changeRiwayat(payload);
      this.showModal = true;
    },
  },
  computed: {
    ...mapGetters({
      listCollection: "getCollection",
      namaCustomer: "getNamaCustomer",
      listCustDetail: "getListCustDetail",
      viewCollection: "getViewCollection",
      custInfo: "getCustomerInfo",
    }),
    filtered() {
      if (this.searchQuery === "") {
        return this.listCustDetail;
      }
      return this.listCustDetail.filter((data) => {
        return data.noKontrak.startsWith(this.searchQuery);
      });
    },
  },
  created() {
    this.initCollection();
  },
};
</script>

<style scoped>
.searchGrid {
  text-align: right;
}
.menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
  background-color: #f8f9fa;
}

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
</style>
