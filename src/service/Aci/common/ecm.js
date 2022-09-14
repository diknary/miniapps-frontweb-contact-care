import HttpBuilder from '../../HttpBuilder';

const commAci = process.env.VUE_APP_COMMON_URI + "/api/comm-aci/ecm";

const uploadDoc = (data) =>  HttpBuilder.methodPOST({
    url:commAci + "/uploaddoc", 
    data:data,
    contentType:'multipart/form-data'
}); 

const uploadDoc2 = (data) =>  HttpBuilder.methodPOST({
    url:commAci + "/uploaddoc2", 
    data:data,
    contentType:'multipart/form-data'
}); 

export default {
    uploadDoc:uploadDoc,
    uploadDoc2:uploadDoc2,
    url:commAci
}