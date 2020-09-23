import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
//import * as Google from 'expo-google-sign-in';
import * as Google from "expo-google-app-auth";
import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

import BottomNotification from '../../components/BottomNotification';
import AppPreLoader from "../../components/AppPreLoader";
import TopImage from '../../../assets/location.png';
import Ripple from '../../components/react-native-material-ripple/index';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';
import { isLoading } from 'expo-font';

const IOS_CLIENT_ID = "your-ios-client-id";
const ANDROID_CLIENT_ID = "1027715423940-jqlo6j4td6sgvespqebr0orvo0gag7om.apps.googleusercontent.com";

export default class LoginType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            isLoading: true,
            loadSignin: false,
            error: false,
            errorMsg: '',
            showBottomNotification:false,
            bottomNotificationType:'',
            bottomNotificationMessage:'',
        };
    }

    /**
    * hide navigation header
    **/
    static navigationOptions = ({ navigation }) => ({
        title: "",
        headerTransparent: true,
        
        headerLeft: () => ( <View/> ),
        headerRight: () => (
            <View />
        ),
        
    });

    componentDidMount() {
        this.checkSession();
        this.setState({ 
            isLoading: false,
        });
    }

    checkSession = async() => {
        // const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        // if (isLoggedIn === '1') {

        //     this.props.navigation.navigate('App');
            
        // } else {
        //     this.props.navigation.navigate('Auth');
        // }

        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        })

    }

    showNotification = (type, message) => {
        if (!this.state.showBottomNotification) {
            this.setState({
                showBottomNotification:true,
                bottomNotificationType:type,
                bottomNotificationMessage:message,
            })
            setTimeout(() => {
                this.hideNotification()
            },  3000)
        }
    }

    hideNotification = () => {
        this.setState({
            showBottomNotification:false,
            bottomNotificationType:'',
            bottomNotificationMessage:'',
        })
    }

    /**
    * navigate to slide show
    **/
    navigateScreenTo = (nav) => {
        this.props.navigation.navigate(nav);
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                /*We don't need to reauth the Firebase connection.*/
                return true;
                }
            }
        }
        return false;
    }

    onSignIn = (googleUser) => {

        console.log('Google Auth Response', googleUser);

        /*We need to register an Observer on Firebase Auth to make sure auth is initialized.*/
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();

            /*Check if we are already signed-in Firebase with the correct user.*/
            if (!this.isUserEqual(googleUser, firebaseUser)) {

                /*Build Firebase credential with the Google ID token.*/
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    //googleUser.getAuthResponse().id_token
                    googleUser.idToken,
                    googleUser.accessToken
                );

                /*Sign in with credential from the Google user.*/
                firebase.auth().signInWithCredential(credential)
                .then((response) => {
                    
                    const data = {
                        id: response.user.uid,
                        name: response.user.displayName,
                        email: response.user.email,
                        username: response.user.email,
                        image: response.user.photoURL,
                    };
                    const usersRef = firebase.firestore().collection('users');
                    usersRef
                    .doc(response.user.uid)
                    .set(data)
                    .then(() => {
                        this.setState({
                            loadSignin: false,
                        });
                        console.log('User Signed In');
                        //this.showNotification('Done', 'Signing successfully');
                        this.props.navigation.navigate('App');
                    })
                    .catch((error) => {
                        this.setState({
                            loadSignin: false,
                        });
                        this.showNotification('Error', error.message);
                        console.log(error);
                    });
                    
                })
                .catch((error) => {
                    this.setState({
                        loadSignin: false,
                    });

                    this.showNotification('Error', error.message);
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                // ...
                });
            } else {
                this.showNotification('Warn', 'User already signed-in Firebase.');
                console.log('User already signed-in Firebase.');
            }
        });
    }

    signInWithGoogleAsync = async() => {

        //load activity indicator
        this.setState({
            loadSignin: true,
        })

        try {
            const result = await Google.logInAsync({
                behavior:'web',
                androidClientId: ANDROID_CLIENT_ID,
                //iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { 
                    cancelled: true 
                };
            }
        } catch (e) {
            return { 
                error: true 
            };
        }
    }

    render() {

        if (!this.state.isLoading) {
            return (
                <View style={{flex:1, backgroundColor:Colors.white}}>
                    
                    <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} >

                        <View style={{flex:1, alignItems: 'center'}}>

                            <View style={styles.logoContainer}>
                                <Image source={TopImage} style={{width:Sizes.wp('10%'), height:Sizes.wp('20%')}} />
                            </View>

                            <Ripple
                                style={styles.btnLogin}
                                rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                rippleDuration={600}
                                onPress={() => this.navigateScreenTo('Login')}
                            >
                                <Text style={styles.btnText} >Continue with Email</Text>
                            </Ripple>

                            <Ripple
                                style={styles.btnLogin}
                                rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                rippleDuration={600}
                                
                            >
                                <Text style={styles.btnText} >Continue with Facebook</Text>
                            </Ripple>
                            

                            <Ripple
                                style={styles.btnLogin}
                                rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                rippleDuration={600}
                                // onPress={() => this.signInWithGoogleAsync()}
                                
                            >
                                <Text style={styles.btnText} >Continue with Google</Text>
                            </Ripple>

                            <Ripple
                                style={styles.btnLogin}
                                rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                rippleDuration={600}
                                
                            >
                                <Text style={styles.btnText} >Continue with Apple</Text>
                            </Ripple>

                            <Ripple
                                style={styles.btnSignup}
                                rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                rippleDuration={600}
                                onPress={() => this.navigateScreenTo('Signup')}
                            >
                                <Text style={{textAlign: 'center'}}>
                                    <Text style={{fontFamily:Fonts.mainMedium, color: '#66615b', fontSize: Sizes.wp('3.75%'),}}>New to TravelMedia? </Text>
                                    <Text style={{fontFamily:Fonts.mainMedium, color:Colors.error, fontSize: Sizes.wp('3.75%'),}}>Sign Up</Text>
                                </Text>
                            </Ripple>

                        </View>
                    </ScrollView>

                    <View>
                        {/* <SnackBar
                            visible={this.state.showBottomNotification}
                            message={this.state.bottomNotificationMessage}
                            actionHandler={() => {
                                console.log("snackbar button clicked!")
                            }}
                            action={(
                                <Icon name="close" size={20} />
                            )}
                        /> */}
                        <BottomNotification 
                            showNotification={this.state.showBottomNotification}
                            //showNotification={true}
                            type={this.state.bottomNotificationType}
                            //type={'Error'}
                            message={this.state.bottomNotificationMessage}
                            //message="Error"
                        />
                    </View>

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
    logoContainer: {
        alignItems: 'center',
        marginTop:Sizes.hp('10%'),
        marginBottom:Sizes.hp('5%'),
        //marginTop:Sizes.hp('5%'),
    },
    btnLogin: {
        width:Sizes.deviceWidth - 55,
        height:Sizes.hp('7%'),
        alignSelf: 'center',
        borderRadius: Sizes.mainItemsRadius,
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: Sizes.hp('3%'),
    },
    btnSignup: {
        width:Sizes.deviceWidth - 55,
        height:Sizes.hp('7%'),
        alignSelf: 'center',
        borderRadius: Sizes.mainItemsRadius,
        justifyContent: 'center',
        marginTop: Sizes.hp('3%'),
        marginBottom: Sizes.hp('3%'),
    },
    btnText: {
        color: Colors.black,
        fontSize: Sizes.wp('3.75%'),
        textAlign: 'center',
        fontFamily:Fonts.mainMedium,
    },
});
