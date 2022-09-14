import axios from 'axios';

const methodGET = async ({ url, params, responseType, contentType }) => {
    try {
        return await axios.request({
            method: 'GET',
            url,
            params,
            responseType,
            headers: {
                'Content-Type': !contentType ? 'application/json' : contentType
            },
            timeout: 120000,
        });
    } catch (err) {
        if (typeof err.response != "undefined") {
            return err.response;
        } else {
            return { status: 599, data: { error: "Empty Response", message: err } };
        }
    }
}

const methodPOST = async ({ url, data, contentType, params }) => {
    try {
        return axios.request({
            method: 'POST',
            url,
            data: data,
            params,
            headers: {
                'Content-Type': !contentType ? 'application/json' : contentType
            },
            timeout: 120000,
        });
    } catch (err) {
        if (typeof err.response != "undefined") {
            return err.response;
        } else {
            return { status: 599, data: { error: "Empty Response", message: err } };
        }
    }
}

const methodPUT = ({ url, data }) => {
    try {
        return axios.request({
            method: 'PUT',
            url,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 120000,
        });
    } catch (err) {
        if (typeof err.response != "undefined") {
            return err.response;
        } else {
            return { status: 599, data: { error: "Empty Response", message: err } };
        }
    }
}

export default {
    methodGET: methodGET,
    methodPOST: methodPOST,
    methodPUT: methodPUT,
}