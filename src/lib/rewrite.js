'use strict';
let htmlmin = require('sealine-engine-html-minifier');
async function rewrite(rawHtml, codeList, minify, config) {
  // type: 'style',
  // code: css,
  // start: node.__location.startOffset,
  // end: node.__location.endOffset,
  // var htmlmin = function(html) {
  //   return html.replace(/[\n\t\s]+/g, ' ');
  // }
  let splitRaw = [];
  for (let i = 0; i < codeList.length + 1; i++) {
    let start = codeList[i - 1] ? codeList[i - 1].end : 0;
    let end = codeList[i] ? codeList[i].start : rawHtml.length;
    splitRaw.push(rawHtml.slice(start, end));
    codeList[i] && splitRaw.push(codeList[i].code);
  }
  let html = splitRaw.join('');
  if (minify) {
    let minifyConfig = config.handlers.html.filter(item => item[0] === 'html-minifier')[0][1];
    html = await htmlmin(html, minifyConfig);
  }
  return html;
}

module.exports = rewrite;
