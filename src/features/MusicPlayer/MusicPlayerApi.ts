import axios from "axios";
import { AppCredentials } from "../../credentials";

export namespace YoutubeApi {
    export const searchYoutube = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3/',
        params: {
            part: 'snippet',
            maxResults: 2,
            key: AppCredentials.youtube
        }
    })
}