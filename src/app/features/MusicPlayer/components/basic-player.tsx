import { useState, useRef, useEffect } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import { Track } from "../../../types";
import { secondsToMinutesAndSeconds } from "../../../utilities";
import { TrackProp } from "../MusicPlayer";

const PlayerTrack = (props: TrackProp) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const [duration, setDuration] = useState('');
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
		<div className='flex flex-col items-center'>
			<div className='flex'>
				<Slider
					audioRef={audioRef}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					track={props.track}
					setDuration={setDuration}
				/>
				<div className=''>{duration}</div>
			</div>
			<button className='text-4xl text-white' onClick={play}>
				{isPlaying ? <BiPause /> : <BiPlay />}
			</button>
		</div>
	);
};

interface ISliderProps {
	track: Track;
	isPlaying: boolean;
	setIsPlaying: (b: boolean) => void;
	setDuration: (duraton: string) => void;
	audioRef: React.RefObject<HTMLAudioElement>;
}

const Slider = (props: ISliderProps) => {
	const { track, isPlaying, setIsPlaying, audioRef, setDuration } = props;
	const [percentage, setPercentage] = useState(0);
	const [currentTime, setCurrentTime] = useState('');

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
			<div className=''>{currentTime}</div>
			<input
				type='range'
				value={percentage}
				min={0}
				max={100}
				onChange={onChange}
				className='mx-4'
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
