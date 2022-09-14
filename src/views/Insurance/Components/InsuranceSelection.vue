<template>
  <div class="menu__content">
    <div class="menu__content-options">
      <!-- options -->
      <button
        class="opt1"
        v-bind:class="{ active: opt1 }"
        v-on:click="onClickOpt1"
      >
        Insurance Detail
      </button>
      <button
        class="opt2"
        v-bind:class="{ active: opt2 }"
        v-on:click="onClickOpt2"
      >
        Insurance Claim Detail
      </button>
      <button
        class="opt3"
        v-bind:class="{ active: opt3 }"
        v-on:click="onClickOpt3"
      >
        Insurance Claim Refund
      </button>
    </div>
    <div class="menu__content-form">
      <!-- form -->
      <insurance-detail-form v-if="opt1" />
      <insurance-claim-detail-form v-else-if="opt2" />
      <insurance-claim-refund-form v-else-if="opt3" />
    </div>
  </div>
</template>

<script>
import InsuranceDetailForm from "../Components/InsuranceDetailForm";
import InsuranceClaimDetailForm from "../Components/InsuranceClaimDetailForm";
import InsuranceClaimRefundForm from "../Components/InsuranceClaimRefundForm";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    "insurance-detail-form": InsuranceDetailForm,
    "insurance-claim-detail-form": InsuranceClaimDetailForm,
    "insurance-claim-refund-form": InsuranceClaimRefundForm,
  },
  data() {
    return {
      opt1: true,
      opt2: false,
      opt3: false,
    };
  },
  methods: {
    ...mapMutations({
      onChangeInsuranceDetail: "changeInsuranceDetail",
      clearInsuranceDetail: "clearInsuranceDetail",
    }),
    onClickOpt1() {
      this.opt1 = true;
      this.opt2 = false;
      this.opt3 = false;
    },
    onClickOpt2() {
      this.opt1 = false;
      this.opt2 = true;
      this.opt3 = false;
    },
    onClickOpt3() {
      this.opt1 = false;
      this.opt2 = false;
      this.opt3 = true;
    },
  },
  props: ["data"],
  computed: {
    ...mapGetters({
      insurance: "getInsuranceDetail",
    }),
  },
  beforeDestroy() {
    this.clearInsuranceDetail();
  },
};
</script>

<style scoped>
.menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  /* height: inherit; */
}

.menu__content-search {
  padding-left: 40px;
}

.menu__content {
  height: calc(100vh - 185px);
}

.menu__content-options {
  padding: 20px;
  display: flex;
  justify-content: flex-start;
}

.menu__content-options .opt1,
.menu__content-options .opt2,
.menu__content-options .opt3 {
  padding: 15px;
  margin: 0px 20px;
  /* width: 150px; */
  border: none;
  background: none;
  font-weight: bold;
  opacity: 0.4;
}

.opt1.active,
.opt2.active,
.opt3.active {
  border-bottom: solid 3px black;
  opacity: 1;
}

.menu__content-form {
  height: calc(100vh - 310px);
  overflow: auto;
}

@media (min-width: 1600px) {
  .menu__content-form {
    height: calc(100vh - 410px);
  }
  .menu__content {
    height: calc(100vh - 300px);
  }
}
</style>
