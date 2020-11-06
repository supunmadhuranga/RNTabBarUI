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

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog, { DialogFooter, DialogButton, DialogTitle, SlideAnimation, ScaleAnimation, DialogContent } from 'react-native-popup-dialog';

import {Entypo, FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';

import BottomNotification from '../components/BottomNotification';
import RBSheet from "../components/react-native-raw-bottom-sheet";

import userImage from '../../assets/user.png';

import PostsScreen from './UserPosts/Photos';
import EventsScreen from './UserEvents/Events';
import InfoScreen from './UserInfo/Info';

import SnackBar from '../components/rn-snackbar-component/index';
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
            spinner:false,
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
                { key: 'first', title: 'Posts' },
                { key: 'second', title: 'Events' },
                { key: 'third', title: 'Info' },
            ],
            snackbarVisible:false,
            snackbarMessage:'',
            
        };
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    /* navigation header */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '',
            headerRight: () => ( 
                <View style={styles.headerRightWrapper}>
                    <TouchableOpacity 
                        onPress={navigation.getParam('_openCreatePostMenu')} 
                        style={styles.headerIcon1Wrapper}
                    >
                        <AntDesign 
                            name='plus' 
                            size={Sizes.wp('7%')} 
                            color='#000'
                        />
                    </TouchableOpacity>
                    <View style={styles.headerIcon2Wrapper}>
                        <CustomMenu
                            // Menu Text
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

        /* get user data from db */
        this._isMounted && this.getUserData();

    }

    componentWillUnmount(){
        this._isMounted = false;
        //this.unsubscribe();
    }

    showSnackbar = (message) => {
        if (!this.state.snackbarVisible) {
            this._isMounted && this.setState({
                snackbarVisible:true,
                //snackbarVisibleType:type,
                snackbarMessage:message,
            })
            setTimeout(() => {
                this.hideSnackbar()
            },  3000)
        }
    }

    hideSnackbar = () => {
        this._isMounted && this.setState({
            snackbarVisible:false,
            //snackbarVisibleType:type,
            snackbarMessage:'',
        })
    }

    /* get user data from db */
    getUserData = async() => {
        ApiMethods.fetchUserDetails().then((response) => {
            if (response) {
                this._isMounted && this.setState({
                    name:      response.name,
                    guestId:   response.id,
                    userImage: response.image,
                    following: response.followed_count,
                    followers: response.follower_count,
                    postCount: response.post_count,
                    isLoading: false,
                });
            } else {
                this._isMounted && this.setState({
                    isLoading: false,
                });
                this.showSnackbar('Connection failed');
            }
        });
    }

    // addPost = async(uri) => {
    //     const usersRef = firebase.firestore().collection('posts');
    //     const id = uuid();
    //     console.log(id);
    //     const data = {
    //         id:id,
    //         uid: this.state.uid,
    //         caption: "testing post3",
    //         path: uri,
    //         date_created: firebase.firestore.FieldValue.serverTimestamp(),
    //         date_updated: firebase.firestore.FieldValue.serverTimestamp(),
    //     };

    //     ApiMethods.createPost(id, data);
    // }

    /* tab change handler start */
    _handleIndexChange = index => this._isMounted && this.setState({ index });

    /* middle tab bar render */
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
                        <>
                        <TouchableOpacity
                            key={i}
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}
                        >
                            <Animated.Text style={{ color, fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%') }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                        </>
                    );
                })}
            </View>
        );
    };

    _renderScene = SceneMap({
        first: PostsScreen,
        second: EventsScreen,
        third: InfoScreen,
    });

    /* tab bar */
    _renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor:Colors.main }}
            style={{ backgroundColor:Colors.white, elevation: 0, shadowOpacity: 0}}
            labelStyle={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.75%')}}
            activeColor={Colors.main}
            inactiveColor={Colors.secondFontColor}
        />
    );

    /* tab change handler end */

    /* user logout */
    userLogOut = () => {
        ApiMethods.UserSignOut().then((response) => {
            if (response) {
                this.props.navigation.navigate('Auth');
            } else {
                this.showSnackbar('User signout failed');
            }
        });
    }

    pickProfileImage = () => {

        this.AvatarMenuRBSheet.open();

        // this._isMounted && this.setState({
        //     photoSelectMenu:true,
        // });

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

    /* select photo option modal menu */
    SelectPhotoMenu = () => {
        return (
            <>
                {/* <View style={{}}>
                    <Text style={styles.popupTextTitle}>Choose Option</Text>
                </View>

                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#EAEDED",
                    }}
                /> */}

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

                <TouchableOpacity onPress={() => {this.selectOption(0)}} underlayColor={'#e0dbdb'} style={{}}>
                    <Text style={styles.popupText}>Select Photo</Text>
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

    selectOption = async(option) => {
        this.AvatarMenuRBSheet.close();

        let uri = null;
        if (option === 0) {
            uri = await PermissionsApi._selectPhoto();
        } else {
            uri = await PermissionsApi._takePhoto();
        }
        
        if (uri) {

            this._isMounted && this.setState({
                spinner:true,
            });

            ApiMethods.uploadAvatar(uri).then((response) => {
                if (response) {
                    this._isMounted && this.setState({
                        userImage:uri,
                        spinner:false,
                    });
                } else {
                    this._isMounted && this.setState({
                        spinner:false,
                    });
                    this.showSnackbar('Profile Image upload failed');
                }
            });
            
        }
    }

    // closePhotoSelectMenu = () => {
    //     this._isMounted && this.setState({
    //         photoSelectMenu:false,
    //     });
    // }

    openCreatePostMenu = () => {
        this.PostMenuRBSheet.open();
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

    // postSelectOption = async(option) => {
    //     this.PostMenuRBSheet.close();
    //     if (option === 0) {
            
    //         const uri = await PermissionsApi._selectPhoto();
    //         //uri = await PermissionsApi._takePhoto();
    //         if (uri) {
    //             this.createPost(uri);
    //         } else {
    //             console.log("Error add new post");
    //         }

    //     } else {
    //         this.createEvent();
    //     }
        
    // }

    createPost = () => {
        this.PostMenuRBSheet.close();
        this.props.navigation.navigate("NewPostScreen");
        //this.props.navigation.navigate("NewPost");
    }

    createEvent = () => {
        this.PostMenuRBSheet.close();
        this.props.navigation.navigate("NewEventScreen");
    }

    // AvatarUpdateMenu = () => {
    //     return (
    //         <>
    //             <View style={{}}>
    //                 <Text style={styles.popupTextTitle}>Choose Option</Text>
    //             </View>

    //             <View
    //                 style={{
    //                     height: 1,
    //                     width: "100%",
    //                     backgroundColor: "#EAEDED",
    //                 }}
    //             />

    //             <TouchableOpacity onPress={() => {this.selectOption(0)}} underlayColor={'#e0dbdb'} style={{}}>
    //                 <Text style={styles.popupText}>Open Gallery</Text>
    //             </TouchableOpacity>

    //             <View
    //                 style={{
    //                     height: 1,
    //                     width: "100%",
    //                     backgroundColor: "#EAEDED",
    //                 }}
    //             />

    //             <TouchableOpacity onPress={() => {this.selectOption(1)}} underlayColor={'#e0dbdb'} style={{}}>
    //                 <Text style={styles.popupText}>Take Photo</Text>
    //             </TouchableOpacity>

    //             <View
    //                 style={{
    //                     height: 1,
    //                     width: "100%",
    //                     backgroundColor: "#EAEDED",
    //                 }}
    //             />
    //             <View style={{}}>
    //                 <Text style={styles.popupText}></Text>
    //             </View>
    //         </>
    //     );
        
    // }

    // updateUserImage = async() => {
    //     ApiMethods.uploadAvatar()
    // }

    render() {
        if (!this.state.isLoading) {
            return (
                <View style={{flex:1, backgroundColor:Colors.white}}>
                    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >

                        <Spinner
                            color={Colors.main}
                            visible={this.state.spinner}
                            textContent={'Please wait...'}
                            overlayColor={'rgba(255, 255, 255, 0.9)'}
                            textStyle={{color:Colors.main, fontSize:Sizes.wp('3.75%')}}
                        />

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
                                this.PostMenuRBSheet = ref;
                            }}
                            //height={Sizes.wp('50%')}
                            //minClosingHeight={}
                            animationType={"slide"}
                            openDuration={100}
                            closeOnDragDown={true}
                            dragFromTopOnly={true}
                            customStyles={{
                                container: {
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 'auto', 
                                    maxHeight: 300,
                                    borderTopLeftRadius:20,
                                    borderTopRightRadius:20,
                                }
                            }}
                        >
                            <this.CreatePostMenu />
                        </RBSheet>
                        {/* bottom menu ends */}

                        {/* photo select bottom menu*/}
                        <RBSheet
                            ref={ref => {
                                this.AvatarMenuRBSheet = ref;
                            }}
                            //height={Sizes.wp('50%')}
                            //minClosingHeight={}
                            animationType={"slide"}
                            openDuration={100}
                            closeOnDragDown={true}
                            dragFromTopOnly={true}
                            customStyles={{
                                container: {
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 'auto', 
                                    maxHeight: 300,
                                    borderTopLeftRadius:20,
                                    borderTopRightRadius:20,
                                }
                            }}
                        >
                            <this.SelectPhotoMenu />
                        </RBSheet>
                        

                        {/* user image and name*/}
                        <View style={{ alignItems:'center', marginLeft:Sizes.wp('10%'), marginRight:Sizes.wp('10%'), marginTop:Sizes.wp('4%'), marginBottom:Sizes.wp('8%')}}>
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
                                    style={{backgroundColor:'#e0e0e0', height:Sizes.wp('12%'), width:'100%', justifyContent: 'center', alignItems: 'center', borderRadius:Sizes.mainItemsRadius,}}>
                                    <Text style={{ fontSize:Sizes.wp('4%'), fontFamily:Fonts.mainMedium, color:Colors.black, padding:Sizes.wp('3%')}}>Settings</Text>
                                </TouchableOpacity>
                                    
                            </View>
                        }
                        
                        {/* tab navigator */}
                        <View style={{flex:1}}>
                            <TabView
                                //lazy={true}
                                navigationState={this.state}
                                renderScene={this._renderScene}
                                renderTabBar={this._renderTabBar}
                                onIndexChange={this._handleIndexChange}
                                initialLayout={{ height: 0, width:Sizes.deviceWidth }}
                                //sceneContainerStyle={{backgroundColor:Colors.main, hight:0}}
                            />
                        </View>
                        
                        <SnackBar
                            visible={this.state.snackbarVisible}
                            message={this.state.snackbarMessage}
                            actionHandler={() => {
                                console.log("snackbar button clicked!")
                            }}
                            action=""
                            messageStyle={styles.snackbarMessage}
                            //autoHidingTime={300}
                        />
                    
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
    headerRightWrapper: {
        flexDirection:'row',
    },
    headerIcon1Wrapper:{
        flex:1, 
        justifyContent:'center', 
        height:Sizes.wp('5%'), 
        width:Sizes.wp('10%'), 
        marginRight:Sizes.wp('0%'),
    },
    headerIcon2Wrapper: {
        flex:1, 
        justifyContent:'center', 
        height:Sizes.wp('5%'), 
        width:Sizes.wp('10%'), 
        marginRight:Sizes.wp('0%')
    },
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