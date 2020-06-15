import Rule from './rule';

export default class Float extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     */
    validate(value, ruleParams, context) {
         return value => parseFloat(value) === value;
    }
};
