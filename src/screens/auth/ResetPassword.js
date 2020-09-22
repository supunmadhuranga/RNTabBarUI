import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import firebase from 'firebase';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

import Ripple from '../../components/react-native-material-ripple/index';
import BottomNotification from '../../components/BottomNotification';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            isLoading: true,
            emailValidate: true,
            email: null,
            loadResetPass: false,
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
        //headerTransparent: true,
        
        headerLeft: () => ( <HeaderBackButton tintColor="#000" onPress={() => navigation.goBack()} /> ),
        headerRight: () => (
            <View />
        ),
        headerStyle: {
            backgroundColor:Colors.white,
            elevation: 0,
            shadowOpacity: 0,
        },
        
    });

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

    validateResetPass = (input, type) => {

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

    }

    resetPass = () => {

        if (this.state.error) {
            this.setState({
                errorStatus: false,
            })
        }

        if (this.state.isConnected) {

            if (this.state.email == null) {
                this.setState({
                    emailValidate: false,
                    error: true,
                    errorMsg: 'Invalid Email',
                    loadResetPass: false,
                })
                this.showNotification('Error', 'Invalid email');
                console.log('Error', 'Invalid email');
                return;
            }

            //load activity indicator
            this.setState({
                loadResetPass: true,
            });

            firebase.auth().sendPasswordResetEmail(this.state.email)
            .then((user) => {
                this.setState({
                    loadResetPass: false,
                    email: '',
                });
                this.showNotification('Done', 'Password reset email sent, please check your email...');
            }).catch(function (error) {
                this.setState({
                    loadResetPass: false,
                });
                this.showNotification('Error', error);
            })

        }

    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:Colors.white}}>

                <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >

                <View style={{marginLeft:Sizes.wp('5%'), marginRight:Sizes.wp('5%'), marginTop:Sizes.wp('4%')}}>
                    
                    <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('5.5%'), marginBottom:Sizes.wp('2%')}}>Reset Password</Text>
                    <Text style={{ flexWrap: 'wrap', fontFamily:Fonts.main, color:Colors.black, fontSize:Sizes.wp('4%'), marginBottom:Sizes.wp('1%')}}>
                        Enter the email address associated with your account, and we'll email you a link to reset your password.
                    </Text>

                    <View style={[styles.emailContainer, !this.state.emailValidate? styles.error:null]}>
                        <TextInput
                            style={styles.inputEmail}
                            autoCapitalize = 'none'
                            placeholder={'Email'}
                            keyboardType="email-address"
                            placeholderTextColor='#CCC5B9'
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.validateResetPass(email, 'email')}
                            onFocus={this.onFocusChange}
                            onBlur={this.onBlurChange}
                        />
                    </View>

                    {this.state.loadResetPass ? 
                        <ActivityIndicator color={Colors.main} size={Sizes.wp('8%')} style={{marginTop:Sizes.hp('3%')}} animating /> : 
                        <Ripple
                            style={styles.btnResetPass}
                            rippleContainerBorderRadius={Sizes.mainItemsRadius}
                            rippleDuration={600}
                            onPress={() => this.resetPass()}
                        >
                            <Text style={styles.btnText} >Send reset link</Text>
                        </Ripple>
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
        );
    }
}

const styles = StyleSheet.create({
    emailContainer: {
        marginTop:Sizes.hp('1.7%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width:'100%',
        height:Sizes.hp('7%'),
        //borderRadius: Sizes.mainItemsRadius,
        fontSize: Sizes.wp('3.75%'),
        color: '#66615b',
        fontFamily:Fonts.main,
        //borderWidth:1,
        borderBottomWidth:1,
        borderColor: '#CCC5B9',
    },
    inputEmail: {
        flex:1,
        fontSize:Sizes.wp('3.75%'),
        fontFamily:Fonts.main,
        color: '#66615b',
        marginLeft:Sizes.wp('2%'),
        marginRight:Sizes.wp('2%'),
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
    btnResetPass: {
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
    error: {
        borderBottomWidth: 1,
        borderColor: '#EB5E28',
    },
});
