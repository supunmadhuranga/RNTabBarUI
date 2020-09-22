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
import firebase from 'firebase';
import Animated from 'react-native-reanimated';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

import { TabView, SceneMap } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import board1 from '../../assets/coming.png';
import { Button } from 'react-native-paper';

import PhotosScreen from './userInfo/Photos';
import EventsScreen from './userInfo/Events';
import InfoScreen from './userInfo/Info';


import CustomMenu from '../components/CustomMenu';
// import Menu from '../components/material-menu/Menu';
// import MenuItem from '../components/material-menu/MenuItem';
// import MenuDivider  from '../components/material-menu/MenuDivider';

export default class User extends Component {
        constructor(props) {
            super(props);
            this.state = {
                uid: '',
                index : 0,
                routes: [
                    { key: 'first', title: 'Photos' },
                    { key: 'second', title: 'Events' },
                    { key: 'third', title: 'Info' },
                ],
            };
            
            //this.userLogOut = this.userLogOut.bind(this);
        }

        /* navigation header */
        static navigationOptions = ({ navigation }) => {
            return {
                headerTitle: '',
                headerRight: () => ( 
                    // <View style={{flex:1, justifyContent:'center', height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('0%')}}>
                    //     <TouchableOpacity 
                    //         onPress={navigation.getParam('_userLogOut')}
                    //         style={{height:Sizes.wp('10%'), width:Sizes.wp('10%'), justifyContent: 'center', alignItems:'center', borderRadius:Sizes.wp('10%')/2 }}>
                    //         <Entypo name='dots-three-vertical' size={Sizes.wp('5%')} color={Colors.black} />
                    //     </TouchableOpacity>
                    // </View>

                    <View style={{flex:1, justifyContent:'center', height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('0%')}}>
                        <CustomMenu
                            //Menu Text
                            menutext="Menu"
                            //Menu View Style
                            menustyle={{
                                marginRight: 16,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}
                            //Menu Text Style
                            textStyle={{
                                color: '#000',
                            }}
                            //Click functions for the menu items
                            //option1Click={() => this.userLogOut()}
                            
                            option1Click={navigation.getParam('_userLogOut')}
                        />
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

        async componentDidMount() {
            /**
            * set navigation header refresh function
            **/
            this.props.navigation.setParams({
                _userLogOut: this.userLogOut
            });
        }

        /* tab change handler start */
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
                            key={i}
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}
                        >
                            <Animated.Text style={{ color, fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%') }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
              </View>
            );
        };

        _renderScene = SceneMap({
            first: PhotosScreen,
            second: EventsScreen,
            third: InfoScreen,
        });

        /* tab change handler end */

        userLogOut = () => {
            firebase.auth().signOut().then(() => {
                this.props.navigation.navigate('Auth');
            })
            .catch(error => this.setState({ 
                //errorMessage: error.message 
            }));
            console.log('logged out');
        }

        render() {
            
            return (
                <View style={{flex:1, backgroundColor:Colors.white, paddingTop:Sizes.wp('3%')}}>

                    {/* user image and name*/}
                    <View style={{flexDirection:'row', alignItems:'flex-start', marginLeft:Sizes.wp('10%'), marginBottom:Sizes.wp('12%')}}>
                        <Image
                            source={board1}
                            style={{height:Sizes.wp('15%'), width:Sizes.wp('15%'), resizeMode:'cover', borderRadius:Sizes.wp('15%')/2}}
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