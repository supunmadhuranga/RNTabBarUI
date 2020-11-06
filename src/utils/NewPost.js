import { Constants } from "expo";
import React, { Component } from "react";
import propTypes from 'prop-types';
import { 
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Image,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {Entypo, FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';
import Dialog, { DialogFooter, DialogButton, DialogTitle, SlideAnimation, ScaleAnimation, DialogContent } from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';

import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';
//import { TextInput } from "react-native-paper";

import * as PermissionsApi from "./Permissions";
import * as ApiMethods from "../config/Api";

const URI = 'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY';

const options = {
    allowsEditing: true
};

export default class NewPost extends Component {

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            imageUri: null,
            caption:'',
            spinner: false,
            modalVisible:false,
        };
    }

    /* navigation header */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'New Post',
            headerRight: () => ( 
                
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={navigation.getParam('_postFeed')} style={{flex:1, justifyContent:'center', alignItems:"center", height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('4%')}}>
                        <Text style={{alignSelf:'center', fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('4.5%'), }}>Post</Text>
                    </TouchableOpacity>
                </View>
            ),
            
            headerStyle: {
                backgroundColor:Colors.white,
                //elevation: 0,
                //shadowOpacity: 0,
            },
            headerTitleStyle: {
                //flex: 1,
                //textAlign: 'center',
                fontSize:Sizes.wp('4.5%'),
                fontFamily:Fonts.mainSemiBold,
                fontWeight: '200',
                //width:Sizes.wp('60%'),
            }
            //headerTintColor: "#fff",
        };
        
    };

    async componentDidMount() {
        this._isMounted = true;

        /*set navigation header function*/
        this.props.navigation.setParams({
            _postFeed: this.postFeed
        });

        //this._isMounted && this.getUserData();

    }

    componentWillUnmount() {
        this._isMounted = false;
        //this.unsubscribe();
    }

    setCaption = (text) => {
        this._isMounted && this.setState({
            caption: text,
        });
    }

    selectOption = async(option) => {
        let uri = null;
        if (option === 0) {
            uri = await PermissionsApi._selectPhoto();
        } else {
            uri = await PermissionsApi._takePhoto();
        }
        
        if (uri) {
            this._isMounted && this.setState({
                imageUri:uri,
            });
        }
    }

    postFeed = async() => {
        
        if (this.state.imageUri != null && this.state.imageUri != false && this.state.imageUri != 'undifined') {
            
            this._isMounted && this.setState({
                spinner: true,
            });

            let result = await ApiMethods.addPost(this.state.caption, this.state.imageUri);
            this.navigateScreen(result);

        } else {
            console.log("error upload post");
        }

    }

    navigateScreen = (result) => {
        if (result) {
            this._isMounted && this.setState({
                spinner: false,
            })
            this.props.navigation.navigate("UserScreen");
        } else {
            this._isMounted && this.setState({
                spinner: false,
            })
            console.log("error uploading post new post screen");
        }
    }

    render() {
        
        const { showPopup } = this.props;

        return (

            <View style={styles.container}>
                <Spinner
                    color={Colors.main}
                    visible={this.state.spinner}
                    textContent={'Please wait...'}
                    overlayColor={'rgba(255, 255, 255, 0.9)'}
                    textStyle={{color:Colors.main, fontSize:Sizes.wp('3.75%')}}
                />
                <View style={{marginLeft:Sizes.wp('5%'), marginRight:Sizes.wp('5%'), marginTop:Sizes.wp('4%')}}>
                    
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.inputCaption}
                            autoCapitalize = 'none'
                            multiline={true}
                            numberOfLines={10}
                            placeholder={'Want to share somthing?'}
                            placeholderTextColor='#CCC5B9'
                            underlineColorAndroid='transparent'
                            onChangeText={(caption) => this.setCaption(caption)}
                            onFocus={this.onFocusChange}
                            onBlur={this.onBlurChange}
                        />
                    </View>

                    <View style={{flexDirection: "row", marginTop:Sizes.wp("7%")}}>
                        <TouchableOpacity 
                            onPress={() => {this.selectOption(0)}} 
                            style={{flex:1, justifyContent:'center', alignItems:"center", height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('0%')}}
                        >
                            <Entypo name='image-inverted' size={Sizes.wp('10%')} color='#000' />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {this.selectOption(1)}}
                            style={{flex:1, justifyContent:'center', alignItems:"center", height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('0%')}}
                        >
                            <Entypo name='camera' size={Sizes.wp('10%')} color='#000' />
                        </TouchableOpacity>
                    </View>

                    { this.state.imageUri != null && this.state.imageUri != false && this.state.imageUri != 'undifined'
                    ?
                        <View style={{ marginTop:Sizes.wp("7%"), marginBottom:Sizes.wp("5%")}}>
                            <Image source={{uri:this.state.imageUri}} resizeMode='contain'  style={{width:"100%", height:300}} />
                        </View>
                    :null}

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        // alignItems: "center",
        // justifyContent: "center"
    },
    text: {
        fontFamily:Fonts.main,
        fontSize:Sizes.wp('5%'),
        textAlign: "center",
        color:"#575757"
    },
    
    inputContainer: {
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

    inputCaption: {
        flex:1,
        fontSize:Sizes.wp('3.75%'),
        fontFamily:Fonts.main,
        color: '#66615b',
        marginLeft:Sizes.wp('2%'),
        marginRight:Sizes.wp('2%'),
        paddingVertical: Sizes.wp("2%"),
        textAlignVertical: 'bottom',
    },
});
