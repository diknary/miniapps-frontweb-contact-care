<template>
  <div class="kontak opt3" v-if="custInfo != null">
    <!-- modal error -->
    <base-error-modal isSmall v-bind:error="error" v-on:close="clearError" />
    <!-- modal pengkinian -->
    <base-modal
      v-if="showModalEdit"
      v-bind:open="showModalEdit"
      v-bind:secondary="showModalEdit"
      v-bind:legend="labelEdit"
      isMedium
      isFooterRight
    >
      <template v-slot:content>
        <pengkinian-data-form
          v-bind:oldData="editData.oldData"
          v-bind:validators="validators"
          v-bind:config="configuration"
          v-on:close="closeModalEdit"
          v-on:changeData="changeData"
          v-on:verifyUser="verifyUser"
          v-on:submit="onSubmitPengkinian"
        />
      </template>
    </base-modal>
    <!-- modal verifikasi -->
    <base-modal
      v-if="showModalVerifikasi"
      v-on:close="closeVerifyModal"
      v-bind:primary="showModalVerifikasi"
      open
      isMedium
      isFooterRight
    >
      <template v-slot:header>
        <div class="row">
          <div class="col-sm-12">
            <h3>Verifikasi Data</h3>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <verifikasi-data-form
          v-on:close="closeVerifyModal"
          v-on:verified="onVerified"
        />
      </template>
    </base-modal>
    <!-- Kontak form -->
    <form v-on:submit.prevent="onSubmit">
      <!-- form content -->
      <div class="row">
        <div class="row-item">
          <h5>Alamat KTP</h5>
          <Card class="card-wrapper">
            <div class="form-group row mb-2">
              <label for="alamatKTP" class="col-form-label-sm col-sm-3"
                >Alamat KTP</label
              >
              <div class="col-sm-5">
                <input
                  id="alamatKTP"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.ktpaddress"
                  v-bind:class="{ 'is-valid': oldDataStatus.alamatKTP }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Alamat KTP')"
                  v-bind:isLoading="isLoading[0]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.alamatKTP"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="rtrwKTP" class="col-form-label-sm col-sm-3"
                >RT / RW</label
              >
              <div class="col-sm-5">
                <input
                  id="rtrwKTP"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.ktprtrw"
                  v-bind:class="{ 'is-valid': oldDataStatus.rtrwKTP }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('RTRW KTP')"
                  v-bind:isLoading="isLoading[1]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.rtrwKTP"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kelurahanKTP" class="col-form-label-sm col-sm-3"
                >Kelurahan</label
              >
              <div class="col-sm-5">
                <input
                  id="kelurahanKTP"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.ktpsubdistrict"
                  v-bind:class="{ 'is-valid': oldDataStatus.kelurahanKTP }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kelurahan KTP')"
                  v-bind:isLoading="isLoading[2]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kelurahanKTP"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kecamatanKTP" class="col-form-label-sm col-sm-3"
                >Kecamatan</label
              >
              <div class="col-sm-5">
                <input
                  id="kecamatanKTP"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.ktpdistrict"
                  v-bind:class="{ 'is-valid': oldDataStatus.kecamatanKTP }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kecamatan KTP')"
                  v-bind:isLoading="isLoading[3]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kecamatanKTP"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kotaKabKTP" class="col-form-label-sm col-sm-3"
                >Kota / Kabupaten</label
              >
              <div class="col-sm-5">
                <input
                  id="kotaKabKTP"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.ktpcity"
                  v-bind:class="{ 'is-valid': oldDataStatus.kotakabKTP }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('KotaKab KTP')"
                  v-bind:isLoading="isLoading[4]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kotakabKTP"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="provinsiKTP" class="col-form-label-sm col-sm-3"
                >Provinsi</label
              >
              <div class="col-sm-5">
                <input
                  id="provinsiKTP"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.ktpprovince"
                  v-bind:class="{ 'is-valid': oldDataStatus.provinsiKTP }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Provinsi KTP')"
                  v-bind:isLoading="isLoading[20]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.provinsiKTP"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kodePosKTP" class="col-form-label-sm col-sm-3"
                >Kode Pos</label
              >
              <div class="col-sm-5">
                <input
                  id="kodePosKTP"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.ktppostalcode"
                  v-bind:class="{ 'is-valid': oldDataStatus.kodePosKTP }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kode Pos KTP')"
                  v-bind:isLoading="isLoading[5]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kodePosKTP"
                  >edited.</span
                >
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <h5>Alamat Domisili</h5>
          <Card class="card-wrapper">
            <div class="form-group row mb-2">
              <label for="alamatDomisili" class="col-form-label-sm col-sm-3"
                >Alamat Domisili</label
              >
              <div class="col-sm-5">
                <input
                  id="alamatDomisili"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.domisiliaddress"
                  v-bind:class="{ 'is-valid': oldDataStatus.alamatDomisili }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Alamat Domisili')"
                  v-bind:isLoading="isLoading[6]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.alamatDomisili"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="rtrwDomisili" class="col-form-label-sm col-sm-3"
                >RT / RW</label
              >
              <div class="col-sm-5">
                <input
                  id="rtrwDomisili"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.domisilirtrw"
                  v-bind:class="{ 'is-valid': oldDataStatus.rtrwDomisili }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('RTRW Domisili')"
                  v-bind:isLoading="isLoading[7]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.rtrwDomisili"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kelurahanDomisili" class="col-form-label-sm col-sm-3"
                >Kelurahan</label
              >
              <div class="col-sm-5">
                <input
                  id="kelurahanDomisili"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.domisilisubdistrict"
                  v-bind:class="{ 'is-valid': oldDataStatus.kelurahanDomisili }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kelurahan Domisili')"
                  v-bind:isLoading="isLoading[8]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span
                  class="changed-text"
                  v-if="oldDataStatus.kelurahanDomisili"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kecamatanDomisili" class="col-form-label-sm col-sm-3"
                >Kecamatan</label
              >
              <div class="col-sm-5">
                <input
                  id="kecamatanDomisili"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.domisilidistrict"
                  v-bind:class="{ 'is-valid': oldDataStatus.kecamatanDomisili }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kecamatan Domisili')"
                  v-bind:isLoading="isLoading[9]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span
                  class="changed-text"
                  v-if="oldDataStatus.kecamatanDomisili"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kotaKabDomisili" class="col-form-label-sm col-sm-3"
                >Kota / Kabupaten</label
              >
              <div class="col-sm-5">
                <input
                  id="kotaKabDomisili"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.domisilicity"
                  v-bind:class="{ 'is-valid': oldDataStatus.kotakabDomisili }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('KotaKab Domisili')"
                  v-bind:isLoading="isLoading[10]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kotakabDomisili"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="provinsiDomisili" class="col-form-label-sm col-sm-3"
                >Provinsi</label
              >
              <div class="col-sm-5">
                <input
                  id="provinsiDomisili"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.domisiliprovince"
                  v-bind:class="{ 'is-valid': oldDataStatus.provinsiDomisili }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Provinsi Domisili')"
                  v-bind:isLoading="isLoading[21]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.provinsiDomisili"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kodePosDomisili" class="col-form-label-sm col-sm-3"
                >Kode Pos</label
              >
              <div class="col-sm-5">
                <input
                  id="kodePosDomisili"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.domisilipostalcode"
                  v-bind:class="{ 'is-valid': oldDataStatus.kodePosDomisili }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kode Pos Domisili')"
                  v-bind:isLoading="isLoading[11]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kodePosDomisili"
                  >edited.</span
                >
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div class="row">
        <div class="row-item">
          <h5>Alamat Tagih</h5>
          <Card class="card-wrapper">
            <div class="form-group row mb-2">
              <label for="alamatTagih" class="col-form-label-sm col-sm-3"
                >Alamat Tagih</label
              >
              <div class="col-sm-5">
                <input
                  id="alamatTagih"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_TAGIH_ADDRESSNEW"
                  v-bind:class="{ 'is-valid': oldDataStatus.alamatTagih }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Alamat Tagih')"
                  v-bind:isLoading="isLoading[22]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.alamatTagih"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="rtrwTagih" class="col-form-label-sm col-sm-3"
                >RT / RW</label
              >
              <div class="col-sm-5">
                <input
                  id="rtrwTagih"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_TAGIH_RTRWNEW"
                  v-bind:class="{ 'is-valid': oldDataStatus.rtrwTagih }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('RTRW Tagih')"
                  v-bind:isLoading="isLoading[23]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.rtrwTagih"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kelurahanTagih" class="col-form-label-sm col-sm-3"
                >Kelurahan</label
              >
              <div class="col-sm-5">
                <input
                  id="kelurahanTagih"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_TAGIH_KELURAHANNEW"
                  v-bind:class="{ 'is-valid': oldDataStatus.kelurahanTagih }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kelurahan Tagih')"
                  v-bind:isLoading="isLoading[24]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kelurahanTagih"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kecamatanTagih" class="col-form-label-sm col-sm-3"
                >Kecamatan</label
              >
              <div class="col-sm-5">
                <input
                  id="kecamatanTagih"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_TAGIH_KECAMATANNEW"
                  v-bind:class="{ 'is-valid': oldDataStatus.kecamatanTagih }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kecamatan Tagih')"
                  v-bind:isLoading="isLoading[25]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kecamatanTagih"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kotaKabTagih" class="col-form-label-sm col-sm-3"
                >Kota / Kabupaten</label
              >
              <div class="col-sm-5">
                <input
                  id="kotaKabTagih"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_TAGIH_CITYNEW"
                  v-bind:class="{ 'is-valid': oldDataStatus.kotakabTagih }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('KotaKab Tagih')"
                  v-bind:isLoading="isLoading[26]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kotakabTagih"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="provinceTagih" class="col-form-label-sm col-sm-3"
                >Provinsi</label
              >
              <div class="col-sm-5">
                <input
                  id="provinceTagih"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_TAGIH_PROVINCENEW"
                  v-bind:class="{ 'is-valid': oldDataStatus.provinsiTagih }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Provinsi Tagih')"
                  v-bind:isLoading="isLoading[27]"
                  hidden
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.provinsiTagih"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="kodePosTagih" class="col-form-label-sm col-sm-3"
                >Kode Pos</label
              >
              <div class="col-sm-5">
                <input
                  id="kodePosTagih"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_TAGIH_ZIPCODENEW"
                  v-bind:class="{ 'is-valid': oldDataStatus.kodePosTagih }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Kode Pos Tagih')"
                  v-bind:isLoading="isLoading[28]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.kodePosTagih"
                  >edited.</span
                >
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <h5>No. Telp</h5>
          <Card class="card-wrapper">
            <div class="form-group row mb-2">
              <label for="noHp1" class="col-form-label-sm col-sm-2"
                >No HP 1</label
              >
              <div class="col-sm-4">
                <input
                  id="noHp1"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="getNoHp1"
                  disabled
                />
              </div>
              <label for="WA1" class="col-form-label-sm col-sm-1">WA</label>
              <div class="col-sm-1">
                <input
                  id="WA1"
                  type="checkbox"
                  class="form-control form-control-sm"
                  v-bind:checked="custInfo.customer_HANDPHONE_FLAG_ONE === '1'"
                  v-bind:class="{ 'is-valid': oldDataStatus.noHp1 }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('No HP 1')"
                  v-bind:isLoading="isLoading[12]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.noHp1"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="noHp2" class="col-form-label-sm col-sm-2"
                >No HP 2</label
              >
              <div class="col-sm-4">
                <input
                  id="noHp2"
                  type="text"
                  class="form-control form-control-sm"
                  v-model="getNoHp2"
                  disabled
                />
              </div>
              <label for="WA2" class="col-form-label-sm col-sm-1">WA</label>
              <div class="col-sm-1">
                <input
                  id="WA2"
                  type="checkbox"
                  class="form-control form-control-sm"
                  v-bind:checked="custInfo.customer_HANDPHONE_FLAG_TWO === '1'"
                  v-bind:class="{ 'is-valid': oldDataStatus.noHp2 }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('No HP 2')"
                  v-bind:isLoading="isLoading[13]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.noHp2"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="noTelpRumah" class="col-form-label-sm col-sm-2"
                >No Telp Rumah</label
              >
              <div class="col-sm-6">
                <input
                  id="noTelpRumah"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="getNoTelp"
                  v-bind:class="{ 'is-valid': oldDataStatus.noTelp }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('No Telp Rumah')"
                  v-bind:isLoading="isLoading[14]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.noTelp"
                  >edited.</span
                >
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <h5>Media Sosial</h5>
          <Card class="card-wrapper">
            <div class="form-group row mb-2">
              <label for="email" class="col-form-label-sm col-sm-3"
                >Email</label
              >
              <div class="col-sm-5">
                <input
                  id="email"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.email"
                  v-bind:class="{ 'is-valid': oldDataStatus.email }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Email')"
                  v-bind:isLoading="isLoading[15]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.email"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="facebook" class="col-form-label-sm col-sm-3"
                ><img
                  class="sosmed-icon"
                  src="@/assets/images/icons/facebook.png"
                  alt="edit"
              /></label>
              <div class="col-sm-5">
                <input
                  id="facebook"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_FACEBOOK"
                  v-bind:class="{ 'is-valid': oldDataStatus.facebook }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Facebook')"
                  v-bind:isLoading="isLoading[16]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.facebook"
                  >edited.</span
                >
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="twitter" class="col-form-label-sm col-sm-3"
                ><img
                  class="sosmed-icon"
                  src="@/assets/images/icons/twitter.png"
                  alt="edit"
              /></label>
              <div class="col-sm-5">
                <input
                  id="twitter"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_TWITTER"
                  v-bind:class="{ 'is-valid': oldDataStatus.twitter }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Twitter')"
                  v-bind:isLoading="isLoading[17]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.twitter"
                  >edited.</span
                >
              </div>
            </div>

            <div class="form-group row mb-2">
              <label for="instagram" class="col-form-label-sm col-sm-3"
                ><img
                  class="sosmed-icon"
                  src="@/assets/images/icons/instagram.png"
                  alt="edit"
              /></label>
              <div class="col-sm-5">
                <input
                  id="instagram"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_IG"
                  v-bind:class="{ 'is-valid': oldDataStatus.instagram }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Instagram')"
                  v-bind:isLoading="isLoading[18]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.instagram"
                  >edited.</span
                >
              </div>
            </div>

            <div class="form-group row mb-2">
              <label for="line" class="col-form-label-sm col-sm-3"
                ><img
                  class="sosmed-icon"
                  src="@/assets/images/icons/line.png"
                  alt="edit"
              /></label>
              <div class="col-sm-5">
                <input
                  id="line"
                  type="text"
                  class="form-control form-control-sm"
                  v-bind:value="custInfo.customer_LINE"
                  v-bind:class="{ 'is-valid': oldDataStatus.line }"
                  disabled
                />
              </div>
              <div class="col-sm-3">
                <base-button
                  type="button"
                  isWrapper
                  v-on:click="edit('Line')"
                  v-bind:isLoading="isLoading[19]"
                >
                  <img
                    class="edit"
                    src="@/assets/images/icons/edit.png"
                    alt="edit"
                  />
                </base-button>
                <span class="changed-text" v-if="oldDataStatus.line"
                  >edited.</span
                >
              </div>
            </div>
          </Card>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Card from "../../../components/UI/Card";
