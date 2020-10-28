import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

import CreateEventStepOne from './NewEventStepOne';
import CreateEventStepTwo from './NewEventStepTwo';
import CreateEventStepThree from './NewEventStepThree';
//import DetailsPage from './Details';

export default createStackNavigator(
    {   
        CreateEventStepOne: {
            screen: CreateEventStepOne,
        },
        CreateEventStepTwo: {
            screen: CreateEventStepTwo,
        },
        CreateEventStepThree: {
            screen: CreateEventStepThree,
        },
        // ViewInvoice: {
        //     screen: DetailsPage,
        //     navigationOptions: ({ navigation }) => ({
        //         //...TransitionPresets.SlideFromRightIOS,
        //     }),
        // },

    },
    {
        initialRouteName: 'CreateEventStepOne',
        //headerLayoutPreset: "center",
        //headerMode: 'none'
        //transitionConfig: () => fromRight(600),
    }
);