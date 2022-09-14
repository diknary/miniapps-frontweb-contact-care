export default {
  authentication(state) {
    return state.isAuthenticated;
  },
  getNik(state) {
    return state.nik.value;
  },
  getBranchId(state) {
    return state.branchid;
  },
  getPassword(state) {
    return state.password.value;
  },
  getCsName(state) {
    return state.csName;
  },
  checkNik(state) {
    return state.nik.isValid;
  },
  checkPassword(state) {
    return state.password.isValid;
  },
  isTouchedNik(state) {
    return state.nik.isTouched;
  },
  isTouchedPassword(state) {
    return state.password.isTouched;
  },
  getPermissionMatrix(state) {
    return state.permissionMatrix;
  },
  getJob(state) {
    return state.job;
  },
  getJobDesc(state) {
    return state.fullJobDesc;
  },
};
