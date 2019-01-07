
const find = require('./find');
const search = require('./search');
const aggregate = require('./aggregate');
const _ = require('underscore');

/**
 * Mongoose plugin
 * @param {Object} schema mongoose schema.
 * @param {Object} options
 * @param {string} options.name name of the function.
 */

module.exports = function (schema, options) {

  /**
   * paginate function
   * @param {Object} param required parameter
   */

  const fn = function(param) {
    if (!this.collection) {
      throw new Error('collection property not found');
    }

    param = _.extend({}, param);

    if (param.aggregation) return aggregate(this.collection, param);
    if (param.search) return search(this.collection, param.search, param);
    return find(this.collection, param);
  };

  if (options && options.name) {
    schema.statics[options.name] = fn;
  } else {
    schema.statics.paginate = fn;
  }
};
