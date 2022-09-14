import HttpBuilder from '../../HttpBuilder';

const commAci = process.env.VUE_APP_COMMON_URI + "/api/comm-aci";
const REPORT_PDK_PATH = `${commAci}/report-pdk`;
const PENGKINIAN_PDK_PATH = `${commAci}/pengkiniandata`;
const ECM_PDK_PATH = `${commAci}/ecm`;

const getListDomain = (data) =>  HttpBuilder.methodPOST({
    url:commAci + "/list-domain", 
    data:data
}); 

const getMenuEvaluatorGR = () => getListDomain({
    refOne: "EGRNAV",
    refTwo: "SIDEBAR",
    refThr: "1",
    refFou: "1",
});

const getCbxOptionsReligion = () => getListDomain({
    refOne: "EGRCBX",
    refTwo: "RELIGION",
    refThr: "1",
    refFou: "1",
});

const getCbxOptionsMarital = () => getListDomain({
    refOne: "EGRCBX",
    refTwo: "MARITAL_STATUS",
    refThr: "1",
    refFou: "1",
});

const getMenuReportAci = () => getListDomain({
    refOne: "RPTPDK",
    refTwo: "SIDEBAR",
    refThr: "1",
    refFou: "1",
});

const getDomainJenisPdk= () => getListDomain({
    refOne: "ACIPDK",
    refTwo: "PDKPARAM",
    refThr: "1",
    refFou: "1",
});


const getReportPdk = (brId) => HttpBuilder.methodGET({
    url:`${REPORT_PDK_PATH}/generate`,
    params: {
        brId
    }
});

const getDomainBranInfo = () => getListDomain({
    refOne: "EGRBR",
    refTwo: "BRANINFO",
    refThr: "1",
    refFou: "1",
});

const downloadReportPdkBr = (area, brId, dateFrom, dateTo, source, jenisPdk) => HttpBuilder.methodGET({
    url:`${REPORT_PDK_PATH}/download-br`,
    params: {
        area,
        brId,
        dateFrom,
        dateTo,
        source,
        jenisPdk
    },
    responseType: 'blob'
});

const downloadReportPdkAll = (area, brId, dateFrom, dateTo, source, jenisPdk) => HttpBuilder.methodGET({
    url:`${REPORT_PDK_PATH}/download-all`,
    params: {
        area,
        brId,
        dateFrom,
        dateTo,
        source,
        jenisPdk
    },
    responseType: 'blob'
});

const updateDataPdk = (data) => HttpBuilder.methodPOST({
    url: `${PENGKINIAN_PDK_PATH}/updatedata`,
    data
});

const viewDoc = (params, responseType) => HttpBuilder.methodGET({
    url:`${ECM_PDK_PATH}/getdocbyoid`,
    params,
    responseType,
    contentType: 'multipart/form-data'
});

const getOcr = (data) => HttpBuilder.methodPOST({
    url:`${PENGKINIAN_PDK_PATH}/ocr`,
    data,
    contentType: 'multipart/form-data'
});

const validateDukcapil = (data) =>  HttpBuilder.methodPOST({
    url:`${PENGKINIAN_PDK_PATH}/validate-dukcapil`, 
    data
}); 

const getDomainJenisSk = () => getListDomain({
    refOne: "RPTSK",
    refTwo: "SKTYPE",
    refThr: "1",
    refFou: "1",
});


export default {
    getListDomain:getListDomain,
    getMenuEvaluatorGR:getMenuEvaluatorGR,
    getCbxOptionsReligion:getCbxOptionsReligion,
    getCbxOptionsMarital:getCbxOptionsMarital,
    getMenuReportAci,
    getDomainJenisPdk,
    getReportPdk,
    getDomainBranInfo,
    downloadReportPdkBr,
    downloadReportPdkAll,
    updateDataPdk,
    viewDoc,
    getOcr,
    validateDukcapil,
    getDomainJenisSk,
    url:commAci
}