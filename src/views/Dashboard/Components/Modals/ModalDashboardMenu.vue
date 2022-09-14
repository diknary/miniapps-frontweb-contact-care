<template>
  <BaseModal
    v-bind:primary="value.showModal"
    open
    isSmall
    isFooterRight
  >
    <template v-slot:content>
      <div class="d-flex justify-content-between pt-3 px-3">
        <BaseButton type="button" isDanger v-on:click="onViewMenu('PDK')">Menu Pengkinian Data</BaseButton>
        <BaseButton type="button" isDanger v-on:click="onViewMenu('REPORT')">Menu Report</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/UI/BaseModal";
import BaseButton from "@/components/UI/BaseButton";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    BaseModal,
    BaseButton
  },
  props: {
    value: {
      default: function () {
        return {
          showModal: false,
        };
      },
    },
  },
  data() {
    return {
      error: null,
      message: null,
      isLoading: false,
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
    onViewMenu(menu) {
      switch (menu){
        case 'PDK':
          this.value.showModal = false;
          break;
        case 'REPORT':
          this.$router.push(`/report?NIK=${this.getNik}&BRID=${this.getBranchId}`);
          break;
        default:
          break;
      }
      
    }
  },
  computed: {
    ...mapGetters(["getNik", "getBranchId"])
  },
};
</script>

<style scoped>
</style>
