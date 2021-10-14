import { createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { RootState } from "../../redux/store"
import { ITrackResponse, StateType } from "../../types"
import { getTracksPlayLists } from "./TracksAPI"

export { }


interface ITracksState {
    tracksResponse?: ITrackResponse;
    state: StateType;
    error: any;
}

const initialState: ITracksState = {
    state: 'idle',
    error: ''
}


export const getTracksThunk = createAsyncThunk<
    ITrackResponse,
    string,
    { state: RootState }
>(
    'tracks',
    async (url, thunkApi) => {
        try {
            const state = thunkApi.getState()
            const token = state.auth.tokens.access_token;
            const response: AxiosResponse<ITrackResponse> = await getTracksPlayLists(url, token);
            if (response.status === 200) {
                return response.data
            }
            return thunkApi.rejectWithValue(response.data)
        } catch (error: any) {
            console.log(error.response.data);
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const tracksSlice = createSlice<
    ITracksState,
    SliceCaseReducers<ITracksState>
>({
    name: 'tracks',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(
            getTracksThunk.fulfilled,
            (state, action: PayloadAction<ITrackResponse>) => {
                if (action && action.payload) {
                    state.tracksResponse = action.payload
                    state.state = 'idle'
                }
            }
        ).addCase(
            getTracksThunk.pending,
            (state, _) => {
                state.state = 'loading'
            }
        ).addCase(
            getTracksThunk.rejected,
            (state, action) => {
                state.state = 'error'
                state.error = action.payload
            }
        )
    }
})
const selectTracksResponse = (state: RootState) => state.tracks.tracksResponse
const selectTracksState = (state: RootState) => state.tracks.state

export { selectTracksResponse, selectTracksState }