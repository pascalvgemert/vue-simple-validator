# vue-simple-validator
An easy to use Validator for Vue components and any kind of objects based on Laravel Validation.

  - Works within components
  - Works within methods
  - Works within mixins

### Installation  
```sh
$ npm install --save vue-notification
```

```js
import VueSimpleValidator from 'vue-simple-validator';

// Register Plugin
Vue.use(VueSimpleValidator, {
    // Use to overwrite the current errorMessage (or translate)
    errorMessage: {
        required: '{field} really, like really needs to be filled in dude.'
    }
});
```

### How it works
##### 1) Within components - Basic usage
The basic usage within a component is to call the validator with input `this` as the data context and `this.rules` as second parameter. The `validate()` method returns a `boolean` and to retrieve the errors you can retrieve them with the `errors()` method.
```js
export default {
    name: 'ExampleComponent',
    data() {
        return {
            name: 'John Doe',
            age: 0,
            email: '',
            errors: null,
            rules: {
                name: 'required|string|min:3',
                age: 'required|integer|between:18,99',
                email: 'required|email',
            }
        };
    },
    methods: {
        submit() {
            if (!this.$validator.validate(this, this.rules)) {
                this.errors = this.$validator.errors();

                return;
            }

            // Execute the rest of the code..
        },
    }
};
```

##### 2) Within components - Rules per method
The rules can also be declared in the method itself:

```js
submit() {
    let rules = {
        name: 'required|string|min:3',
        age: 'required|integer|between:18,99',
        email: 'required|email',
    };

    if (!this.$validator.validate(this, rules)) {
        this.errors = this.$validator.errors();

        return;
    }

    // Execute the rest of the code..
}
```

##### 3) Within components - Data and Rules per method
You can also validate custom datasets, see the `params` variable in the example below:

```js
submit(params) {
    let rules = {
        name: 'required|string|min:3',
        age: 'required|integer|between:18,99',
        email: 'required|email',
    };

    if (!this.$validator.validate(params, rules)) {
        this.errors = this.$validator.errors();

        return;
    }

    // Execute the rest of the code..
}
```

##### 4) Anywhere else.
The validator can be accessed globally throughout Vue just by calling the `this.$validator` or `this.$root.$validator`.

```js
mixinMethod(name, age, email) {
    let rules = {
        name: 'required|string|min:3',
        age: 'required|integer|between:18,99',
        email: 'required|email',
    };

    let data = {
        name: name,
        age: age,
        email: email
    };

    if (!this.$validator.validate(data, rules)) {
        this.$root.errors = this.$validator.errors();

        return;
    }

    // Execute the rest of the code..
}
```

### Plugin Documentation

##### Validator methods:
All public methods for the Validator class:

| Method | Return | Description |
|---|---|---|
| `$validator.validate(Object data, Object rules);` | `Boolean` | Validates the given data against the given rules. |
| `$validator.errors();` | `ErrorBag` | Returns the Errorbag of the last validation, for more info about the **ErrorBag** see methods below. |
| `$validator.failed();` | `Boolean` | Returns if is the last validation has failed or not. |
| `$validator.registerRule(String ruleName, Rule rule, String errorMessage);` | `void` | You can register the own custom Rule, for more info see section **Custom Rule**. |
| `$validator.setErrorMessages(Object errorMessages);` | `void` | Here you can add custom / new error messages specified as an associative array (object) |

##### ErrorBag methods:
All public methods for the ErrorBag class:

| Method | Return | Description |
|---|---|---|
| `errorBag.add(String key, String message);` | `void` | Lets you add a custom error for the given key. |
| `errorBag.all();` | `Object` | Returns all the errors in the error bag as an associative array (object). |
| `errorBag.any();` | `Boolean` | Returns if the error bag contains any errors. |
| `errorBag.count();` | `Number` | Returns the number of errors in the error bag. |
| `errorBag.get(String key);` | `String|null` | Get a specific error from the error bag (for certain field for example). Returns `null` when no error could be found. |
| `errorBag.has(String key);` | `Boolean` | Checks if a certain key is found within the known errors in the error bag. |

### Defined rules
The current rules which the plugin starts of with. More rules are being implemented soon.

| Rule | Description |
|---|---|
| alpha | Checks wether the value contains only alphabetically charachters. |
| alpha_numeric | Checks wether the value contains only alphanumeric charachters. |
| between:{min},{max} | Checks wether the value is between a {min} / {max}. |
| decimal / float  | Checks wether the value is a decimal / float. |
| email | Checks wether the value is a valid email address. |
| int / integer | Checks wether the value is an integer. |
| len:{length} / length:{length} | Checks wether the value has a certain length of {length}. |
| min:{min} | Checks wether the value has a minimal value of {min}. |
| max:{max} | Checks wether the value has a maximal value of {max}. |
| numeric | Checks wether the value is a valid number. |
| required | Checks wether the value is given. |
| required_if:{other_field} | Checks wether the value is given, when the {other_field} is given. |
| required_without:{other_field} | Checks wether the value is given, when the {other_field} is NOT given. |
| slug | Checks wether the value is a valid slug (example: `lower-case-slug`). |
| string | Checks wether the value is a valid string. |
| url | Checks wether the value is a valid url. |

### Custom rule
You can also define custom rules and add them to the validator.

##### 1) First create your rule class
The rule class should extend the Abstract `Rule` class.
```js
import Rule from './rule';

export default class Contains extends Rule {
    /**
     * @param {*} value
     * @param {Array} ruleParams
     * @param {Object} context
     *
     * @returns {Boolean}
     */
    validate(value, ruleParams, context) {
        // You can extract the params from the given rule (rulename:params,comma,separated)
        const needle = ruleParams[0]; // Will return the first param

        // Do you validation check and return if it validates true or false.
        return value.indexOf(needle) !== -1;
    }

    /**
     * @param {String} message
     * @param {String} field
     * @param {Array} ruleParams
     */
    failureMessage(message, field, ruleParams) {
        const needle = ruleParams[0];

        // In some cases the failureMessage should contain more info.
        // With this method you can inject the info into the message.
        // The {field} replacement is highly recommended.
        return message
            .replace('{field}', field)
            .replace('{needle}', needle);
    }
};
```

##### 2. Register your custom rule in the Validator:
Your rule should be registered in the main Validator so the validator knows it can be used.

```js
import VueSimpleValidator from 'vue-simple-validator';
import Contains from `./path-to-your-rules/contains';

// Register Plugin
Vue.use(VueSimpleValidator, { errorMessage: { .. }} });

// Add custom rule(s)
this.$root.$validator.registerRule('contains', new Contains(), '{field} must contains the value {needle}.');
```

### Author

- [Pascal van Gemert](https://github.com/pascalvgemert)
