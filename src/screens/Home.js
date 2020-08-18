import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Platform, 
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';
import Carousel from '../components/snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

import board1 from '../../assets/coming.png';
import board2 from '../../assets/nointernet.png';
import board3 from '../../assets/world.png';


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

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    // navigation header bar
    static navigationOptions = ({ navigation }) => {
        //headerTransparent: true,

        return {
            headerTitle: 'Explore',
            //headerLeft: () => ( <HeaderBackButton tintColor="#fff" onPress={() => navigation.goBack()} /> ),
            headerRight: () => ( 
                <View style={{flex:1, justifyContent:'center', height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('0%')}}>
                    <TouchableOpacity 
                        //onPress={() => this.followFunction()}
                        style={{backgroundColor:'yellow', height:Sizes.wp('10%'), width:Sizes.wp('10%'), justifyContent: 'center', alignItems:'center', borderRadius:Sizes.wp('10%')/2 }}>
                        <Icon name='search' size={Sizes.wp('5%')} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            ),
            
            headerStyle: {
                backgroundColor:Colors.white,
                elevation: 0,
                shadowOpacity: 0,
            },
            headerTitleStyle: {
                //flex: 1,
                //textAlign: 'center',
                fontSize:Sizes.wp('6%'),
                fontFamily:Fonts.mainBold,
                fontWeight: '200',
                //width:Sizes.wp('60%'),
            }
            //headerTintColor: "#fff",  
        };  
    };

    _renderItem = ({item, index}) => {
        return (
            <View style={{height:Sizes.wp('40%'), width:Sizes.wp('30%'), marginLeft:Sizes.wp('4%') }}>
                <View style={{flex:2}}>
                    <Image
                        source={{ uri: item.illustration }}
                        style={{flex:1, height:null, width:null, resizeMode:'cover', borderRadius:Sizes.mainItemsRadius}}
                    />
                </View>
                <View style={{marginTop:Sizes.wp('2%')}}>
                    <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>{item.title}</Text>
                </View>
            </View>
        );
    }

    _renderItemIcons = ({item, index}) => {
        return (
            <View style={{height:Sizes.wp('15%'), width:Sizes.wp('30%'), marginLeft:Sizes.wp('4%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                <View style={{flex:1, marginTop:Sizes.wp('1%'), justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>{item.title}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:Colors.white}}>
                
                <View style={{flex:1, justifyContent:'space-between'}}>
                    {/* <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginTop:Sizes.wp('4%'), marginBottom:Sizes.wp('3%')}}>
                        <Text style={{fontFamily:Fonts.mainBold, fontSize:Sizes.wp('6%')}}>Explore</Text>
                    </View> */}

                    <View>
                        <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginTop:Sizes.wp('4%'), marginBottom:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>Friends</Text>
                        </View>

                        <View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={ENTRIES1}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginTop:Sizes.wp('7%'), marginBottom:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>You might like</Text>
                        </View>
                        <View style={{}}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={ENTRIES1}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginTop:Sizes.wp('7%'), marginBottom:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>Categories</Text>
                        </View>
                        <View style={{marginBottom:Sizes.wp('5%')}}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={ENTRIES1}
                                renderItem={this._renderItemIcons}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}
