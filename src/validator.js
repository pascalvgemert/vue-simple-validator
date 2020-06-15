import Helpers from './helpers';
import * as Rules from './rules';

export default class Validator {

    /**
     * Validator constructor
     */
    constructor() {
        this.failures = [];

        this.ruleInstances = {
            'alpha': new Rules.Alpha(),
            'alpha_numeric': new Rules.AlphaNumeric(),
            'between': new Rules.Between(),
            'decimal': new Rules.Float(),
            'email': new Rules.Email(),
            'float': new Rules.Float(),
            'int': new Rules.Integer(),
            'integer': new Rules.Integer(),
            'len': new Rules.Length(),
            'length': new Rules.Length(),
            'max': new Rules.MaxValue(),
            'min': new Rules.MinValue(),
            'numeric': new Rules.Numeric(),
            'required_if': new Rules.NumericIf(),
            'required_without': new Rules.RequiredWithout(),
            'slug': new Rules.Slug(),
            'string': new Rules.String(),
            'url': new Rules.Url(),
        };

        this.failureMessages = {
            'alpha': '{field} must only contain alphabetical (A-z) characters.',
            'alpha_numeric': '{field} must only contain alphanumeric (A-z, 0-9) characters.',
            'between': '{field} must be between {minimum} and {maximum}.',
            'decimal': '{field} must be decimal.',
            'email': '{field} must be a valid email addresss.',
            'float': '{field} must be decimal.',
            'int': '{field} must be integer.',
            'integer': '{field} must be integer.',
            'len': '{field} must have a length of {length}.',
            'length': '{field} must have a length of {length}.',
            'max': '{field} must be {maximum} or lower.',
            'min': '{field} must be {minimum} or higher.',
            'numeric': '{field} must be numeric value.',
            'required': '{field} is required',
            'required_if': '{field} is required when {other_field} is given.',
            'required_without': '{field} is required when {other_field} is not given.',
            'slug': '{field} must be a valid slug (a-z, 0-9, -).',
            'string': '{field} must be a valid string',
            'url': '{field} must be a valid url',
        };
    }

    /**
     * @returns {Object}
     */
    getFailures() {
        return this.failures || {};
    }

    /**
     * @param {String} ruleName
     *
     * @returns {Object}
     */
    getRule(ruleName) {
        let rule = this.ruleInstances[ruleName] || null;

        if (!rule) {
            throw `The rule '${ruleName}' is not supported.`;
        }

        return rule;
    }

    /**
     * @param {String} ruleName
     * @param {Object} rule
     * @param {String|null} failureMessage
     */
    registerRule (ruleName, rule, failureMessage) {
        if (typeof ruleName !== 'String') {
            throw 'The rule name should be a string';
            return false;
        }

        // @todo Improve check
        if (typeof rule !== 'object') {
            throw `The rule object must be an object.`;
            return false;
        }

        failureMessage = failureMessage || '{field} is invalid.',

        ruleInstances[ruleName] = rule;
        failureMessages[ruleName] = failureMessage;

        return true;
    }

    /**
     * @param {Object} failureMessages
     */
    setFailureMessages(failureMessages) {
        Object.assign(this.failureMessages, failureMessages);
    }

    /**
     * @param {Object} context
     * @param {Object} rules
     *
     * @returns {Boolean}
     */
    validate(context, rules) {
        this.failures = [];

        Object.entries(rules).forEach(([fieldName, fieldRules]) => {
            let fieldValue = Helpers.getFieldValueFromContext(context, fieldName),
                fieldRules = typeof fieldRules === 'string' ? fieldRules.split(',') : fieldRules;

            for (fieldRule of fieldRules) {
                // Validate field rule, continue is succeeds.
                if (!this.validateValueAgainstRule(fieldValue, fieldRule, context)) {
                    this.reportFailure(fieldName, fieldRule);
                }
            }
        });

        return failedRules.length === 0;
    }

    /**
     * @param {String} fieldName
     * @param {String} fieldRule
     */
    reportFailure(fieldName, fieldRule) {
        // Build and store failure message based on field value + field rule.
        let ruleSequence = fieldRule.split(':'),
            ruleName = ruleSequence[0] || ''
            ruleParams = ruleSequence[1] || '',
            rule = this.getRule(ruleName),
            message = this.failureMessages[ruleName] || '{field} is invalid.';

        this.failures[fieldName] = this.failures[fieldName] || [];
        this.failures[fieldName][ruleName] = rule
            ? rule.failureMessage(message, fieldName, ruleParams)
            : 'Could not retrieve error message';
    }

    /**
     * @param {*} value
     * @param {String} rule
     * @param {Object} context
     *
     * @returns {Boolean}
     */
    validateValueAgainstRule(value, rule, context) {
        let ruleSequence = rule.split(':'),
            ruleName = ruleSequence[0] || null,
            ruleParams = (ruleSequence[1] || 'null').split(',');
            ruleInstance = getRule(ruleName);

        if (!rule) {
            return false;
        }

        return ruleInstance.validate(value, ruleParams, context);
    }
}
