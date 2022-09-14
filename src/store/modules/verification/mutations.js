export default {
  onChangeDataVerifikasi(state, payload) {
    state.dataVerifikasi.tglLahirNasabah = payload.tglLahirNasabah;
    state.dataVerifikasi.namaIbuKandung = payload.namaIbuKandung;
    state.dataVerifikasi.nomorKTP = payload.nomorKTP;
    state.dataVerifikasi.nomorHP = payload.nomorHP;
  },

  onResetDataVerifikasi(state) {
    state.dataVerifikasi.tglLahirNasabah = "";
    state.dataVerifikasi.namaIbuKandung = "";
    state.dataVerifikasi.nomorKTP = "";
    state.dataVerifikasi.nomorHP = "";
  },

  verifiedUser(state, payload) {
    state.isVerified = true;
    state.noMemo = payload.noTrans;
    const timer = setTimeout(function() {
      state.isVerified = false;
      for (const timer of state.timers) {
        clearTimeout(timer);
      }
      console.log("session habis");
    }, Number(payload.duration));
    state.timers.push(timer);
  },

  unVerifiedUser(state) {
    state.isVerified = false;
    for (const timer of state.timers) {
      clearTimeout(timer);
    }
    console.log("session dihilangkan");
  },
};
