import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

import CreateEvent from './NewEvent';
//import DetailsPage from './Details';

export default createStackNavigator(
    {   
        CreateEventScreen: {
            screen: CreateEvent,
        },
        // ViewInvoice: {
        //     screen: DetailsPage,
        //     navigationOptions: ({ navigation }) => ({
        //         //...TransitionPresets.SlideFromRightIOS,
        //     }),
        // },

    },
    {
        initialRouteName: 'CreateEventScreen',
        //headerLayoutPreset: "center",
        //headerMode: 'none'
        //transitionConfig: () => fromRight(600),
    }
);