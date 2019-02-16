'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var AwsAmplify = require("aws-amplify");
var PromiseMonad = require("bs-promise-monad/src/PromiseMonad.bs.js");
var AwsExportsJs = require("../aws-exports.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");
var Lib = require("@aws-amplify/auth/lib");

function configure(param) {
  return AwsAmplify.default.configure(AwsExportsJs.default);
}

function decodeJwt(json) {
  return /* record */Block.record(["jwtToken"], [Json_decode.field("jwtToken", Json_decode.string, json)]);
}

function decodeToken(json) {
  return /* record */Block.record(["idToken"], [Json_decode.field("idToken", decodeJwt, json)]);
}

var decodeResponse = decodeToken;

function response(json) {
  try {
    return /* Ok */Block.variant("Ok", 0, [decodeToken(Json.parseOrRaise(json))]);
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    if (e[0] === Json_decode.DecodeError) {
      return /* Error */Block.variant("Error", 1, [e[1]]);
    } else {
      return /* Error */Block.variant("Error", 1, [String(e)]);
    }
  }
}

var Decode = /* module */Block.localModule([
    "decodeJwt",
    "decodeToken",
    "decodeResponse",
    "response"
  ], [
    decodeJwt,
    decodeToken,
    decodeResponse,
    response
  ]);

function getJwtToken(param) {
  return PromiseMonad.$great$great$eq(Lib.default.currentSession(), (function (response$1) {
                var jwtToken = response(response$1);
                console.log(jwtToken);
                return PromiseMonad.$$return(jwtToken);
              }));
}

exports.configure = configure;
exports.Decode = Decode;
exports.getJwtToken = getJwtToken;
/* aws-amplify Not a pure module */
