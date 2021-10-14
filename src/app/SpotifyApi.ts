import axios, { Axios } from "axios";
export class SpotifyClient {
    base_url = 'https://api.spotify.com/';
    api_version = 'v1/';
    base_path = this.base_url + this.api_version
    baseAxios = axios.create({ baseURL: this.base_url })

}
class AlbumsApi {
    path = 'albums/';
    constructor(private axios: Axios) {

    }
    getAnAlbum = () => {
        this.axios.get(this.path)
    }
}
class ArtistApi {

}
class BrowseApi {

}
class EpisodeApi {

}
class FollowApi {

}
class LibraryApi {

}
class MarketsApi {

}
class PersonalizationApi {

}
class PlayerApi {

}
class PlaylistsApi {

}
class SearchApi {

}
class ShowsApi {

}
class TracksApi {

}
class UserProfileApi {

}