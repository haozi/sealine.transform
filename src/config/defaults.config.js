module.exports = {
  minify: false,
  handlers: {
    html: [
      ['html-minifier', {
        minifyCSS: true,
        minifyJS: true,
        "collapseBooleanAttributes": true,
        "collapseWhitespace": true,
        "decodeEntities": true,

        "html5": true,
        "processConditionalComments": true,
        "processScripts": [
          "text/html"
        ],
        "removeAttributeQuotes": true,
        "removeComments": true,
        "removeEmptyAttributes": true,
        "removeOptionalTags": true,
        "removeRedundantAttributes": true,
        "removeScriptTypeAttributes": true,
        "removeStyleLinkTypeAttributes": true,
        "removeTagWhitespace": true,
        "useShortDoctype": true,
      }]
    ],
    style: [
      ['less', {}]
    ],
    script: [
      ['babel', {
        presets: ['es2015-loose', 'stage-3'],
      }]
    ]
  }
}
