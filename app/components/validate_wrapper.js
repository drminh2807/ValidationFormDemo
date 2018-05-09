
import validation from './validation'
import validatejs from 'validate.js';
export default function validate(fieldName, value, required = true) {
    var formValues = {}
    formValues[fieldName] = value
    if (validation[fieldName].presence) {
        validation[fieldName].presence.allowEmpty = required
    }
    var formFields = {}
    formFields[fieldName] = validation[fieldName]

    const result = validatejs(formValues, formFields)

    if (result) {
        return result[fieldName][0]
    }

    return null
}
