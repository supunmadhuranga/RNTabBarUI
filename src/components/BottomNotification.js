import React, { Component } from 'react';
import propTypes from 'prop-types';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Easing,
    Animated,
    LayoutAnimation,
    NetInfo,
} from 'react-native';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FontAwesome5, Ionicons, MaterialCommunityIcons, AntDesign, Octicons} from 'react-native-vector-icons';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionValue: new Animated.Value(Sizes.hp('15%')),
            enableNotification: false,
        };

    }

    _showNotification = () => {
        this.animateNotification(Sizes.hp('0%'));
        // setTimeout(() => {
        //         this.animateNotification(Sizes.hp('15%'))
        // }, 3000)
    }

    _closeNotification = () => {
        //this.props.handleCloseNotification();
        this.animateNotification(Sizes.hp('15%'));
    }

    animateNotification = (value) => {
        const { positionValue } = this.state;
        Animated.timing(
            positionValue,
            {
                toValue: value,
                //duration: 300,
                duration: 350,
                velocity: 3,
                tension: 2,
                friction: 8,
                easing: Easing.easeOutBack,
                //easing: Easing.bounce,
                useNativeDriver: true,
            }
        ).start();
    }

    render() {

        const { showNotification, type, message,  } = this.props;
        //showNotification ? this.animateNotification(Sizes.hp('0%')) : this.animateNotification(Sizes.hp('15%'));
        showNotification ? this._showNotification() : this._closeNotification();

        let iconName;
        let notificationColor;

        if (type == 'Done') {
            iconName='checkbox-marked-circle';
            notificationColor='#4F9643';
        } else if (type == 'Error') {
            iconName='close-circle';
            notificationColor='#EB5E28';
        } else if (type == 'Warning') {
            iconName='alert-circle';
            notificationColor='#F3BB45';
        }

        const { positionValue } = this.state;

        return (
            <Animated.View style={[ {transform: [{ translateY: positionValue }]}, styles.wrapper]}>
                <View style={{height:Sizes.hp('15%'), backgroundColor:Colors.white, bottom:0, right:0, left:0, position:'absolute', }}>
                    
                        <View style={{alignItems:'center',top:0, paddingRight:Sizes.wp('3%'), paddingLeft:Sizes.wp('3%'), paddingBottom:Sizes.wp('2%')}}>
                            <View style={{ height: 3, width: "100%", backgroundColor: notificationColor, }} />
                        </View>
                        
                        <View style={{flex:1,  flexDirection:'row', paddingTop:Sizes.wp('1%'), paddingBottom:Sizes.wp('1%'), paddingRight:Sizes.wp('3%'), paddingLeft:Sizes.wp('3%'),}}>
                            <View style={{width:Sizes.wp('80%'),}}>
                                <Text style={[{color:notificationColor}, styles.errorText]}>{type}</Text>
                                <Text style={styles.errorMessage}>{message}</Text>
                                {/* <Text style={styles.errorMessage}>this is error message component this is texting message</Text> */}
                            </View>
                            <View style={{flex:1, alignItems:'center', paddingTop:Sizes.wp('0%'), paddingBottom:Sizes.wp('0%')}}>
                                <Icon 
                                    name={iconName}
                                    size={Sizes.wp('15%')}
                                    color={notificationColor}
                                />
                            </View>
                        </View>
                    
                    
                </View>
                
            </Animated.View>
        );

        //end of return data
    }
}

Notification.propTypes = {
    showNotification: propTypes.bool.isRequired,
    type: propTypes.string.isRequired,
    message: propTypes.string,
    handleCloseNotification: propTypes.func,
};



const styles = StyleSheet.create({
    wrapper: {
        //flex: 1,
        //backgroundColor:Colors.white,
        //backgroundColor:'yellow',
        //height:Sizes.hp('15%'),
        // width:Sizes.width,
        alignItems:'center',
        justifyContent:'center',
        zIndex: 4,
        //height:Sizes.hp('12%'),
    },
    notificationContent: {
        //backgroundColor:'yellow',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        alignItems:'center',
        paddingLeft:Sizes.wp('3%'),
        paddingRight:Sizes.wp('3%'),
    },
    errorText: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4.5%'),
        marginRight:Sizes.wp('2%'),
        marginBottom:Sizes.wp('0%'),
        fontWeight:"normal",
    },
    errorMessage: {
        fontFamily:Fonts.main,
        fontSize:Sizes.wp('3.8%'),
        marginBottom:Sizes.wp('0.5%'),
        color:'#85929E',
    },
    closeButton: {
        position:'absolute',
        right:Sizes.wp('2%'),
        top:Sizes.wp('3%'),
    },
    typeIcon: {
        //position:'absolute',
        alignItems:'center',
    }
});

