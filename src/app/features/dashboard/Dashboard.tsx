import { HiHome, HiSearch } from 'react-icons/hi';
import { Home } from '../Home/Home';
import Search from '../search/Search';
import Songs from '../songs/Songs';
import { navigateTo, selectNavPath } from './dashboardSlice';
import { PlayList } from '../playlist/PlayLists';
import SinglePlayList from '../SinglePlayList/SinglePlayList';
import { NavPath } from '../../types';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const Dashboard = () => {
	return (
		<div className=''>
			<div className='grid grid-cols-12' style={{ height: '90vh' }}>
				<LeftSection />
				<RightSection />
			</div>
			<MusicPlayer />
		</div>
	);
};

export { Dashboard };

export const RightSection = () => {
	const navPath = useAppSelector(selectNavPath);
	const switchNavPath = () => {
		switch (navPath) {
			case 'home':
				return <Home />;
			case 'search':
				return <Search />;
			case 'songs':
				return <Songs />;
			case 'playListSelected':
				return <SinglePlayList />;
			default:
				return <Home />;
		}
	};
	return (
		<div className='sm:col-span-9 xl:col-span-10 border-r-2 border-fuchsia-600 '>
			{switchNavPath()}
		</div>
	);
};

export const LeftSection = () => {
	return (
		<div className='sm:col-span-3 xl:col-span-2 border-r-2 border-white'>
			<AppNavLinks />
			<PlayList />
		</div>
	);
};

export const AppNavLinks = () => {
	return (
		<div className='flex flex-col w-full border-b-2 border-white'>
			<AppLink to='home' text='Home' iconType={<HiHome />} />
			<AppLink to='search' text='Search' iconType={<HiSearch />} />
		</div>
	);
};

const AppLink = (props: {
	to: NavPath;
	text: string;
	iconType?: JSX.Element;
}) => {
	const dispatch = useAppDispatch();
	const navPath = useAppSelector(selectNavPath);
	const bg = navPath === props.to ? 'bg-gray-800' : 'hover:bg-gray-500';
	return (
		<button
			className='text-lg rounded mx-4 my-2'
			onClick={() => {
				dispatch(navigateTo(props.to));
			}}
		>
			<div className={`flex p-2 rounded items-center  ${bg}`}>
				{props.iconType}
				<span className='pl-2'>{props.text}</span>
			</div>
		</button>
	);
};
