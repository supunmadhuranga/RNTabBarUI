import React, { Component, useState } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    Image,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import firebase from 'firebase';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

import Ripple from '../../components/react-native-material-ripple/index';
import BottomNotification from '../../components/BottomNotification';

//import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            isLoading: true,
            hidePass: true,
            press: false,
            emailValidate: true,
            passwordValidate: true,
            email: null,
            password: null,
            loadLogin: false,
            errorStatus: false,
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
        
        headerLeft: () => ( <HeaderBackButton tintColor="#000" onPress={() => navigation.goBack()} /> ),
        headerRight: () => (
            <View />
        ),
        
    })

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

    showPassword = () => {
        if (this.state.press == false) {
            this.setState({
                hidePass: false,
                press: true,
            })
        } else {
            this.setState({
                hidePass: true,
                press: false,
            })
        }
    }

    validateLogin = (input, type) => {

        if (type == 'email') {

            const alph=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (alph.test(input) && input.length > 0) {
                this.setState({
                    emailValidate: true,
                    email: input,
                })
            } else {
                this.setState({
                    emailValidate: false,
                })
            }

        } else if (type == 'password') {
            if (input.length > 0) {
                this.setState({
                    passwordValidate: true,
                    password: input,
                })
            } else {
                this.setState({
                    passwordValidate: false,
                })
            }
            
        }

    }

    userLogin = () => {

        if (this.state.error) {
            this.setState({
                errorStatus: false,
            })
        }

        if (this.state.isConnected) {

            /* check input fields */
            if (this.state.email == null) {
                this.setState({
                    emailValidate: false,
                    errorStatus: true,
                    errorMsg: 'Invalid username',
                    loadLogin: false,
                })
                this.showNotification('Error', 'Invalid email');
                console.log('Error', 'Invalid email');
                return;
            }

            if (this.state.password == null) {
                this.setState({
                    passwordValidate: false,
                    errorStatus: true,
                    errorMsg: 'Invalid password',
                    loadLogin: false,
                    
                })
                this.showNotification('Error', 'Invalid password');
                console.log('Error', 'Invalid password');
                return;
            }

            //load activity indicator
            this.setState({
                loadLogin: true,
            })

            if (this.state.emailValidate && this.state.passwordValidate) {
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.onLoginSuccess
                })
                .catch((error) => {
                    this.setState({ 
                        error: true,
                        errorMsg: error.message,
                        loadLogin: false,
                    });
                    this.showNotification('Error', error.message);
                });
            } else {
                this.setState({
                    error: true,
                    errorMsg: 'Invalid username or password',
                    loadLogin: false,
                })
                this.showNotification('Error', 'Invalid username or password');
                console.log('Error', 'Invalid username or password');
            }

        }
    }

    onLoginSuccess = () => {
        this.props.navigation.navigate('App');
    }

    render() {

        return (
            
                <View style={{flex:1, backgroundColor:Colors.white}}>
                    {/* <StatusBar style="dark" /> */}

                    <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} >
                    
                    
                        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                            
                            <View style={styles.logoContainer}>
                                {/* <Image source={Logo} style={[{width:this.logoHeight, height:this.logoHeight}]} /> */}
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
                                    onChangeText={(email) => this.validateLogin(email, 'email')}
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
                                    onChangeText={(password) => this.validateLogin(password, 'password')}
                                />
                                <TouchableOpacity style={styles.btnEye} onPress={this.showPassword.bind(this)} >
                                    <Icon name={this.state.press == false ? 'eye-off-outline' : 'eye-outline'} size={Sizes.wp('6%')} color='#CCC5B9' />
                                </TouchableOpacity>
                            </View>

                            {this.state.loadLogin ? 
                                <ActivityIndicator color={Colors.main} size={Sizes.wp('8%')} style={{marginTop:Sizes.hp('3%')}} animating /> : 
                                
                                <View>

                                    <Ripple
                                        style={styles.btnLogin}
                                        rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                        rippleDuration={600}
                                        onPress={() => this.userLogin()}
                                    >
                                        <Text style={styles.btnText} >Log in</Text>
                                    </Ripple>

                                    <Ripple
                                        style={styles.btnForgotpw}
                                        rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                        rippleDuration={600}
                                        onPress={() => this.forgotPassword()}
                                    >
                                        <Text style={{textAlign: 'center', fontFamily:Fonts.mainMedium, color:Colors.error, fontSize: Sizes.wp('3.75%'),}}>Forgot your passsword?</Text>
                                    </Ripple>

                                    <Ripple
                                        style={styles.btnSignup}
                                        rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                        rippleDuration={600}
                                        onPress={() => this.props.navigation.navigate('Signup')}
                                    >
                                        <Text style={{textAlign: 'center'}}>
                                            <Text style={{fontFamily:Fonts.mainMedium, color: '#66615b', fontSize: Sizes.wp('3.75%'),}}>Don't have an account? </Text>
                                            <Text style={{fontFamily:Fonts.mainMedium, color:Colors.error, fontSize: Sizes.wp('3.75%'),}}>Sign Up</Text>
                                        </Text>
                                    </Ripple>
                                    
                                </View>
                            }

                        </View>
                    </ScrollView>
                            

                    <View>
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
            //</KeyboardAvoidingView>
            
        );
      
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor:Colors.mainBackground,
        // width: null,
        // height: null,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom:Sizes.hp('5%'),
        marginTop:Sizes.hp('5%'),
    },
    logo: {
        width:Sizes.wp('60%'),
        height:Sizes.wp('60%'),
    },
    smallLogo: {
        width:Sizes.wp('30%'),
        height:Sizes.wp('30%'),
    },
    emailContainer: {
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
    inputEmail: {
        flex:1,
        fontSize:Sizes.wp('3.75%'),
        fontFamily:Fonts.main,
        color: '#66615b',
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
    btnForgotpw: {
        width:Sizes.deviceWidth - 55,
        height:Sizes.hp('7%'),
        alignSelf: 'center',
        borderRadius: Sizes.mainItemsRadius,
        justifyContent: 'center',
        marginBottom: Sizes.hp('1.7%'),
    },
    btnSignup: {
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
    offlineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.main,
    },
    offlineText: { color:Colors.white },

});