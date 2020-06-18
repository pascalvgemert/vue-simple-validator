import Rule from './rule';

export default class MaxValue extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     *
     * @returns {Boolean}
     */
    validate(value, ruleParams, context) {
        return !!value;
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     *
     * @returns {String}
     */
    failureMessage(message, field, ruleParams) {
        const maximum = ruleParams[0];

        return message
            .replace('{field}', field)
            .replace('{maximum}', maximum);
    }
};
