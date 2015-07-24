# Chouchenn - Lightweight library of mixins for Stylus
Lightweight mixin library to help you get the best of Stylus.

## Installation

```bash
$ npm install chouchenn
```

## JavaScript API

Below is an example of how to utilize Chouchenn and Stylus with the connect framework (or Express).

```javascript
var connect = require('connect')
  , stylus = require('stylus')
  , chouchenn = require('chouchenn');

var server = connect();

function compile(str, path) {
  return stylus(str)
  .set('filename', path)
  .set('compress', true)
  .use(chouchenn());
}

server.use(stylus.middleware({
  src: __dirname
  , compile: compile
}));
```

## Stylus API

To gain access to everything Chouchenn has to offer, simply add:

```css
@import 'chouchenn'
```

## More Information

Checkout the documentation here: [http://chouchenn.switch.paris](http://chouchenn.switch.paris)

## Testing

You will first need to install the dependencies:

```bash
  $ npm install -d
```

Run the automated test cases:

```bash
  $ npm test
```


## Contributors

Made with care by the [Switch Team](https://github.com/Switch-Company), composed of:
  - [Thomas Beduneau](https://github.com/enwin)
  - [Sébastien Dussaut](https://github.com/sdussaut)
  - [Harold Malaud](https://github.com/hmalaud)
  - [Damien Petton](https://github.com/dpetton)


