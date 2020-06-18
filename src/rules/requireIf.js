import Helpers from '../helpers';
import Rule from './rule';

export default class RequiredIf extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     *
     * @returns {Boolean}
     */
    validate(value, ruleParams, context) {
        let otherFieldName = ruleParams[0],
            otherFieldValue = Helpers.getFieldValueFromContext(context, otherFieldName);

        return !!otherFieldValue;
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     *
     * @returns {String}
     */
    failureMessage(message, field, ruleParams) {
        const otherFieldName = ruleParams[0];

        return message
            .replace('{field}', field)
            .replace('{other_field}', otherFieldName);
    }
};
