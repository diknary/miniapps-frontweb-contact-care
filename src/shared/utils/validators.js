const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_NUMBER = "NUMBER";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_EXACTLENGTH = "EXACTELENGTH";
const VALIDATOR_TYPE_ALPHANUMERIC = "ALPHANUMERIC";
const VALIDATOR_TYPE_LEADINGZERO = "LEADINGZERO";
const VALIDATOR_TYPE_FOURTRAILINGZEROS = "FOURTRAILINGZEROS";
const VALIDATOR_TYPE_BIRTHDATE = "BIRTHDATE";
const VALIDATOR_TYPE_PERUSAHAAN = "PERUSAHAAN";
const VALIDATOR_TYPE_RTRW = "RTRW";
const VALIDATOR_TYPE_ALPHABETICAL = "ALPHABETICAL";
const VALIDATOR_TYPE_ALPHABETICAL2 = "ALPHABETICAL2";
const VALIDATOR_TYPE_EIGHTLEADINGZEROS = "EIGHTLEADINGZEROS";
const VALIDATOR_TYPE_PHONENUMBER = "PHONENUMBER";
const VALIDATOR_TYPE_LEADINGZEROEIGHT = "LEADINGZEROEIGHT";
const VALIDATOR_TYPE_LEADWITHZERO = "LEADWITHZERO";
const VALIDATOR_TYPE_PHONENUMBERZEROTRAILING = "PHONENUMBERZEROTRAILING";
const VALIDATOR_TYPE_FIRSTWORDNOTIN = "FIRSTWORDNOTIN";
const VALIDATOR_TYPE_MINAGE = "MINAGE";
const VALIDATOR_TYPE_MAXAGE = "MAXAGE";
const VALIDATOR_TYPE_MATCHDOBANDKTP = "MATCHDOBANDKTP";
const VALIDATOR_TYPE_LASTWORDNOTIN = "LASTWORDNOTIN";
const VALIDATOR_TYPE_FILEMAXSIZE = "FILEMAXSIZE";
const VALIDATOR_TYPE_FILEMAXUPLOAD = "FILEMAXUPLOAD";
const VALIDATOR_TYPE_FORMAT_FILE= "FORMATFILE";

export const VALIDATOR_PHONENUMBER = () => ({
  type: VALIDATOR_TYPE_PHONENUMBER,
});

export const VALIDATOR_LEADINGZEROEIGHT = () => ({
  type: VALIDATOR_TYPE_LEADINGZEROEIGHT,
});

