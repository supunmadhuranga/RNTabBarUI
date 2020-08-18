import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//import {FontAwesome5, MaterialCommunityIcons} from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

import HomeScreen from '../screens/Home';
import MapScreen from '../screens/Map';
import UserScreen from '../screens/User';

const ScreenHome = createStackNavigator ({
    screen: HomeScreen,
});

const ScreenMap = createStackNavigator ({
    screen: MapScreen,
});

const ScreenUser = createStackNavigator ({
    screen: UserScreen,
});


const bottomTabNavigator = createBottomTabNavigator(
    {   
        Home: {
            screen: ScreenHome,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Entypo name="home" size={wp('5%')} color={tintColor} />
                )
            }
        },
        Map: {
            screen: ScreenMap,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="map-marker" size={wp('5%')} color={tintColor} />
                )
            }
        },
        User: {
            screen: ScreenUser,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome5 name="user" size={wp('5%')} color={tintColor} />
                )
            }
        },
    },
    {
        initialRouteName: 'Home',
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#eb6e3d',
            showLabel:false,
        }
    }
);

// export default class BottomTabNavigator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     return (
//       <View>
//         <Text> BottomTabNavigator </Text>
//       </View>
//     );
//   }
// }

export default createAppContainer(bottomTabNavigator);
