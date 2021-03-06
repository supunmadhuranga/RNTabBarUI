import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ScrollView,
    Switch,
    FlatList,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import firebase from 'firebase';
import {MaterialIcons, Entypo, FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';
import Dialog, { DialogFooter, DialogButton, DialogTitle, SlideAnimation, ScaleAnimation, DialogContent } from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';

import RBSheet from "../../components/react-native-raw-bottom-sheet";
import Ripple from '../../components/react-native-material-ripple/index';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';
//import { TextInput } from "react-native-paper";

import * as PermissionsApi from "../Permissions";
import * as ApiMethods from "../../config/Api";

const gallery = [
    {
        uri: 'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY',
        uid:'',
        username:'',
    },
    {
        uri: 'https://i.picsum.photos/id/296/200/200.jpg?hmac=y-H33xJ0Tpm9muoZO3ZMb5kXpNPG1mptQ9HBmpjCc8A',
        uid:'',
        username:'',
    },
    {
        uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        uid:'',
        username:'',
    },
    {
        uri: 'https://i.picsum.photos/id/296/200/200.jpg?hmac=y-H33xJ0Tpm9muoZO3ZMb5kXpNPG1mptQ9HBmpjCc8A',
        uid:'',
        username:'',
    },
    {
        uri: 'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY',
        uid:'',
        username:'',
    },
    {
        uri: 'https://i.picsum.photos/id/296/200/200.jpg?hmac=y-H33xJ0Tpm9muoZO3ZMb5kXpNPG1mptQ9HBmpjCc8A',
        uid:'',
        username:'',
    },
    {
        uri: 'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY',
        uid:'',
        username:'',
    },
    {
        uri: 'https://i.picsum.photos/id/296/200/200.jpg?hmac=y-H33xJ0Tpm9muoZO3ZMb5kXpNPG1mptQ9HBmpjCc8A',
        uid:'',
        username:'',
    },
    {
        uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        uid:'',
        username:'',
    },
    {
        uri: 'https://i.picsum.photos/id/296/200/200.jpg?hmac=y-H33xJ0Tpm9muoZO3ZMb5kXpNPG1mptQ9HBmpjCc8A',
        uid:'',
        username:'',
    },

];

export default class NewEventStepThree extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        const itemSize = (Sizes.wp('92%') - 80) / 4;
        this.state = {
            spinner: false,
            uid: firebase.auth().currentUser.uid,
            eventTitle:'Enter event name',
            rbPlaceholder:'Enter event name...',
            isEnabled:false,
            galleryData: [],
            itemSize,
            peoples:[],
            totalPosts: gallery.length,
        };
    }

    /* navigation header */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'New Event',
            headerRight: () => (
                <View style={{flex:1, justifyContent:'center', alignItems:"flex-end", height:Sizes.wp('5%'), marginRight:Sizes.wp('4%')}}>
                    <Text style={{alignSelf:'center', fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), color:'#CCD1D1'}}>Step 3 of 3</Text>
                </View>
            ),

            // headerRight: () => ( 
                
            //     <View style={{flexDirection:'row'}}>
            //         <TouchableOpacity onPress={navigation.getParam('_postFeed')} style={{flex:1, justifyContent:'center', alignItems:"center", height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('4%')}}>
            //             <Text style={{alignSelf:'center', fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('4.5%'), }}>Post</Text>
            //         </TouchableOpacity>
            //     </View>
            // ),
            
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

        this._isMounted && this.getUserPosts();

    }

    componentWillUnmount() {
        this._isMounted = false;
        //this.unsubscribe();
    }

    getUserPosts = async() => {
        //let results = await ApiMethods.fetchUserPosts();

        // if (results) {
        //     this._isMounted && this.setState({
        //         galleryData: results,
        //     });
        // } else {
        //     console.log("fetch results error");
        // } 

        this._isMounted && this.setState({
            galleryData: gallery,
        });
    }

    AddNewEvent = async() => {
        let data_obj = {
            uid:this.state.uid,
            name:'Test Event',
            place:'Sydney',
            start_date:'19/05/2020',
            return_date:'19/05/2020',
            start_hour:'10.00.00 AM',
            return_hour:'10.00.00 AM',
            min_age:'16',
            max_age:'36',
            people_count:'200',
            type:'public',
            request:'yes'
        }

        let result = await ApiMethods.AddNewData('events', data_obj);
    }

    renderItem = ({ item, index }) => {
        
        return (
            <View style={{}}>
                
                <TouchableOpacity style={styles.peoplesWrapper}>
                    <Image
                        //resizeMode='cover'
                        style={{
                            width: this.state.itemSize,
                            height: this.state.itemSize,
                            margin: 10,
                            marginBottom:0,
                            borderRadius: this.state.itemSize/2,
                        }}
                        source={{uri:item.uri}}

                    />
                    <Text style={styles.peopleName}>Ghost</Text>
                </TouchableOpacity>
                
                
            </View>
        );
    }

    NextStep = () => {
        this.AddNewEvent();
        //this.props.navigation.navigate("CreateEventStepThree");
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >
                    <View style={styles.mainWrapper}>

                        {/* page title */}
                        <View style={styles.PageTitleWrapper}>
                            <View>
                                <Text style={styles.PageTitle}>Add people</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.addIcon}>
                                    <AntDesign name='pluscircle' size={Sizes.wp('10%')} color='#000' />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {this.state.galleryData.length > 0?
                            <View style={styles.peoplesListWrapper}>
                                <FlatList
                                    data={this.state.galleryData}
                                    numColumns={4}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this.renderItem}
                                />
                            </View>
                        :
                            <View style={styles.emptyItemWrapper}>
                                <Text style={styles.emptyText}>No Images added yet</Text>
                            </View>
                        }

                        {/* <View style={styles.peoplesListWrapper}>
                            <FlatList
                                data={this.state.galleryData}
                                numColumns={4}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderItem}
                            />
                        </View> */}

                        {/* next button */}
                        <View style={styles.nextButtonWrapper}>

                            <Ripple
                                style={styles.btnNext}
                                rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                rippleDuration={600}
                                onPress={() => this.NextStep()}
                            >
                                <Text style={styles.nextBtnText} >Done</Text>
                            </Ripple>
                           
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
        justifyContent: "space-between"
    },
    PageTitleWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        //backgroundColor:'yellow',
        borderRadius:Sizes.mainItemsRadius,
        marginBottom:Sizes.wp('2%'),
    },
    PageTitle: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('5%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },
    addIcon: {
        flex:1, justifyContent:'center',
        height:Sizes.wp('5%'), 
        width:Sizes.wp('10%'), 
        marginRight:Sizes.wp('0%')
    },
    peoplesListWrapper: {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 0.5,
    },
    peoplesWrapper: {
        alignItems:'center',
        //margin:Sizes.wp('2.5%'),
        //marginRight:Sizes.wp('2.5%'),
        //marginBottom:Sizes.wp('2.5%'),
    },
    peopleName: {
        fontFamily:Fonts.main, 
        fontSize:Sizes.wp('3.2%'),
        marginTop:Sizes.wp('1.2%'),
    },

    nextButtonWrapper: {
        width: '100%',
        marginTop:Sizes.wp('5%'),
        //position: 'absolute',
        alignSelf:'center',
        bottom:0,
    },
    btnNext: {
        width:"100%",
        alignSelf: 'center',
        borderRadius: Sizes.mainItemsRadius,
        backgroundColor:'#2196f3',
        justifyContent: 'center',
    },
    nextBtnText: {
        alignSelf:'center',
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
        color:Colors.white,
    },
});
