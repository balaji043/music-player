import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Spotify } from '../../types';
import {
	selectAuthCode,
	loginUser,
	selectIsAuthenticated,
	selectLoadedFromCache,
	selectHasTokensInCache,
} from './loginSlice';

const Login = () => {
	const code = useAppSelector(selectAuthCode);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const isLoadedFromCache = useAppSelector(selectLoadedFromCache);
	const hasTokensInCache = useAppSelector(selectHasTokensInCache);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const currentCode = Spotify.getCode();
		if (
			isLoadedFromCache &&
			!hasTokensInCache &&
			(currentCode !== code || !isAuthenticated)
		) {
			dispatch(loginUser(currentCode));
		}
	}, [code, isLoadedFromCache, hasTokensInCache, dispatch, isAuthenticated]);
	return (
		<div className='h-screen w-screen bg-black grid justify-items-center'>
			<img
				className='w-1/2'
				src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
				alt='Spotify-Logo'
			/>
			<div>
				<a
					className='p-4 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
					href={Spotify.appAccessURL.toString()}
				>
					LOGIN WITH SPOTIFY
				</a>
			</div>
		</div>
	);
};

export { Login };
