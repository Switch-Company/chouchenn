/* global process: true, console: true */

var config = require( './server/config' ),
    express = require( 'express' ),
    port = 'development' === process.env.NODE_ENV ? 3000 : config.port;

    process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var app = express();

// server handling
require( './server/express' )( app, config );

// routes handling
require( './server/routes' )( app, config );


app.listen( port );

console.log( 'Express app started on port '+ port );
