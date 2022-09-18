import HttpBuilder from '../../HttpBuilder';

const REPORT_URL = process.env.VUE_APP_CONTACTCARE_URI + "/api/v1/user";

const loginFunction = (data) => HttpBuilder.methodPOST({
    url:`${REPORT_URL}/login`,
    data:data
});

export default {
    loginFunction
}