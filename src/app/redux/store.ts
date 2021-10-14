import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { dashboardSlice } from '../features/dashboard/dashboardSlice';
import { authSlice } from '../features/login/loginSlice';
import { musicPlayerSlice } from '../features/MusicPlayer/MusicPlayerSlice';
import { playlistsSlice } from '../features/playlist/playlistsSlice';
import { tracksSlice } from '../features/tracks/TracksSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		dashboard: dashboardSlice.reducer,
		playlists: playlistsSlice.reducer,
		tracks: tracksSlice.reducer,
		musicPlayer: musicPlayerSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
