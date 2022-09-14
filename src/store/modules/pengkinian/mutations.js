export default {
  updateDataLama(state, payload) {
    // payload = {value}
    state.formPengkinian.dataLama = payload.value;
  },
  updateDataBaru(state, payload) {
    // payload = {value, isValid}
    state.formPengkinian.dataBaru.value = payload.value;
    state.formPengkinian.dataBaru.isValid = payload.isValid;
  },
  updateFileOne(state, payload) {
    // payload = {value, isValid}
    state.formPengkinian.file1.value = payload.value;
    state.formPengkinian.file1.isValid = payload.isValid;
  },
  updateFileTwo(state, payload) {
    // payload = {value, isValid}
    state.formPengkinian.file2.value = payload.value;
    state.formPengkinian.file2.isValid = payload.isValid;
  },
  changeNoteAlamatKantor(state, payload){
    state.note.alamatKantor = payload;
    state.note.custOID = this.state.custOID;
  },
  changeNoteAlamatDomisili(state, payload){
    state.note.almatDomisili = payload;
    state.note.custOID = this.state.custOID;
  },
  resetNote(state){
    if (this.state.custOID != state.note.custOID || (!state.formPengkinian.file1.isValid && !state.formPengkinian.file2.isValid)){
      state.note.AlamatKantor = '';
      state.note.AlmatDomisili = '';
    }
  },
  resetFormPengkinian(state) {
    state.formPengkinian = {
      dataLama: "",
      dataBaru: {
        value: null,
        isValid: false,
      },
      file1: {
        value: null,
        isValid: false,
      },
      file2: {
        value: null,
        isValid: false,
      },
    };
  },
};
