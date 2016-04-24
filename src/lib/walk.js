function walk(ast, stepCallback, _floor, _index) {
  _floor = _floor || 0;
  _index = _index || 0;
  for (let index = 0, len = ast.childNodes.length; index < len; index++) {
    let node = ast.childNodes[index];
    if (node.nodeName[0] === '#') continue;
    if (Array.isArray(node.childNodes)) {
      walk(node, stepCallback, ++_floor, _index);
    }
    stepCallback(node, _floor, index);
    --_floor;
  }
}
module.exports = walk;
