import Validator from './Validator';

export default {
    install (Vue, options) {
        // Instantiate the validator
        const validator = new Validator();

        // Apply options
        if (typeof options.failureMessages === 'Object') {
            validator.setFailureMessages(options.failureMessages);
        }

        // Set validator global methods
        Vue.prototype.$validator = {
            validate: validator.validate,
            failures: validator.getFailures,
            registerRule: validator.registerRule,
        }
    }
};
