import Rule from './rule';

export default class Numeric extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     *
     * @returns {Boolean}
     */
    validate(value, ruleParams, context) {
        return value => typeof value === 'number' && value === value && value !== Infinity && value !== -Infinity;
    }
};
