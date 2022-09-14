import HttpBuilder from '../../HttpBuilder';

const REPORT_URL = process.env.VUE_APP_COMMON_URI + "/api/comm-aci/report";

const getReportGr = () => HttpBuilder.methodGET({
    url:`${REPORT_URL}/generate`
});

const downloadReportGr = (area, dateFrom, dateTo, status) => HttpBuilder.methodGET({
    url:`${REPORT_URL}/download`,
    params: {
        area,
        dateFrom,
        dateTo,
        status
    },
    responseType: 'blob'
});

export default {
    getReportGr,
    downloadReportGr
}