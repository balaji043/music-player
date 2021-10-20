import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { CallbackState, STATUS, WebPlaybackArtist } from "react-spotify-web-playback/lib";
import { spotifyApis } from "../../types";

type MyPlayerState = Partial<CallbackState>;
interface IMusicPlayerState {
    playerState: MyPlayerState;
}

const initialState: IMusicPlayerState = {
    playerState: {
        currentDeviceId: '',
        deviceId: '',
        devices: [],
        error: '',
        errorType: '',
        isActive: false,
        isInitializing: false,
        isMagnified: false,
        isPlaying: false,
        isSaved: false,
        isUnsupported: false,
        needsUpdate: false,
        nextTracks: [],
        playerPosition: 'bottom',
        position: 0,
        previousTracks: [],
        progressMs: 0,
        status: STATUS.IDLE,
    }
}
const musicPlayerSlice = createSlice<IMusicPlayerState, SliceCaseReducers<IMusicPlayerState>>({
    name: 'musicPlayer',
    initialState,
    reducers: {
        setPlayerState: (state, action: PayloadAction<CallbackState>) => {
            state.playerState = action.payload
        }
    },
})
export { musicPlayerSlice }

export const { setPlayerState } = musicPlayerSlice.actions;