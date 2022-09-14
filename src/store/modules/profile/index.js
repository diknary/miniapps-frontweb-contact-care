import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      custOID: null,
      customerInfo: null,
      listCustDetail: null,

      // simpan semua nomor kontrak beserta nama customer
      listContract: [],

      // Data Kontrak Detail Pada Saat Klik VIEW
      viewKontrak: null,

      // Informasi Collateral Pada Saat Klik VIEW
      viewCollateral: null,

      // Collection Pada Saat Klik VIEW
      viewCollection: null,

      // Insurance Pada Saat Klik VIEW
      viewInsurance: null,

      // InformasiPembayaran Pada Saat Klik VIEW
      viewInformasiPembayaran: null,

      //PenangananKonsumen Pada Saat Klik VIEW
      viewPenangananKonsumen: null,

      //// State Data Lama
      oldDataChange: {
        // Profil Nasabah // Data Pribadi
        nomorKtp: false,
        hobi: false,
        // Profil Nasabah // Pekerjaan
        companyname: false,
        companyaddress: false,
        companyrtrw: false,
        companyprovince: false,
        companykelurahan: false,
        companykecamatan: false,
        companykotakab: false,
        companyzipcode: false,
        nomorNpwp: false,
        // Profil Nasabah // Kontak
        alamatKTP: false,
        rtrwKTP: false,
        kelurahanKTP: false,
        kecamatanKTP: false,
        kotakabKTP: false,
        kodePosKTP: false,
        alamatDomisili: false,
        rtrwDomisili: false,
        kelurahanDomisili: false,
        kecamatanDomisili: false,
        kotakabDomisili: false,
        kodePosDomisili: false,
        noHp1: false,
        noHp2: false,
        noTelp: false,
        email: false,
        facebook: false,
        twitter: false,
        instagram: false,
        line: false,
        /*aci phase 2*/
        alamatTagih: false,
        rtrwTagih: false,
        kelurahanTagih: false,
        kecamatanTagih: false,
        kotakabTagih: false,
        provinsiTagih: false,
        kodePosTagih: false
      },

      //// State data baru
      // Profil Nasabah // Data Pribadi
      newNomorKTP: {
        value: "",
        file1: null,
        file2: null,
      },
      newHobi: {
        value: "",
        file1: null,
        file2: null,
      },

      // Profil Nasabah // Pekerjaan
      newNamaPerusahaan: {
        value: "",
        file1: null,
        file2: null,
      },

      newAlamatKantor: {
        value: "",
        file1: null,
        file2: null,
      },

      newRTRW: {
        value: "",
        file1: null,
        file2: null,
      },

      newProvinsi: {
        value: "",
        file1: null,
        file2: null,
      },

      newKelurahan: {
        value: "",
        file1: null,
        file2: null,
      },

      newKecamatan: {
        value: "",
        file1: null,
        file2: null,
      },

      newKotaKab: {
        value: "",
        file1: null,
        file2: null,
      },

      newNPWP: {
        value: "",
        file1: null,
        file2: null,
      },

      tipeID: {
        value: "KTP",
      },
      statusAdiraku: null,
      adiraPoin: null,
      // Penanganan Konsumen
      penangananKonsumen: {
        value: [],
      },
      dataPenanganan: {
        value: null,
      },
      insuranceDetail: null,
    };
  },
  actions,
  getters,
  mutations,
};
