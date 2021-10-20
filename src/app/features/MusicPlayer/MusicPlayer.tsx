import { MutableRefObject, useRef } from 'react';
import { FC } from 'react';
import SpotifyWebPlayer, {
	CallbackState,
	StylesProps,
} from 'react-spotify-web-playback/lib';
import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectSelectedUris } from '../dashboard/dashboardSlice';
import { selectAccessToken } from '../login/loginSlice';
import { setPlayerState } from './MusicPlayerSlice';

const MusicPlayer: FC = () => {
	const token = useAppSelector(selectAccessToken);
	const uris = useAppSelector(selectSelectedUris);

	const dispactch = useAppDispatch();
	const spotifyPlayerCallBack = (s: CallbackState) => {
		dispactch(setPlayerState(s));
	};
	return (
		<div className='flex-auto border-t' style={{ height: '10vh' }}>
			<div className='flex justify-center min-h-full pt-2'>
				{uris && token ? (
					<SpotifyWebPlayer
						styles={styles}
						uris={uris}
						token={token}
						autoPlay={true}
						callback={spotifyPlayerCallBack}
						magnifySliderOnHover={true}
						name='asd'
						persistDeviceSelection={true}
						showSaveIcon={true}
						syncExternalDevice={true}
					/>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export { MusicPlayer };

const styles: StylesProps = {
	color: '#b3b3b3',
	bgColor: '#181818',
	trackNameColor: 'white',
	trackArtistColor: '#b3b3b3',
};
