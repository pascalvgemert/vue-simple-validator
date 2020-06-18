import Validator from './Validator';

export default {
    install (Vue, options) {
        // Instantiate the validator
        const validator = new Validator();

        // Apply options
        if (typeof options.errorMessages === 'object') {
            validator.setErrorMessages(options.errorMessages);
        }

        // Set validator global methods
        Vue.prototype.$validator = {
            errors: validator.errors,
            failed: validator.failed,
            registerRule: validator.registerRule,
            validate: validator.validate,
        }
    }
};
