import axios from "axios";
import { AppCredentials } from "../../credentials";

export namespace YoutubeApi {
    export const searchYoutube = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3/',
        params: {
            maxResults: 2,
            key: AppCredentials.youtube,
            type: 'video',
        }
    })

    export const getUrl = (videoId: string) =>
        "https://" + videoId + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https%3A%2F%2Fwww.youtube.com%2Fget_video_info%3Fvideo_id%3D" + videoId;
}