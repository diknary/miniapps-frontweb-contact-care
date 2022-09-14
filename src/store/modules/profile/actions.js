
import axios from "axios";
export default {
    async getContByOID(_, payload){
        return await axios({
            method: "post",
            url:
              process.env.VUE_APP_AMANACI_URI +
              //process.env.VUE_APP_AMANACI_PORT +
              "/api/aman-aci/getall-cont-byoid",
            data: {
              refOne: payload,
            },
            timeout:process.env.VUE_APP_TIMEOUT,
          });
    },

    async getCollaCMS(_, payload){
        return await axios({
            method: "POST",
            url:
              process.env.VUE_APP_COLLAACI_URI + "/api/colla-aci/get-colla",
            data: {
              refOne: payload,
            },
            timeout: process.env.VUE_APP_TIMEOUT,
          });
    },

    async getCollaAman(_, payload){
        return await axios({
            method: "post",
            url:
              process.env.VUE_APP_AMANACI_URI +
              //process.env.VUE_APP_AMANACI_PORT +
              "/api/aman-aci/get-cont-coll",
            data: {
              refOne: payload,
            },
            timeout:process.env.VUE_APP_TIMEOUT,
          });
    }

};
