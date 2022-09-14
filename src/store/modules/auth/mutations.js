import {
  VALIDATOR_MINLENGTH,
  validate,
} from "../../../shared/utils/validators";

export default {
  changeUser(state, payload) {
    state.csName = payload;
  },
  changeJobDesc(state, payload) {
    state.fullJobDesc = payload;
  },
  login(state) {
    state.isAuthenticated = true;
  },
  logout(state) {
    state.isAuthenticated = false;
  },
  onChangeNik(state, payload) {
    state.nik.value = payload.target.value;
    let validation = validate(payload.target.value, [VALIDATOR_MINLENGTH(3)]);
    state.nik.isValid = validation[0];
  },
  onChangePassword(state, payload) {
    let validation = validate(payload.target.value, [VALIDATOR_MINLENGTH(3)]);
    state.password.isValid = validation[0];
  },
  onBlurNik(state) {
    state.nik.isTouched = true;
  },
  onBlurPassword(state) {
    state.password.isTouched = true;
  },
  loginNik(state, payload) {
    state.nik.value = payload.nik;
    state.branchid = payload.brid;
  },
  changeUserName(state, payload) {
    state.csName = payload;
  },
  changePermissionMatrix(state, payload) {
    state.permissionMatrix = payload;
  },
  resetPermissionMatrix(state) {
    state.permissionMatrix = [];
  },
  changeJob(state, payload) {
    switch (payload.type) {
      case "CS":
        state.job = "CS";
        break;
      case "AGEN":
        state.job = "AGEN";
        break;
      default:
        state.job = "";
        break;
    }
  },
  changeJobGr(state, payload) {
    state.job = payload;
  },
};
