import { useEffect } from 'react';
import { Loader } from './components/Loader';
import { Dashboard } from './features/dashboard/Dashboard';
import { Login } from './features/login/Login';
import {
	loadTokenResponseFromCache,
	refreshTokenThunk,
	selectCacheLoadState,
	selectIsAuthenticated,
	selectRefreshToken,
	selectTokenExpiresIn,
	selectTokeReceviedOn,
} from './features/login/loginSlice';
import { useAppSelector, useAppDispatch } from './redux/hooks';

function App() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const cacheLoadState = useAppSelector(selectCacheLoadState);
	useLoadAndRefreshToken();
	const getUi = (): JSX.Element => {
		if (cacheLoadState === 'loading') {
			return <Loader />;
		} else {
			if (isAuthenticated) {
				return <Dashboard />;
			} else {
				return <Login />;
			}
		}
	};
	return (
		<div className='h-screen w-screen overflow-hidden bg-black text-white'>
			{getUi()}
		</div>
	);
}

export default App;

function useLoadAndRefreshToken() {
	const refreshToken = useAppSelector(selectRefreshToken);
	const tokenExpiresIn = useAppSelector(selectTokenExpiresIn);
	const tokenReceviedOn = useAppSelector(selectTokeReceviedOn);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!refreshToken || !tokenExpiresIn) {
			return;
		}
		const date = new Date();
		const timeNow = date.getTime();
		const diff = timeNow - tokenReceviedOn;
		const diffInSeconds = diff / 1000;
		if (diffInSeconds > tokenExpiresIn) {
			dispatch(refreshTokenThunk(refreshToken));
			return;
		}
		const expiresIn = tokenExpiresIn - diffInSeconds;
		let interval = setInterval(() => {
			console.log('dispatching refresh token');
			dispatch(refreshTokenThunk(refreshToken));
		}, (expiresIn - 60) * 1000);
		return () => clearInterval(interval);
	}, [refreshToken, tokenExpiresIn, tokenReceviedOn]);

	useEffect(() => {
		dispatch(loadTokenResponseFromCache());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
