import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

import Ripple from '../../components/react-native-material-ripple/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

export default class Signup extends Component {
    constructor(props) {
        super(props);
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
        
    });

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

    validateSignup = (input, type) => {

        if (type == 'name') {

            this.setState({
                nameValidate: true,
                name: input,
            })

        }  

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

        }

        if (type == 'username') {

            this.setState({
                usernameValidate: true,
                username: input,
            })

        }
        
        if (type == 'password') {
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

    userSignup = () => {

        if (this.state.isConnected) {

            /* check input fields */
            if (this.state.name == null) {
                this.setState({
                    nameValidate: false,
                    error: true,
                    errorMsg: 'Invalid name',
                    loadSignup: false,
                })
                console.log('Error', 'Invalid name');
                return;
            }

            if (this.state.email == null) {
                this.setState({
                    emailValidate: false,
                    error: true,
                    errorMsg: 'Invalid username',
                    loadSignup: false,
                })
                console.log('Error', 'Invalid email');
                return;
            }

            if (this.state.username == null) {
                this.setState({
                    usernameValidate: false,
                    error: true,
                    errorMsg: 'Invalid username',
                    loadSignup: false,
                })
                console.log('Error', 'Invalid username');
                return;
            }

            if (this.state.password == null) {
                this.setState({
                    passwordValidate: false,
                    error: true,
                    errorMsg: 'Invalid password',
                    loadSignup: false,
                    
                })
                console.log('Error', 'Invalid password');
                return;
            }

            //load activity indicator
            this.setState({
                loadSignup: true,
            })

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                res.user.updateProfile({
                    name: this.state.name,
                    username:this.state.username
                })
                console.log('User registered successfully!');
                this.setState({
                    loadSignup: false,
                    name: '',
                    email: '',
                    username: '',
                    password: ''
                });
                this.props.navigation.navigate('AuthStack');
            })
            .catch(error => this.setState({ errorMsg: error.message }));


            // if (this.state.emailValidate && this.state.passwordValidate) {
            //     firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            //     .then(this.onLoginSuccess);

            // } else {
            //     this.setState({
            //         error: true,
            //         errorMsg: 'Invalid username or password',
            //         loadSignup: false,
            //     })
            //     console.log('Error', 'Invalid username or password');
            // }

        }

    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:Colors.white, justifyContent:'center', alignItems: 'center'}}>
                
                <View style={[styles.emailContainer, ]}>
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

                <View style={[styles.emailContainer, ]}>
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

                <View style={[styles.emailContainer, ]}>
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
                        onPress={() => this.userSignup()}
                    >
                        <Text style={styles.btnText} >Sign up</Text>
                    </Ripple>
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    btnText: {
        color: Colors.white,
        fontSize: Sizes.wp('3.75%'),
        textAlign: 'center',
        fontFamily:Fonts.mainMedium,
    },
});