export const VALIDATOR_LEADWITHZERO = () => ({
  type: VALIDATOR_TYPE_LEADWITHZERO,
});

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_NUMBER = () => ({ type: VALIDATOR_TYPE_NUMBER });
export const VALIDATOR_ALPHANUMERIC = () => ({
  type: VALIDATOR_TYPE_ALPHANUMERIC,
});
export const VALIDATOR_LEADINGZERO = () => ({
  type: VALIDATOR_TYPE_LEADINGZERO,
});
export const VALIDATOR_EIGHTLEADINGZEROS = () => ({
  type: VALIDATOR_TYPE_EIGHTLEADINGZEROS,
});
export const VALIDATOR_FOURTRAILINGZEROS = () => ({
  type: VALIDATOR_TYPE_FOURTRAILINGZEROS,
});
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_EXACTLENGTH = (val) => ({
  type: VALIDATOR_TYPE_EXACTLENGTH,
  val: val,
});
export const VALIDATOR_BIRTHDATE = (actualValue, gender) => ({
  type: VALIDATOR_TYPE_BIRTHDATE,
  actualValue: actualValue,
  gender: gender,
});
export const VALIDATOR_PERUSAHAAN = () => ({
  type: VALIDATOR_TYPE_PERUSAHAAN,
});
export const VALIDATOR_RTRW = () => ({
  type: VALIDATOR_TYPE_RTRW,
});
export const VALIDATOR_ALPHABETICAL = () => ({
  type: VALIDATOR_TYPE_ALPHABETICAL,
});
export const VALIDATOR_ALPHABETICAL2 = () => ({
  type: VALIDATOR_TYPE_ALPHABETICAL2,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const VALIDATOR_PHONENUMBERZEROTRAILING = () => ({
  type: VALIDATOR_TYPE_PHONENUMBERZEROTRAILING,
});

export const VALIDATOR_FIRSTWORDNOTIN = (val) => ({
  type: VALIDATOR_TYPE_FIRSTWORDNOTIN,
  val:val
});
export const VALIDATOR_MINAGE = (val) => ({
  type: VALIDATOR_TYPE_MINAGE,
  val:val
});
export const VALIDATOR_MAXAGE = (val) => ({
  type: VALIDATOR_TYPE_MAXAGE,
  val:val
});
export const VALIDATOR_MATCHDOBANDKTP = (val) => ({
  type: VALIDATOR_TYPE_MATCHDOBANDKTP,
  val:val
});
export const VALIDATOR_LASTWORDNOTIN = (val) => ({
  type: VALIDATOR_TYPE_LASTWORDNOTIN,
  val:val
});

export const VALIDATOR_FILEMAXSIZE = (val) => ({
  type: VALIDATOR_TYPE_FILEMAXSIZE,
  val:val,
});

export const VALIDATOR_FILEMAXUPLOAD = (val) => ({
  type: VALIDATOR_TYPE_FILEMAXUPLOAD,
  val:val,
});

export const VALIDATOR_FORMAT_FILE = (val) => ({
  type: VALIDATOR_TYPE_FORMAT_FILE,
  val:val,
});

export const validate = (value, validators) => {
  let isValid = true;
  let message = [];
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
      if (!isValid) {
        message.push(`Input tidak boleh kosong!`);
      }
    }
    if (validator.type === VALIDATOR_TYPE_NUMBER) {
      isValid = isValid && /^\d+$/.test(value.trim());
      if (!isValid) {
        message.push(`Input harus berupa angka!`);
      }
    }
    if (validator.type === VALIDATOR_TYPE_ALPHANUMERIC) {
      isValid = isValid && /^([a-zA-Z0-9 -]+)$/.test(value.trim());
      if (!isValid) {
        message.push("Input harus berupa huruf atau angka!");
      }
    }
    if (validator.type === VALIDATOR_TYPE_PHONENUMBER) {
      isValid = isValid && (/^08/.test(value.trim()) || value.trim() == "");
      if (!isValid) {
        message.push("Input harus diawali dengan 08");
      }
    }
    if (validator.type === VALIDATOR_TYPE_LEADINGZEROEIGHT) {
      isValid = isValid && !/\D|^08+/.test(value.trim());
      if (!isValid) {
        message.push("Input tidak boleh diawali dengan 08");
      }
    }

    if (validator.type === VALIDATOR_TYPE_LEADINGZERO) {
      if (value.trim() != ""){
        isValid = isValid && /^[1-9][0-9]*$/.test(value.trim());
        if (!isValid) {
          message.push("Angka pertama tidak boleh 0");
        }
      }
    }
    if (validator.type === VALIDATOR_TYPE_LEADWITHZERO) {
      if (value.trim() != "") {
        isValid = isValid && /^0/.test(value.trim());
        if (!isValid) {
          message.push("Angka pertama harus 0");
        }
      }
    }

    if (validator.type === VALIDATOR_TYPE_FOURTRAILINGZEROS) {
      if (value.length > 4){
        isValid = isValid && /^\d{12}(?!0{4})\d{4}$/.test(value.trim());
        if (!isValid) {
          message.push("Empat angka terakhir tidak boleh 0000");
        }
      }
    }
    if (validator.type === VALIDATOR_TYPE_EXACTLENGTH) {
      let len = value.trim().length;
      isValid = isValid && (len === validator.val || len === 0);
      if (!isValid) {
        message.push(`Input harus ${validator.val} karakter!`);
      }
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && (value.trim().length >= validator.val || value.trim() == "");
      if (!isValid) {
        message.push(`Input minimal ${validator.val} karakter!`);
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
      if (!isValid) {
        message.push(`Input maksimal ${validator.val} karakter!`);
      }
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
      if (!isValid) {
        message.push(`Input harus lebih besar dari ${validator.val}!`);
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
      if (!isValid) {
        message.push(`Input harus lebih kecil dari ${validator.val}!`);
      }
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      // isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
      if (value.trim() != ""){
        isValid = isValid && /^[a-zA-Z0-9.]{1,}[@][a-zA-Z0-9.]{2,}[.][a-zA-Z0-9.]{2,}$/.test(value);
        if (!isValid) {
          message.push(`Input harus dalam format email!`);
        }
      }
    }
    if (validator.type === VALIDATOR_TYPE_BIRTHDATE) {
      let tempMale;
      let tempFemale;
      let tempActual;

      if(validator.gender === "LAKI-LAKI"){
        tempMale = value.trim().substr(6, 6);

        tempActual =
        validator.actualValue.trim().substr(8, 2) +
        validator.actualValue.trim().substr(5, 2) +
        validator.actualValue.trim().substr(2, 2);
      }else if(validator.gender === "PEREMPUAN"){
        tempFemale = value.trim().substr(8, 4);

        tempActual =
        validator.actualValue.trim().substr(5, 2) +
        validator.actualValue.trim().substr(2, 2);
      }
      // let tempActual =
      //   validator.actualValue.trim().substr(8, 2) +
      //   validator.actualValue.trim().substr(5, 2) +
      //   validator.actualValue.trim().substr(2, 2);
      isValid =
        isValid && (tempActual === tempMale || tempActual === tempFemale);
      if (!isValid) {
        message.push(
          "Pengisian nomor KTP tidak sesuai dengan tanggal lahir!"
        );
      }
    }
    if (validator.type === VALIDATOR_TYPE_PERUSAHAAN) {
      isValid =
        isValid &&
        /^[a-zA-Z0-9 ](?:[ '.\-a-zA-Z]?[a-zA-Z0-9 ])*$/.test(value.trim());
      if (!isValid) {
        message.push(`Input hanya boleh berupa (a-z, A-Z, 0-9, ', -, .)`);
      }
    }
    if (validator.type === VALIDATOR_TYPE_ALPHABETICAL) {
      isValid =
        isValid && /^[a-zA-Z](?:[.\-a-zA-Z]?[ a-zA-Z])*$/.test(value.trim());
      if (!isValid) {
        message.push("Input hanya boleh berupa huruf (a-z, A-Z, ', -, .)");
      }
    }
    if (validator.type === VALIDATOR_TYPE_ALPHABETICAL2) {
      if (value.trim()){
        isValid = isValid && /^[A-Za-z\/\s']+$/.test(value.trim());
        if (!isValid) {
          message.push("Input hanya boleh berupa huruf (a-z, A-Z, ' )");
        }
      }
    }
    if (validator.type === VALIDATOR_TYPE_RTRW) {
      isValid = isValid && /^[\d./-]+$/.test(value.trim());
      if (!isValid) {
        message.push("Input RT/RW tidak sesuai!");
      }
    }
    if (validator.type === VALIDATOR_TYPE_EIGHTLEADINGZEROS) {
      isValid = isValid && /^(?!0{8})\d{15}$/.test(value.trim());
      if (value.trim() === "000000000000000"){
        isValid = true;
      }
      if (!isValid) {
        message.push("Input digit 1-8 tidak boleh 0 semua!");
      }
    }
    if (validator.type === VALIDATOR_TYPE_PHONENUMBERZEROTRAILING) {
      // let fiveStr = value.trim().substr(value.length - 5); .substr(5, value.length)
      isValid = isValid && (/[^0]/.test(value.trim().substr(4, value.trim().length)) || value.trim().length < 6);
      if(!isValid){
        message.push("Digit ke 5 sampai akhir tidak boleh berisi 0 semua!")
      }
    }
    if (validator.type === VALIDATOR_TYPE_FIRSTWORDNOTIN) {
      const firstWord = value.trim().split(" ")[0].toUpperCase();
      isValid = isValid && validator.val.indexOf(firstWord) < 0;
      if(!isValid){
        message.push("Kata pertama tidak boleh menggunakan '"+firstWord+"' !");
      }
    }
    if (validator.type === VALIDATOR_TYPE_MINAGE) {
      if (value.trim() != "") {
        const dob = new Date(value.trim());  
        const month_diff = Date.now() - dob.getTime();  
        //convert the calculated difference in date format  
        const age_dt = new Date(month_diff);   
        //extract year from date      
        const year = age_dt.getUTCFullYear();  
        //now calculate the age of the user  
        const age = Math.abs(year - 1970);  
        isValid = isValid && validator.val <= age;
        if(!isValid){
          message.push("Usia minimal "+validator.val+" tahun !");
        }
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAXAGE) {
      if (value.trim() != "") {
        const dob = new Date(value.trim());  
        const month_diff = Date.now() - dob.getTime();  
        //convert the calculated difference in date format  
        const age_dt = new Date(month_diff);   
        //extract year from date      
        const year = age_dt.getUTCFullYear();  
        //now calculate the age of the user  
        const age = Math.abs(year - 1970);  
        isValid = isValid && validator.val >= age;
        if(!isValid){
          message.push("Usia mikasimal "+validator.val+" tahun !");
        }
      }
    }
    
    if (validator.type === VALIDATOR_TYPE_MATCHDOBANDKTP) {
      if (value.trim() != "") {
        const ktpDate =  validator.val.ktp.slice(6, 12);

        const date = new Date(validator.val.dob);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yy = date.getFullYear().toString().slice(2, 4); 

        const dobDate = (validator.val.gender == "P" ? (parseInt(dd)+40) : dd )+mm+yy;
        isValid = isValid && ktpDate == dobDate;
        if (!isValid){
          message.push("KTP dan tanggal lahir tidak sesuai !");
        }
      }
    }

    
    if (validator.type === VALIDATOR_TYPE_LASTWORDNOTIN) {
      const arr = value.trim().split(" ");
      const lastWord = arr[(arr.length-1)].toUpperCase();
      isValid = isValid && validator.val.indexOf(lastWord) < 0;
      if(!isValid){
        message.push("Kata terakhir tidak boleh menggunakan '"+lastWord+"' !");
      }
    }
    if (validator.type === VALIDATOR_TYPE_FILEMAXSIZE){
      isValid = isValid && value.size <= validator.val;
      if (!isValid) {
        message.push(`Ukuran file terlalu besar!`);
      }
    }

    if (validator.type === VALIDATOR_TYPE_FILEMAXUPLOAD){
      isValid = isValid && value.length <= validator.val;
      if (!isValid) {
        message.push(`Maximum file yang dapat diupload sebanyak ${validator.val} !`);
      }
    }

    if (validator.type === VALIDATOR_TYPE_FORMAT_FILE){
      isValid = isValid && validator.val.includes(value.type);
      if (!isValid) {
        message.push(`Format file yang dapat digunakan ${validator.val.toString()} !`);
      }
    }
  }
  return [isValid, message[0]];
};
