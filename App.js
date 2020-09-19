import { StatusBar } from 'expo-status-bar';
import React ,  { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Platform,
    TextInput,
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import LoadFirebase from './src/config/firebase';
import * as Font from 'expo-font';
import Colors from './src/styles/colors';
import Sizes from './src/styles/sizes';

import AppPreLoader from "./src/components/AppPreLoader";
import Navigator from './src/navigations/BottomTabNavigator';
//import AuthNavigator from './src/screens/auth/Login';
import AuthNavigator from './src/navigations/AuthNavigator';
import Home from './src/screens/Home';

//console.reportErrorsAsExceptions = false;
//console.disableYellowBox = true;

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            fontLoaded: false,
        }
        
        if (Text.defaultProps == null) Text.defaultProps = {};
        Text.defaultProps.allowFontScaling = false;
        if (TextInput.defaultProps == null) TextInput.defaultProps = {};
        TextInput.defaultProps.allowFontScaling = false;

    }

    async componentDidMount () {
        //load fonts
        await Font.loadAsync({
            'AirbnbCerealBlack': require('./assets/fonts/AirbnbCerealBlack.ttf'),
            'AirbnbCerealBold': require('./assets/fonts/AirbnbCerealBold.ttf'),
            'AirbnbCerealBook': require('./assets/fonts/AirbnbCerealBook.ttf'),
            'AirbnbCerealExtraBold': require('./assets/fonts/AirbnbCerealExtraBold.ttf'),
            'AirbnbCerealLight': require('./assets/fonts/AirbnbCerealLight.ttf'),
            'AirbnbCerealMedium': require('./assets/fonts/AirbnbCerealMedium.ttf'),
        })
        this.setState({
            fontLoaded: true,
        });
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                <View style={styles.container}>
                    <AuthNavigator/>
                </View>
            );
        } else {
            return (
                <AppPreLoader 
                    color={Colors.main}
                    size={Sizes.wp('10%')}
                    background={false}
                />
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
});
