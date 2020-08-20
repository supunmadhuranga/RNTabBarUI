import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

import HorizontalSwipeList from '../../components/HorizontalSwipeList';

const ENTRIES1 = [
    {
        title: 'Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/lceHsT6l.jpg'
    }
];

export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={[{ flex:1, backgroundColor: '' }]}>
        
                {/* first row */}
                <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%')}}>
                    <View style={{marginTop:Sizes.wp('4%'), marginBottom:Sizes.wp('4%')}}>
                        <Text style={{fontFamily:Fonts.mainMedium, color:Colors.black, fontSize:Sizes.wp('4%'), marginBottom:Sizes.wp('1%')}}>About me</Text>
                        <Text style={{ flexWrap: 'wrap', fontFamily:Fonts.main, color:Colors.black, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%')}}>
                            My name is Supun Madhuranga. I'm from Sri Lanka. I love Cyber Security and Ethical Hacking.
                        </Text>
                        
                    </View>

                    <View style={{marginTop:Sizes.wp('2%'), marginBottom:Sizes.wp('4%')}}>
                        <Text style={{fontFamily:Fonts.mainMedium, color:Colors.black, fontSize:Sizes.wp('4%'), marginBottom:Sizes.wp('1%')}}>Basic Infomation</Text>
                        <Text style={{ flexWrap: 'wrap', fontFamily:Fonts.main, color:Colors.black, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%')}}>Age</Text>
                        <Text style={{ flexWrap: 'wrap', fontFamily:Fonts.main, color:Colors.black, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%')}}>Sex</Text>
                    </View>

                </View>

                <View style={{}}>
                    <View style={{marginTop:Sizes.wp('5%'), marginBottom:Sizes.wp('4%'), marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%')}}>
                        <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('4%')}}>Interest</Text>
                    </View>
                    <View style={{marginBottom:Sizes.wp('5%')}}>
                    {/* dynamic swipe list */}
                        <HorizontalSwipeList 
                            dataArray={ENTRIES1}
                            listType='icon'
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }
}
