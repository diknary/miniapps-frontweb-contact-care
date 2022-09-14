export default {
  changeListOpsiDashboard(state, payload) {
    state.listOpsiDashboard = [...payload];
  },
  changePdkConfig(state, payload) {
    state.pdkConfig = payload;
  },

  resetPdkConfig(state) {
    state.pdkConfig = null;
  },

  changePdkMasking(state, payload) {
    state.pdkMasking = payload;
  },

  resetPdkMasking(state) {
    state.pdkMasking = null;
  },

  changePdkSrc(state, payload) {
    state.pdkSrc = payload;
  },

  resetPdkSrc(state) {
    state.pdkSrc = null;
  },

  changeListMenu(state, payload) {
    state.listMenu = [...payload];
  },
  changeDefaultHeaders(state) {
    state.showHeader = false;
  },
  changeDefaultBackground(state) {
    state.background = false;
  },
  changeShowHeaders(state, payload) {
    state.showHeader = payload;
  },
  changeBackground(state, payload) {
    state.background = payload;
  },
  changeToAdira(state) {
    state.isNasabah = false;
  },
  changeToNasabah(state) {
    state.isNasabah = true;
  },
  //aci phase 2
  changeCartItem(state, payload){
    state.cartItems = [...payload]
  }
};
