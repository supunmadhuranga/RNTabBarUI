import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import * as firebase from 'firebase';
//import 'firebase/firestore';
import '@firebase/auth';
import '@firebase/firestore';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

import BottomNotification from '../../components/BottomNotification';
import AppPreLoader from "../../components/AppPreLoader";
import TopImage from '../../../assets/location.png';
import Ripple from '../../components/react-native-material-ripple/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

import * as ApiMethods from "../../config/Api";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            isConnected: true,
            isLoading: true,
            hidePass: true,
            press: false,
            nameValidate: true,
            emailValidate: true,
            usernameValidate: true,
            passwordValidate: true,
            name: null,
            email: null,
            username: null,
            password: null,
            loadSignup: false,
            error: false,
            errorMsg: '',
            showBottomNotification:false,
            bottomNotificationType:'',
            bottomNotificationMessage:'',
        };

        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    /**
    * hide navigation header
    **/
    static navigationOptions = ({ navigation }) => ({
        title: "",
        headerTransparent: true,
        
        headerLeft: () => ( <HeaderBackButton tintColor="#000" onPress={() => navigation.goBack()} /> ),
        headerRight: () => (
            <View />
        ),
        // headerStyle: {
        //     backgroundColor:Colors.white,
        //     elevation: 0,
        //     shadowOpacity: 0,
        // },
        
    });

    componentDidMount() {
        this._isMounted = true;
        //this.checkSession();
        this._isMounted && this.setState({ 
            isLoading: false,
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
        //this.unsubscribe();
    }

    showNotification = (type, message) => {
        if (!this.state.showBottomNotification) {
            this._isMounted && this.setState({
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
        this._isMounted && this.setState({
            showBottomNotification:false,
            bottomNotificationType:'',
            bottomNotificationMessage:'',
        })
    }

    showPassword = () => {
        if (this.state.press == false) {
            this._isMounted && this.setState({
                hidePass: false,
                press: true,
            })
        } else {
            this._isMounted && this.setState({
                hidePass: true,
                press: false,
            })
        }
    }

    validateSignup = (input, type) => {

        if (type == 'name') {

            const alph=/^[a-zA-Z ]{2,30}$/;
            if (alph.test(input) && input.length > 0) {
                this._isMounted && this.setState({
                    nameValidate: true,
                    name: input,
                })
            } else {
                this._isMounted && this.setState({
                    nameValidate: false,
                })
            }

        }  

        if (type == 'email') {

            const alph=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (alph.test(input) && input.length > 0) {
                this._isMounted && this.setState({
                    emailValidate: true,
                    email: input,
                })
            } else {
                this._isMounted && this.setState({
                    emailValidate: false,
                })
            }

        }

        if (type == 'username') {

            const alph=/^[a-zA-Z ]{2,30}$/;
            if (alph.test(input) && input.length > 0) {
                this._isMounted && this.setState({
                    usernameValidate: true,
                    username: input,
                })
            } else {
                this._isMounted && this.setState({
                    usernameValidate: false,
                })
            }

        }
        
        if (type == 'password') {
            if (input.length > 0) {
                this._isMounted && this.setState({
                    passwordValidate: true,
                    password: input,
                })
            } else {
                this._isMounted && this.setState({
                    passwordValidate: false,
                })
            }
            
        }

    }

    pressSignupBtn = async() => {

        if (this.state.isConnected) {

            /* check input fields */
            if (this.state.name == null) {
                this._isMounted && this.setState({
                    nameValidate: false,
                    error: true,
                    errorMsg: 'Invalid name',
                    loadSignup: false,
                });
                this._isMounted && this.showNotification('Error', 'Invalid name');
                console.log('Error', 'Invalid name');
                return;
            }

            if (this.state.email == null) {
                this._isMounted && this.setState({
                    emailValidate: false,
                    error: true,
                    errorMsg: 'Invalid email',
                    loadSignup: false,
                });
                this._isMounted && this.showNotification('Error', 'Invalid email');
                console.log('Error', 'Invalid email');
                return;
            }

            if (this.state.username == null) {
                this._isMounted && this.setState({
                    usernameValidate: false,
                    error: true,
                    errorMsg: 'Invalid username',
                    loadSignup: false,
                });
                this._isMounted && this.showNotification('Error', 'Invalid username');
                console.log('Error', 'Invalid username');
                return;
            }

            if (this.state.password == null) {
                this._isMounted && this.setState({
                    passwordValidate: false,
                    error: true,
                    errorMsg: 'Invalid password',
                    loadSignup: false,
                    
                });
                this._isMounted && this.showNotification('Error', 'Invalid password');
                console.log('Error', 'Invalid password');
                return;
            }

            //load activity indicator
            this._isMounted && this.setState({
                loadSignup: true,
            })

            ApiMethods.userSignUp(this.state.name, this.state.email, this.state.username, this.state.password).then( async(response) => {
                if (response == true) {
                    this._isMounted && this.setState({
                        loadSignup: false,
                    });
                    this.showNotification('Done', 'Signup successfully');
                } else {
                    this._isMounted && this.setState({
                        loadSignup: false,
                    });
                    this.showNotification('Error', response.message);
                }
            });

            // firebase
            //     .auth()
            //     .createUserWithEmailAndPassword(this.state.email, this.state.password)
            //     .then((response) => {
            //         const data = {
            //             id: response.user.uid,
            //             name: this.state.name,
            //             email: this.state.email,
            //             username: this.state.username,
            //             age: '',
            //             sex: '',
            //             image: '',
            //             bio: '',
            //             followed_count: 0,
            //             follower_count: 0,
            //             post_count: 0,
            //             active: 1,
            //         };
            //         const usersRef = firebase.firestore().collection('users');
            //         usersRef
            //         .doc(response.user.uid)
            //         .set(data)
            //         .then(() => {
            //             this.setState({
            //                 loadSignup: false,
            //             });
            //             this.showNotification('Done', 'Signup successfully');
            //         })
            //         .catch((error) => {
            //             this.setState({
            //                 loadSignup: false,
            //             });
            //             this.showNotification('Error', error.message);
            //             console.log(error);
            //         });
            //     })
            //     .catch((error) => {
            //         this.setState({
            //             loadSignup: false,            
            //         });
            //         this.showNotification('Error', error.message);
            //         console.log(error);
            // });

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
                            
                            <View style={[styles.emailContainer, !this.state.nameValidate? styles.error:null]}>
                                <Icon name={'account-circle-outline'} size={Sizes.wp('6.2%')} color='#CCC5B9' style={styles.inputIcon} />
                                <TextInput
                                    style={styles.inputEmail}
                                    autoCapitalize = 'none'
                                    placeholder={'Name'}
                                    placeholderTextColor='#CCC5B9'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(name) => this.validateSignup(name, 'name')}
                                    onFocus={this.onFocusChange}
                                    onBlur={this.onBlurChange}
                                />
                            </View>

                            <View style={[styles.emailContainer, !this.state.emailValidate? styles.error:null]}>
                                <Icon name={'email-outline'} size={Sizes.wp('6.2%')} color='#CCC5B9' style={styles.inputIcon} />
                                <TextInput
                                    style={styles.inputEmail}
                                    autoCapitalize = 'none'
                                    placeholder={'Email'}
                                    keyboardType="email-address"
                                    placeholderTextColor='#CCC5B9'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(email) => this.validateSignup(email, 'email')}
                                    onFocus={this.onFocusChange}
                                    onBlur={this.onBlurChange}
                                />
                            </View>

                            <View style={[styles.emailContainer, !this.state.usernameValidate? styles.error:null]}>
                                <Icon name={'account-outline'} size={Sizes.wp('6.2%')} color='#CCC5B9' style={styles.inputIcon} />
                                <TextInput
                                    style={styles.inputEmail}
                                    autoCapitalize = 'none'
                                    placeholder={'Username'}
                                    placeholderTextColor='#CCC5B9'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(username) => this.validateSignup(username, 'username')}
                                    onFocus={this.onFocusChange}
                                    onBlur={this.onBlurChange}
                                />
                            </View>

                            <View style={[styles.passwordContainer, !this.state.passwordValidate? styles.error:null]}>
                                <Icon name={'lock-outline'} size={Sizes.wp('6.2%')} color='#CCC5B9' style={styles.inputIcon} />
                                <TextInput
                                    style={styles.inputPassword}
                                    autoCapitalize = 'none'
                                    placeholder={'Password'}
                                    secureTextEntry={this.state.hidePass}
                                    placeholderTextColor='#CCC5B9'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(password) => this.validateSignup(password, 'password')}
                                />
                                <TouchableOpacity style={styles.btnEye} onPress={this.showPassword.bind(this)} >
                                    <Icon name={this.state.press == false ? 'eye-off-outline' : 'eye-outline'} size={Sizes.wp('6%')} color='#CCC5B9' />
                                </TouchableOpacity>
                            </View>

                            {this.state.loadSignup ? 
                                <ActivityIndicator color={Colors.main} size={Sizes.wp('8%')} style={{marginTop:Sizes.hp('3%')}} animating /> : 
                                <Ripple
                                    style={styles.btnLogin}
                                    rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                    rippleDuration={600}
                                    onPress={() => this.pressSignupBtn()}
                                >
                                    <Text style={styles.btnText} >Sign up</Text>
                                </Ripple>
                            }
                            <View>
                                <Ripple
                                    style={styles.btnNavLogin}
                                    rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                    rippleDuration={600}
                                    onPress={() => this.props.navigation.navigate('Login')}
                                >
                                    <Text style={{textAlign: 'center'}}>
                                        <Text style={{fontFamily:Fonts.mainMedium, color: '#66615b', fontSize: Sizes.wp('3.75%'),}}>Already have an account? </Text>
                                        <Text style={{fontFamily:Fonts.mainMedium, color:Colors.error, fontSize: Sizes.wp('3.75%'),}}>Login</Text>
                                    </Text>
                                </Ripple>
                            </View>

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
    emailContainer: {
        marginTop:Sizes.hp('1.7%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: Sizes.deviceWidth - 55,
        height:Sizes.hp('7%'),
        borderRadius: Sizes.mainItemsRadius,
        fontSize: Sizes.wp('3.75%'),
        color: '#66615b',
        fontFamily:Fonts.main,
        borderWidth:1,
        borderColor: '#CCC5B9',
    },
    inputEmail: {
        flex:1,
        fontSize:Sizes.wp('3.75%'),
        fontFamily:Fonts.main,
        color: '#66615b',
    },
    passwordContainer: {
        marginTop:Sizes.hp('1.7%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width:Sizes.deviceWidth - 55,
        height:Sizes.hp('7%'),
        borderRadius: Sizes.mainItemsRadius,
        fontSize:Sizes.wp('3.75%'),
        color: '#66615b',
        fontFamily:Fonts.main,
        borderWidth:1,
        borderColor: '#CCC5B9',
    },
    inputPassword: {
        flex:1,
        fontSize:Sizes.wp('3.75%'),
        fontFamily:Fonts.main,
        color: '#66615b',
    },
    inputIcon: {
        paddingLeft:Sizes.wp('3%'),
        paddingRight:Sizes.wp('2%'),
    },
    btnEye: {
        paddingLeft:Sizes.wp('1%'),
        paddingRight:Sizes.wp('3%'),
    },
    btnLogin: {
        width:Sizes.deviceWidth - 55,
        height:Sizes.hp('7%'),
        alignSelf: 'center',
        borderRadius: Sizes.mainItemsRadius,
        backgroundColor:'#2196f3',
        justifyContent: 'center',
        marginTop: Sizes.hp('3%'),
        marginBottom: Sizes.hp('3%'),
    },
    btnNavLogin: {
        width:Sizes.deviceWidth - 55,
        height:Sizes.hp('7%'),
        alignSelf: 'center',
        borderRadius: Sizes.mainItemsRadius,
        justifyContent: 'center',
        marginBottom: Sizes.hp('1.7%'),
    },
    btnText: {
        color: Colors.white,
        fontSize: Sizes.wp('3.75%'),
        textAlign: 'center',
        fontFamily:Fonts.mainMedium,
    },
    error: {
        borderWidth: 1,
        borderColor: '#EB5E28',
    },
    errorText: {
        marginTop:Sizes.hp('3%'),
        color: '#EB5E28',
        fontSize:Sizes.wp('3.75%'),
        textAlign: 'center',
        fontFamily:Fonts.main,
    },
});
