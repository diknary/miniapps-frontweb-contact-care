export default {
  getListMenu(state) {
    return state.listMenu;
  },
  getListOpsiDashboard(state) {
    return state.listOpsiDashboard;
  },
  getPdkMasking(state) {
    return state.pdkMasking;
  },
  getPdkSrc(state) {
    return state.pdkSrc;
  },
  getShowHeaders(state) {
    return state.showHeader;
  },
  getBackground(state) {
    return state.background;
  },
  getIsNasabah(state) {
    return state.isNasabah;
  },
  getPdkConfig(state) {
    return state.pdkConfig;
  },
  //aci phase 2
  getCartItem(state) {
    return state.cartItems
  }
};
