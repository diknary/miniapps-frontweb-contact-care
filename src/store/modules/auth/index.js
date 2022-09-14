import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      nik: {
        value: "",
        isValid: false,
        isTouched: false,
      },
      branchid: "",
      password: {
        isValid: false,
        isTouched: false,
      },
      permissionMatrix: [],
      csName: "",
      userName: "",
      job: "",
      fullJobDesc: "",
      jobFlag: null,
      isAuthenticated: false,
    };
  },
  actions,
  getters,
  mutations,
};
