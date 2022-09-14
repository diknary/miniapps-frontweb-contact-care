import HttpBuilder from '../../HttpBuilder';

const commAci = process.env.VUE_APP_COMMON_URI + "/api/comm-aci";

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


export default {
    getListDomain:getListDomain,
    getMenuEvaluatorGR:getMenuEvaluatorGR,
    getCbxOptionsReligion:getCbxOptionsReligion,
    getCbxOptionsMarital:getCbxOptionsMarital,
    url:commAci
}