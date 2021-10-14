import { Loader } from '../../components/Loader';
import { PlayListsItem } from '../../types';
import { selectSelectedPlayList } from '../dashboard/dashboardSlice';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';
import Tracks from '../tracks/Tracks';
import { useAppSelector } from '../../redux/hooks';

const SinglePlayList = () => {
	const playList = useAppSelector(selectSelectedPlayList);

	if (!playList) return <Loader />;

	return <GenericThing item={playList} track={null} />;
};

export default SinglePlayList;

const GenericThing = (props: { item: PlayListsItem; track: any }) => {
	return (
		<div
			style={{ height: '90vh' }}
			className='w-full flex flex-col overflow-y-auto bg-gradient-to-b from-blue-900 to-black'
		>
			<InfoSection item={props.item} />
			<ActionButtonSection item={props.item} />
			<Tracks url={props.item.tracks.href} />
		</div>
	);
};

const ActionButtonSection = (props: { item: PlayListsItem }) => {
	return (
		<div className='pl-8 pr-8 flex items-center'>
			<span className='inline-block rounded-full p-3 text-5xl bg-green-500'>
				<BsFillPlayFill style={{ color: 'white' }} />
			</span>
			<BiDotsHorizontalRounded className='ml-8 text-6xl' />
		</div>
	);
};

const InfoSection = (props: { item: PlayListsItem }) => {
	return (
		<div className='p-8 flex flex-row items-end justify-end '>
			<img
				src={props.item.images[1].url}
				height={props.item.images[1].height}
				width={props.item.images[1].width}
				alt={props.item.name}
			/>
			<div className='pl-4 flex flex-grow items-start justify-end flex-col'>
				<div className='uppercase text-sm font-bold'>{props.item.type}</div>
				<div className='text-8xl font-black pt-4 pb-4'>{props.item.name}</div>
				<div className='flex flex-row flex-grow items-start justify-center'>
					<div className='text-sm font-bold'>
						{props.item.owner.display_name}
						<span className='text-gray-400'>
							- {props.item.tracks.total} Songs
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
