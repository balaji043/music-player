import { FC, useEffect, useRef, useState } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';
import { Loader } from '../../components/Loader';
import { useAppSelector } from '../../redux/hooks';
import { Track } from '../../types';
import { secondsToMinutesAndSeconds } from '../../utilities';
import { selectSelectedTrack } from '../dashboard/dashboardSlice';
import { TrackInfo } from '../tracks/Tracks';
import { selectYoutubeRespose } from './MusicPlayerSlice';

interface IMusciPlayerProps {}

const MusicPlayer: FC<IMusciPlayerProps> = (props: IMusciPlayerProps) => {
	const track = useAppSelector(selectSelectedTrack);
	const youtubResponse = useAppSelector(selectYoutubeRespose);

	const getUi = (): JSX.Element => {
		if (track) {
			if (youtubResponse.state === 'idle') {
				return <Player track={track} videoId={youtubResponse.data} />;
			} else {
				if (youtubResponse.state === 'error') {
					return <div>error occurred</div>;
				} else {
					return <Loader />;
				}
			}
		} else
			return (
				<div>
					<h1>nothing selected</h1>
				</div>
			);
	};
	return (
		<div className='flex-auto border-t' style={{ height: '10vh' }}>
			{getUi()}
		</div>
	);
};

export { MusicPlayer };

export interface TrackProp {
	track: Track;
	videoId: string;
}

const Player = (props: TrackProp) => {
	const { track, videoId } = props;

	return (
		<div
			className='grid grid-cols-12 px-6 items-center'
			style={{ height: '10vh' }}
		>
			<TrackInfo track={track} size={40} className='col-span-3' />
			<PlayerTrack track={track} videoId={videoId} />
			<div></div>
		</div>
	);
};

const PlayerTrack = (props: TrackProp) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const [duration, setDuration] = useState('00:00');
	const audioRef = useRef<HTMLAudioElement>(null);

	const play = () => {
		const audio = audioRef.current;
		if (audio != null) {
			audio.volume = 0.1;
			if (!isPlaying) {
				setIsPlaying(true);
				audio.play();
			}
			if (isPlaying) {
				setIsPlaying(false);
				audio.pause();
			}
		}
	};
	return (
		<div className='col-span-5'>
			<div className='flex flex-col items-center min-w-full'>
				<div className='flex w-full'>
					<Slider
						audioRef={audioRef}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						track={props.track}
						setDuration={setDuration}
						videoId={props.videoId}
					/>
					<div className=''>{duration}</div>
				</div>
				<iframe
					height='100'
					src={`https://www.youtube.com/embed/${props.videoId}`}
				></iframe>
				<div className='w-full flex items-center justify-center'>
					<button className='text-4xl text-white' onClick={play}>
						{isPlaying ? <BiPause /> : <BiPlay />}
					</button>
				</div>
			</div>
		</div>
	);
};

interface ISliderProps {
	track: Track;
	isPlaying: boolean;
	setIsPlaying: (b: boolean) => void;
	setDuration: (duraton: string) => void;
	audioRef: React.RefObject<HTMLAudioElement>;
	videoId: string;
}

const Slider = (props: ISliderProps) => {
	const { track, isPlaying, setIsPlaying, audioRef, setDuration } = props;
	const [percentage, setPercentage] = useState<any>(0);
	const [currentTime, setCurrentTime] = useState('00:00');

	useEffect(() => {
		if (isPlaying) {
			setIsPlaying(false);
		}
		setPercentage(0);
	}, [track]);

	const getCurrDuration = (e: any) => {
		const currentTime = e.currentTarget.currentTime;
		const currentDuration = e.currentTarget.duration;
		const percent = ((currentTime / currentDuration) * 100).toFixed(2);
		setPercentage(+percent);
		setCurrentTime(secondsToMinutesAndSeconds(currentTime.toFixed(0)));
	};
	const onChange = (e: any) => {
		const audio = audioRef.current;
		const currentTime = audio?.duration;
		const value = e.target.value;
		if (audio != null && currentTime != null && typeof value !== 'number') {
			audio.currentTime = (currentTime / 100) * value;
			setPercentage(value);
		}
	};

	const getDuration = (s: any): string => {
		const parsedInt = parseInt(s);
		const d = secondsToMinutesAndSeconds(parsedInt);
		return d;
	};
	return (
		<>
			<div>{currentTime}</div>
			<input
				type='range'
				value={isNaN(parseInt(percentage)) ? '00:00' : percentage}
				min={0}
				max={100}
				onChange={onChange}
				className='mx-4 w-full'
			/>
			<audio
				src={track.preview_url}
				ref={audioRef}
				onTimeUpdate={getCurrDuration}
				onLoadedData={(e) => {
					const s = e.currentTarget.duration.toFixed(2);
					const duration = getDuration(s);
					setDuration(duration);
				}}
			></audio>
		</>
	);
};
