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
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {MaterialIcons, Entypo, FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';
import Dialog, { DialogFooter, DialogButton, DialogTitle, SlideAnimation, ScaleAnimation, DialogContent } from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';

import RBSheet from "../../components/react-native-raw-bottom-sheet";

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';
//import { TextInput } from "react-native-paper";

import * as PermissionsApi from "../Permissions";
import * as ApiMethods from "../../config/Api";

export default class Create extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            spinner: false,
            eventTitle:'Enter event name',
            rbPlaceholder:'Enter event name...',
        };
    }

    /* navigation header */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'New Event',
            headerRight: () => (
                <View style={{flex:1, justifyContent:'center', alignItems:"flex-end", height:Sizes.wp('5%'), marginRight:Sizes.wp('4%')}}>
                    <Text style={{alignSelf:'center', fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), color:'#CCD1D1'}}>Step 1 of 3</Text>
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

        /*set navigation header function*/
        // this.props.navigation.setParams({
        //     _postFeed: this.postFeed
        // });

        //this._isMounted && this.getUserData();

    }

    componentWillUnmount() {
        this._isMounted = false;
        //this.unsubscribe();
    }

    setTitle = () => {
        this.Input.open();
    }

    closeInput = () => {
        this.Input.close();
    }

    setWriteData = (write) => {
        this._isMounted && this.setState({
            eventTitle: write,
        }) 
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >
                    <View style={styles.mainWrapper}>
                        
                        {/* event title */}
                        <TouchableHighlight 
                            onPress={() => {this.setTitle()}}
                            underlayColor={'#e0dbdb'}
                            style={styles.EventTitleWrapper}
                        >
                            <Text style={styles.EventTitle}>{this.state.eventTitle}</Text>
                        </TouchableHighlight>

                        {/* event place */}
                        <View style={styles.placeWrapper}>
                            <Text style={styles.lablesAll}>Where</Text>
                            <TouchableHighlight 
                                onPress={() => {this.setTitle()}}
                                underlayColor={'#e0dbdb'}
                                style={styles.placeTextWrapper}
                            >
                                <Text style={styles.lablesWithTextAll}>Sydney</Text>
                            </TouchableHighlight>
                        </View>
                        
                        {/* event dates */}
                        <View style={styles.datesWrapper}>
                            <View style={styles.startDateWrapper}>
                                <Text style={styles.lablesAll}>Start date</Text>
                                <TouchableHighlight 
                                    onPress={() => {this.setTitle()}}
                                    underlayColor={'#e0dbdb'}
                                    style={styles.startDateTextWrapper}
                                >
                                    <Text style={styles.lablesWithTextAll}>Start date</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.endDateWrapper}>
                                <Text style={styles.lablesAll}>End date</Text>
                                <TouchableHighlight 
                                    onPress={() => {this.setTitle()}}
                                    underlayColor={'#e0dbdb'}
                                    style={styles.endDateTextWrapper}
                                >
                                    <Text style={styles.lablesWithTextAll}>End date</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                        <Text> start hour </Text>
                        <Text> return hour </Text>
                        <Text> age of participant </Text>
                        <Text> max people </Text>
                        <Text> private event </Text>
                        <Text> Ask to join my event </Text>
                        <Text> Continue </Text>

                        {/* TextInput bottom modal */}
                        <RBSheet
                            ref={ref => {
                                this.Input = ref;
                            }}
                            //height={60}
                            animationType="none"
                            openDuration={200}
                            customStyles={{
                                wrapper: { backgroundColor: "transparent" },
                                container: {
                                    //justifyContent: "center",
                                    //alignItems: "center",
                                    height: 'auto', 
                                    maxHeight: 300,
                                    //borderTopLeftRadius:15,
                                    //borderTopRightRadius:15,
                                }
                            }}
                        >
                            <View style={styles.rbInputContainer}>
                                {/* <MaterialIcons name="event-note" style={styles.rbInputIcon} /> */}
                                {/* <MaterialIcons name="tag-faces" style={styles.inputIcon} /> */}
                                <View style={styles.rbInputTextWrapper}>
                                    <TextInput 
                                        style={styles.rbInputText} 
                                        autoFocus 
                                        placeholder={this.state.rbPlaceholder}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(write) => this.setWriteData(write)} 

                                    />
                                    <TouchableOpacity onPress={ ()=>{this.closeInput()} }>
                                        <Text style={styles.rbDoneText}>Done</Text>
                                    </TouchableOpacity>
                                    {/* <MaterialIcons name="tag-faces" /> */}
                                </View>
                                {/* <MaterialIcons
                                    name="send"
                                    style={[styles.inputIcon, styles.inputIconSend]}
                                    onPress={() => this.Input.close()}
                                /> */}
                            </View>
                        </RBSheet>
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
        margin:Sizes.wp('4%'),
    },
    EventTitleWrapper: {
        backgroundColor:'yellow',
        borderRadius:Sizes.mainItemsRadius,
        marginBottom:Sizes.wp('2%'),
    },
    EventTitle: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('5%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },
    placeWrapper: {
        marginBottom:Sizes.wp('2%'),
    },
    lablesAll: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('3.5%'),
        color:'#CCD1D1',
    },
    placeTextWrapper: {
        backgroundColor:'yellow',
        borderRadius:Sizes.mainItemsRadius,
    },
    lablesWithTextAll: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },
    placeText: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },
    datesWrapper: {
        flexDirection:'row',
        marginBottom:Sizes.wp('2%'),
        alignItems:'center',
        //justifyContent:'space-between',
    },
    startDateWrapper: {
        width:'45%',
        marginRight:'5%',
    },
    startDateTextWrapper: {
        backgroundColor:'yellow',
        borderRadius:Sizes.mainItemsRadius,
    },
    startDateText: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },
    endDateWrapper: {
        width:'45%',
        marginLeft:'5%',
    },
    endDateTextWrapper: {
        backgroundColor:'yellow',
        borderRadius:Sizes.mainItemsRadius,
    },
    endDateText: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },

    rbInputContainer: {
        borderTopWidth: 0.5,
        borderTopColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    rbInputIcon: {
        fontSize: Sizes.wp('7%'),
        color: "#666",
        marginHorizontal: Sizes.wp('2%')
    },
    rbInputTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginRight: Sizes.wp('2%'),
        borderRadius: Sizes.mainItemsRadius,
        backgroundColor: "#f1f1f1",
        padding: Sizes.wp('4%'),

    },
    rbInputText: {
        flex: 1,
        fontSize: Sizes.wp('3.75%'),
        fontFamily:Fonts.main,
        //height: 36,
        //marginHorizontal: 10
    },
    rbDoneText: {
        fontSize: Sizes.wp('4%'),
        fontFamily:Fonts.mainMedium,
        color: "#006BFF",
        paddingLeft:Sizes.wp('4%'),
        //paddingRight:Sizes.wp('%'),
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
