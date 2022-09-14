import {
    VALIDATOR_PHONENUMBER,
    VALIDATOR_LEADINGZEROEIGHT,
    VALIDATOR_LEADWITHZERO,
    VALIDATOR_REQUIRE,
    //VALIDATOR_FILE,
    //VALIDATOR_NUMBER,
    //VALIDATOR_ALPHANUMERIC,
    VALIDATOR_LEADINGZERO,
    VALIDATOR_EIGHTLEADINGZEROS,
    VALIDATOR_FOURTRAILINGZEROS,
    VALIDATOR_MINLENGTH,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_EXACTLENGTH,
    //VALIDATOR_BIRTHDATE,
    //VALIDATOR_PERUSAHAAN,
    //VALIDATOR_RTRW,
    //VALIDATOR_ALPHABETICAL,
    VALIDATOR_ALPHABETICAL2,
    //VALIDATOR_MIN,
    //VALIDATOR_MAX,
    VALIDATOR_EMAIL,
    VALIDATOR_PHONENUMBERZEROTRAILING,
    VALIDATOR_FIRSTWORDNOTIN,
    VALIDATOR_MINAGE,
    VALIDATOR_MAXAGE,
    VALIDATOR_MATCHDOBANDKTP,
    //VALIDATOR_LASTWORDNOTIN,
} from "./validators";

const motherName_FIRSTWORDNOTIN = ["IBU", "MAMA", "BUNDA", "NYAI", "NYI", "NYONYA", "EMAK", "ENYAK", "MBOK", "MAMI", "MOMMY", "NY"];
const companyName_FIRSTWORDNOTIN = ["PT", "CV", "PD", "UD"];

const validatorKTP = (val) => {
    return [VALIDATOR_REQUIRE(), VALIDATOR_LEADINGZERO(), VALIDATOR_EXACTLENGTH(16), VALIDATOR_FOURTRAILINGZEROS(), VALIDATOR_MATCHDOBANDKTP(val)]
}
const validatorDOB = (val) => {
    return [VALIDATOR_REQUIRE(), VALIDATOR_MINAGE(17), VALIDATOR_MAXAGE(70),  VALIDATOR_MATCHDOBANDKTP(val)]
}

export default {
    validatorKTP:validatorKTP,
    validatorNPWP:[VALIDATOR_EXACTLENGTH(15), VALIDATOR_EIGHTLEADINGZEROS()],
    validatorFullName:[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3), VALIDATOR_ALPHABETICAL2()],
    validatorNickName:[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3), VALIDATOR_ALPHABETICAL2()],
    validatorGender:[VALIDATOR_REQUIRE()],

    validatorPOB:[VALIDATOR_REQUIRE(), VALIDATOR_ALPHABETICAL2()],
    validatorDOB:validatorDOB,
    validatorKTPAddress:[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)],
    validatorResidenceAddress:[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)],
    validatorAlamatTagih:[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)],

    validatorReligion:[VALIDATOR_REQUIRE()],
    validatorMotherName:[VALIDATOR_REQUIRE(), VALIDATOR_FIRSTWORDNOTIN(motherName_FIRSTWORDNOTIN), VALIDATOR_MINLENGTH(3), VALIDATOR_ALPHABETICAL2()],
    validatorPhone:[VALIDATOR_REQUIRE(), VALIDATOR_PHONENUMBER(), VALIDATOR_MINLENGTH(9), VALIDATOR_MAXLENGTH(14), VALIDATOR_PHONENUMBERZEROTRAILING()],
    validatorTelp:[VALIDATOR_LEADWITHZERO(), VALIDATOR_LEADINGZEROEIGHT(), VALIDATOR_MINLENGTH(8)],
    validatorWANumber:[VALIDATOR_PHONENUMBER(), VALIDATOR_MINLENGTH(9), VALIDATOR_MAXLENGTH(14), VALIDATOR_PHONENUMBERZEROTRAILING()],

    validatorEmail:[VALIDATOR_EMAIL()],
    validatorMaritalStatus:[VALIDATOR_REQUIRE()],
    validatorSpouseName:[VALIDATOR_MINLENGTH(3), VALIDATOR_ALPHABETICAL2()],
    validatorSpuseIdNo:[VALIDATOR_LEADINGZERO(), VALIDATOR_EXACTLENGTH(16), VALIDATOR_FOURTRAILINGZEROS()],
    validatorSpouseContact:[VALIDATOR_PHONENUMBER(), VALIDATOR_MINLENGTH(9), VALIDATOR_MAXLENGTH(14), VALIDATOR_PHONENUMBERZEROTRAILING()],

    validatorCompanyName:[VALIDATOR_MINLENGTH(3), VALIDATOR_ALPHABETICAL2(), VALIDATOR_FIRSTWORDNOTIN(companyName_FIRSTWORDNOTIN)],
    validatorCompanyAddress:[VALIDATOR_MINLENGTH(5)],
    validatorOfficePhone:[VALIDATOR_LEADWITHZERO(), VALIDATOR_MINLENGTH(8)],
    validatorPeriodOfWork:[VALIDATOR_REQUIRE()],
    validatorIncome:[VALIDATOR_MINLENGTH(6)],
};