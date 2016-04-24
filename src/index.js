const _ = require('lodash');
const fs = require('fs');
const parse5 = require('parse5');
const defaults = require('./config/defaults.config');
const rewrite = require('./config/rewrite.config');
const pkg = require('../package.json');
const logger = require('sealine.logger')(pkg.name);
const walk = require('./lib/walk');
const rewriteHtml = require('./lib/rewrite');

class Registry {
  constructor(params) {
    this.config = _.merge({}, defaults, params, rewrite);
  }

  async compile(content) {
    let fragment = parse5.parse(content, { locationInfo: true });
    let promiseTask = [];
    walk(fragment, (node) => {
      switch (node.nodeName) {
        case 'style':
          promiseTask.push(this._processTag(node.childNodes[0], 'style'));
          break;
        case 'script':
          promiseTask.push(this._processTag(node.childNodes[0], 'script'));
          break;
        default:
      }
    });
    let ret = await rewriteHtml(content, await Promise.all(promiseTask), this.config.minify, this.config);
    return ret;
  }

  compileFromFile() {
    // TODO
    logger.warn('todo');
  }

  async _processTag(node, type) {
    let code = node.value;
    // from right to left
    let steps = this.config.handlers[type];
    let i = steps.length;

    while (i--) {
      let [handler, handlerConfig] = steps[i];
      if (typeof handler === 'function') {
        code = await handler(code, handlerConfig);
        continue;
      }

      let pkgName = `sealine-engine-${handler}`;
      try {
        handler = require(pkgName);
        code = await handler(code, handlerConfig);
      } catch (e) {
        logger.error(code);
        logger.error(e);
        if (!fs.existsSync(`${process.cwd()}/node_modules/${pkgName}`)) {
          logger.error(`${pkgName} is not install, please run \`npm install ${pkgName} --save\``)
        }
      }
    }
    return {
      type: type,
      code: code,
      start: node.__location.startOffset,
      end: node.__location.endOffset,
    };

  }
}

module.exports = Registry;
