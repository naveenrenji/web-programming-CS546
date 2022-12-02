//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const checkUserName = (strVal, varName) => {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    strVal = strVal.toLowerCase();
    if (strVal.length < 4)
        throw `Error: ${varName} cannot be a string with less than 4 characters`;
    if (!isNaN(strVal))
        throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    if (!(/^[a-z0-9A-Z\s]+$/.test(strVal))) throw `Error: ${strVal} cannot have special character or punctuations`

    return strVal;
};

const checkPassword = (strVal, varName) => {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    if (strVal.length < 6)
        throw `Error: ${varName} cannot be a string with less than 6 characters`;
    if (!isNaN(strVal))
        throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    if ((/^[a-z0-9A-Z\s]+$/.test(strVal))) throw `Error: ${strVal} must have a special character`
    let arr = strVal.split('');
    let uppercase = false;
    let lowercase = false;
    let number = false;
    arr.forEach(element => {
        if (element.toLowerCase() === element)
            lowercase = true;
        if (element.toUpperCase() === element)
            uppercase = true;
        if (isNaN(element))
            number = true;
    });
    if (!uppercase)
        throw "Password must contain atleast one uppercase character";
    if (!lowercase)
        throw "Password must contain atleast one lowercase character";
    if (!number)
        throw "Password must contain atleast one number";
    return strVal;
};

module.exports = {
    checkUserName,
    checkPassword
};