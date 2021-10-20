import { createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { RootState, RootStateType } from "../../redux/store";
import { NavPath, spotifyApis } from "../../types";


interface IDashboardState {
    path: NavPath;
    selectedPlayList?: SpotifyApi.PlaylistBaseObject;
    selectedUris?: string | string[];
}
const initialState: IDashboardState = {
    path: 'home'
}

export const dashboardSlice = createSlice<
    IDashboardState,
    SliceCaseReducers<IDashboardState>
>({
    name: 'dashboard',
    initialState,
    reducers: {
        navigateTo: (state, action: PayloadAction<NavPath>) => {
            state.path = action.payload
        },
        navigateToPlayList: (state, action: PayloadAction<SpotifyApi.PlaylistObjectFull>) => {
            state.selectedPlayList = action.payload
            state.path = 'playListSelected'
        },
        selectTracksToPlay: (state, _) => {
            state.selectedUris = state.selectedPlayList?.uri;
        }
    },

})

export const { navigateTo, navigateToPlayList, selectTracksToPlay } = dashboardSlice.actions

const selectNavPath = (state: RootState) => state.dashboard.path
const selectSelectedPlayList = (state: RootState) => state.dashboard.selectedPlayList
const selectSelectedUris = (state: RootState) => state.dashboard.selectedUris

export {
    selectNavPath,
    selectSelectedPlayList,
    selectSelectedUris
}