import BaseButton from "../../../components/UI/BaseButton.vue";
import BaseModal from "../../../components/UI/BaseModal";
import BaseErrorModal from "../../../components/UI/BaseErrorModal.vue";
import VerifikasiDataForm from "../../../components/Verification/VerifikasiDataForm.vue";
import PengkinianDataForm from "../../../components/Pengkinian/PengkinianDataForm.vue";
import axios from "axios";
import { HELPER_REVMASKING } from "../../../shared/utils/helpers.js";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_RTRW,
  VALIDATOR_EMAIL,
  VALIDATOR_PHONENUMBER,
  VALIDATOR_LEADINGZEROEIGHT,
  VALIDATOR_NUMBER,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_PHONENUMBERZEROTRAILING,
  VALIDATOR_LEADWITHZERO,
} from "../../../shared/utils/validators";

export default {
  components: {
    "base-button": BaseButton,
    "base-modal": BaseModal,
    "base-error-modal": BaseErrorModal,
    "verifikasi-data-form": VerifikasiDataForm,
    "pengkinian-data-form": PengkinianDataForm,
    Card,
  },
  data() {
    return {
      isLoading: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      error: null,
      editData: {},
      showModalEdit: false,
      showModalVerifikasi: false,
      labelEdit: "",
      pdkKind: "1",
      configuration: null,
    };
  },
  methods: {
    ...mapMutations([
      "changePdkConfig",
      "changePdkMasking",
      "changePdkSrc",
      "updateDataLama",
      "resetFormPengkinian",
      "changeAlamatKTP",
      "changeRtRwKTP",
      "changeKelurahanKTP",
      "changeKecamatanKTP",
      "changeKotaKabKTP",
      "changeKodePosKTP",
      "changeAlamatDomisili",
      "changeRtRwDomisili",
      "changeKelurahanDomisili",
      "changeKecamatanDomisili",
      "changeKotaKabDomisili",
      "changeKodePosDomisili",
      "changeNoHp1",
      "changeNoHp2",
      "changeNoTelp",
      "changeEmail",
      "changeFacebook",
      "changeTwitter",
      "changeInstagram",
      "changeLine",
      "verifiedUser",
      "changeProvinsiKTP",
      "changeProvinsiDomisili",
      "changeAlamatTagih",
      "changeRtRwTagih",
      "changeKelurahanTagih",
      "changeKecamatanTagih",
      "changeKotaKabTagih",
      "changeProvinsiTagih",
      "changeKodePosTagih",
      "changeCartItem"
    ]),
    onSubmitPengkinian(payload) {
      //this.changeData(payload.data); //remark aci phase 2

      //add aci phase 2
      let payloadKelurahan, payloadKecamatan, payloadKabKot, payloadProvinsi;

      if (payload.pdkKind) {
        this.changeData(payload.data);

        payloadKelurahan = {
          id: payload.data.idKelurahan,
          text: payload.data.kelurahanDesc,
          desc: payload.data.kelurahanDesc,
        };

        payloadKecamatan = {
          id: payload.data.idKecamatan,
          text: payload.data.kecamatanDesc,
          desc: payload.data.kecamatanDesc,
        };

        payloadKabKot = {
          id: payload.data.idKabKot,
          text: payload.data.kabKotDesc,
          desc: payload.data.kabKotDesc,
        };

        payloadProvinsi = {
          id: payload.data.idProvinsi,
          text: payload.data.provinsiDesc,
          desc: payload.data.provinsiDesc,
        };
      } else {
        this.changeData(payload);
      }

      if (
        payload.pdkKind == "18" //kode pos KTP
      ) {
        this.changeKelurahanKTP(payloadKelurahan);
        this.changeKecamatanKTP(payloadKecamatan);
        this.changeKotaKabKTP(payloadKabKot);
        this.changeProvinsiKTP(payloadProvinsi);
        this.changeAlamatKTP;
        this.changeRtRwKTP;
      } else if (
        payload.pdkKind == "24" //kode pos domisili
      ) {
        this.changeKelurahanDomisili(payloadKelurahan);
        this.changeKecamatanDomisili(payloadKecamatan);
        this.changeKotaKabDomisili(payloadKabKot);
        this.changeProvinsiDomisili(payloadProvinsi);
        this.changeAlamatDomisili;
        this.changeRtRwDomisili;
      } else if (
        payload.pdkKind == "41" //kode pos tagih
      ) {
        this.changeKelurahanTagih(payloadKelurahan);
        this.changeKecamatanTagih(payloadKecamatan);
        this.changeKotaKabTagih(payloadKabKot);
        this.changeProvinsiTagih(payloadProvinsi);
        this.changeAlamatTagih;
        this.changeRtRwTagih;
      }

      this.resetFormPengkinian();
      //end add aci phase 2
    },
    edit(name) {
      this.labelEdit = name;
      switch (name) {
        case "Alamat KTP":
          this.editData.oldData = this.custInfo.ktpaddress;
          this.updateDataLama({
            value: this.custInfo.ktpaddress,
          });
          this.changeData = this.changeAlamatKTP;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)];
          this.isLoading[0] = true;
          this.pdkKind = "13";
          break;
        case "RTRW KTP":
          this.editData.oldData = this.custInfo.ktprtrw;
          this.updateDataLama({
            value: this.custInfo.ktprtrw,
          });
          this.changeData = this.changeRtRwKTP;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_RTRW()];
          this.isLoading[1] = true;
          this.pdkKind = "14";
          break;
        case "Kelurahan KTP":
          this.editData.oldData = this.custInfo.ktpsubdistrict;
          this.updateDataLama({
            value: this.custInfo.ktpsubdistrict,
          });
          this.changeData = this.changeKelurahanKTP;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[2] = true;
          this.pdkKind = "15";
          break;
        case "Kecamatan KTP":
          this.editData.oldData = this.custInfo.ktpdistrict;
          this.updateDataLama({
            value: this.custInfo.ktpdistrict,
          });
          this.changeData = this.changeKecamatanKTP;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[3] = true;
          this.pdkKind = "16";
          break;
        case "KotaKab KTP":
          this.editData.oldData = this.custInfo.ktpcity;
          this.updateDataLama({
            value: this.custInfo.ktpcity,
          });
          this.changeData = this.changeKotaKabKTP;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[4] = true;
          this.pdkKind = "17";
          break;
        case "Kode Pos KTP":
          this.editData.oldData = this.custInfo.ktppostalcode;
          this.updateDataLama({
            value: this.custInfo.ktppostalcode,
          });
          this.changeData = this.changeKodePosKTP;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[5] = true;
          this.pdkKind = "18";
          break;
        case "Alamat Domisili":
          this.editData.oldData = this.custInfo.domisiliaddress;
          this.updateDataLama({
            value: this.custInfo.domisiliaddress,
          });
          this.changeData = this.changeAlamatDomisili;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)];
          this.isLoading[6] = true;
          this.pdkKind = "19";
          break;
        case "RTRW Domisili":
          this.editData.oldData = this.custInfo.domisilirtrw;
          this.updateDataLama({
            value: this.custInfo.domisilirtrw,
          });
          this.changeData = this.changeRtRwDomisili;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_RTRW()];
          this.isLoading[7] = true;
          this.pdkKind = "20";
          break;
        case "Kelurahan Domisili":
          this.editData.oldData = this.custInfo.domisilisubdistrict;
          this.updateDataLama({
            value: this.custInfo.domisilisubdistrict,
          });
          this.changeData = this.changeKelurahanDomisili;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[8] = true;
          this.pdkKind = "21";
          break;
        case "Kecamatan Domisili":
          this.editData.oldData = this.custInfo.domisilidistrict;
          this.updateDataLama({
            value: this.custInfo.domisilidistrict,
          });
          this.changeData = this.changeKecamatanDomisili;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[9] = true;
          this.pdkKind = "22";
          break;
        case "KotaKab Domisili":
          this.editData.oldData = this.custInfo.domisilicity;
          this.updateDataLama({
            value: this.custInfo.domisilicity,
          });
          this.changeData = this.changeKotaKabDomisili;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[10] = true;
          this.pdkKind = "23";
          break;
        case "Kode Pos Domisili":
          this.editData.oldData = this.custInfo.domisilipostalcode;
          this.updateDataLama({
            value: this.custInfo.domisilipostalcode,
          });
          this.updateDataLama({
            value: this.custInfo.domisilicity,
          });
          this.changeData = this.changeKodePosDomisili;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[11] = true;
          this.pdkKind = "24";
          break;
        case "No HP 1":
          this.editData.oldData = this.custInfo.customer_HANDPHONE_ONE;
          this.updateDataLama({
            value: this.custInfo.customer_HANDPHONE_ONE,
          });
          this.changeData = this.changeNoHp1;
          this.validators = [
            VALIDATOR_REQUIRE(),
            VALIDATOR_NUMBER(),
            VALIDATOR_PHONENUMBER(),
            VALIDATOR_MINLENGTH(9),
            VALIDATOR_MAXLENGTH(14),
            VALIDATOR_PHONENUMBERZEROTRAILING(),
          ];
          this.isLoading[12] = true;
          this.pdkKind = "25";
          break;
        case "No HP 2":
          this.editData.oldData = this.custInfo.customer_HANDPHONE_TWO;
          this.updateDataLama({
            value: this.custInfo.customer_HANDPHONE_TWO,
          });
          this.changeData = this.changeNoHp2;
          this.validators = [
            VALIDATOR_REQUIRE(),
            VALIDATOR_NUMBER(),
            VALIDATOR_PHONENUMBER(),
            VALIDATOR_MINLENGTH(9),
            VALIDATOR_MAXLENGTH(14),
            VALIDATOR_PHONENUMBERZEROTRAILING(),
          ];
          this.isLoading[13] = true;
          this.pdkKind = "26";
          break;
        case "No Telp Rumah":
          this.editData.oldData = this.custInfo.phone;
          this.updateDataLama({
            value: this.custInfo.noTelp,
          });
          this.changeData = this.changeNoTelp;
          this.validators = [
            VALIDATOR_REQUIRE(),
            VALIDATOR_NUMBER(),
            VALIDATOR_LEADINGZEROEIGHT(),
            VALIDATOR_MINLENGTH(8),
            VALIDATOR_LEADWITHZERO(),
          ];
          this.isLoading[14] = true;
          this.pdkKind = "27";
          break;
        case "Email":
          this.editData.oldData = this.custInfo.email;
          this.updateDataLama({
            value: this.custInfo.email,
          });
          this.changeData = this.changeEmail;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()];
          this.isLoading[15] = true;
          this.pdkKind = "28";
          break;
        case "Facebook":
          this.editData.oldData = this.custInfo.customer_FACEBOOK;
          this.updateDataLama({
            value: this.custInfo.customer_FACEBOOK,
          });
          this.changeData = this.changeFacebook;
          this.validators = [VALIDATOR_REQUIRE()];
          this.isLoading[16] = true;
          this.pdkKind = "29";
          break;
        case "Twitter":
          this.editData.oldData = this.custInfo.customer_TWITTER;
          this.updateDataLama({
            value: this.custInfo.customer_TWITTER,
          });
          this.changeData = this.changeTwitter;
          this.validators = [VALIDATOR_REQUIRE()];
          this.isLoading[17] = true;
          this.pdkKind = "30";
          break;
        case "Instagram":
          this.editData.oldData = this.custInfo.customer_IG;
          this.updateDataLama({
            value: this.custInfo.customer_IG,
          });
          this.changeData = this.changeInstagram;
          this.validators = [VALIDATOR_REQUIRE()];
          this.isLoading[18] = true;
          this.pdkKind = "31";
          break;
        case "Line":
          this.editData.oldData = this.custInfo.customer_LINE;
          this.updateDataLama({
            value: this.custInfo.customer_LINE,
          });
          this.changeData = this.changeLine;
          this.validators = [VALIDATOR_REQUIRE()];
          this.isLoading[19] = true;
          this.pdkKind = "32";
          break;
        case "Provinsi KTP":
          this.editData.oldData = this.custInfo.ktpprovince;
          this.updateDataLama({
            value: this.custInfo.ktpprovince,
          });
          this.changeData = this.changeProvinsiKTP;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[20] = true;
          this.pdkKind = "33";
          break;
        case "Provinsi Domisili":
          this.editData.oldData = this.custInfo.domisiliprovince;
          this.updateDataLama({
            value: this.custInfo.domisiliprovince,
          });
          this.changeData = this.changeProvinsiDomisili;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[21] = true;
          this.pdkKind = "34";
          break;
        /*aci phase 2*/
        case "Alamat Tagih":
          this.editData.oldData = this.custInfo.customer_TAGIH_ADDRESSNEW;
          this.updateDataLama({
            value: this.custInfo.customer_TAGIH_ADDRESSNEW,
          });
          this.changeData = this.changeAlamatTagih;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[22] = true;
          this.pdkKind = "35";
          break;
        case "RTRW Tagih":
          this.editData.oldData = this.custInfo.customer_TAGIH_RTRWNEW;
          this.updateDataLama({
            value: this.custInfo.customer_TAGIH_RTRWNEW,
          });
          this.changeData = this.changeRtRwTagih;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[23] = true;
          this.pdkKind = "36";
          break;
        case "Kelurahan Tagih":
          this.editData.oldData = this.custInfo.customer_TAGIH_KELURAHANNEW;
          this.updateDataLama({
            value: this.custInfo.customer_TAGIH_KELURAHANNEW,
          });
          this.changeData = this.changeKelurahanTagih;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[24] = true;
          this.pdkKind = "37";
          break;
        case "Kecamatan Tagih":
          this.editData.oldData = this.custInfo.customer_TAGIH_KECAMATANNEW;
          this.updateDataLama({
            value: this.custInfo.customer_TAGIH_KECAMATANNEW,
          });
          this.changeData = this.changeKecamatanTagih;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[25] = true;
          this.pdkKind = "38";
          break;
        case "KotaKab Tagih":
          this.editData.oldData = this.custInfo.customer_TAGIH_CITYNEW;
          this.updateDataLama({
            value: this.custInfo.customer_TAGIH_CITYNEW,
          });
          this.changeData = this.changeKotaKabTagih;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[26] = true;
          this.pdkKind = "39";
          break;
        case "Provinsi Tagih":
          this.editData.oldData = this.custInfo.customer_TAGIH_PROVINCENEW;
          this.updateDataLama({
            value: this.custInfo.customer_TAGIH_PROVINCENEW,
          });
          this.changeData = this.changeProvinsiTagih;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[27] = true;
          this.pdkKind = "40";
          break;
        case "Kode Pos Tagih":
          this.editData.oldData = this.custInfo.customer_TAGIH_ZIPCODENEW;
          this.updateDataLama({
            value: this.custInfo.customer_TAGIH_ZIPCODENEW,
          });
          this.changeData = this.changeKodePosTagih;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[28] = true;
          this.pdkKind = "41";
          break;
        default:
          return;
      }

      this.configuration = this.pdkConfig.find((conf) => {
        return conf.pdkKind.trim() === this.pdkKind.trim();
      });

      if (this.pdkKind == "26") {
        if (this.custInfo.customer_HANDPHONE_ONE.trim() == "") {
          this.error = { message: "No HP 1 harap diisi terlebih dahulu" };
          this.isLoading = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ];
          return;
        }
      }

      if (this.getIsVerified) {
        this.isLoading = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ];
        this.showModalEdit = true;
      } else {
        axios({
          method: "POST",
          url:
            process.env.VUE_APP_COMMON_URI +
            //process.env.VUE_APP_COMMON_PORT +
            "/api/comm-aci/last-session",
          data: {
            refOne: this.userNik,
            refTwo: this.custOID,
          },
          timeout: 120000,
        })
          .then((res) => {
            if (res.data.flagSession === "1") {
              this.isLoading = [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
              this.verifiedUser(res.data);
              this.showModalEdit = true;
            } else {
              this.isLoading = [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
              this.showModalVerifikasi = true;
            }
          })
          .catch((error) => {
            this.error = { message: error.message };
            this.isLoading = [
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ];
          });
      }
    },
    clearError() {
      this.error = null;
    },
    closeModalEdit() {
      this.showModalEdit = false;
    },
    closeVerifyModal() {
      this.showModalVerifikasi = false;
    },
    verifyUser() {
      this.showModalVerifikasi = true;
    },
    onVerified() {
      this.showModalVerifikasi = false;
      this.showModalEdit = true;
    },
    // method dinamis untuk ubah state data lama ke data baru saat pengkinian
    changeData() {},
  },
  computed: {
    ...mapGetters({
      nasabah: "getProfilNasabah",
      custInfo: "getCustomerInfo",
      pdkConfig: "getPdkConfig",
      pdkMasking: "getPdkMasking",
      oldDataStatus: "getOldDataChange",
      pdkSrc: "getPdkSrc",
      getIsVerified: "getIsVerified",
      custOID: "getCustOID",
      userNik: "getNik",
    }),
    getNoHp1() {
      return HELPER_REVMASKING(
        this.custInfo.customer_HANDPHONE_ONE,
        this.pdkMasking.noHp1.leftMasking,
        this.pdkMasking.noHp1.rightMasking
      );
    },
    getNoHp2() {
      return HELPER_REVMASKING(
        this.custInfo.customer_HANDPHONE_TWO,
        this.pdkMasking.noHp2.leftMasking,
        this.pdkMasking.noHp2.rightMasking
      );
    },
    getNoTelp() {
      return HELPER_REVMASKING(
        this.custInfo.phone,
        this.pdkMasking.noTelpRmh.leftMasking,
        this.pdkMasking.noTelpRmh.rightMasking
      );
    },
  },
  created() {
    if (!this.pdkConfig) {
      // get config PDK
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/list-domain",
        data: {
          refOne: "ACIPDK",
          refTwo: "PDKPARAM",
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      }).then((res) => {
        // res getPdkConfig
        let configuration = res.data.data;
        let listPdkConfig = [];
        for (const config of configuration) {
          listPdkConfig.push({
            pdkKind: config.domainSort,
            pdkType: config.value1,
            label: config.value2,
            docOneLabel: config.value3,
            docTwoLabel: config.value4,
            docOneSize: Number(config.value5),
            docTwoSize: Number(config.value6),
            docOneVisible: Number(config.value7),
            docTwoVisible: Number(config.value8),
            docSearchUrl: config.value9,
            docOneECMType: config.value10,
            docTwoECMType: config.value11,
            /* aci phase 2*/
            docOcrType: config.value13
          });
        }
        this.changePdkConfig(listPdkConfig);
      });
    }

    if (!this.pdkMasking) {
      // get masking PDK
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/pdk-config",
        data: {
          refOne: "ACIPDK",
          refTwo: "PDKCONFIG",
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      }).then((res) => {
        // res pdk masking config
        let listConfigMasking = res.data;
        let maskConfig = {};

        for (const mask of listConfigMasking) {
          maskConfig = { ...maskConfig, ...mask };
        }
        this.changePdkMasking(maskConfig);
      });
    }

    // get PDK Src
    if (!this.pdkSrc) {
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/pdk-src",
        data: {
          refOne: "ACIPDK",
          refTwo: "PDKSRC",
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      }).then((res) => {
        // res pdk src
        let listPdkSrc = res.data;
        this.changePdkSrc(listPdkSrc);
      });
    }
  },
};
</script>

