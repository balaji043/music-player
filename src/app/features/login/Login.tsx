import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
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
		<div className='h-screen w-screen bg-white grid justify-items-center'>
			<img className='max-w-sm' src='/logo512.png' alt='Spotify-Logo' />
			<div>
				<p className='text-black text-lg text-center'>Made by</p>
				<a
					className='block text-black text-2xl underline border-2 border-gray-800 rounded-lg mt-2 p-2'
					target='_blank'
					rel='noopener'
					href='https://balaji.host'
				>
					Balaji R -&gt;
				</a>
			</div>
			<div>
				<a
					href={Spotify.appAccessURL.toString()}
					className='p-4 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
				>
					LOGIN WITH SPOTIFY
				</a>
			</div>
		</div>
	);
};

export { Login };
