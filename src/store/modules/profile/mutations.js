export default {
  // PROFIL NASABAH --> DATA PRIBADI
  changeCustOid(state, payload) {
    state.custOID = payload;
  },
  changeCustomerInfo(state, payload) {
    state.customerInfo = payload;
  },

  changeListContract(state, payload) {
    state.listContract = payload;
  },

  changeListCustDetail(state, payload) {
    state.listCustDetail = payload;
  },

  changeViewKontrak(state, payload) {
    // payload {nomorKontrak: value, colaNo: value, colaId: value, colaPlatNo: value}
    state.viewKontrak = payload;
  },

  replaceListCustDetail(state, payload){
    if(payload.cms && payload.aman){
      payload.aman.forEach((aman, idx) => {
        payload.cms.forEach((cms) => {
          if (aman.nomorKontrak == cms.nomorKontrak){
            cms.rownum = aman.rownum;
            payload.aman[idx] = cms;
          }
        });
      });
    }
    state.listCustDetail = payload.aman;
  },
  changeViewCollateral(state, payload) {
    // payload {nomorKontrak: value, colaNo: value, colaId: value, colaPlatNo: value}
    const filtered = state.listCustDetail.find(function(detail) {
      return (
        detail.nomorKontrak === payload.nomorKontrak &&
        detail.colaId === payload.colaId 
        //detail.colaNo === payload.colaNo &&
        //detail.colaPlatNo === payload.colaPlatNo
      );
    });
    state.viewCollateral = filtered;
  },

  changeViewInsurance(state, payload) {
    // payload {nomorKontrak: value, colaNo: value, colaId: value, colaPlatNo: value}
    state.viewInsurance = payload;
  },

  changeViewCollection(state, payload) {
    // payload {nomorKontrak: value, colaNo: value, colaId: value, colaPlatNo: value}
    state.viewCollection = payload;
  },

  changeViewInformasiPembayaran(state, payload) {
    // payload {nomorKontrak: value, colaNo: value, colaId: value, colaPlatNo: value}
    state.viewInformasiPembayaran = payload;
  },

  changeViewPenangananKonsumen(state, payload) {
    // payload {nomorKontrak: value, colaNo: value, colaId: value, colaPlatNo: value}
    state.viewPenangananKonsumen = payload;
  },

  //// Mutations untuk reset state
  onResetDataCustomer(state) {
    state.custOID = null;
    state.customerInfo = null;
    state.statusAdiraku = null;
    state.listCustDetail = null;
    state.viewKontrak = null;
    state.viewCollateral = null;
    state.viewCollection = null;
    state.viewInsurance = null;
    state.viewInformasiPembayaran = null;
    state.viewPenangananKonsumen = null;
    state.statusAdiraku = null;
    state.adiraPoin = null;
  },

  onResetOldDataChange(state) {
    state.oldDataChange = {
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
      provinsiKTP: false,
      kodePosKTP: false,
      alamatDomisili: false,
      rtrwDomisili: false,
      kelurahanDomisili: false,
      kecamatanDomisili: false,
      kotakabDomisili: false,
      provinsiDomisili: false,
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
      kodePosTagih: false,
      statusPernikahan: false
    };
  },

  //// Change Old Data and Status

  changeNoKTP(state, payload) {
    state.customerInfo.ktp = payload.text;
    state.oldDataChange.nomorKtp = true;
  },

  changeHobi(state, payload) {
    state.customerInfo.customer_HOBBY = payload.text;
    state.oldDataChange.hobi = true;
  },

  changeNamaPerusahaan(state, payload) {
    state.customerInfo.companyname = `${payload.desc} ${payload.text}`;
    state.oldDataChange.companyname = true;
  },

  changeAlamatKantor(state, payload) {
    state.customerInfo.company_GENERAL_ADDRESS = payload.text;
    state.oldDataChange.companyaddress = true;
  },

  changeRTRW(state, payload) {
    state.customerInfo.customer_COMPANY_RTRW = payload.text;
    state.oldDataChange.companyrtrw = true;
  },

  changeProvinsi(state, payload) {
    state.customerInfo.customer_COMPANY_PROVINCE = payload.text;
    state.oldDataChange.companyprovince = true;
  },

  changeKelurahan(state, payload) {
    state.customerInfo.customer_COMPANY_KELURAHAN = payload.text;
    state.oldDataChange.companykelurahan = true;
  },

  changeKecamatan(state, payload) {
    state.customerInfo.customer_COMPANY_KECAMATAN = payload.text;
    state.oldDataChange.companykecamatan = true;
  },

  changeKotaKab(state, payload) {
    state.customerInfo.customer_COMPANY_CITY = payload.text;
    state.oldDataChange.companykotakab = true;
  },

  changeKodePos(state, payload) {
    state.customerInfo.customer_COMPANY_ZIP_CODE = payload.text;
    state.oldDataChange.companyzipcode = true;
  },
  changeNPWP(state, payload) {
    state.customerInfo.customer_NPWP = payload.text;
    state.oldDataChange.nomorNpwp = true;
  },
  changeAlamatKTP(state, payload) {
    state.customerInfo.ktpaddress = payload.text;
    state.oldDataChange.alamatKTP = true;
  },
  changeRtRwKTP(state, payload) {
    state.customerInfo.ktprtrw = payload.text;
    state.oldDataChange.rtrwKTP = true;
  },
  changeKelurahanKTP(state, payload) {
    state.customerInfo.ktpsubdistrict = payload.text;
    state.oldDataChange.kelurahanKTP = true;
  },
  changeKecamatanKTP(state, payload) {
    state.customerInfo.ktpdistrict = payload.text;
    state.oldDataChange.kecamatanKTP = true;
  },
  changeKotaKabKTP(state, payload) {
    state.customerInfo.ktpcity = payload.text;
    state.oldDataChange.kotakabKTP = true;
  },
  changeProvinsiKTP(state, payload) {
    state.customerInfo.ktpprovince = payload.text;
    state.oldDataChange.provinsiKTP = true;
  },
  changeKodePosKTP(state, payload) {
    state.customerInfo.ktppostalcode = payload.text;
    state.oldDataChange.kodePosKTP = true;
  },
  changeAlamatDomisili(state, payload) {
    state.customerInfo.domisiliaddress = payload.text;
    state.oldDataChange.alamatDomisili = true;
  },
  changeRtRwDomisili(state, payload) {
    state.customerInfo.domisilirtrw = payload.text;
    state.oldDataChange.rtrwDomisili = true;
  },
  changeKelurahanDomisili(state, payload) {
    state.customerInfo.domisilisubdistrict = payload.text;
    state.oldDataChange.kelurahanDomisili = true;
  },
  changeKecamatanDomisili(state, payload) {
    state.customerInfo.domisilidistrict = payload.text;
    state.oldDataChange.kecamatanDomisili = true;
  },
  changeKotaKabDomisili(state, payload) {
    state.customerInfo.domisilicity = payload.text;
    state.oldDataChange.kotakabDomisili = true;
  },
  changeProvinsiDomisili(state, payload) {
    state.customerInfo.domisiliprovince = payload.text;
    state.oldDataChange.provinsiDomisili = true;
  },
  changeKodePosDomisili(state, payload) {
    state.customerInfo.domisilipostalcode = payload.text;
    state.oldDataChange.kodePosDomisili = true;
  },
  changeNoHp1(state, payload) {
    state.customerInfo.customer_HANDPHONE_ONE = payload.text;
    state.customerInfo.customer_HANDPHONE_FLAG_ONE = payload.id;
    state.oldDataChange.noHp1 = true;
  },
  changeNoHp2(state, payload) {
    state.customerInfo.customer_HANDPHONE_TWO = payload.text;
    state.customerInfo.customer_HANDPHONE_FLAG_TWO = payload.id;
    state.oldDataChange.noHp2 = true;
  },
  changeNoTelp(state, payload) {
    state.customerInfo.phone = payload.text;
    state.oldDataChange.noTelp = true;
  },
  changeEmail(state, payload) {
    state.customerInfo.email = payload.text;
    state.oldDataChange.email = true;
  },
  changeFacebook(state, payload) {
    state.customerInfo.customer_FACEBOOK = payload.text;
    state.oldDataChange.facebook = true;
  },
  changeTwitter(state, payload) {
    state.customerInfo.customer_TWITTER = payload.text;
    state.oldDataChange.twitter = true;
  },
  changeInstagram(state, payload) {
    state.customerInfo.customer_IG = payload.text;
    state.oldDataChange.instagram = true;
  },
  changeLine(state, payload) {
    state.customerInfo.customer_LINE = payload.text;
    state.oldDataChange.line = true;
  },
  //aci phase 2
  changeAlamatTagih(state, payload) {
    state.customerInfo.customer_TAGIH_ADDRESSNEW = payload.text;
    state.oldDataChange.alamatTagih = true;
  },
  changeRtRwTagih(state, payload) {
    state.customerInfo.customer_TAGIH_RTRWNEW = payload.text;
    state.oldDataChange.rtrwTagih = true;
  },
  changeKelurahanTagih(state, payload) {
    state.customerInfo.customer_TAGIH_KELURAHANNEW = payload.text;
    state.oldDataChange.kelurahanTagih = true;
  },
  changeKecamatanTagih(state, payload) {
    state.customerInfo.customer_TAGIH_KECAMATANNEW = payload.text;
    state.oldDataChange.kecamatanTagih = true;
  },
  changeKotaKabTagih(state, payload) {
    state.customerInfo.customer_TAGIH_CITYNEW = payload.text;
    state.oldDataChange.kotakabTagih = true;
  },
  changeProvinsiTagih(state, payload) {
    state.customerInfo.customer_TAGIH_PROVINCENEW = payload.text;
    state.oldDataChange.provinsiTagih = true;
  },
  changeKodePosTagih(state, payload) {
    state.customerInfo.customer_TAGIH_ZIPCODENEW = payload.text;
    state.oldDataChange.kodePosTagih = true;
  },
  changeStatusPernikahan(state, payload) {
    state.customerInfo.customer_MARITAL_STATUS = payload.text;
    state.oldDataChange.statusPernikahan = true;
  },

  resetAlamatKTP(state, payload) {
    state.customerInfo.ktpaddress = payload.text;
    state.oldDataChange.alamatKTP = false;
  },
  resetNPWP(state, payload) {
    state.customerInfo.customer_NPWP = payload.text;
    state.oldDataChange.nomorNpwp = false;
  },
  resetNoKTP(state, payload) {
    state.customerInfo.ktp = payload.text;
    state.oldDataChange.nomorKtp = false;
  },
  resetStatusPernikahan(state, payload) {
    state.customerInfo.customer_MARITAL_STATUS = payload.text;
    state.oldDataChange.statusPernikahan = false;
  },


  //// End Change Old Data and Status

  // PROFIL NASABAH --> PEKERJAAN
  onChangeNPWP(state, value) {
    state.newNPWP.value = value;
  },

  clearPenangananKonsumen(state) {
    state.penangananKonsumen.value = null;
  },

  changeInsuranceDetail(state, payload) {
    state.insuranceDetail = payload;
  },

  changeStatusAdiraku(state, payload) {
    state.statusAdiraku = payload;
  },
  changeAdiraPoin(state, payload) {
    state.adiraPoin = payload;
  },
};
