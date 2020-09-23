import React, { Component } from 'react';
import { 
    View, 
    Text,
    AsyncStorage, 
} from 'react-native';
import * as firebase from 'firebase';
import AppPreLoader from "../components/AppPreLoader";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

import StartPage from '../screens/auth/Index';
import LoginPage from '../screens/auth/Login';
import SignupPage from '../screens/auth/Signup';
import ResetPassPage from '../screens/auth/ResetPassword';
import BottomTabNavigator from '../navigations/BottomTabNavigator';
//import SlidesPage from './Slides';

const AuthStack =  createStackNavigator(
    {   
        Index: {
            screen: StartPage,
        },
        Login: {
            screen: LoginPage,
            navigationOptions: ({ navigation }) => ({
                ...TransitionPresets.SlideFromRightIOS,
            }),
        },
        Signup: {
            screen: SignupPage,
            navigationOptions: ({ navigation }) => ({
                ...TransitionPresets.SlideFromRightIOS,
            }),
        },
        ResetPass: {
            screen: ResetPassPage,
            navigationOptions: ({ navigation }) => ({
                ...TransitionPresets.SlideFromRightIOS,
            }),
        }
        // Cloud: CloudPage,
        // Slides: SlidesPage,
    },
    {
        initialRouteName: 'Index',
        //headerLayoutPreset: "center",
        //headerMode: 'none'
    }
);

const RootStack = createStackNavigator(
    {
        Home: BottomTabNavigator,
    },
    {
        headerMode: 'none'
    }
);

class AuthNavigator extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        this.checkSession();
        //this.props.navigation.navigate('Auth');
    }

    checkSession = async() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    }

    render() {
        
        return (   
            <AppPreLoader 
                color={Colors.main}
                size={Sizes.wp('10%')}
                background={false}
            />
        );
        
    }

}

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthNavigator,
        Auth: AuthStack,
        App: RootStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
