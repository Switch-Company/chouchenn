/* global module */

var gradientReg = {
  val: /(\(\s*)(?:(-?(\d*\.)?\d+)deg|(to ?(top|bottom|left|right)( (top|bottom|left|right))?))/g,
  type: /((repeating-)?(linear|radial)-gradient\()/g
},
cursorReg = /(zoom-in|zoom-out|grab|grabbing)/g,
transformReg =  /\b(transform)\b/g,
direction = {
  bottom: 'top',
  left: 'right',
  right:'left',
  top: 'bottom'
};

var normalizeGradient = function( parts, prefix ) {
  var val = parts[ 0 ];

    // If value is in degree
  if ( parts[ 1 ] ) {
    val += ( prefix.string === 'webkit' ? ( - 270 - parts[1] ) : parts[ 1 ] ) + 'deg';
  }
  else if ( parts[ 3 ] ) {
    if ( prefix.string === 'webkit' ) {
      val += direction[ parts[ 4 ] ];
      if ( parts[ 5 ] ) {
        val += ' ' + direction[ parts[ 6 ] ];
      }
    }
    else {
      val += parts[ 3 ];
    }
  }

  return val;
};

var normalize = function( property, value, prefix ) {
  var result = value.toString(),
      args;

  if ( ~result.indexOf( 'zoom-' ) || ~result.indexOf( 'grab' ) ) {
    result = result.replace( cursorReg, '-' + prefix.string + '-$1' );
  }

  if ( ~result.indexOf( 'gradient(' ) ) {

    // Normalize legacy gradients
    result = result.replace( gradientReg.val, function() {
        args = [].slice.call( arguments, 1 );
        return normalizeGradient( args, prefix );
    });

    // Adding prefixes to the legacy gradients
    if ( prefix && prefix.string !== 'o' ) {
      result = result.replace( gradientReg.type, '-' + prefix + '-$1');
    }

  }

  // Adding prefixes to the `transform` values of legacy `transition` property
  if ( prefix && ( property.string === 'transition' || property.string === 'transition-property' ) ) {
    result = result.replace( transformReg, '-' + prefix.string + '-$1' );
  }

  return result;
};

var plugin = function() {
  return function( style ) {
    var nodes = this.nodes;
    style.define( 'normalize', function( property, value, prefix ) {
      return new nodes.Ident( normalize( property, value, prefix ) );
    });
  };
};
module.exports = plugin;
