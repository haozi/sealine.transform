## Parse less and es6 in html, then transform them

```
const Transform = require('saeline.transform');
const transform = new Transform({
  minify: true
});


transform.compile(html).then(ret => {
  console.log('html: ' + ret)
}).catch(e => {
  console.log(e)
});

```
### before
```
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>test</title>
    <style>
      @color: #f00;
      body {
        color: @color;
      }
    </style>
  </head>
  <body>
  <script>
    let a = 10;
    alert(a);
  </script>
  </body>
  </html>
```

### after
```
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>test</title>
    <style>
      body {
        color: #f00;
      }
    </style>
  </head>
  <body>
  <script>
    var a = 10;
    alert(a);
  </script>
  </body>
  </html>
```