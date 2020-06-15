import Rule from './rule';

export default class Between extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
        let minimal = ruleParams[0];
        let maximum = ruleParams[1];

        return value >= minimal && value <= maximum;
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     */
    failureMessage(message, field, ruleParams) {
        const minimum = ruleParams[0];
        const maximum = ruleParams[1];

        return message
            .replace('{field}', field)
            .replace('{minimum}', minimum)
            .replace('{maximum}', maximum);
    }
};
