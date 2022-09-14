// import Vue from 'vue'
import VueRouter from "vue-router";
import store from "../store/index";
import { HELPER_INITAPP } from "../shared/utils/helpers";

// import ProfilNasabah from "../views/ProfilNasabah/Pages/ProfilNasabah.vue";
// import Dashboard from "../views/Dashboard/Pages/Dashboard.vue";
// import Customer from "../views/Customer/Pages/Customer.vue";
// import Login from "../views/Login/Pages/Login.vue";
// import Penawaran from "../views/Penawaran/Pages/Penawaran.vue";
// import PengajuanAplikasi from "../views/PengajuanAplikasi/Pages/PengajuanAplikasi.vue";
// import Lainnya from "../views/PenangananKonsumen/Pages/PenangananKonsumen.vue";
// import DataKontrak from "../views/DataKontrak/Pages/DataKontrak.vue";
// import Collection from "../views/Collection/Pages/Collection.vue";
// import Insurance from "../views/Insurance/Pages/Insurance.vue";
// import InformasiPembayaran from "../views/InformasiPembayaran/Pages/InformasiPembayaran.vue";
// import InformasiCollateral from "../views/InformasiCollateral/Pages/InformasiCollateral.vue";
import SessionTimeOut from "../views/TimeOut/Pages/SessionTimeout.vue";
import Unauthorized from "../views/Unauthorized/Pages/Unauthorized.vue";
import EvaluatorGR from "../views/EvaluatorGR/EvaluatorGR.vue";
import EGRDataParkir from "../views/EvaluatorGR/DataParkir/DataParkir.vue";
import EGRReport from "../views/EvaluatorGR/Report/Report.vue";
import ContactCare from "../views/ContactCare/ContactCare.vue";
import CaseCreate from "../views/ContactCare/Pages/CaseCreate.vue";

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "is-active",
  routes: [
    // { path: "/", redirect: "/dashboard" },
    // {
    //   path: "/dashboard",
    //   component: Dashboard,
    //   meta: {
    //     requiresAuth: true,
    //   },
    //   beforeEnter(to, from, next) {
    //     if (store.state.auth.isAuthenticated) {
    //       next();
    //     } else {
    //       next("/login");
    //     }
    //   },
    // },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: Login,
    //   beforeEnter(to, from, next) {
    //     if (store.state.auth.isAuthenticated) {
    //       store.commit("changeIsNasabah");
    //       next("/dashboard");
    //     } else {
    //       next();
    //     }
    //   },
    // },
    // {
    //   path: "/customer",
    //   component: Customer,
    //   meta: {
    //     requiresAuth: true,
    //   },
    //   children: [
    //     {
    //       path: "profilnasabah",
    //       component: ProfilNasabah,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //     {
    //       path: "datakontrak",
    //       component: DataKontrak,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //     {
    //       path: "informasicollateral",
    //       component: InformasiCollateral,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //     {
    //       path: "collection",
    //       component: Collection,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //     {
    //       path: "insurance",
    //       component: Insurance,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //     {
    //       path: "informasipembayaran",
    //       component: InformasiPembayaran,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //     {
    //       path: "penawaran",
    //       component: Penawaran,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //     {
    //       path: "pengajuanaplikasi",
    //       component: PengajuanAplikasi,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //     {
    //       path: "lainnya",
    //       component: Lainnya,
    //       meta: {
    //         requiresData: true,
    //       },
    //     },
    //   ],
    // },
    // { //add by Dikna ACI phase 2
    //   path: "/report",
    //   component: ReportPdk,
    //   meta: {
    //     requiresAuth: false,
    //   },
    //   children: [
    //     {
    //       path: "pdk/cabang",
    //       component: ReportPdkBr,
    //       meta: {
    //         requiresData: false,
    //       },
    //     },
    //     {
    //       path: "pdk/nasional",
    //       component: ReportPdkNat,
    //       meta: {
    //         requiresData: false,
    //       },
    //     },
    //     {
    //       path: "sk/cabang",
    //       component: ReportSkKonsumenBr,
    //       meta: {
    //         requiresData: false,
    //       },
    //     },
    //     {
    //       path: "sk/nasional",
    //       component: ReportSkKonsumenNat,
    //       meta: {
    //         requiresData: false,
    //       },
    //     },
    //   ]
    // },
    { //miniapps
      path: "/contact-care",
      component: ContactCare,
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: "create",
          component: CaseCreate,
          meta: {
            requiresData: false,
          },
        },
      ]
    },
    {
      path: "/evaluator-gr",
      component: EvaluatorGR,
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: "dataparkir",
          component: EGRDataParkir,
          meta: {
            requiresData: false,
          },
        },
        {
          path: "report",
          component: EGRReport,
          meta: {
            requiresData: false,
          },
        },
      ]
    },
    { path: "/sessiontimeout", component: SessionTimeOut },
    { path: "/unauthorized", component: Unauthorized },
    { path: "*", redirect: "/" },
    { path: "/*", redirect: "/" },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.authentication) {
      // Untuk ngecek permission
      // Catatan : Jika nantinya mau dipakai per menu, bisa ditaruh di tiap pages, pada lifecycle beforeRouteEnter
      // Catatan : Ubah juga supaya ketika search data customer tidak langsung ke menu profil nasabah
      if (store.getters.getPermissionMatrix.length > 0) {
        // cek user cs
        let permission = store.getters.getPermissionMatrix.find((perm) => {
          return (
            perm.applicationAlias == "IDM.CUSTOMERINFO.CS" &&
            perm.permissionAlias == "OPENMODUL"
          );
        });

        if (!permission) {
          console.log("Tidak berhak akses, bukan cs");
          store.commit("resetPermissionMatrix");
          next("/unauthorized");
          return;
        }
      } else {
        console.log("Gagal mendapatkan existing permission matrix");
        store.commit("resetPermissionMatrix");
        next("/unauthorized");
        return;
      }

      if (to.matched.some((record) => record.meta.requiresData)) {
        if (!store.getters.getCustomerInfo) {
          next("/dashboard");
        } else {
          next();
        }
      } else {
        next();
      }
    } else if (to.query.NIK) {
      HELPER_INITAPP(to.query.NIK)
        .then(function() {
          store.commit("login");
          store.commit("changeBackground", true);
          store.commit("changeShowHeaders", true);
          store.commit("loginNik", { nik: to.query.NIK, brid: to.query.BRID });
          next(to.path);
        })
        .catch(function() {
          next("/unauthorized");
        });
    } else {
      next("/unauthorized");
    }
  } else {
    next();
  } 
});

export default router;
