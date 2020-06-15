import Rule from './rule';

export default class Numeric extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
        return value => typeof value === 'number' && value === value && value !== Infinity && value !== -Infinity;
    }
};
