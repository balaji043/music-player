import { createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../../redux/store";
import { StateType, Track } from "../../types";
import { YoutubeApi } from "./MusicPlayerApi";


interface IApiResponseState<T> {
    state: StateType,
    data: T,
    error: string
}


interface IMusicPlayerState {
    youtube: IApiResponseState<any>
}

const initialState: IMusicPlayerState = {
    youtube: {
        data: {},
        error: '',
        state: "idle"
    }
}

interface YoutubeId {
    videoId: string;
    kind: string;
}
interface YoutubeVideo {
    id: YoutubeId
}
interface YoutubeSearchResponse {
    items: YoutubeVideo[]
}
export const searchAndSelectTrackFromYoutube = createAsyncThunk<
    any,
    Track,
    { state: RootState }
>(
    'search/youtube',
    async (track, thunkApi) => {
        try {
            const name = track.name;
            const albumName = track.album.name;
            const q = `${name}+${albumName}`
            const response: AxiosResponse<YoutubeSearchResponse> = await YoutubeApi.searchYoutube.get('/search', {
                params: {
                    q
                }
            });
            if (response.status === 200) {
                const id = response.data.items[0].id.videoId;
                // const r: AxiosResponse<any> = await axios.get(YoutubeApi.getUrl(id))

                // if (r.status === 200) {
                //     return r.data
                // } else {
                //     return response.data.items[0];
                // }
                return id;
            } else {
                return thunkApi.rejectWithValue('')
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.response?.data)
        }
    }
);
const musicPlayerSlice = createSlice<IMusicPlayerState, SliceCaseReducers<IMusicPlayerState>>({
    name: 'musicPlayer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(
            searchAndSelectTrackFromYoutube.fulfilled,
            (state, payload: PayloadAction<any>) => {
                if (payload && payload.payload) {
                    state.youtube = {
                        data: payload.payload,
                        error: '',
                        state: 'idle'
                    }
                }
            }
        ).addCase(
            searchAndSelectTrackFromYoutube.pending,
            (state, payload: PayloadAction<any>) => {
                state.youtube.state = 'loading';
                state.youtube.error = ''
            }
        ).addCase(
            searchAndSelectTrackFromYoutube.rejected,
            (state, payload: PayloadAction<any>) => {
                state.youtube.error = payload.payload;
                state.youtube.state = 'error'
            }
        );
    }
})
export { musicPlayerSlice }

const selectYoutubeRespose = (state: RootState) => state.musicPlayer.youtube;

export { selectYoutubeRespose }