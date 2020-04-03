/**
 * 折扣验证
 */
const discountReg = (str) => {
    if (str == null || str == "") return false;
    // var result = str.match(/^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/);
    var result = str.match(/^(\d(\.\d)?|10)$/);
    if (result == null) return false;
    return true;
}


/**
 * 只能输入数字[0-9]
 */
const isDigits = (str) => {
    if (str == null || str == "") return false;
    var result = str.match(/^\d+$/);
    if (result == null) return false;
    return true;
}

/**
 * 只能输入数字[1-9]
 */
const isOneNine = (str) => {
    if (str == null || str == "") return false;
    var result = str.match(/^[1-9]\d{0,9}$/);
    if (result == null) return false;
    return true;
}


/**
 * 匹配money
 */
const isMoney = (str) => {
    if (str == null || str == "") return false;
    str += '';
    // var result = str.match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);
    var result = str.match(/^(([1-9]\d*)(\.\d{1,2})?|0\.([1-9]|\d[1-9]))$/);
    if (result == null) return false;
    return true;
}


/**
 * isPrecent 百分比
 */
const isPrecent = (str) => {
    if (str == null || str == "") return false;
    str += '';
    // var result = str.match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);
    var result = str.match(/^(([1-9]\d*)(\.\d{1,2})?|0\.([1-9]|\d[1-9]))$/);
    if (result == null) {
        return false;
    } else {
        if (Number(str) > 100) {
            return false
        } else {
            return true;
        }
    }
}


/**
 * 匹配phone
 */
const isPhone = (str) => {
    if (str == null || str == "") return false;
    var result = str.match(/^0?(13[0-9]|15[0-9]|166|17[013678]|18[0-9]|19[89]|14[57])[0-9]{8}$/);
    if (result == null) return false;
    return true;
}

/**
 * 匹配mobile
 */
const isMobile = (str) => {
    if (str == null || str == "") return false;
    var result = str.match(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/);
    if (result == null) return false;
    return true;
}

/**
 * 联系电话(手机/电话皆可)验证
 */
const isTel = (text) => {
    if (isMobile(text) || isPhone(text)) return true;
    return false;
}


/**
 * 匹配integer 整数
 */
const isInteger = (str) => {
    if (str == null || str == "") return false;
    str += '';
    var result = str.match(/^[-\+]?\d+$/);
    if (result == null) return false;
    return true;
}


/**
 * 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
 */
const isPwd = (str) => {
    if (str == null || str == "") return false;
    var result = str.match(/^[a-zA-Z]\\w{6,12}$/);
    if (result == null) return false;
    return true;
}

/**
 * 判断是否为合法字符(a-zA-Z0-9-_)
 */
const isRightfulString = (str) => {
    if (str == null || str == "") return false;
    var result = str.match(/^[A-Za-z0-9_-]+$/);
    if (result == null) return false;
    return true;
}

/**
 * 匹配身份证号码
 */
const isIdCardNo = (num) => {　 //　 if (isNaN(num)) {alert("输入的不是数字！"); return false;}

    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(num)) {
        return false
    } else {
        return true
    }
}


export {
    discountReg,
    isDigits,
    isMoney,
    isPhone,
    isMobile,
    isOneNine,
    isTel,
    isInteger,
    isPwd,
    isRightfulString,
    isIdCardNo,
    isPrecent
}
