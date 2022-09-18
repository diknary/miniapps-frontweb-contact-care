import HttpBuilder from '../HttpBuilder';

const BASE_PATH = process.env.VUE_APP_CONTACTCARE_URI + "/api/v1";
const CUST_INFO_PATH = BASE_PATH + "/customer-information";
const DOMAIN_PATH = BASE_PATH + "/domain";
const ORGANISASI_PATH = BASE_PATH + "/organisasi";

const saveTiket = (data) =>  HttpBuilder.methodPOST({
    url:`${CUST_INFO_PATH}/save`, 
    data:data
}); 

const getDomain = (params) =>  HttpBuilder.methodGET({
    url:`${DOMAIN_PATH}/get-domain`, 
    params
});

const getOrganisasi = (params) =>  HttpBuilder.methodGET({
    url:`${ORGANISASI_PATH}/find-all`, 
    params
}); 

const getTiket = (id) =>  HttpBuilder.methodGET({
    url:`${CUST_INFO_PATH}/no-tiket/${id}`
}); 


export default {
    saveTiket,
    getDomain,
    getOrganisasi,
    getTiket
}