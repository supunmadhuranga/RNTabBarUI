import React, { Component } from 'react';
import {
	ActivityIndicator, 
	View, 
	StyleSheet, 
	StatusBar,
	ImageBackground,
	Image,
	Platform,
} from 'react-native';
import propTypes from 'prop-types';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';

import Constants from 'expo-constants';

export default class AppPreLoader extends Component {
	constructor(props) {
        super(props);
        this.state = {
        };
	}
	
	render () {
		var aiSize;
		const { color, size, background } = this.props;
		if (Platform.OS === 'ios') {
			if (size == Sizes.wp('10%')) {
				aiSize = 'large';
			} else if (size == Sizes.wp('8%')) {
				aiSize = 'small';
			}
		} else {
			aiSize = size
		}
        return (
            <View style={styles.backgroundContainer}>
                <ActivityIndicator size={aiSize} color={color} animating/>
            </View>
        );
	}
}

AppPreLoader.propTypes = {
    color: propTypes.string,
    size: propTypes.number,
    background: propTypes.bool.isRequired,
}

const styles = StyleSheet.create({
	preloader: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height:Colors.height,
		backgroundColor:Colors.mainBackground,
	},
	backgroundPreloader: {
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:Colors.mainBackground,
	},
	backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
	},
	logoContainer: {
        alignItems: 'center',
        marginBottom: Sizes.hp('6%'),
	},
	logo: {
        width: Sizes.wp('60%'),
        height:Sizes.wp('60%'),
    },
})
