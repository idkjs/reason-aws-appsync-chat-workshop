
[@bs.deriving abstract]
type authT = {
  [@bs.as "type"]
    type_: string,
    jwtToken: string
};

[@bs.deriving abstract]
type clientOptions = {
  url: string,
  region: string,
  auth:authT
};

[@bs.module "aws-appsync"] [@bs.new] external makeAWSAppSyncClient: clientOptions => 'a = "AWSAppSyncClient";

[@bs.module "../aws-exports.js"] external config:Js.Json.t = "default";
let config = Js.Json.classify(config)|> (
    json =>
      switch (json) {
      | Js.Json.JSONObject(dict) => Some(dict)
      | _ => None
      }
  )
  |> Belt.Option.getWithDefault(_, Js.Dict.empty());

external toString: 'a => string = "%identity";

let client = (~jwtToken=?,()) => {
  let url = Js.Dict.get(config,"aws_appsync_graphqlEndpoint");
  let region = Js.Dict.get(config,"aws_appsync_region");
  let type_ = Js.Dict.get(config,"aws_appsync_authenticationType");
  let clientOptions = clientOptions(
  ~url=url->toString,
  ~region=region->toString,
  ~auth=authT(
    ~type_=type_->toString,
    ~jwtToken=toString(jwtToken),
  ));
  makeAWSAppSyncClient(clientOptions);
};