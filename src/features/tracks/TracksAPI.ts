import axios from "axios";
import { Spotify, VariableStringType } from "../../types"

export const getTracksPlayLists = (url: string, token: string) => {
    const headers: VariableStringType = {};
    headers[Spotify.ParamKeys.authorization] = `Bearer ${token}`
    return axios.get(url, { headers });
}