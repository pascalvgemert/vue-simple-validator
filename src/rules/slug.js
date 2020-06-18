import Rule from './rule';

export default class Slug extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     *
     * @returns {Boolean}
     */
    validate(value, ruleParams, context) {
        const pattern = new RegExp('^[a-z](-?[a-z])*$');

        return !!pattern.test(value);
    }
};
