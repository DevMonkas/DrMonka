import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import Pulse from './Pulse';


export default class LocationPulseLoader extends React.Component {
	_isMounted=true;
	constructor(props) {
		super(props);
	
		this.state = {
			circles: []
		};

		this.counter = 1;
		this.setInterval = null;
		this.anim = new Animated.Value(1);
	}

	componentDidMount() {
		if(this._isMounted)
		this.setCircleInterval();
	}
	componentWillUnmount()
	{
		this._isMounted = false;
		
	}
	

	setCircleInterval() {
		if(this._isMounted)
		{
		this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval);
		this.addCircle();
		}
	}

	addCircle() {
		if(this._isMounted)
		{
		this.setState({ circles: [...this.state.circles, this.counter] });
		this.counter++;
		}
	}

	render() {
		const { size, avatar, avatarBackgroundColor, interval } = this.props;

		return (
			<View style={{
				flex: 1,
				backgroundColor: 'transparent',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				{this.state.circles.map((circle) => (
					<Pulse
						key={circle}
						{...this.props}
					/>
				))}

				<TouchableOpacity

					activeOpacity={1}
					style={{
						transform: [{
							scale: this.anim
						}],
						
						top:'50%',
	
						transform:[{translateY:-size/3}],
						alignItems:'center',
						justifyContent:'flex-start',
						
						flex:1,

						
					}}
				>
					<Image
						source={{ uri: avatar }}
						style={{
							width: size,
							height: size,
							borderRadius: size/2,
							backgroundColor: avatarBackgroundColor,
							position:'relative',
							transform:[{translateY:-size/6}]	
							
							
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}	
}

LocationPulseLoader.propTypes = {
  interval: PropTypes.number,
  size: PropTypes.number,
  pulseMaxSize: PropTypes.number,
  avatar: PropTypes.string.isRequired,
  avatarBackgroundColor: PropTypes.string,
  pressInValue: PropTypes.number,
  pressDuration: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  getStyle: PropTypes.func,
};

LocationPulseLoader.defaultProps = {
  interval: 3000,
  size: 100,
  pulseMaxSize: 250,
  avatar: undefined,
  avatarBackgroundColor: 'orange',
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: '#D8335B',
  backgroundColor: '#ED225B55',
  getStyle: undefined,
};

