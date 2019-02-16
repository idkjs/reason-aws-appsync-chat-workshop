type config;
[@bs.module "../aws-exports.js"] external awsConfig:config = "default";

type amplify;
[@bs.module "aws-amplify"] external amplify: amplify = "default";
type configure;
[@bs.send] external configure: (amplify, config) => configure = "configure";

[@bs.send] external hub: (amplify, unit) =>  Js.Promise.t('a) = "Hub";


let configure = () => configure(amplify, awsConfig);
type idTokenT = {
  idToken,
} and idToken = {jwtToken: string};

module Decode = {
type t = idTokenT;
  let decodeJwt = json => Json.Decode.{jwtToken: json |> field("jwtToken",string)}
  let decodeToken = json => Json.Decode.{
        idToken: json |> field("idToken", decodeJwt)
  };
  let decodeResponse = json => decodeToken(json);
  let response = (json: string) : Belt.Result.t(t, string) =>
    try (json |> Json.parseOrRaise |> decodeResponse |> (u => Belt.Result.Ok(u))) {
    | Json.Decode.DecodeError(decodeError) => Belt.Result.Error(decodeError)
    | e => Belt.Result.Error(e |> Js.String.make)
    };
};

type auth;
[@bs.module "@aws-amplify/auth/lib"] external auth: auth = "default";
[@bs.send] external getCurrentSession:(auth,unit)=> Js.Promise.t('a) = "currentSession";


let getJwtToken = () => {
    open PromiseMonad;
    getCurrentSession(auth,())
    >>= (response => {
        let jwtToken = Decode.response(response);
    Js.log(jwtToken);
    return(jwtToken);
  })
};

