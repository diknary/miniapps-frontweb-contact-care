import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      formPengkinian: {
        dataLama: "",
        dataBaru: {
          value: null,
          isValid: false,
        },
        file1: {
          value: null,
          isValid: false,
        },
        file2: {
          value: null,
          isValid: false,
        }
      },
      note:{
        custOID : '',
        alamatKantor:'',
        alamtDomisili:''
      }
    };
  },
  actions,
  getters,
  mutations,
};
