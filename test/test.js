var fs = require('fs');
var Transform = require('../dist/index.js');
var html = fs.readFileSync(__dirname + '/test.html', { encoding: 'utf8' });

var transform = new Transform({
  // minify: true,
  handlers: {
    style: [
      ['less', {}]
    ],
    script: [
      ['babel', {
        presets: [
          'es2015-loose',
          'stage-3'
        ]
      }]
    ]
  }
});


transform.compile(html).then(ret => {
  console.log('html: ' + ret)
}).catch(e => {
  console.log(e)
});
