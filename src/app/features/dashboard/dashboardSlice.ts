import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { NavPath, PlayListsItem, Track } from "../../types";


interface IDashboardState {
    path: NavPath;
    selectedPlayList?: PlayListsItem;
    selectedTrack?: Track;
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
        navigateToPlayList: (state, action: PayloadAction<PlayListsItem>) => {
            state.selectedPlayList = action.payload
            state.path = 'playListSelected'
        },
        selectTrackToPlay: (state, action: PayloadAction<Track>) => {
            state.selectedTrack = action.payload
        }
    }
})

export const { navigateTo, navigateToPlayList, selectTrackToPlay } = dashboardSlice.actions

const selectNavPath = (state: RootState) => state.dashboard.path
const selectSelectedPlayList = (state: RootState) => state.dashboard.selectedPlayList
const selectSelectedTrack = (state: RootState) => state.dashboard.selectedTrack

export {
    selectNavPath,
    selectSelectedPlayList,
    selectSelectedTrack
}