import axios from "axios";
import { IGetPlayListsParams, Spotify, VariableStringType } from "../../types"

export namespace SpotifyPlayListApi {
    export const getUserPlayLists = (params: IGetPlayListsParams, token: string) => {
        const url = Spotify.spotifyPlayListsURL.toString();
        const headers: VariableStringType = {};
        headers[Spotify.ParamKeys.authorization] = `Bearer ${token}`
        return axios.get(url, {
            headers,
            params: params
        })
    }
}