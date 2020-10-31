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
        uri: 'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY'
    },
    {
        uri: 'https://i.picsum.photos/id/296/200/200.jpg?hmac=y-H33xJ0Tpm9muoZO3ZMb5kXpNPG1mptQ9HBmpjCc8A'
    },
    {
        uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
    },
    {
        uri: 'https://i.picsum.photos/id/296/200/200.jpg?hmac=y-H33xJ0Tpm9muoZO3ZMb5kXpNPG1mptQ9HBmpjCc8A'
    },
    {
        uri: 'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY'
    },

];

export default class NewEventStepTwo extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        const itemSize = (Sizes.wp('92%') - 60) / 3
        this.state = {
            spinner: false,
            eventTitle:'Enter event name',
            rbPlaceholder:'Enter event name...',
            isEnabled:false,
            galleryData: [],
            itemSize,
            photos:[],
            totalPosts: gallery.length,
        };
    }

    /* navigation header */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'New Event',
            headerRight: () => (
                <View style={{flex:1, justifyContent:'center', alignItems:"flex-end", height:Sizes.wp('5%'), marginRight:Sizes.wp('4%')}}>
                    <Text style={{alignSelf:'center', fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), color:'#CCD1D1'}}>Step 2 of 3</Text>
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

        // this._isMounted && this.setState({
        //     galleryData: gallery,
        // });
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
                            borderRadius: Sizes.mainItemsRadius,
                        }}
                        source={{uri:item.uri}}

                    />
                </TouchableOpacity>
                
                
            </View>
        );
    }

    openPhotosMenu = () => {
        this.RBSheetTakePhotos.open();
    }

    /* Take phots menu */
    TakePhotosMenu = () => {
        return (
            <>
                <View style={{}}>
                    <Text style={styles.popupTextTitle}>Choose Option</Text>
                </View>

                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#EAEDED",
                    }}
                />

                <TouchableOpacity onPress={() => {this.selectOption(0)}} underlayColor={'#e0dbdb'} style={{}}>
                    <Text style={styles.popupText}>Select Photo</Text>
                </TouchableOpacity>

                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#EAEDED",
                    }}
                />

                <TouchableOpacity onPress={() => {this.selectOption(1)}} underlayColor={'#e0dbdb'} style={{}}>
                    <Text style={styles.popupText}>Take Photo</Text>
                </TouchableOpacity>

                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#EAEDED",
                    }}
                />
                <View style={{}}>
                    <Text style={styles.popupText}></Text>
                </View>
            </>
        );
        
    }

    selectOption = async(option) => {
        this.RBSheetTakePhotos.close();

        let uri = null;
        if (option === 0) {
            uri = await PermissionsApi._selectPhoto();
        } else {
            uri = await PermissionsApi._takePhoto();
        }
        
        if (uri) {
            console.log(uri);
            let obj = {uri:uri};
            const newArray = this.state.photos.slice(); // Create a copy
            newArray.push(obj); // Push the object
            this._isMounted && this.setState({
                photos:newArray,
            });
        }
    }

    NextStep = () => {
        this.props.navigation.navigate("CreateEventStepThree");
    }

    render() {
        console.log(this.state.photos);
        return (
            <View style={styles.container}>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >
                    <View style={styles.mainWrapper}>

                        {/* page title */}
                        <View style={styles.PageTitleWrapper}>
                            <View>
                                <Text style={styles.PageTitle}>Add photos</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={()=> this.openPhotosMenu()} 
                                    style={styles.addIcon}
                                >
                                    <AntDesign name='pluscircle' size={Sizes.wp('10%')} color='#000' />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {this.state.photos.length > 0?
                            <View style={styles.photoListWrapper}>
                                <FlatList
                                    data={this.state.photos}
                                    numColumns={3}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this.renderItem}
                                />
                            </View>
                        :
                            <View style={styles.emptyItemWrapper}>
                                <Text style={styles.emptyText}>No Images added yet</Text>
                            </View>
                        }

                        {/* next button */}
                        <View style={styles.nextButtonWrapper}>

                            <Ripple
                                style={styles.btnNext}
                                rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                rippleDuration={600}
                                onPress={() => this.NextStep()}
                            >
                                <Text style={styles.nextBtnText} >Continue</Text>
                            </Ripple>
                           
                        </View>

                        {/* bottom menu start */}
                        <RBSheet
                            ref={ref => {
                                this.RBSheetTakePhotos = ref;
                            }}
                            //height={Sizes.wp('50%')}
                            //minClosingHeight={}
                            openDuration={700}
                            closeOnDragDown={true}
                            dragFromTopOnly={true}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 'auto', 
                                    maxHeight: 300,
                                    borderTopLeftRadius:15,
                                    borderTopRightRadius:15,
                                }
                            }}
                        >
                            

                            <this.TakePhotosMenu />
                            {/* <YourOwnComponent /> */}
                        </RBSheet>
                        {/* bottom menu ends */}

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
    emptyItemWrapper: {
        justifyContent:'center'
    },
    emptyText: {
        alignSelf:'center',
        fontFamily:Fonts.main,
        fontSize:Sizes.wp('5%'),
        color:Colors.sideBarIcon,
    },
    photoListWrapper: {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 0.5,
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
    popupText: {
        fontFamily:Fonts.main,
        fontSize:Sizes.wp('5%'),
        textAlign: "center",
        color:"#575757",
        marginTop:Sizes.wp('4%'),
        marginBottom:Sizes.wp('4%'),
    },
    popupTextTitle: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('5%'),
        textAlign: "center",
        color:"#575757",
        marginTop:Sizes.wp('4%'),
        marginBottom:Sizes.wp('4%'),
    }
});
