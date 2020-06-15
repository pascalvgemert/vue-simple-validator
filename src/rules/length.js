import Rule from './rule';

export default class Length extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
        return value.length == length;
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     */
    failureMessage(message, field, ruleParams) {
        const length = ruleParams[0];

        return message
            .replace('{field}', field)
            .replace('{length}', length);
    }
};
