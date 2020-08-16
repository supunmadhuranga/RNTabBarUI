import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

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

    render() {
        return (
            <View style={{flex:1, backgroundColor:Colors.white, marginTop:Sizes.wp('3%'), marginBottom:Sizes.wp('3%')}}>
                
                {/* header title */}
                <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginTop:Sizes.wp('4%'), marginBottom:Sizes.wp('2%')}}>
                    <Text style={{fontFamily:Fonts.mainBold, fontSize:Sizes.wp('6%')}}>Sydney</Text>
                </View>
                
                {/* search bar */}
                <View style={{flexDirection:'row',  alignItems: 'center', padding:Sizes.wp('1%'), marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginBottom:Sizes.wp('3%'), borderWidth:1, borderRadius:Sizes.mainItemsRadius, borderColor:Colors.separator}}>
                    <Icon name='search' size={Sizes.wp('4%')} color='#CCD1D1' style={{paddingLeft:Sizes.wp('2%')}} />
                    <TextInput 
                        style={{flex:1, fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%'), paddingLeft:Sizes.wp('2%'), }} 
                        placeholder="Search country..."
                        underlineColorAndroid="transparent"
                    />
                    <Octicons name='settings' size={Sizes.wp('4%')} color='#CCD1D1' style={{paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}} />
                </View>

                {/* map component */}
                <View style={{flex:1}}>
                    <MapView style={{width:Sizes.deviceWidth, height:Sizes.deviceHeight}} />
                </View>
            </View>
        );
    }
}
