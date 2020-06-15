import Rule from './rule';

export default class Alpha extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
        return value.match(/^[a-zA-Z]+$/);
    }
};
