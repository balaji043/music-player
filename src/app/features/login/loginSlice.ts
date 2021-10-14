import { createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../redux/store";
import { CacheKeys, ICacheType, ITokenResponse, Spotify, StateType, StringOrNull, } from "../../types";
import { SpotifyAuthApi, writeToCache } from "./loginApi";


export interface IAuthState {
    code: StringOrNull,
    isAuthenticated: boolean,
    tokens: ITokenResponse,
    tokeReceviedOn: number,
    loadedFromCache: boolean,
    hasTokensInCache: boolean,
    cacheLoadState: StateType
}

const initialState: IAuthState = {
    code: Spotify.getCode(),
    isAuthenticated: false,
    tokens: {
        access_token: '',
        expires_in: 0,
        refresh_token: '',
        token_type: '',
        scope: ''
    },
    loadedFromCache: false,
    hasTokensInCache: false,
    tokeReceviedOn: 0,
    cacheLoadState: 'loading'
}

export const loginUser = createAsyncThunk<
    ITokenResponse,
    StringOrNull
>(
    'users/login',
    async (code, thunkApi) => {
        setCode(code);
        try {
            const loginApiResonse: AxiosResponse<ITokenResponse> = await SpotifyAuthApi.loginToSpotify(code);
            if (loginApiResonse.status === 200) {
                const data = loginApiResonse.data
                const date = new Date();
                await writeToCache(data, code, date.getTime());
                return data
            } else
                return thunkApi.rejectWithValue(loginApiResonse.data)
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
);
export const refreshTokenThunk = createAsyncThunk<
    ITokenResponse,
    string,
    { state: RootState }
>(
    "token/refresh",
    async (refreshToken, thunkApi) => {
        const response: AxiosResponse<ITokenResponse> = await SpotifyAuthApi.refreshSpotifyToken(refreshToken);
        const state = thunkApi.getState()
        if (response.status === 200) {
            const data = response.data
            const beforeTokens = state.auth.tokens;
            const tokens: ITokenResponse = {
                access_token: data.access_token,
                expires_in: data.expires_in,
                refresh_token: beforeTokens.refresh_token,
                scope: beforeTokens.scope,
                token_type: beforeTokens.token_type
            };
            const date = new Date();
            await writeToCache(tokens, state.auth.code, date.getTime());
            return data;
        }
        return thunkApi.rejectWithValue('Error')
    }
);

export const loadTokenResponseFromCache = createAsyncThunk<ICacheType>(
    'load/token',
    async (_, thunkApi) => {
        try {
            const cacheStorage = await caches.open(CacheKeys.mySpotifyAppCacheName);
            const cachedResponse = await cacheStorage.match(CacheKeys.tokenResponseCache);
            if (!cachedResponse || !cachedResponse.ok) {
                return thunkApi.rejectWithValue('');
            }
            const cacheData = await cachedResponse.json() as ICacheType
            return cacheData;
        } catch (error: any) {
            console.log(error.response.data)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)
export const authSlice = createSlice<
    IAuthState,
    SliceCaseReducers<IAuthState>
>({
    name: 'auth',
    initialState,
    reducers: {
        setCode: (state: IAuthState, action: PayloadAction<StringOrNull>) => {
            state.code = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadTokenResponseFromCache.fulfilled, (state, action: PayloadAction<ICacheType>) => {
            state.loadedFromCache = true;
            state.cacheLoadState = 'idle';
            if (action.payload) {
                const data = action.payload;
                state.tokens = data.tokens;
                state.code = data.code;
                state.tokeReceviedOn = data.time;
                state.isAuthenticated = true;
                state.hasTokensInCache = true;
            } else {
                state.isAuthenticated = false;
                state.hasTokensInCache = false;
            }
        }).addCase(loadTokenResponseFromCache.rejected, (state, action) => {
            state.loadedFromCache = true;
            state.hasTokensInCache = false;
            state.cacheLoadState = 'error';
        }).addCase(loginUser.fulfilled, (state, action) => {
            if (action && action.payload) {
                state.tokens = action.payload;
                state.isAuthenticated = true;
                state.hasTokensInCache = true;
            }
            return state;
        }).addCase(loginUser.pending, (state, action) => {
            state.isAuthenticated = false
        }).addCase(loginUser.rejected, (state, action) => {
            state.isAuthenticated = false
        }).addCase(refreshTokenThunk.fulfilled, (state, action) => {
            if (action && action.payload) {
                state.tokens = action.payload;
            }
        })
    }
});

export const { setCode } = authSlice.actions;

const selectAuthCode = (state: RootState) => state.auth.code;
const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
const selectLoadedFromCache = (state: RootState) => state.auth.loadedFromCache;
const selectHasTokensInCache = (state: RootState) => state.auth.hasTokensInCache;
const selectRefreshToken = (state: RootState) => state.auth.tokens.refresh_token;
const selectTokenExpiresIn = (state: RootState) => state.auth.tokens.expires_in;
const selectAccessToken = (state: RootState) => state.auth.tokens.access_token;
const selectTokeReceviedOn = (state: RootState) => state.auth.tokeReceviedOn;
const selectCacheLoadState = (state: RootState) => state.auth.cacheLoadState;

export {
    selectAuthCode,
    selectHasTokensInCache,
    selectLoadedFromCache,
    selectIsAuthenticated,
    selectRefreshToken,
    selectTokenExpiresIn,
    selectTokeReceviedOn,
    selectCacheLoadState,
    selectAccessToken
};
export default authSlice.reducer;
