
'use strict'

exports.authenticated = function(req /*request*/, res /* response */, next){

    console.log("Estas pasando por el midelware")
    next();
}