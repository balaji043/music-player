import SpotifyWebApi from "spotify-web-api-node";
import { AppCredentials } from "./credentials";

export type VariableStringType = { [x: string]: string };
export type StringOrNull = string | null

export const CacheKeys = {
  mySpotifyAppCacheName: 'MySpotifyAppCache',
  tokenResponseCache: 'tokenResponse',
  codeCache: 'code'
}

export const spotifyApis = new SpotifyWebApi();

export namespace Spotify {

  // params keys
  export const ParamKeys = {
    clientId: 'client_id',
    clientSecret: 'client_secret',
    responseType: 'response_type',
    code: 'code',
    redirectUri: 'redirect_uri',
    scope: 'scope',
    grantType: 'grant_type',
    refreshToken: 'refresh_token',
    authorization: 'Authorization',
    basic: 'Basic',
    contentType: 'Content-Type',
  }

  // params values
  export const ParamValues = {
    code: 'code',
    authorizationCode: 'authorization_code',
    refreshToken: 'refresh_token',
    urlEncodedContentType: 'application/x-www-form-urlencoded',
  }

  const scopeArray = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];
  const scopes = scopeArray.join("%20");
  export const getCode = () => new URLSearchParams(window.location.search).get('code');

  // authorize
  const spotifyAccountBaseURL = new URL("https://accounts.spotify.com");
  export const tokenUrl = new URL("/api/token", spotifyAccountBaseURL);
  const buildAppAccessUrl = () => {
    const url = new URL("/authorize", spotifyAccountBaseURL);
    url.searchParams.append(ParamKeys.clientId, AppCredentials.clientId);
    url.searchParams.append(ParamKeys.responseType, ParamValues.code);
    url.searchParams.append(ParamKeys.redirectUri, AppCredentials.redirectUri);
    url.searchParams.append(ParamKeys.scope, scopes);
    return url
  }
  export const appAccessURL = buildAppAccessUrl();
  const authorizationHeader = () => {
    const buffer = new Buffer(`${AppCredentials.clientId}:${AppCredentials.clientSecret}`).toString('base64');
    return `${ParamKeys.basic} ${buffer}`
  }
  export const accountAuthHeaders = (): VariableStringType => {
    return {
      Authorization: authorizationHeader(),
      'Content-Type': ParamValues.urlEncodedContentType,
    }
  }

  export const authorizationHeaderObject = (): VariableStringType => {
    return {
      Authorization: authorizationHeader(),
    }
  }


  // base url
  const spotifyAPIBaseURL = new URL('https://api.spotify.com')
  // playlist 

  export const spotifyPlayListsURL = new URL('/v1/me/playlists', spotifyAPIBaseURL)

}

export interface ICacheType {
  tokens: ITokenResponse,
  code: StringOrNull,
  time: number,
}


export type StateType = 'idle' | 'loading' | 'error'

export type NavPath = 'home' | 'search' | 'songs' | 'playListSelected'

export interface IGetPlayListsParams {
  offset: number,
  limit: number,
}

// Spotify reponse type

export interface ITokenResponse {
  access_token: string,
  refresh_token: string,
  expires_in: number,
  scope: string,
  token_type: string,
}
export interface IApiResponseState<T> {
  state: StateType,
  data: T,
  error: string
}