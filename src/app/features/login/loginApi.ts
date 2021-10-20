import axios, { AxiosResponse } from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { AppCredentials } from "../../credentials";
import { CacheKeys, ICacheType, ITokenResponse, Spotify, StringOrNull, VariableStringType } from "../../types";

export namespace SpotifyAuthApi {
    export const loginToSpotify = (code: StringOrNull) => {
        const tokenUrl = Spotify.tokenUrl.toString();
        const headers = Spotify.accountAuthHeaders();
        const params: VariableStringType = {}
        params[Spotify.ParamKeys.grantType] = Spotify.ParamValues.authorizationCode;
        params[Spotify.ParamKeys.redirectUri] = AppCredentials.redirectUri;
        params[Spotify.ParamKeys.code] = code || '';
        params[Spotify.ParamKeys.clientId] = AppCredentials.clientId;
        params[Spotify.ParamKeys.clientSecret] = AppCredentials.clientSecret;
        return axios
            .post<null, AxiosResponse<any>>(
                tokenUrl,
                null,
                {
                    headers,
                    params
                }
            );

    }

    export const refreshSpotifyToken = (refreshToken: string) => {
        const tokenUrl = Spotify.tokenUrl.toString();
        const headers = Spotify.accountAuthHeaders();
        const params: VariableStringType = {}
        params[Spotify.ParamKeys.grantType] = Spotify.ParamValues.refreshToken;
        params[Spotify.ParamKeys.refreshToken] = refreshToken;
        return axios
            .post<null, AxiosResponse<any>>(
                tokenUrl,
                null,
                {
                    headers,
                    params
                }
            );
    }
}

export const writeToCache = async (tokens: ITokenResponse, code: StringOrNull, time: number) => {
    if (caches) {
        const cache = await caches.open(CacheKeys.mySpotifyAppCacheName);
        const cacheData: ICacheType = { tokens, code, time }
        await cache.put(CacheKeys.tokenResponseCache, new Response(JSON.stringify(cacheData)))
    }
}