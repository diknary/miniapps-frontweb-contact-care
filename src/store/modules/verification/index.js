import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      noMemo: "",
      isDataFound: false,
      isLoading: false,
      isVerified: false,
      timers: [],
      dataVerifikasi: {
        tglLahirNasabah: "",
        namaIbuKandung: "",
        nomorKTP: "",
        nomorHP: "",
      },
    };
  },
  actions,
  getters,
  mutations,
};
