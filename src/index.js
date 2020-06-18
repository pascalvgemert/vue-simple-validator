import Validator from './validator';

export default {
    install (Vue, options) {
        // Instantiate the validator
        const validator = new Validator();

        // Apply options
        if (typeof options.errorMessages === 'object') {
            validator.setErrorMessages(options.errorMessages);
        }

        // Set validator
        Vue.prototype.$validator = validator;
    }
};
