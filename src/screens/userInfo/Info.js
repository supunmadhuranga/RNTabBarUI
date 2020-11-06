import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

import {Entypo, EvilIcons, Feather, FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';

import Ripple from '../../components/react-native-material-ripple/index';
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

class Info extends Component {
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

                {/* edit info btn */}
                <View style={styles.editBtnWrapper}>
                    <TouchableOpacity 
                        //onPress={() => this.followFunction()}
                        onPress={() => this.props.navigation.navigate("EditUserInfoScreen")}
                        style={styles.touchableOpacityContentWrapper}>
                        <Text style={styles.editBtnText}>Edit profile</Text>
                    </TouchableOpacity>
                </View>

                {/* floating button */}
                {/* <Ripple 
                    style={styles.actionBtn}
                    rippleContainerBorderRadius={400}
                    rippleDuration={600}
                    onPress={() => this.createVps()}
                >
                    <MaterialCommunityIcons name='cloud-upload-outline' size={Sizes.wp('7%')} color={Colors.white} />
                </Ripple> */}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    editBtnWrapper: {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center', 
        height:Sizes.wp('12%'), 
        marginLeft:Sizes.wp('10%'), 
        marginRight:Sizes.wp('10%'), 
        marginBottom:Sizes.wp('12%'), 
        justifyContent:'space-between'
    },
    touchableOpacityContentWrapper: {
        flexDirection:'row',
        backgroundColor:'#e0e0e0', 
        height:Sizes.wp('12%'), 
        width:'100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius:Sizes.mainItemsRadius,
    },
    editBtnText: {
        fontSize:Sizes.wp('4%'), 
        fontFamily:Fonts.mainMedium, 
        color:Colors.black, 
        padding:Sizes.wp('3%')
    }
    // actionBtn: {
    //     backgroundColor:Colors.main,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     //borderRadius: 400,
    //     position: 'absolute',
    //     width:Sizes.wp('17%'),
    //     height:Sizes.wp('17%'),
    //     borderRadius:Sizes.wp('17%')/2,
    //     right:Sizes.wp('5%'),
    //     bottom:Sizes.wp('6%'),
    // },
    
});

export default withNavigation(Info);