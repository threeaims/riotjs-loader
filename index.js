var riot = require('riot');
var parsers = require('riot/lib/server/parsers');
var loaderUtils = require('loader-utils');
var sass = require('node-sass');


parsers.css.sass = function(tagName, css) {
  var result = sass.renderSync({
    data: css
  });
  return result.css.toString('utf8');
}


module.exports = function (source) {

  var content = source;
  var options = loaderUtils.parseQuery(this.query);

  if (this.cacheable) this.cacheable();

  Object.keys(options).forEach(function(key) {
    switch(options[key]) {
      case 'true':
        options[key] = true;
        break;
      case 'false':
        options[key] = false;
        break;
      case 'undefined':
        options[key] = undefined;
        break;
      case 'null':
        options[key] = null;
        break;
    }
  });

  try {
    return riot.compile(content, options);
  } catch (e) {
    throw new Error(e);
  }
};
