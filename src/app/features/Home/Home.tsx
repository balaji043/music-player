import { FC, ReactElement } from 'react';
import { SpotifyImage } from '../../types';

export const Home = () => {
	return (
		<div className='text-xl text-white'>
			<RecentPlayed />
		</div>
	);
};
const RecentPlayed: FC = () => {
	return (
		<SuggestionSection
			list={[]}
			onClick={() => {}}
			title={'Title'}
			key='Recently Played'
		/>
	);
};
interface ISpotifyItem {
	name: string;
	subtitle: string;
	images: SpotifyImage[];
}
interface ISuggestionSectionProps<T extends ISpotifyItem> {
	title: string;
	list: T[];
	onClick: (value: any) => void;
}

function SuggestionSection<T extends ISpotifyItem>(
	props: ISuggestionSectionProps<T>
): ReactElement {
	return (
		<div>
			<h3>{props.title}</h3>
		</div>
	);
}