<style scoped>
.card-wrapper {
  justify-content: space-evenly;
  width: 900px;
  margin-bottom: 20px;
  border: none;
}

h5 {
  text-align: center;
}

.opt3 {
  padding: 40px 40px 20px;
}

label {
  text-align: end;
}

select {
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
}

.row {
  justify-content: center;
}

h5 {
  padding-left: 35px;
}

.edit {
  width: 16px;
  height: 16px;
}

.changed-text {
  margin-left: 10px;
  color: green;
}

.changed {
  border-color: green;
}

.icon img {
  width: 1em;
  height: 1em;
}

.sosmed-wrapper .button {
  cursor: pointer;
  height: 60px;
  width: 60px;
  float: left;
  margin: 0 5px;
  overflow: hidden;
  border-radius: 50px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
}

.sosmed-wrapper .button:hover {
  width: 250px;
}

.sosmed-wrapper .button .icon {
  display: inline-block;
  height: 60px;
  width: 60px;
  border-radius: 50px;
  text-align: center;
  box-sizing: border-box;
  line-height: 60px;
}

.sosmed-wrapper .button .icon img {
  font-size: 25px;
  line-height: 60px;
}

.sosmed-wrapper .button span {
  font-size: 16px;
  font-weight: 500;
  line-height: 60px;
  margin-left: 10px;
}

.sosmed-icon {
  width: 1em;
  height: 1em;
}
</style>
