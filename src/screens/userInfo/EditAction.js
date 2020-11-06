import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    TouchableHighlight,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import RNPickerSelect from 'react-native-picker-select';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';
import userImage from '../../../assets/user.png';

import * as ApiMethods from "../../config/Api";

const URI = 'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY';

export default class editAction extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            user_name:'',
            user_image:null,
            user_age:'',
            user_sex:'',
            user_bio:'',
            user_interest:[],
            snackbarVisible:false,
            snackbarMessage:'',
        };
    }

    /* navigation header */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Edit Profile',
            headerRight: () => ( 
                
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={navigation.getParam('_saveData')} style={{flex:1, justifyContent:'center', alignItems:"center", height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('4%')}}>
                        <Text style={{alignSelf:'center', fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('4.5%'), }}>Save</Text>
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
            _saveData: this.saveData
        });
        //this._isMounted && this.getUserData();

        this._isMounted && this.setState({
            userImage: URI,
        });
    }

    componentWillUnmount() {
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
                    user_name:  response.name,
                    user_image: response.image,
                    user_age: response.age,
                    user_sex: response.sex,
                    user_bio: response.bio,
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

    saveData = async() => {
        
        // if (this.state.imageUri != null && this.state.imageUri != false && this.state.imageUri != 'undifined') {
            
        //     this._isMounted && this.setState({
        //         spinner: true,
        //     });

        //     let result = await ApiMethods.addPost(this.state.caption, this.state.imageUri);
        //     this.navigateScreen(result);

        // } else {
        //     console.log("error upload post");
        // }

    }

    setName = (value) => {
        this._isMounted && this.setState({
            user_name:value,
        })
    }

    setAge = (value) => {
        this._isMounted && this.setState({
            user_age:value,
        })
    }

    setSexType = (type) => {

        if (type != '' || type != null) {
            this._isMounted && this.setState({
                user_sex:type,
            })
        }       
    }

    setUserBio = (value) => {
        this._isMounted && this.setState({
            user_bio:value,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >
                    <Spinner
                        color={Colors.main}
                        visible={this.state.spinner}
                        textContent={'Please wait...'}
                        overlayColor={'rgba(255, 255, 255, 0.9)'}
                        textStyle={{color:Colors.main, fontSize:Sizes.wp('3.75%')}}
                    />

                    <View style={styles.mainWrapper}>

                        {/* user image */}
                        <View style={styles.userImageWrapper}>
                            <TouchableOpacity 
                                style={styles.touchableWrapper}
                                onPress={() => this.pickProfileImage()}
                            >   
                                {this.state.user_image == "" || this.state.user_image == null ?
                                    <Image
                                        source={userImage}
                                        style={styles.userImage}
                                    />
                                :
                                    <Image
                                        source={{uri:this.state.user_image}}
                                        style={styles.userImage}
                                    />
                                }
                            </TouchableOpacity>
                            <Text style={styles.userImageChangeText}>Change Profile Pic</Text>
                        </View>
                        
                        {/* name */}
                        <View style={styles.nameWrapper}>
                            <Text style={styles.lablesAll}>Name</Text>
                            <TextInput
                                style={[styles.nameTextInputWrapper, styles.lablesWithTextAll]}
                                autoCapitalize = 'none'
                                placeholder={'Name'}
                                //keyboardType="email-address"
                                placeholderTextColor='#CCC5B9'
                                underlineColorAndroid='transparent'
                                onChangeText={(name) => this.setName(name)}
                                onFocus={this.onFocusChange}
                                onBlur={this.onBlurChange}
                            />
                        </View>

                        {/* age and sex */}
                        <View style={styles.twoItemWrapper}>
                            <View style={styles.twoItemLeftWrapper}>
                                <Text style={styles.lablesAll}>Age</Text>
                                <TextInput
                                    style={[styles.nameTextInputWrapper, styles.lablesWithTextAll]}
                                    autoCapitalize = 'none'
                                    placeholder={'Age'}
                                    //keyboardType="email-address"
                                    placeholderTextColor='#CCC5B9'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(age) => this.setAge(age)}
                                    onFocus={this.onFocusChange}
                                    onBlur={this.onBlurChange}
                                />
                            </View>
                            <View style={styles.twoItemRightWrapper}>
                                <Text style={styles.lablesAll}>Sex</Text>
                                <TouchableHighlight 
                                    //onPress={() => {this.setTitle()}}
                                    underlayColor={'#e0dbdb'}
                                    style={[styles.twoItemTextWrapper, {paddingTop:Sizes.wp('4%'), paddingBottom:Sizes.wp('4%')}]}
                                >

                                    {/* <Text style={styles.lablesWithTextAll}>Return hour</Text> */}
                                    <RNPickerSelect
                                        onValueChange={(value) => this.setSexType(value)}
                                        value={this.state.event_type}
                                        items={[
                                            { label: 'Male', value: 'male' },
                                            { label: 'Female', value: 'female' },
                                        ]}
                                        useNativeAndroidPickerStyle={false}
                                        style={{
                                            placeholder: {
                                                
                                            },
                                            headlessAndroidContainer: {
                                                
                                            },
                                            viewContainer: {
                                                
                                            },
                                            inputAndroidContainer: {
                                                
                                            },
                                            inputAndroid:{
                                                fontFamily:Fonts.mainMedium,
                                                fontSize:Sizes.wp('4%'),
                                                paddingLeft:Sizes.wp('4%'),
                                            },
                                            iconContainer:{
                                                backgroundColor:'yellow',
                                                padding:Sizes.wp('4%'),
                                            },
                                            
                                            
                                        }}
                                    />
                                    
                                </TouchableHighlight>
                            </View>
                        </View>

                        {/* bio */}
                        <View style={styles.nameWrapper}>
                            <Text style={styles.lablesAll}>Bio</Text>
                            <TextInput
                                style={[styles.nameTextInputWrapper, styles.lablesWithTextAll, {textAlignVertical:'top',}]}
                                autoCapitalize = 'none'
                                placeholder={'Bio'}
                                numberOfLines={5}
                                multiline={true}
                                //keyboardType="email-address"
                                placeholderTextColor='#CCC5B9'
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => this.setUserBio(value)}
                                onFocus={this.onFocusChange}
                                onBlur={this.onBlurChange}
                            />
                        </View>
                    
                    </View>
                </ScrollView>
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
    mainWrapper: {
        flex:1,
        margin:Sizes.wp('4%'),
    },
    userImageWrapper: {
        alignItems:'center',
        marginLeft:Sizes.wp('10%'), 
        marginRight:Sizes.wp('10%'), 
        marginBottom:Sizes.wp('4%')
    },
    touchableWrapper: {
        height:Sizes.wp('20%'), 
        width:Sizes.wp('20%'),
    },
    userImage: {
        height:Sizes.wp('20%'), 
        width:Sizes.wp('20%'), 
        resizeMode:'cover', 
        borderRadius:Sizes.wp('20%')/2
    },
    userImageChangeText: {
        fontFamily:Fonts.mainMedium, 
        fontSize:Sizes.wp('3.75%'), 
        marginTop:Sizes.wp('2%'),
        color:Colors.secondFontColor,
    },
    nameWrapper: {
        marginBottom:Sizes.wp('2%'),
    },
    lablesAll: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('3.5%'),
        color:Colors.fifthFontColor,
    },
    lablesWithTextAll: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        //paddingLeft:0,
    },
    nameTextInputWrapper: {
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    twoItemWrapper: {
        flexDirection:'row',
        marginBottom:Sizes.wp('2%'),
        alignItems:'center',
    },
    twoItemLeftWrapper: {
        width:'45%',
        marginRight:'5%',
    },
    twoItemTextWrapper: {
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    twoItemRightWrapper: {
        width:'45%',
        marginLeft:'5%',
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

