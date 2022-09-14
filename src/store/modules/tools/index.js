import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      showHeader: false,
      background: false,
      isNasabah: false,
      // { pdkKind, pdkType, label, docOneLabel, docTwoLabel, docOneSize, docTwoSize } // pdkConfig
      pdkConfig: null,
      pdkMasking: null,
      listMenu: [],
      listOpsiDashboard: [],
      pdkSrc: null,
    };
  },
  actions,
  getters,
  mutations,
};
