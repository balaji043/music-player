import { createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../app/store";
import { StateType } from "../../types";
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
        data: null,
        error: '',
        state: "idle"
    }
}

export const searchAndSelectTrackFromYoutube = createAsyncThunk<
    any,
    string,
    { state: RootState }
>(
    'search/youtube',
    async (query, thunkApi) => {
        try {
            const response: AxiosResponse<any> = await YoutubeApi.searchYoutube(query);
            if (response.status === 200) {
                return response.data.items[0];
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