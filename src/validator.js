import ErrorBag from './errorBag';
import Helpers from './helpers';
import * as Rules from './rules';

export default class Validator {

    /**
     * Validator constructor
     */
    constructor() {
        this.errorBag = new ErrorBag({});

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
            'required': new Rules.Required(),
            'required_if': new Rules.RequiredIf(),
            'required_without': new Rules.RequiredWithout(),
            'slug': new Rules.Slug(),
            'string': new Rules.String(),
            'url': new Rules.Url(),
        };

        this.errorMessages = {
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
    errors() {
        return this.errorBag;
    }

    /**
     * See if the current error bag contains any errors.
     *
     * @returns {Boolean}
     */
    failed() {
        return this.errors().any();
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
     * @param {String|null} errorMessage
     */
    registerRule (ruleName, rule, errorMessage) {
        if (typeof ruleName !== 'string') {
            throw 'The rule name should be a string';
        }

        // @todo Improve check
        if (typeof rule !== 'object') {
            throw `The rule object must be an object.`;
        }

        errorMessage = errorMessage || '{field} is invalid.';

        this.ruleInstances[ruleName] = rule;
        this.errorMessages[ruleName] = errorMessage;

        return true;
    }

    /**
     * @param {String} fieldName
     * @param {String} fieldRule
     */
    reportFailure(fieldName, fieldRule) {
        // Build and store failure message based on field value + field rule.
        let ruleSequence = fieldRule.split(':'),
            ruleName = ruleSequence[0] || '',
            ruleParams = (ruleSequence[1] || 'null').split(','),
            rule = this.getRule(ruleName),
            rawMessage = this.errorMessages[ruleName] || '{field} is invalid.',
            message = rule
                ? rule.failureMessage(rawMessage, fieldName, ruleParams)
                : 'Could not retrieve error message';

        this.errorBag.add(fieldName, message);
    }

    /**
     * @param {Object} errorMessages
     */
    setErrorMessages(errorMessages) {
        Object.assign(this.errorMessages, errorMessages);
    }

    /**
     * @param {Object} context
     * @param {Object} rules
     *
     * @returns {Boolean}
     */
    validate(context, rules) {
        // When validating start with a new ErrorBag
        this.errorBag = new ErrorBag({});

        Object.entries(rules).forEach(([fieldName, fieldRules]) => {
            let fieldValue = Helpers.getFieldValueFromContext(context, fieldName);

            fieldRules = typeof fieldRules === 'string' ? fieldRules.split('|') : fieldRules;

            for (let fieldRule of fieldRules) {
                // Validate field rule, report the error and break our of the field rules for loop when an error is found.
                if (!this.validateValueAgainstRule(fieldValue, fieldRule, context)) {
                    this.reportFailure(fieldName, fieldRule);
                    break;
                }
            }
        });

        return this.errorBag.any();
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
            ruleParams = (ruleSequence[1] || 'null').split(','),
            ruleInstance = this.getRule(ruleName);

        if (!rule) {
            return false;
        }

        return ruleInstance.validate(value, ruleParams, context);
    }
}
