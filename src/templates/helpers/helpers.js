/* jshint indent: 2 */
module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('if_even', function (conditional, options) {
    if (((conditional + 1) % 2) === 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

};