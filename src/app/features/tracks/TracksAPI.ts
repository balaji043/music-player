import SpotifyWebApi from 'spotify-web-api-node'
export const getTracksPlayLists = (url: string, token: string) => {
    var spotify = new SpotifyWebApi()
    spotify.setAccessToken(token);
    return spotify.getPlaylistTracks(url);
}