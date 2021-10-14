import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../redux/store";
import { IGetPlayListsParams, IPlayListsResponse, StateType } from "../../types";
import { SpotifyPlayListApi } from "./playlistsApi";

interface IPlayListsState {
    params: IGetPlayListsParams
    state: StateType
    error: string,
    response?: IPlayListsResponse
}

const initialState: IPlayListsState = {
    params: {
        offset: 0,
        limit: 20
    },
    state: 'idle',
    error: '',
}


export const getUserPlayListsThunk = createAsyncThunk<
    IPlayListsResponse,
    IGetPlayListsParams,
    { state: RootState }
>(
    'users/playlists',
    async (data: IGetPlayListsParams, thunkApi) => {
        try {
            const state = thunkApi.getState()
            const token = state.auth.tokens.access_token;
            setParams(data);
            const response: AxiosResponse<IPlayListsResponse> = await SpotifyPlayListApi.getUserPlayLists(data, token);
            if (response.status === 200) {
                return response.data
            } else {
                return thunkApi.rejectWithValue(response.data)
            }
        } catch (error: any) {
            console.log(error.response.data);
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        setParams: (state, action: PayloadAction<IGetPlayListsParams>) => {
            state.params = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getUserPlayListsThunk.pending,
            (state) => {
                state.state = 'loading'
            }
        ).addCase(
            getUserPlayListsThunk.rejected,
            (state, action) => {
                state.state = 'error'
                if (action.payload) {
                    state.error = JSON.stringify(action.payload);
                }
            }
        ).addCase(
            getUserPlayListsThunk.fulfilled,
            (state, action) => {
                state.response = action.payload
                state.state = 'idle'
            }
        )
    }
})

export const { setParams } = playlistsSlice.actions

const selectParams = (state: RootState) => state.playlists.params
const selectPlayListResponse = (state: RootState) => state.playlists.response
const selectPlayListResponseState = (state: RootState) => state.playlists.state
export {
    selectParams,
    selectPlayListResponse,
    selectPlayListResponseState
}

