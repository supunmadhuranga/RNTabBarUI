import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    YellowBox,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import uuid from 'uuid/v4';
import Animated from 'react-native-reanimated';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

import { TabView, SceneMap } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import userImage from '../../assets/user.png';
import { Button } from 'react-native-paper';

import PhotosScreen from './userInfo/Photos';
import EventsScreen from './userInfo/Events';
import InfoScreen from './userInfo/Info';


import CustomMenu from '../components/CustomMenu';
// import Menu from '../components/material-menu/Menu';
// import MenuItem from '../components/material-menu/MenuItem';
// import MenuDivider  from '../components/material-menu/MenuDivider';

import AppPreLoader from "../components/AppPreLoader";

import * as ApiMethods from "../config/Api";

export default class User extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isConnected: true,
                isLoading: true,
                name:'',
                userImage: null,
                uid: firebase.auth().currentUser.uid,
                index : 0,
                
                routes: [
                    { key: 'first', title: 'Photos' },
                    { key: 'second', title: 'Events' },
                    { key: 'third', title: 'Info' },
                ],
                
            };
            YellowBox.ignoreWarnings(['Setting a timer']);

            //this.firestoreRef = firebase.instance.collection('users').document(userId);
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

            this.getUserData();
            /* Retrive data from firestore */
            //this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
        }

        componentWillUnmount(){
            //this.unsubscribe();
        }

        

        getUserData = async() => {
            const usersRef = firebase.firestore().collection('users');
            usersRef
            .doc(this.state.uid)
            .get()
            .then((res) => {
                console.log(res.data());
                this.setState({
                    name: res.data().name,
                    userImage: res.data().image,
                    isLoading: false,
                });
                
            })
            .catch((error) => {
                
            });
            
        }

        addPost = async(uri) => {
            const usersRef = firebase.firestore().collection('posts');
            const id = uuid();
            console.log(id);
            const data = {
                id:id,
                uid: this.state.uid,
                caption: "testing post3",
                path: uri,
                date_created: firebase.firestore.FieldValue.serverTimestamp(),
                date_updated: firebase.firestore.FieldValue.serverTimestamp(),
            };

            ApiMethods.createPost(id, data);
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

        pickProfileImage = async() => {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
          
            console.log(result);
          
            if (!result.cancelled) {
                
                let uploadStatus = ApiMethods.uploadAvatar(result.uri);
                this.setState({
                    userImage:result.uri,
                });
            }
        }

        

        // updateUserImage = async() => {
        //     ApiMethods.uploadAvatar()
        // }

        render() {
            if (!this.state.isLoading) {
                return (
                    <View style={{flex:1, backgroundColor:Colors.white}}>
                        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >

                            {/* user image and name*/}
                            <View style={{ alignItems:'center', marginBottom:Sizes.wp('8%')}}>
                                <TouchableOpacity 
                                    style={{ height:Sizes.wp('20%'), width:Sizes.wp('20%'),}}
                                    onPress={() => this.pickProfileImage()}
                                >   
                                    {this.state.userImage == null ?
                                        <Image
                                            source={userImage}
                                            style={{height:Sizes.wp('20%'), width:Sizes.wp('20%'), resizeMode:'cover', borderRadius:Sizes.wp('20%')/2}}
                                        />
                                    :
                                        <Image
                                            source={{uri:this.state.userImage}}
                                            style={{height:Sizes.wp('20%'), width:Sizes.wp('20%'), resizeMode:'cover', borderRadius:Sizes.wp('20%')/2}}
                                        />
                                    }
                                </TouchableOpacity>
                                <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('4%'), marginTop:Sizes.wp('2%')}}>{this.state.name}</Text>
                            </View>

                            {/* status info */}
                            <View style={{ backgroundColor:'yellow', flexDirection:'row', marginLeft:Sizes.wp('10%'), marginRight:Sizes.wp('10%'), marginBottom:Sizes.wp('12%'), justifyContent:'space-between'}}>
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

                        
                        </ScrollView>
                    </View>
                );
            } else {
                return (
                    <AppPreLoader 
                        color={Colors.main}
                        size={Sizes.wp('10%')}
                        background={false}
                    />
                );
            }
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