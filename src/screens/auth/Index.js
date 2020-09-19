import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
} from 'react-native';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

import Ripple from '../../components/react-native-material-ripple/index';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';

export default class LoginType extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    /**
    * navigate to slide show
    **/
    navigateScreenTo = (nav) => {
        this.props.navigation.navigate(nav);
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:Colors.white, justifyContent:'center', alignItems: 'center'}}>
                
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
        );
    }
}

const styles = StyleSheet.create({
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
