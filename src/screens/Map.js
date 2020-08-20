import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

export default class Map extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /* navigation header bar */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Sydney',
            
            headerStyle: {
                backgroundColor:Colors.white,
                elevation: 0,
                shadowOpacity: 0,
            },
            headerTitleStyle: {
                //flex: 1,
                textAlign: 'left',
                fontSize:Sizes.wp('6%'),
                fontFamily:Fonts.mainBold,
                fontWeight: '200',
            }
        };  
    };

    render() {
        return (
            <View style={{flex:1, backgroundColor:Colors.white,}}>
                
                {/* search bar */}
                <View style={{flexDirection:'row',  alignItems: 'center', padding:Sizes.wp('1%'), marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginBottom:Sizes.wp('3%'), borderWidth:1, borderRadius:Sizes.mainItemsRadius, borderColor:Colors.separator}}>
                    <TouchableOpacity 
                        //onPress={() => this.followFunction()}
                        style={{ height:Sizes.wp('6%'), width:Sizes.wp('6%'), justifyContent: 'center', alignItems:'center',  borderRadius:Sizes.wp('6%')/2 }}>
                        <Icon name='search' size={Sizes.wp('4%')} color='#CCD1D1' />
                    </TouchableOpacity>
                    {/* <Icon name='search' size={Sizes.wp('4%')} color='#CCD1D1' style={{paddingLeft:Sizes.wp('2%')}} /> */}
                    <TextInput 
                        style={{flex:1, fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%'), paddingLeft:Sizes.wp('2%'), }} 
                        placeholder="Search country..."
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity 
                        //onPress={() => this.followFunction()}
                        style={{ height:Sizes.wp('6%'), width:Sizes.wp('6%'), justifyContent: 'center', alignItems:'center',  borderRadius:Sizes.wp('6%')/2 }}>
                        <Octicons name='settings' size={Sizes.wp('4%')} color='#CCD1D1' />
                    </TouchableOpacity>
                    {/* <Octicons name='settings' size={Sizes.wp('4%')} color='#CCD1D1' style={{paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}} /> */}
                </View>

                {/* map component */}
                <View style={{flex:1}}>
                    <MapView style={{width:Sizes.deviceWidth, height:Sizes.deviceHeight}} />
                </View>
            </View>
        );
    }
}
