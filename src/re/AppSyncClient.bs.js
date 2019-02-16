'use strict';

var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var AwsAppsync = require("aws-appsync");
var AwsExportsJs = require("../aws-exports.js");

var json = Js_json.classify(AwsExportsJs.default);

var __x;

__x = typeof json === "number" || json.tag !== 2 ? undefined : Caml_option.some(json[0]);

var config = Belt_Option.getWithDefault(__x, { });

function client(jwtToken, param) {
  var url = Js_dict.get(config, "aws_appsync_graphqlEndpoint");
  var region = Js_dict.get(config, "aws_appsync_region");
  var type_ = Js_dict.get(config, "aws_appsync_authenticationType");
  return new AwsAppsync.AWSAppSyncClient({
              url: url,
              region: region,
              auth: {
                type: type_,
                jwtToken: jwtToken
              }
            });
}

exports.config = config;
exports.client = client;
/* json Not a pure module */
