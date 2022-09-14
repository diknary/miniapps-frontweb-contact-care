import HttpBuilder from '../../HttpBuilder';

const ad1acc = process.env.VUE_APP_COMMON_URI + "/api/comm-aci/ad1acc";


const getEmployeeInfo = (nik) => HttpBuilder.methodPOST({
    url:ad1acc + "/GetListEmployeeInfo",
    data:{refOne: nik}
});

const getPermissionMatrix = (data) => HttpBuilder.methodPOST({
    url:ad1acc + "/GetPermissionMatrixCMS",
    data:data
});

const getPermissionMatrixEGR = (nik) => getPermissionMatrix({
    refOne: nik,
    refTwo: "IDM.EVALUATORGR",
    refThr: "",
    refFou: "false",
    refFiv: "Allow",
});

export default {
    getEmployeeInfo:getEmployeeInfo,
    getPermissionMatrix:getPermissionMatrix,
    getPermissionMatrixEGR:getPermissionMatrixEGR,
    url:ad1acc
}