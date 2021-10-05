import React from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';
import { connect } from 'react-redux';
import { RootState } from '../../../app/store';
import { Track } from '../../../types';
import { selectTrackToPlay } from '../../dashboard/dashboardSlice';

interface CTrackTablePlayButton {
	track: Track;
	selectedTrack?: Track;
	selectTrackToPlay: (track: Track) => void;
}
class CTrackTablePlayButton extends React.Component<CTrackTablePlayButton> {
	protected isSelected(): boolean {
		return this.props.selectedTrack?.id == this.props.track.id;
	}

	shouldComponentUpdate(nextProps: CTrackTablePlayButton, nextState: any) {
		if (!this.props.selectedTrack) {
			if (nextProps.selectedTrack?.id === this.props.track.id) {
				return true;
			} else return false;
		}

		const isSelected = this.isSelected();
		if (isSelected) return true;

		return false;
	}
	render() {
		return (
			<button
				className='text-4xl text-white'
				onClick={() => {
					this.props.selectTrackToPlay(this.props.track);
				}}
			>
				{this.isSelected() ? <BiPause /> : <BiPlay />}
			</button>
		);
	}
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
	selectedTrack: state.dashboard.selectedTrack,
	track: ownProps.track,
});

export default connect(mapStateToProps, { selectTrackToPlay })(
	CTrackTablePlayButton
);
