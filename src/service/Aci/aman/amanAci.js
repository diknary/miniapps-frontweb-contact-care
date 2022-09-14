import HttpBuilder from '../../HttpBuilder';

const amanAciPath = process.env.VUE_APP_AMANACI_URI + "/api/aman-aci";
const REPORT_SK_PATH = amanAciPath + "/report-sk";

const getListOid = (params) => HttpBuilder.methodGET({
    url: `${amanAciPath}/get-list-oid`,
    params
});

const getReportSkKonsumen = (brId) => HttpBuilder.methodGET({
    url:`${REPORT_SK_PATH}/generate`,
    params: {
        brId
    }
});

const downloadReportSkBr = (area, brId, dateFrom, dateTo, skType) => HttpBuilder.methodGET({
    url:`${REPORT_SK_PATH}/download-br`,
    params: {
        area,
        brId,
        dateFrom,
        dateTo,
        skType
    },
    responseType: 'blob'
});

const downloadReportSkAll = (area, brId, dateFrom, dateTo, skType) => HttpBuilder.methodGET({
    url:`${REPORT_SK_PATH}/download-all`,
    params: {
        area,
        brId,
        dateFrom,
        dateTo,
        skType
    },
    responseType: 'blob'
});

const getMaritalCode = () => HttpBuilder.methodGET({
    url:`${amanAciPath}/get-marital-code`,
});

export default {
    getListOid,
    getReportSkKonsumen,
    downloadReportSkBr,
    downloadReportSkAll,
    getMaritalCode
}