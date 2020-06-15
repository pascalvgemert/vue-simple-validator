import Rule from './rule';

export default class String extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
        return typeof value === 'string';
    }
};
