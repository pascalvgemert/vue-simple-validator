import Rule from './rule';

export default class AlphaNumeric extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
        return value.match(/^[0-9a-zA-Z]+$/);
    }
};
