import Rule from './rule';

export default class Length extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     *
     * @returns {Boolean}
     */
    validate(value, ruleParams, context) {
        return value.length == length;
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     *
     * @returns {String}
     */
    failureMessage(message, field, ruleParams) {
        const length = ruleParams[0];

        return message
            .replace('{field}', field)
            .replace('{length}', length);
    }
};
