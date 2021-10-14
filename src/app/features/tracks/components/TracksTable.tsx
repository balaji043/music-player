import { BiTimeFive } from "react-icons/bi";
import { ITrackResponse, Track } from "../../../types";
import { formateDate, formatTime } from "../../../utilities";

export const TracksTable = (props: { response: ITrackResponse }) => {
	const isPlayList = false
	return (
		<table className='min-w-full text-gray-300 table-auto'>
			<TrackTableHeads isPlayList={isPlayList} />
			<tbody>
				{props.response.items.map((trackItem, index) => {
					return (
						<TrackRow
							key={trackItem.track.id}
							index={index + 1}
							track={trackItem.track}
							addedAt={trackItem.added_at}
							isPlayList={isPlayList}
						/>
					);
				})}
			</tbody>
		</table>
	);
};

interface ITrackHeaderProps {
	isPlayList?: boolean;
}
const TrackTableHeads: React.FC<ITrackHeaderProps> = (
	props: ITrackHeaderProps
) => {
	const { isPlayList } = props;
	const className =
		'px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left';
	return (
		<thead className='border-b p-2 uppercase text-xs tracking-wider'>
			<tr>
				<th className={className}>#</th>
				<th className={className}>title</th>

				{isPlayList && (
					<>
						<th className={className}>ALBUM</th>{' '}
						<th className={className}>DATE ADDED</th>
					</>
				)}

				<th className={className}>
					<div className='text-right flex justify-end text-base items-end'>
						<BiTimeFive />
					</div>
				</th>
			</tr>
		</thead>
	);
};
TrackTableHeads.defaultProps = {
	isPlayList: false,
};
interface ITrackRowProps {
	track: Track;
	index: number;
	isPlayList?: boolean;
	addedAt?: string;
}
const TrackRow: React.FC<ITrackRowProps> = (props: ITrackRowProps) => {
	const { track, index, addedAt, isPlayList } = props;
	const thumbnail = track.album.images[2].url;
	return (
		<tr className='text-sm rounded-lg border-t-8 border-b-8 border-transparent border-l-8 border-r-8 hover:bg-gray-600'>
			<td className='whitespace-nowrap'>{index}</td>
			<td className='whitespace-nowrap'>
				<div className='flex items-start justify-start'>
					<img className='' src={thumbnail} alt={track.name} />
					<div className='block pl-4'>
						<div className='text-lg font-semibold text-white'>{track.name}</div>
						<div className='overflow-ellipsis'>
							{track.artists
								.map((artists) => {
									return artists.name;
								})
								.join(', ')}
						</div>
					</div>
				</div>
			</td>
			{isPlayList && (
				<td className='whitespace-nowrap '>
					<button className='hover:underline'>{track.album.name}</button>
				</td>
			)}
			{isPlayList && addedAt && (
				<td className='whitespace-nowrap'>{formateDate(addedAt)}</td>
			)}
			<td className='whitespace-nowrap text-right'>
				{formatTime(track?.duration_ms)}
			</td>
		</tr>
	);
};
TrackRow.defaultProps = {
	isPlayList: false,
};