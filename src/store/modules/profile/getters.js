export default {
  // General Data Getters
  getCustomerInfo(state) {
    return state.customerInfo;
  },
  getListCustDetail(state) {
    return state.listCustDetail;
  },
  getCustOID(state) {
    return state.custOID;
  },

  //// Getters Detail Information
  // Menu Data Kontrak
  getViewKontrak(state) {
    return state.viewKontrak;
  },

  // Menu Information Collateral
  getViewCollateral(state) {
    return state.viewCollateral;
  },

  // Menu Insurance
  getViewInsurance(state) {
    return state.insuranceDetail;
  },

  // Menu Informasi Pembayaran
  getViewInformasiPembayaran(state) {
    return state.viewInformasiPembayaran;
  },

  // Menu Collection
  getViewCollection(state) {
    return state.viewCollection;
  },

  // Menu Penanganan Konsumen
  getViewPenangananKonsumen(state) {
    return state.viewPenangananKonsumen;
  },

  //// Getters Status Data Lama
  getOldDataChange(state) {
    return state.oldDataChange;
  },

  //// Getters Data Baru
  // Profil Nasabah // Data Pribadi
  getNewNomorKtp(state) {
    return state.newNomorKTP.value;
  },

  getNewHobi(state) {
    return state.newHobi;
  },

  getProfilNasabah(state) {
    return state.profilNasabah;
  },

  getTipeID(state) {
    return state.tipeID.value;
  },

  getfotoDiriNasabah(state) {
    return state.fotoDiriNasabah.value;
  },

  getNoKTP(state) {
    const masking = "****" + state.noKTP.value.substring(4, 11) + "****";
    return masking;
  },

  getNamaCustomer(state) {
    return state.nama.value;
  },

  getTglLahirNasabah(state) {
    return state.tglLahir.value;
  },

  getNamaIbu(state) {
    return state.namaIbu.value;
  },

  getAgama(state) {
    return state.agama.value;
  },

  getStatusNikah(state) {
    return state.statusNikah.value;
  },

  getNamaPasangan(state) {
    return state.namaPasangan.value;
  },

  getTglLhrPasangan(state) {
    return state.tglLahirPasangan.value;
  },

  getHobi(state) {
    return state.hobi.value;
  },

  getStatusAdira(state) {
    return state.statusAdira.value;
  },

  getAdiraPoint(state) {
    return state.adiraPoin.value;
  },

  getPekerjaan(state) {
    return state.pekerjaan.value;
  },

  getNamaPerusahaan(state) {
    return state.namaPerusahaan.value;
  },

  getAlamatKantor(state) {
    return state.alamatKantor.value;
  },

  getRTRW(state) {
    return state.rtrw.value;
  },

  getProvinsi(state) {
    return state.provinsi.value;
  },

  getKelurahan(state) {
    return state.kelurahan.value;
  },

  getKecamatan(state) {
    return state.kecamatan.value;
  },

  getKotaKab(state) {
    return state.kotaKab.value;
  },

  getKodePos(state) {
    return state.kodePos.value;
  },

  getNPWP(state) {
    return state.NPWP.value;
  },

  // PROFIL NASABAH // DATA PRIBADI
  checkNoKTP(state) {
    return state.noKTP.isChanged;
  },

  checkHobi(state) {
    return state.hobi.isChanged;
  },

  // PEKERJAAN
  checkNamaPerusahaan(state) {
    return state.namaPerusahaan.isChanged;
  },

  checkAlamatKantor(state) {
    return state.alamatKantor.isChanged;
  },

  checkRTRW(state) {
    return state.rtrw.isChanged;
  },

  checkProvinsi(state) {
    return state.provinsi.isChanged;
  },

  checkKelurahan(state) {
    return state.kelurahan.isChanged;
  },

  checkKecamatan(state) {
    return state.kecamatan.isChanged;
  },

  checkKotaKab(state) {
    return state.kotaKab.isChanged;
  },

  checkNPWP(state) {
    return state.NPWP.isChanged;
  },

  getNewNamaPerusahaan(state) {
    return state.newNamaPerusahaan.value;
  },

  getNewAlamatKantor(state) {
    return state.newAlamatKantor.value;
  },

  getNewRTRW(state) {
    return state.newRTRW.value;
  },

  getNewProvinsi(state) {
    return state.newProvinsi.value;
  },

  getNewKelurahan(state) {
    return state.newKelurahan.value;
  },

  getNewKotaKab(state) {
    return state.newKotaKab.value;
  },

  getNewKecamatan(state) {
    return state.newKecamatan.value;
  },

  getNewNPWP(state) {
    return state.newNPWP.value;
  },

  // Penanganan Konsumen
  getPenangananKonsumen(state) {
    return state.penangananKonsumen.value;
  },

  getDataPenanganan(state) {
    return state.dataPenanganan.value;
  },

  getStatusAdiraku(state) {
    return state.statusAdiraku;
  },
  getAdiraPoin(state) {
    return state.adiraPoin;
  },
  getListContract(state) {
    return state.listContract;
  },

  isDataChanged(state){
    if(state.oldDataChange.nomorKtp
      || state.oldDataChange.hobi
      || state.oldDataChange.companyname
      || state.oldDataChange.companyaddress
      || state.oldDataChange.companyrtrw
      || state.oldDataChange.companyprovince
      || state.oldDataChange.companykelurahan
      || state.oldDataChange.companykecamatan
      || state.oldDataChange.companykotakab
      || state.oldDataChange.companyzipcode
      || state.oldDataChange.nomorNpwp
      || state.oldDataChange.alamatKTP
      || state.oldDataChange.rtrwKTP
      || state.oldDataChange.kelurahanKTP
      || state.oldDataChange.kecamatanKTP
      || state.oldDataChange.kotakabKTP
      || state.oldDataChange.provinsiKTP
      || state.oldDataChange.kodePosKTP
      || state.oldDataChange.alamatDomisili
      || state.oldDataChange.rtrwDomisili
      || state.oldDataChange.kelurahanDomisili
      || state.oldDataChange.kecamatanDomisili
      || state.oldDataChange.kotakabDomisili
      || state.oldDataChange.provinsiDomisili
      || state.oldDataChange.kodePosDomisili
      || state.oldDataChange.noHp1
      || state.oldDataChange.noHp2
      || state.oldDataChange.noTelp
      || state.oldDataChange.email
      || state.oldDataChange.facebook
      || state.oldDataChange.twitter
      || state.oldDataChange.instagram
      || state.oldDataChange.line
      /*aci phase 2*/
      || state.oldDataChange.alamatTagih
      || state.oldDataChange.rtrwTagih
      || state.oldDataChange.kelurahanTagih
      || state.oldDataChange.kecamatanTagih
      || state.oldDataChange.kotakabTagih
      || state.oldDataChange.provinsiTagih
      || state.oldDataChange.kodePosTagih
      || state.oldDataChange.statusPernikahan){
      return true;
    }
    return false;
  }
};
