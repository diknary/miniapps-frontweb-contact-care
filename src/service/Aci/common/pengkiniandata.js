import HttpBuilder from '../../HttpBuilder';

const commAci = process.env.VUE_APP_COMMON_URI + "/api/comm-aci/pengkiniandata";

const cekdoc = (data) =>  HttpBuilder.methodPOST({
    url:commAci + "/cekdoc", 
    data:data
}); 

const insertdoc = (data) =>  HttpBuilder.methodPOST({
    url:commAci + "/insertdoc", 
    data:data
}); 

export default {
    cekdoc:cekdoc,
    insertDoc:insertdoc,
    url:commAci
}