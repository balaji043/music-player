import { useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { navigateToPlayList } from '../dashboard/dashboardSlice';
import {
	getUserPlayListsThunk,
	selectParams,
	selectPlayListResponse,
	selectPlayListResponseState,
} from './playlistsSlice';

const PlayList = () => {
	const params = useAppSelector(selectParams);
	const response = useAppSelector(selectPlayListResponse);
	const state = useAppSelector(selectPlayListResponseState);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserPlayListsThunk(params));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	return (
		<div>
			{state === 'loading' ? (
				<Loader />
			) : state === 'error' ? (
				<div>Error</div>
			) : response ? (
				<ShowListOfPlayList response={response} />
			) : (
				<div></div>
			)}
		</div>
	);
};

const ShowListOfPlayList = (props: {
	response: SpotifyApi.ListOfUsersPlaylistsResponse;
}) => {
	return (
		<div className='flex flex-col h-full w-full'>
			{props.response.items.map((item) => {
				return <PlayListItem playList={item} key={item.id} />;
			})}
		</div>
	);
};

const PlayListItem = (props: {
	playList: SpotifyApi.PlaylistObjectSimplified;
}) => {
	const { playList } = props;
	const image = playList.images[playList.images.length - 1];
	const dispatch = useAppDispatch();
	return (
		<div className='p-2 flex w-full'>
			<button
				className='flex p-3 flex-grow rounded hover:bg-gray-500'
				onClick={() => {
					dispatch(navigateToPlayList(playList));
				}}
			>
				<img
					className='sm:hidden xl:block'
					src={image.url}
					height={image.height}
					width={image.width}
					alt={playList.name}
				/>
				<div className='xl:ml-4 flex flex-col items-start justify-start h-full flex-grow'>
					<div className='text-lg'>{playList.name}</div>
					<div className='text-sm text-gray-400'>
						{playList.tracks.total} Songs present
					</div>
				</div>
			</button>
		</div>
	);
};

export { PlayList };
