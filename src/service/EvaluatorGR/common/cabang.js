import HttpBuilder from '../../HttpBuilder';

const REPORT_URL = process.env.VUE_APP_CONTACTCARE_URI + "/api/v1/cabang";

const findAllCabang = () => HttpBuilder.methodGET({
    url:`${REPORT_URL}/find-all-cabang`
});

export default {
    findAllCabang
}