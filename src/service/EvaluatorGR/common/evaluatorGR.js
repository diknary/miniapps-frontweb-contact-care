import HttpBuilder from '../../HttpBuilder';

const evaluatorGR = process.env.VUE_APP_COMMON_URI + "/api/comm-aci/evaluator-gr";

const getGRList = (branch) => HttpBuilder.methodGET({
    url:evaluatorGR + "/gr-get-list?branch="+branch
});

const getGRDetail = (data) => HttpBuilder.methodPOST({
    url:evaluatorGR + "/gr-get-detail",
    data:data
});

const grTransaction = (data) => HttpBuilder.methodPOST({
    url:evaluatorGR + "/gr-transaction",
    data:data
});

const uploadDoc = (data) => HttpBuilder.methodPOST({
    url:evaluatorGR + "/gr-upload-doc",
    data,
    contentType: 'multipart/form-data'
});

const viewDoc = (params, responseType) => HttpBuilder.methodGET({
    url:evaluatorGR + "/gr-view-doc",
    params,
    responseType,
    contentType: 'multipart/form-data'
});

export default {
    getGRList:getGRList,
    getGRDetail:getGRDetail,
    grTransaction:grTransaction,
    uploadDoc,
    viewDoc,
    url:evaluatorGR
}