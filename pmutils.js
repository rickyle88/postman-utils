/**
 * This is the Custom Postman Utils Library for Salesforce
 * @return {Object{}}  returns an object with utility methods
 */
(function createPMUtils() {

    // Sample: Array of Holidays Calendar format
    const HOLIDAYS = [
        [2014, 2, 10],
        [2018, 11, 22]
    ];

    /**
     * This is method to add Business and Holidays to the Date object
     * @param {number}  days - the number of days ahead of the create Date
     * @param {Object[]} holidays - an array of the calendar holidays
     * @return {Object}  return new custom Date object
     */
    function addBusAndHoliDays(days, holidays = HOLIDAYS) {
        var cDate = this;
        var holiday = null;
        var c = '',
            h = '';

        for (var i = 1; i <= days; i++) {
            cDate.setDate(cDate.getDate() + 1);
            if (cDate.getDay() === 6 || cDate.getDay() === 0) {
                days++;
            } else {
                for (j = 0; j < holidays.length; j++) {
                    holiday = new Date(holidays[j][0], (holidays[j][1] - 1), holidays[j][2]);
                    c = cDate.toDateString();
                    h = holiday.toDateString();
                    if (c == h) {
                        days++;

                    }
                }
            }
        }

        return cDate;

    }

//    Date.prototype.addBusAndHoliDays = addBusAndHoliDays;

    // PMUtils Object
    return Object.freeze({
        /**
         * Generates a random string based on the given amount of characters
         * @param {string|number}  stringLength - the length of the random string    
         * @return string
         */
        randomString: function (stringLength) {
            let chars = "abcdefghijklmnopqrstuvwxyz";
            let text = "";
            for (var i = 0; i < stringLength; i++) {
                let randomIndex = Math.floor(Math.random() * chars.length);
                text += chars.charAt(randomIndex);
            }
            return text;
        },

        /**
         * Generates a random number as a string type based on given amount of characters
         * @param {string|number}  stringLength - the length of the random string    
         * @return string
         */
        randomNumberString: function (stringLength) {
            let chars = "0123456789";
            let text = "";
            for (let i = 0; i < stringLength; i++) {
                let randomIndex = Math.floor(Math.random() * chars.length);
                text += chars.charAt(randomIndex);
            }
            return text;
        },

        /**
         * Generates a random number within a specified range
         * @param {string|number}  min - the minimum value of the number range
         * @param {string|number}  max - the maximum value of the number range
         * @return number
         */
        randomNumber: function (min, max) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
            return num;
        },

        /**
         * Removes the Environment key from Postman
         * @param {(string|string[])}  key or an array of keys  
         */
        unsetEnvironmentKeys: function (...keys) {
            _.forEach(keys, key => pm.environment.unset(key));
        },

        /**
         * Removes the Global key from Postman
         * @param {(string|string[])}  key or an array of keys  
         */
        unsetGlobalKeys: function (...keys) {
            _.forEach(keys, key => pm.globals.unset(key));
        },

        /**
         * This assertion validates that the reponse JSON is the correct format 
         * @param {Object[]|Object{}}  responseJSON - the JSON response from a request
         * @param {Object{}}  schema - the test JSON Schema 
         */
        validateSchema: function (responseJSON, schema) {
            pm.expect(tv4.validate(responseJSON, schema, false, true), tv4.error).to.be.true;
        },
        
        /**
         * This is a factory function to create a Date object with custom methods
         * @return {Object{}} Date Object
         */
        createCustomDate: function() {
            let cDate = new Date();
            Date.prototype.addBusAndHoliDays = addBusAndHoliDays;
            return cDate;
        }

    });
 })();
