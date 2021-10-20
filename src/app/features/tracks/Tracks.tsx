import React, { useState } from 'react';
import { useEffect } from 'react';
import { BiPause, BiPlay, BiTimeFive } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Loader } from '../../components/Loader';
import { formateDate, formatTime } from '../../utilities';

import {
	getTracksThunk,
	selectTracksResponse,
	selectTracksState,
} from './TracksSlice';
import { selectTracksToPlay } from '../dashboard/dashboardSlice';

const Tracks = (props: { id: string }) => {
	const tracksResponse = useAppSelector(selectTracksResponse);
	const tracksState = useAppSelector(selectTracksState);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getTracksThunk(props.id));
	}, [props.id, dispatch]);
	const getUi = () => {
		if (tracksState === 'loading') {
			return <Loader />;
		} else if (tracksState === 'error') {
			return <div>Error</div>;
		} else if (tracksResponse) {
			return <TracksTable2 response={tracksResponse} />;
		} else {
			return <div>No Response</div>;
		}
	};
	return <div className='p-8'>{getUi()}</div>;
};

export default Tracks;

export const TracksTable2 = (props: {
	response: SpotifyApi.PlaylistTrackResponse;
}) => {
	const isPlayList = true;
	return (
		<div className='text-gray-400'>
			<div className='grid grid-cols-12 border-b p-4 uppercase text-xs font-semibold overflow-ellipsis'>
				<div className='col-span-1'>#</div>
				<div className='sm:col-span-10 xl:col-span-4'>title</div>
				{isPlayList && (
					<>
						<div className='sm:hidden xl:col-span-4 xl:block'>album</div>
						<div className='sm:hidden xl:col-span-2 xl:block'>date added</div>
					</>
				)}
				<div className='col-span-1'>
					<div className='text-right flex justify-end text-base items-end'>
						<BiTimeFive />
					</div>
				</div>
			</div>
			<div>
				{props.response.items.map((trackItem, index) => {
					return (
						<TrackRow
							key={trackItem.track.id}
							index={index + 1}
							track={trackItem.track}
							isPlayList={isPlayList}
						/>
					);
				})}
			</div>
		</div>
	);
};

interface ITrackRowProps {
	track: SpotifyApi.TrackObjectFull;
	index: number;
	isPlayList?: boolean;
	addedAt?: string;
}
const TrackRow: React.FC<ITrackRowProps> = (props: ITrackRowProps) => {
	const { track, index, isPlayList, addedAt } = props;
	const dispatch = useAppDispatch();
	return (
		<div className='grid grid-cols-12 gap-4 items-center text-sm rounded-lg mt-4 p-4 hover:bg-gray-600'>
			<div className='col-span-1'>
				<div className='flex items-center justify-evenly'>
					<span>{index}</span>
					<TrackPlayButton
						onClick={(isPlaying) => {
							dispatch(selectTracksToPlay({}));
						}}
					/>
				</div>
			</div>
			<div className='sm:col-span-10 xl:col-span-4 xl:block'>
				<TrackInfo track={track} size={40} />
			</div>
			{isPlayList && (
				<div className='sm:hidden xl:col-span-4 xl:block'>
					<button className='hover:underline text-left'>
						<span className='overflow-ellipsis line-clamp-1'>
							{track.album.name}
						</span>
					</button>
				</div>
			)}
			{isPlayList && addedAt && (
				<div className='sm:hidden xl:col-span-2 xl:block'>
					{formateDate(addedAt)}
				</div>
			)}
			<div className='text-right'>{formatTime(track?.duration_ms)}</div>
		</div>
	);
};
TrackRow.defaultProps = {
	isPlayList: false,
};

interface ITrackTablePlayButton {
	onClick: (isPlaying: boolean) => void;
}
export const TrackPlayButton = (props: ITrackTablePlayButton) => {
	const { onClick } = props;
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<button
			className='text-4xl text-white'
			onClick={() => {
				setIsPlaying(!isPlaying);
				onClick(isPlaying);
			}}
		>
			{isPlaying ? <BiPause /> : <BiPlay />}
		</button>
	);
};

export const TrackInfo = (props: {
	track: SpotifyApi.TrackObjectFull;
	size: number;
	className?: string;
}) => {
	const { track, size, className } = props;
	return (
		<div className={`flex items-start justify-start ${className || ''}`}>
			<img
				className=''
				src={track.album.images[2].url}
				alt={track.name}
				height={size}
				width={size}
			/>
			<div className='block pl-4'>
				<div className='text-base font-semibold text-white'>{track.name}</div>
				<div className='text-xs overflow-ellipsis line-clamp-1'>
					{track.artists
						.map((artists) => {
							return artists.name;
						})
						.join(', ')}
				</div>
			</div>
		</div>
	);
};
