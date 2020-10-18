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
    TouchableWithoutFeedback,
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
import Dialog, { DialogFooter, DialogButton, DialogTitle, SlideAnimation, ScaleAnimation, DialogContent } from 'react-native-popup-dialog';

import {FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';

import BottomNotification from '../components/BottomNotification';
import RBSheet from "../components/react-native-raw-bottom-sheet";

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
import * as PermissionsApi from "../utils/Permissions";
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class User extends Component {
        constructor(props) {
            super(props);
            this._isMounted = false;
            this.state = {
                isConnected: true,
                isLoading: true,
                name:'',
                userImage: null,
                uid: firebase.auth().currentUser.uid,
                index : 0,
                following: 0,
                followers: 0,
                postCount: 0,
                guestId: null,
                photoSelectMenu: false,
                
                routes: [
                    { key: 'first', title: 'Photos' },
                    { key: 'second', title: 'Events' },
                    { key: 'third', title: 'Info' },
                ],
                
            };
            YellowBox.ignoreWarnings(['Setting a timer']);

            
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
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={navigation.getParam('_openCreatePostMenu')} style={{flex:1, justifyContent:'center', height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('0%')}}>
                            <AntDesign name='plus' size={Sizes.wp('7%')} color='#000' />
                        </TouchableOpacity>
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
            this._isMounted = true;

            /*set navigation header function*/
            this.props.navigation.setParams({
                _userLogOut: this.userLogOut
            });

            /* set RBsheet header function */
            this.props.navigation.setParams({
                _openCreatePostMenu: this.openCreatePostMenu
            });

            this._isMounted && this.getUserData();
            /* Retrive data from firestore */
            //this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
        }

        componentWillUnmount(){
            this._isMounted = false;
            //this.unsubscribe();
        }

        

        getUserData = async() => {
            const usersRef = firebase.firestore().collection('users');
            usersRef
            .doc(this.state.uid)
            .get()
            .then((res) => {
                console.log(res.data());
                this._isMounted && this.setState({
                    name: res.data().name,
                    guestId: res.data().id,
                    userImage: res.data().image,
                    following: res.data().followed_count,
                    followers: res.data().follower_count,
                    postCount: res.data().post_count,
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

            this._isMounted && this.setState({
                photoSelectMenu:true,
            });

            // const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            // if (status !== 'granted') {
            //     alert('Sorry, we need camera roll permissions to make this work!');
            //     console.log('Sorry, we need camera roll permissions to make this work!');
            // }
            // let result = await ImagePicker.launchImageLibraryAsync({
            //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //     allowsEditing: true,
            //     aspect: [4, 3],
            //     quality: 1,
            // });
          
            // console.log(result);
          
            // if (!result.cancelled) {
                
            //     let uploadStatus = ApiMethods.uploadAvatar(result.uri);
            //     this.setState({
            //         userImage:result.uri,
            //     });
            // }
        }

        selectOption = async(option) => {
            this.closePhotoSelectMenu();
            if (option === 0) {
                uri = await PermissionsApi._selectPhoto();
            } else {
                uri = await PermissionsApi._takePhoto();
            }
            
            if (uri) {
                const uploadStatus = await ApiMethods.uploadAvatar(uri);
                console.log(uploadStatus);
                this._isMounted && this.setState({
                    userImage:uri,
                });
            }
        }

        closePhotoSelectMenu = () => {
            this._isMounted && this.setState({
                photoSelectMenu:false,
            });
        }

        openCreatePostMenu = () => {
            this.RBSheet.open();
        }

        AvatarUpdateMenu = () => {
            return (
                <>
                    <View style={{}}>
                        <Text style={styles.popupTextTitle}>Choose Option</Text>
                    </View>

                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#EAEDED",
                        }}
                    />

                    <TouchableOpacity onPress={() => {this.selectOption(0)}} underlayColor={'#e0dbdb'} style={{}}>
                        <Text style={styles.popupText}>Open Gallery</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#EAEDED",
                        }}
                    />

                    <TouchableOpacity onPress={() => {this.selectOption(1)}} underlayColor={'#e0dbdb'} style={{}}>
                        <Text style={styles.popupText}>Take Photo</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#EAEDED",
                        }}
                    />
                    <View style={{}}>
                        <Text style={styles.popupText}></Text>
                    </View>
                </>
            );
            
        }

        /* post create option modal menu */
        CreatePostMenu = () => {
            return (
                <>
                    <View style={{}}>
                        <Text style={styles.popupTextTitle}>Choose Option</Text>
                    </View>

                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#EAEDED",
                        }}
                    />

                    <TouchableOpacity onPress={() => {this.createPost()}} underlayColor={'#e0dbdb'} style={{}}>
                        <Text style={styles.popupText}>New Post</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#EAEDED",
                        }}
                    />

                    <TouchableOpacity onPress={() => {this.createEvent()}} underlayColor={'#e0dbdb'} style={{}}>
                        <Text style={styles.popupText}>Add Event</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#EAEDED",
                        }}
                    />
                    <View style={{}}>
                        <Text style={styles.popupText}></Text>
                    </View>
                </>
            );
            
        }

        postSelectOption = async(option) => {
            this.closePhotoSelectMenu();
            if (option === 0) {
                this.RBSheet.close();
                const uri = await PermissionsApi._selectPhoto();
                //uri = await PermissionsApi._takePhoto();
                if (uri) {
                    this.createPost(uri);
                } else {
                    console.log("Error add new post");
                }

            } else {
                this.createEvent();
            }
            
        }

        createPost = () => {
            this.RBSheet.close();
            this.props.navigation.navigate("NewPostScreen");
            //this.props.navigation.navigate("NewPost");
        }

        createEvent = () => {
            this.RBSheet.close();

        }

        

        // updateUserImage = async() => {
        //     ApiMethods.uploadAvatar()
        // }

        render() {
            if (!this.state.isLoading) {
                return (
                    <View style={{flex:1, backgroundColor:Colors.white}}>
                        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >

                            {/* PhotoSelectMenu */}
                            <Dialog
                                //height={Sizes.hp('80%')}
                                width={Sizes.wp('80%')}
                                visible={this.state.photoSelectMenu}
                                dialogTitle={
                                    <View style={{ alignItem:'center', marginTop:Sizes.wp('5%')}}>
                                        <Text style={{ textAlign:'center', fontSize:Sizes.wp('5%'), fontFamily:Fonts.mainMedium, color:"#575757" }}>Choose Option</Text>
                                    </View>
                                }
                                
                                dialogAnimation={new ScaleAnimation({
                                    initialValue: 0,
                                    useNativeDriver: true,
                                    //slideFrom: 'bottom',
                                })}
                                // dialogAnimation={new SlideAnimation({
                                //     initialValue: 0,
                                //     useNativeDriver: true,
                                //     slideFrom: 'top',
                                // })}
                                onTouchOutside={() => {
                                    this.closePhotoSelectMenu();
                                }}
                            >
                                <DialogContent>
                                    <View style={{marginTop:Sizes.wp('3%'), marginBottom:Sizes.wp('3%')}}>

                                        <View
                                            style={{
                                                height: 1,
                                                width: "100%",
                                                backgroundColor: "#EAEDED",
                                            }}
                                        />

                                        <TouchableHighlight onPress={() => {this.selectOption(0)}} underlayColor={'#e0dbdb'} style={{}}>
                                            <Text style={styles.popupText}>Select Photo</Text>
                                        </TouchableHighlight>

                                        <View
                                            style={{
                                                height: 1,
                                                width: "100%",
                                                backgroundColor: "#EAEDED",
                                            }}
                                        />

                                        <TouchableHighlight onPress={() => {this.selectOption(1)}} underlayColor={'#e0dbdb'} style={{}}>
                                            <Text style={styles.popupText}>Take Photo</Text>
                                        </TouchableHighlight>

                                        <View
                                            style={{
                                                height: 1,
                                                width: "100%",
                                                backgroundColor: "#EAEDED",
                                            }}
                                        />

                                    </View> 
                                    
                                </DialogContent>
                            </Dialog>
                            {/* end photo select menu */}


                            {/* bottom menu start */}
                            <RBSheet
                                ref={ref => {
                                    this.RBSheet = ref;
                                }}
                                //height={Sizes.wp('50%')}
                                //minClosingHeight={}
                                openDuration={700}
                                closeOnDragDown={true}
                                dragFromTopOnly={true}
                                openDuration={250}
                                customStyles={{
                                    container: {
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 'auto', 
                                        maxHeight: 300,
                                        borderTopLeftRadius:15,
                                        borderTopRightRadius:15,
                                    }
                                }}
                            >
                                

                                <this.CreatePostMenu />
                                {/* <YourOwnComponent /> */}
                            </RBSheet>
                            {/* bottom menu ends */}

                            {/* user image and name*/}
                            <View style={{ alignItems:'center', marginLeft:Sizes.wp('10%'), marginRight:Sizes.wp('10%'), marginBottom:Sizes.wp('8%')}}>
                                <TouchableOpacity 
                                    style={{ height:Sizes.wp('20%'), width:Sizes.wp('20%'),}}
                                    onPress={() => this.pickProfileImage()}
                                >   
                                    {this.state.userImage == "" ?
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

                            {/* user status info */}
                            <View style={{flexDirection:'row', marginLeft:Sizes.wp('25%'), marginRight:Sizes.wp('25%'), marginBottom:Sizes.wp('12%'), justifyContent:'space-between'}}>
                                {/* <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                                    <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>{this.state.postCount == undefined ? 0 : this.state.postCount}</Text>
                                    <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Posts</Text>
                                </View> */}
                                <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                                    <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>{this.state.followers == undefined ? 0 : this.state.followers}</Text>
                                    <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Followers</Text>
                                </View>
                                <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                                    <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>{this.state.following == undefined ? 0 : this.state.following}</Text>
                                    <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Following</Text>
                                </View>
                                
                            </View>

                            {/* settings and follow buttons */}
                            {this.state.uid != this.state.guestId ?
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
                            :
                                <View style={{flex:1, justifyContent:'center', alignItems:'center', height:Sizes.wp('12%'), marginLeft:Sizes.wp('10%'), marginRight:Sizes.wp('10%'), marginBottom:Sizes.wp('12%'), justifyContent:'space-between'}}>
                                        
                                    <TouchableOpacity 
                                        //onPress={() => this.followFunction()}
                                        //onPress={() => this.props.navigation.navigate("selectPhoto")}
                                        style={{backgroundColor:'#CCD1D1', height:Sizes.wp('12%'), width:'100%', justifyContent: 'center', alignItems: 'center', borderRadius:Sizes.mainItemsRadius,}}>
                                        <Text style={{ fontSize:Sizes.wp('4%'), fontFamily:Fonts.mainMedium, color:Colors.black, padding:Sizes.wp('3%')}}>Settings</Text>
                                    </TouchableOpacity>
                                        
                                </View>
                            }
                            
                            {/* tab navigator */}
                            <View style={{flex:1}}>
                                <TabView
                                    navigationState={this.state}
                                    renderScene={this._renderScene}
                                    renderTabBar={this._renderTabBar}
                                    onIndexChange={this._handleIndexChange}
                                    initialLayout={{ width:Sizes.deviceWidth }}
                                    sceneContainerStyle={{flex:1}}
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
    popupText: {
        fontFamily:Fonts.main,
        fontSize:Sizes.wp('5%'),
        textAlign: "center",
        color:"#575757",
        marginTop:Sizes.wp('4%'),
        marginBottom:Sizes.wp('4%'),
    },
    popupTextTitle: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('5%'),
        textAlign: "center",
        color:"#575757",
        marginTop:Sizes.wp('4%'),
        marginBottom:Sizes.wp('4%'),
    }
});