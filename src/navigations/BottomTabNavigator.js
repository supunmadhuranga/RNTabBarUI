import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Feather, MaterialIcons, Entypo, FontAwesome, FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

import HomeScreen from '../screens/Home';
import MapScreen from '../screens/Map';
import UserScreen from '../screens/User';

//import selectPhotoScreen from '../utils/selectPhoto_old';
import SelectNewPost from '../utils/NewPost';
import CreateNewEvent from '../utils/event/Index';
import UserPosts from '../screens/UserPosts/Posts';
import EditUserInfo from '../screens/UserInfo/EditAction';

/* bottom tab screens set*/
const ScreenHome = createStackNavigator ({
    screen: HomeScreen,
});

const ScreenMap = createStackNavigator ({
    screen: MapScreen,
});

// const ScreenUser = createStackNavigator ({
//     screen: UserScreen,
// });

const ScreenUser = createStackNavigator (
    {
        UserScreen: {
            screen: UserScreen,
        },
        NewPostScreen: {
            screen: SelectNewPost
        },
        NewEventScreen: {
            screen: CreateNewEvent,
            navigationOptions: ({ navigation }) => ({
                //...TransitionPresets.SlideFromRightIOS,
                headerShown:false,
            }),
            
        },
        UserPostsScreen: {
            screen: UserPosts,
            // navigationOptions: ({ navigation }) => ({
            //     ...TransitionPresets.SlideFromRightIOS,
            // }),
        },
        EditUserInfoScreen: {
            screen: EditUserInfo,
            // navigationOptions: ({ navigation }) => ({
            //     ...TransitionPresets.SlideFromRightIOS,
            // }),
        },
    },
    {
        initialRouteName: 'UserScreen',
        //headerLayoutPreset: "center",
        //headerMode: 'none'
    }
);

const bottomTabNavigator = createBottomTabNavigator(
    {   
        Home: {
            screen: ScreenHome,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Feather name="home" size={wp('6.5%')} color={tintColor} />
                )
            }
        },
        Map: {
            screen: ScreenMap,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Feather name="map-pin" size={wp('6.5%')} color={tintColor} />
                )
            }
        },
        User: {
            screen: ScreenUser,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Feather name="user" size={wp('6.5%')} color={tintColor} />
                )
            }
        },
    },
    {
        initialRouteName: 'Home',
        lazy: true,
        tabBarOptions: {
            //activeTintColor: '#eb6e3d',
            activeTintColor: Colors.main,
            //inactiveTintColor: '#539849',
            showLabel:false,
        }
    }
);

export default createAppContainer(bottomTabNavigator);
