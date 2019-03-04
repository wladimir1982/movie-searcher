import is from "is_js";

export function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

export function validateControl(value, validation) {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
        isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
    }

    return isValid
}