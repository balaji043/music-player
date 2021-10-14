import { AppCredentials } from "./credentials";

export type VariableStringType = { [x: string]: string };
export type StringOrNull = string | null

export const CacheKeys = {
  mySpotifyAppCacheName: 'MySpotifyAppCache',
  tokenResponseCache: 'tokenResponse',
  codeCache: 'code'
}

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

export interface SpotifyListResponse<T> {
  limit: number;
  next?: any;
  offset: number;
  previous?: any;
  total: number;
  href: string;
  items: T[]
}

export interface ExternalUrls {
  spotify: string;
}

export interface ExternalIds {
  isrc: string;
}

export interface Owner {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface PlayListTracks {
  href: string;
  total: number;
}

export interface PlayListsItem {
  collaborative: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: PlayListTracks;
  type: string;
  uri: string;
}

export interface SpotifyImage {
  height: number,
  width: number,
  url: string
}

export interface AddedBy {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

export interface VideoThumbnail {
  url?: any;
}

export interface TrackItem {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  primary_color?: any;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export type ITrackResponse = SpotifyListResponse<TrackItem>
export type IPlayListsResponse = SpotifyListResponse<PlayListsItem>
