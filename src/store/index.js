import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import authModule from "./modules/auth/index";
import profileModule from "./modules/profile/index";
import pengkinianModule from "./modules/pengkinian/index";
import toolsModule from "./modules/tools/index";
import verificationModule from "./modules/verification/index";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "ACI", // The key to store the state on in the storage provider.
  storage: window.sessionStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  reducer: (state) => ({
    auth: state.auth, //aci phase 2
    tools: state.tools,
    profile: state.profile //aci phase 2
  }),
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    profile: profileModule,
    pengkinian: pengkinianModule,
    tools: toolsModule,
    verification: verificationModule,
  },
  plugins: [vuexLocalStorage.plugin],
});

export default store;
