import HttpBuilder from '../../HttpBuilder';

const REPORT_URL = process.env.VUE_APP_CONTACT_CARE_URI + process.env.VUE_APP_CONTACT_CARE_PORT + "/api/v1/cabang";

const findAllCabang = () => HttpBuilder.methodGET({
    url:`${REPORT_URL}/find-all-cabang`
});

export default {
    findAllCabang
}