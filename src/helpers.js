export default {
    /**
     * @param {Object} context
     * @param {String} fieldName
     *
     * @returns {*}
     */
    getFieldValueFromContext: (context, fieldName) => {
        let fieldNameParts = fieldName.split('.'),
            result = context;

        for (let fieldNamePart of fieldNameParts) {
            if (!result.hasOwnProperty(fieldNamePart)) {
                return null;
            }

            result = result[fieldNamePart];
        }

        return result;
    }
}
