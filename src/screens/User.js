import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

import { TabView, SceneMap } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import board1 from '../../assets/coming.png';
import { Button } from 'react-native-paper';

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

const FirstRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={[{ flex:1, backgroundColor: '#ff4081' }]}>
        
        {/* first row */}
        <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft:Sizes.wp('3%'), marginRight:Sizes.wp('3%'), marginBottom:Sizes.wp('4%'), justifyContent:'space-between'}}>
            <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                
            </View>

            <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                
            </View>

            <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                
            </View>
            
        </View>

        <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft:Sizes.wp('3%'), marginRight:Sizes.wp('3%'), marginBottom:Sizes.wp('4%'), justifyContent:'space-between'}}>
            <View style={{height:Sizes.wp('50%'), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                
            </View>

            <View style={{justifyContent:'space-between'}}>

                <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:Sizes.wp('60%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                    
                </View>
                
                <View style={{flexDirection:'row', justifyContent:'space-between', }}>
                    <View style={{height: Sizes.wp('46%') - ((Sizes.wp('100%') - Sizes.wp('20%'))  / 3), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
                    </View>

                    <View style={{height: Sizes.wp('46%') - ((Sizes.wp('100%') - Sizes.wp('20%'))  / 3), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
                    </View>
                </View>

            </View>
            
        </View>

    </ScrollView>
);

const SecondRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={[{ flex:1, backgroundColor: '#673ab7' }]}>
        
        {/* first row */}

        <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft:Sizes.wp('3%'), marginRight:Sizes.wp('3%'), marginBottom:Sizes.wp('4%'), justifyContent:'space-between'}}>
            <View style={{height:((Sizes.wp('100%') - Sizes.wp('20%'))  / 3)*2 + Sizes.wp('4%'), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                
            </View>

            <View style={{justifyContent:'space-between'}}>

                <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:Sizes.wp('60%'), marginBottom:Sizes.wp('4%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                    
                </View>

                <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:Sizes.wp('60%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                    
                </View>

            </View>
            
        </View>

        <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft:Sizes.wp('3%'), marginRight:Sizes.wp('3%'), marginBottom:Sizes.wp('4%'), justifyContent:'space-between'}}>
            <View style={{height:((Sizes.wp('100%') - Sizes.wp('20%'))  / 3)*2 + Sizes.wp('4%'), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                
            </View>

            <View style={{justifyContent:'space-between'}}>

                <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:Sizes.wp('60%'), marginBottom:Sizes.wp('4%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                    
                </View>

                <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:Sizes.wp('60%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                    
                </View>

            </View>
            
        </View>

    </ScrollView>
);

const ThirdRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={[{ flex:1, backgroundColor: '#673ab7' }]}>
        
        {/* first row */}
        <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%')}}>
            <View style={{marginTop:Sizes.wp('2%'), marginBottom:Sizes.wp('4%')}}>
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
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={ENTRIES1}
                    renderItem={_renderItemIcons}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>

    </ScrollView>
);

const _renderItemIcons = ({item, index}) => {
    return (
        <View style={{height:Sizes.wp('15%'), width:Sizes.wp('30%'), marginLeft:Sizes.wp('4%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
            <View style={{flex:1, marginTop:Sizes.wp('1%'), justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>{item.title}</Text>
            </View>
        </View>
    );
}

export default class User extends Component {
        constructor(props) {
            super(props);
            this.state = {
                index : 0,
                routes: [
                    { key: 'first', title: 'Photos' },
                    { key: 'second', title: 'Events' },
                    { key: 'third', title: 'Info' },
                ],
            };
        }

        static navigationOptions = ({ navigation }) => {
            //headerTransparent: true,

            return {
                headerTitle: '',
                //headerLeft: () => ( <HeaderBackButton tintColor="#fff" onPress={() => navigation.goBack()} /> ),
                headerRight: () => ( 
                    <View style={{flex:1, justifyContent:'center', height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('0%')}}>
                        <TouchableOpacity 
                            //onPress={() => this.followFunction()}
                            style={{backgroundColor:'yellow', height:Sizes.wp('10%'), width:Sizes.wp('10%'), justifyContent: 'center', alignItems:'center', borderRadius:Sizes.wp('10%')/2 }}>
                            <Entypo name='dots-three-vertical' size={Sizes.wp('5%')} color={Colors.black} />
                        </TouchableOpacity>
                    </View>
                ),
                
                headerStyle: {
                    backgroundColor:Colors.white,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                //headerTintColor: "#fff",
                
            };
            
        };

        _handleIndexChange = index => this.setState({ index });

        _renderTabBar = props => {
            const inputRange = props.navigationState.routes.map((x, i) => i);
        
            return (
              <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = Animated.color(
                        Animated.round(
                            Animated.interpolate(props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                inputIndex === i ? 255 : 0
                                ),
                            })
                        ),0,0
                    );
        
                  return (
                    <TouchableOpacity
                      style={styles.tabItem}
                      onPress={() => this.setState({ index: i })}>
                      <Animated.Text style={{ color, fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%') }}>{route.title}</Animated.Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
        };

        _renderScene = SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute,
        });

        render() {
            
            return (
                <View style={{flex:1, backgroundColor:Colors.white, paddingTop:Sizes.wp('3%')}}>
                    
                    {/* user image */}
                    <View style={{flexDirection:'row', alignItems:'flex-start', marginLeft:Sizes.wp('10%'), marginBottom:Sizes.wp('12%')}}>
                        <Image
                            source={board1}
                            style={{height:Sizes.wp('15%'), width:Sizes.wp('15%'), resizeMode:'cover',borderWidth:1, borderColor:'black', borderRadius:Sizes.wp('15%')/2}}
                        />
                        <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('5%'), marginLeft:Sizes.wp('3%')}}>Seb Frechard</Text>
                    </View>

                    {/* status info */}
                    <View style={{flexDirection:'row', marginLeft:Sizes.wp('10%'), marginRight:Sizes.wp('10%'), marginBottom:Sizes.wp('12%'), justifyContent:'space-between'}}>
                        <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>5</Text>
                            <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Posts</Text>
                        </View>
                        <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>5</Text>
                            <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Followers</Text>
                        </View>
                        <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>5</Text>
                            <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Following</Text>
                        </View>
                        
                    </View>

                    {/* follow button */}
                    <View style={{flexDirection:'row', marginLeft:Sizes.wp('10%'), marginRight:Sizes.wp('10%'), marginBottom:Sizes.wp('12%'), justifyContent:'space-between'}}>
                        <View style={{alignItems:'center', width:'65%',  height:Sizes.wp('12%'), paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>

                            <View style={{flex:1, justifyContent:'center', height:Sizes.wp('12%'), width:'100%'}}>
                                <TouchableOpacity 
                                    //onPress={() => this.followFunction()}
                                    style={{backgroundColor:'#CCD1D1', height:Sizes.wp('12%'), width:'100%', justifyContent: 'center', alignItems: 'center', borderRadius:Sizes.mainItemsRadius,}}>
                                    <Text style={{ fontSize:Sizes.wp('4%'), fontFamily:Fonts.mainMedium, color:Colors.black, padding:Sizes.wp('3%')}}>Follow</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{alignItems:'center', width:'30%', height:Sizes.wp('12%'), paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                            
                            <View style={{flex:1, justifyContent:'center', height:Sizes.wp('12%'), width:'100%'}}>
                                <TouchableOpacity 
                                    //onPress={() => this.followFunction()}
                                    style={{backgroundColor:'#CCD1D1', height:Sizes.wp('12%'), width:'100%', justifyContent: 'center', alignItems: 'center', borderRadius:Sizes.mainItemsRadius,}}>
                                    <Feather name='send' size={Sizes.wp('6%')} color={Colors.black} style={{paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        
                    </View>
                    
                    {/* tab navigator */}
                    <View style={{flex:1}}>
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderScene}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                            initialLayout={{ width:Sizes.deviceWidth }}
                        />
                    </View>
                   
                </View>
            );
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      paddingTop:0,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
});