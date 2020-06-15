import Rule from './rule';

export default class MaxValue extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
        return !!value;
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     */
    failureMessage(message, field, ruleParams) {
        const maximum = ruleParams[0];

        return message
            .replace('{field}', field)
            .replace('{maximum}', maximum);
    }
};
