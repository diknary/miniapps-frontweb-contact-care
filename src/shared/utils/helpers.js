import store from "../../store/index";
import axios from "axios";
import moment from "moment";

moment.locale("id");

export const HELPER_FORMATNUMBER = (number) => {
  // format number 1000000 to 1.234.567
  if (!number) {
    return 0;
  } else if (number == 0) {
    return 0;
  }

  return number
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const HELPER_FORMATDATE = (date) => {
  if (!date) {
    return "";
  } else if (date == "") {
    return "";
  } else if (date == "-") {
    return "";
  }
  return moment(date).format("DD MMMM YYYY");
};

export const HELPER_DEFAULTDATE = (date) => {
  if (!date) {
    return "";
  } else if (date == "") {
    return "";
  }
  return moment(date).format("YYYY-MM-DD");
};

export const HELPER_FULLMASKING = (value) => {
  let masking =
    "**************************************************************";
  let valLength = value.length;
  return masking.substr(0, valLength);
};

export const HELPER_MASKING = (value, left, right) => {
  if (value) {
    let masking = "******************************";
    let oldValue = value.trim();
    let leftMasking, rightMasking;
    let middle;
    if (left == 0) {
      middle = 0;
    } else {
      middle = left;
    }
    if (left < 30 && right < 30 && left + right < 30) {
      leftMasking = masking.substr(0, left);
      rightMasking = masking.substr(0, right);
      return (
        leftMasking +
        oldValue.substr(middle, value.length - (left + right)) +
        rightMasking
      );
    } else {
      left = 4;
      right = 4;
      leftMasking = masking.substr(0, left);
      rightMasking = masking.substr(0, right);
      return (
        leftMasking +
        oldValue.substr(middle, value.length - (left + right)) +
        rightMasking
      );
    }
  } else {
    return "";
  }
};

export const HELPER_REVMASKING = (value, left, right) => {
  if (value) {
    let masking = "******************************";
    let oldValue = value.trim();
    let leftString = oldValue.substring(0, Number(left));
    let rightString = oldValue.substring(
      oldValue.length - Number(right),
      oldValue.length
    );
    let middle = oldValue.trim().length - (Number(left) + Number(right));
    if (Number(left) + middle + Number(right) > masking.length) {
      middle = 4;
    }
    return leftString + masking.substring(0, middle) + rightString;
  } else {
    return "";
  }
};

export const HELPER_INITAPP = (nik) => {
  return new Promise((resolve, reject) => {
    console.log(nik)
    // let params = new URLSearchParams();
    // params.append("NIP", nik);

    // let getUserNamePromise = axios.post(
    //   process.env.VUE_APP_AD1SERVICE_URI +
    //     process.env.VUE_APP_AD1SERVICE_PORT +
    //     "/Portsightdev/api/GetListEmployeeInfo",
    //   params
    // );

    // get permission matrix
    // axios({
    //   method: "POST",
    //   url:
    //     process.env.VUE_APP_COMMON_URI +
    //     // process.env.VUE_APP_AD1SERVICE_URI +
    //     // process.env.VUE_APP_AMANACI_PORT +
    //     "/api/comm-aci/ad1acc/GetPermissionMatrixCMS",
    //   // "/api/comm-aci/ad1acc/GetPermissionMatrix",
    //   // "/Portsight/api/GetPermissionMatrixCMS",
    //   data: {
    //     refOne: nik,
    //     refTwo: "IDM.CUSTOMERINFO",
    //     refThr: "",
    //     refFou: "false",
    //     refFiv: "Allow",
    //     // {
    //     // login: nik,
    //     // applicationAlias: "IDM.CUSTOMERINFO",
    //     // groupALias: "",
    //     // menu: "false",
    //     // status: "Allow",
    //     // }
    //   },
    //   timeout: 120000,
    // })
    //   .then((res) => { --remark dikna test tanpa ad1access
        //let listPermissionMatrix = res.data;
        let listPermissionMatrix = [{ applicationAlias: "IDM.CUSTOMERINFO.CS", permissionAlias: "OPENMODUL" }];
        store.commit("changePermissionMatrix", listPermissionMatrix);

        // cek user cs
        let permission = listPermissionMatrix.find((perm) => {
          return (
            perm.applicationAlias == "IDM.CUSTOMERINFO.CS" &&
            perm.permissionAlias == "OPENMODUL"
          );
        });

        if (!permission) {
          console.log("Tidak berhak akses, bukan cs");
          store.commit("resetPermissionMatrix");
          reject();
          return;
        } else {
          store.commit("changeJob", { type: "CS" });
        }
        
        // let getUserNamePromise = axios({
        //   method: "POST",
        //   url:
        //     process.env.VUE_APP_COMMON_URI +
        //     //process.env.VUE_APP_AMANACI_PORT +
        //     "/api/comm-aci/ad1acc/GetListEmployeeInfo",
        //   data: {
        //     refOne: nik,
        //   },
        //   timeout: 120000,
        // });
        let getUserNamePromise = [];

        let getListMenuPromise = axios({
          method: "post",
          url:
            process.env.VUE_APP_COMMON_URI +
            //process.env.VUE_APP_COMMON_PORT +
            "/api/comm-aci/list-domain",
          data: {
            refOne: process.env.VUE_APP_LISTMENU_DOMID,
            refTwo: process.env.VUE_APP_LISTMENU_DOMVAL,
            refThr: "1",
            refFou: "1",
          },
          timeout: 120000,
        });

        let getListOpsiPromise = axios({
          method: "post",
          url:
            process.env.VUE_APP_COMMON_URI +
            //process.env.VUE_APP_COMMON_PORT +
            "/api/comm-aci/list-domain",
          data: {
            refOne: process.env.VUE_APP_LISTOPSI_DASH_DOMID,
            refTwo: process.env.VUE_APP_LISTOPSI_DASH_DOMVAL,
            refThr: "1",
            refFou: "1",
          },
          timeout: 120000,
        });

        Promise.all([
          getUserNamePromise,
          getListMenuPromise,
          getListOpsiPromise,
        ])
          .then((res) => {
            let listResponse;
            //  result getUserNamePromise
            // listResponse = res[0].data;
            listResponse = [{ fullname: "tst", jobTitle: "PIC_HO"}];
            store.commit("changeUser", listResponse[0].fullname);
            store.commit("changeJobDesc", listResponse[0].jobTitle);

            // result getListMenuPromise
            let listMenu = [];
            listResponse = res[1].data.data;
            for (const data of listResponse) {
              const menu = {
                href: data.value1,
                title: data.value2,
                source: data.value3,
              };
              listMenu.push(menu);
            }
            store.commit("changeListMenu", listMenu);

            // result getListOpsiPromise
            let listOpsi = [];
            listResponse = res[2].data.data;
            for (const data of listResponse) {
              const opsi = {
                label: data.value1,
                value: data.value2,
              };
              listOpsi.push(opsi);
            }
            store.commit("changeListOpsiDashboard", listOpsi);

            //aci phase 2
            store.commit("changeCartItem", []);

            resolve();
          })
          .catch(function (error) {
            reject();
            console.log(error);
          });
      // })
      // .catch((error) => {
      //   reject();
      //   console.log(error.message);
      // });
  });
};
