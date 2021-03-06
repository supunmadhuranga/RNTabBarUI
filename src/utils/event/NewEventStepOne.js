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
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {Feather, MaterialIcons, Entypo, FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';
import Dialog, { DialogFooter, DialogButton, DialogTitle, SlideAnimation, ScaleAnimation, DialogContent } from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';

import SnackBar from '../../components/rn-snackbar-component/index';
import RBSheet from "../../components/react-native-raw-bottom-sheet";
import Ripple from '../../components/react-native-material-ripple/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import RNPickerSelect from 'react-native-picker-select';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';
//import { TextInput } from "react-native-paper";

import * as PermissionsApi from "../Permissions";
import * as ApiMethods from "../../config/Api";

export default class NewEventStepOne extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            spinner: false,
            event_title:'Enter event name',
            event_desc:'Enter event description',
            event_place:'Enter event place',
            start_date:moment(Date.now()).format('DD/MM/YYYY'),
            return_date:moment(Date.now()).format('DD/MM/YYYY'),
            start_hour:moment(Date.now()).format('LT'),
            return_hour:moment(Date.now()).format('LT'),
            min_age:'',
            max_age:'',
            prople_count:0,
            event_type:'no',

            rbPlaceholder:'Enter event name...',
            isEnabled:false,
            showDatePicker:false,
            showTimePicker:false,
            showTimePicker:false,
            textFiledType:'title',
            dateType:'startdate',
            timeType:'starthour',
            validate:false,
            snackbarVisible:false,
            snackbarMessage:'',
            
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

    setTitle = (value) => {
        this._isMounted && this.setState({
            event_title:value,
        })
    }

    setDescription = (value) => {
        this._isMounted && this.setState({
            event_desc:value,
        })
    }
    
    setPlace = (value) => {
        this._isMounted && this.setState({
            event_place:value,
        })
    }

    closeInput = () => {
        this.Input.close();
    }

    setWriteData = (write) => {

        if (this.state.textFiledType == 'title') {
            this._isMounted && this.setState({
                event_title: write,
            }) 
        }

        if (this.state.textFiledType == 'place') {
            this._isMounted && this.setState({
                event_place: write,
            }) 
        }
            
    }

    /* date picker actions */
    openDatePicker = (type) => {
        if (type == 'startdate') {
            this._isMounted && this.setState({
                showDatePicker:true,
                dateType:'startdate',
            }) 
        }

        if (type == 'returndate') {
            this._isMounted && this.setState({
                showDatePicker:true,
                dateType:'returndate',
            }) 
        }
    }

    onChangeStartDate = (event, selectedDate) => {
        this._isMounted && this.setState({
            showDatePicker:false,
            start_date: moment(selectedDate).format('DD/MM/YYYY'),
        })
    };

    onChangeReturnDate = (event, selectedDate) => {
        this._isMounted && this.setState({
            showDatePicker:false,
            return_date: moment(selectedDate).format('DD/MM/YYYY'),
        })
    };

    /* time picker actions */
    openTimePicker = (type) => {
        if (type == 'starthour') {
            this._isMounted && this.setState({
                showTimePicker:true,
                timeType:'starthour',
            }) 
        }

        if (type == 'returnhour') {
            this._isMounted && this.setState({
                showTimePicker:true,
                timeType:'returnhour',
            }) 
        }
    }

    onChangeStartHour = (event, selectedTime) => {
        console.log(selectedTime);
        this._isMounted && this.setState({
            showTimePicker:false,
            start_hour: moment(selectedTime).format('LT'),
        })
    };

    onChangeReturnHour = (event, selectedTime) => {
        console.log(selectedTime);
        this._isMounted && this.setState({
            showTimePicker:false,
            return_hour: moment(selectedTime).format('LT'),
        })
    };

    setNumberOfPeople = (count) => {
        if (count != '') {
            this._isMounted && this.setState({
                prople_count:count,
            })
        } 
    }

    setEventType = (type) => {

        if (type != '' || type != null) {
            this._isMounted && this.setState({
                event_type:type,
            })
        }
            
    }

    toggleSwitch = (value) => {
        this.setState({
            isEnabled: value,
        })
        if (value) {
           
        }
    }

    validateData = () => {

        let value = true;

        if (this.state.event_title == 'Enter event name' || this.state.event_title == '') {
            value = false;
            //return;
        }

        if (this.state.event_place == 'Enter event place' || this.state.event_place == '') {
            value = false;
            //return;
        }

        this.setState({
            validate: value,
        },
        () => {
            this.NextStep();
        });

    }

    NextStep = () => {

        if (this.state.validate){
            this.props.navigation.navigate("CreateEventStepTwo");
        } else {
            this.showSnackbar('Please fill all fields');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1}} >
                    <View style={styles.mainWrapper}>
                        
                        {/* event title */}
                        <View style={styles.EventTitleWrapper}>
                            <TextInput
                                style={[styles.EventTitle]}
                                autoCapitalize = 'none'
                                placeholder={'Title'}
                                //keyboardType="email-address"
                                placeholderTextColor='#CCC5B9'
                                underlineColorAndroid='transparent'
                                onChangeText={(des) => this.setTitle(des)}
                                onFocus={this.onFocusChange}
                                onBlur={this.onBlurChange}
                            />
                        </View>

                        {/* event description */}
                        <View style={styles.desWrapper}>
                            <Text style={styles.lablesAll}>Description</Text>
                            <TextInput
                                style={[styles.desTextInputWrapper, styles.lablesWithTextAll]}
                                autoCapitalize = 'none'
                                placeholder={'Description'}
                                //keyboardType="email-address"
                                placeholderTextColor='#CCC5B9'
                                underlineColorAndroid='transparent'
                                onChangeText={(des) => this.setDescription(des)}
                                onFocus={this.onFocusChange}
                                onBlur={this.onBlurChange}
                            />
                        </View>

                        {/* event place */}
                        <View style={styles.placeWrapper}>
                            <Text style={styles.lablesAll}>Where</Text>
                            <TextInput
                                style={[styles.placeTextInputWrapper, styles.lablesWithTextAll]}
                                autoCapitalize = 'none'
                                placeholder={'Place'}
                                //keyboardType="email-address"
                                placeholderTextColor='#CCC5B9'
                                underlineColorAndroid='transparent'
                                onChangeText={(place) => this.setPlace(place)}
                                onFocus={this.onFocusChange}
                                onBlur={this.onBlurChange}
                            />
                        </View>
                        
                        {/* event dates */}
                        <View style={styles.twoItemWrapper}>
                            <View style={styles.twoItemLeftWrapper}>
                                <Text style={styles.lablesAll}>Start date</Text>
                                <TouchableHighlight 
                                    onPress={ 
                                        () => { this.openDatePicker('startdate') }
                                    }
                                    underlayColor={'#e0dbdb'}
                                    style={styles.twoItemTextWrapper}
                                >
                                    <Text style={styles.lablesWithTextAll}>{this.state.start_date}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.twoItemRightWrapper}>
                                <Text style={styles.lablesAll}>Return date</Text>
                                <TouchableHighlight 
                                    onPress={ 
                                        () => { this.openDatePicker('returndate') }
                                    }
                                    underlayColor={'#e0dbdb'}
                                    style={styles.twoItemTextWrapper}
                                >
                                    <Text style={styles.lablesWithTextAll}>{this.state.return_date}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                        {/* event time */}
                        <View style={styles.twoItemWrapper}>
                            <View style={styles.twoItemLeftWrapper}>
                                <Text style={styles.lablesAll}>Start hour</Text>
                                <TouchableHighlight 
                                    onPress={ 
                                        () => { this.openTimePicker('starthour') }
                                    }
                                    underlayColor={'#e0dbdb'}
                                    style={styles.twoItemTextWrapper}
                                >
                                    <Text style={styles.lablesWithTextAll}>{this.state.start_hour}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.twoItemRightWrapper}>
                                <Text style={styles.lablesAll}>Return hour</Text>
                                <TouchableHighlight 
                                    onPress={ 
                                        () => { this.openTimePicker('returnhour') }
                                    }
                                    underlayColor={'#e0dbdb'}
                                    style={styles.twoItemTextWrapper}
                                >
                                    <Text style={styles.lablesWithTextAll}>{this.state.return_hour}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                        {/* age of participant */}
                        <View style={styles.participantWrapper}>
                            <Text style={styles.lablesAll}>Age of participant</Text>
                            <View style={styles.threeItemParticipantWrapper}>
                                <View style={styles.minAgeWrapper}>
                                    <Text style={styles.threeItemText}>1</Text>
                                </View>
                                <View style={styles.middleItemWrapper}>
                                    <Text style={styles.threeItemText}>Hello</Text>
                                </View>
                                <View style={styles.maxAgeWrapper}>
                                    <Text style={styles.threeItemText}>10</Text>
                                </View>
                            </View>
                            
                        </View>

                        {/* event type and people count */}
                        <View style={styles.twoItemWrapper}>
                            <View style={styles.twoItemLeftWrapper}>
                                <Text style={styles.lablesAll}>Max people</Text>
                                <TouchableHighlight 
                                    onPress={() => {this.InputNumber.open()}}
                                    underlayColor={'#e0dbdb'}
                                    style={styles.twoItemTextWrapper}
                                >
                                    <Text style={styles.lablesWithTextAll}>{this.state.prople_count}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.twoItemRightWrapper}>
                                <Text style={styles.lablesAll}>Private event</Text>
                                <TouchableHighlight 
                                    //onPress={() => {this.setTitle()}}
                                    underlayColor={'#e0dbdb'}
                                    style={[styles.twoItemTextWrapper, {paddingTop:Sizes.wp('3%'), paddingBottom:Sizes.wp('3%')}]}
                                >

                                    {/* <Text style={styles.lablesWithTextAll}>Return hour</Text> */}
                                    <RNPickerSelect
                                        onValueChange={(value) => this.setEventType(value)}
                                        value={this.state.event_type}
                                        items={[
                                            { label: 'No', value: 'no' },
                                            { label: 'Yes', value: 'yes' },
                                            { label: 'Only followers', value: 'only' },
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
                        
                        {/* join ask */}
                        <View style={styles.joinCheckWrapper}>

                            <View style={[styles.switchItemWrapper,{flexDirection:"row", alignItems:'center'}]}>
                                <View style={styles.switchWrapper}>
                                    <Switch
                                        style={styles.switch}
                                        //trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        trackColor={{ }}
                                        thumbColor={this.state.isEnabled ? Colors.main : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={this.toggleSwitch}
                                        value={this.state.isEnabled}
                                    />
                                </View>
                                <View style={styles.switchTextWrapper}>
                                    <Text style={styles.lablesWithTextAll}>Ask to join my event</Text>
                                </View>
                            </View>
                           
                        </View>

                        {/* next button */}
                        <View style={styles.nextButtonWrapper}>

                            <Ripple
                                style={styles.btnNext}
                                rippleContainerBorderRadius={Sizes.mainItemsRadius}
                                rippleDuration={600}
                                onPress={() => this.validateData()}
                            >
                                <Text style={styles.nextBtnText} >Continue</Text>
                            </Ripple>
                           
                        </View>


                        {this.state.showDatePicker?
                            <DateTimePicker 
                                //showIcon={false}
                                display={"spinner"}
                                value={Date.now()}
                                mode="date"
                                //placeholder="select date"
                                //format="DD-MM-YYYY"
                                //minDate="2016-05-01"
                                //maxDate={moment().format('DD-MM-YYYY')}
                                //maxDate="2050-05-01"
                                //date={new Date()} 
                                onChange={
                                    this.state.dateType == 'startdate'?
                                    (event, date) => {this.onChangeStartDate(event, date)}
                                    : (event, date) => {this.onChangeReturnDate(event, date)} 
                                }    
                            />
                        :null}

                        {this.state.showTimePicker?
                            <DateTimePicker 
                                //showIcon={false}
                                display={"spinner"}
                                value={Date.now()}
                                mode="time"
                                //placeholder="select date"
                                //minDate="2016-05-01"
                                //maxDate={moment().format('DD-MM-YYYY')}
                                //maxDate="2050-05-01"
                                //date={new Date()} 
                                onChange={
                                    this.state.timeType == 'starthour'?
                                    (event, date) => {this.onChangeStartHour(event, date)}
                                    : (event, date) => {this.onChangeReturnHour(event, date)} 
                                }    
                            />
                        :null}

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

                        {/* NumberInput bottom modal */}
                        <RBSheet
                            ref={ref => {
                                this.InputNumber = ref;
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
                                        keyboardType="number-pad"
                                        autoFocus 
                                        placeholder="Enter number of people"
                                        underlineColorAndroid='transparent'
                                        onChangeText={(count) => this.setNumberOfPeople(count)} 

                                    />
                                    <TouchableOpacity onPress={ ()=>{this.InputNumber.close()} }>
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

                    <SnackBar
                        visible={this.state.snackbarVisible}
                        message={this.state.snackbarMessage}
                        actionHandler={() => {
                            console.log("snackbar button clicked!")
                        }}
                        action=""
                        messageStyle={styles.snackbarMessage}
                        //autoHidingTime={300}
                    />

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
    EventTitleWrapper: {
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
        marginBottom:Sizes.wp('2%'),
    },
    EventTitle: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('5%'),
        padding:Sizes.wp('4%'),
        //paddingLeft:Sizes.wp('2%'),
    },
    desWrapper: {
        marginBottom:Sizes.wp('2%'),
    },
    desTextInputWrapper: {
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    placeWrapper: {
        marginBottom:Sizes.wp('2%'),
    },
    lablesAll: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('3.5%'),
        color:'#CCD1D1',
    },
    placeTextInputWrapper: {
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    lablesWithTextAll: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        //paddingLeft:0,
    },
    placeText: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },
    twoItemWrapper: {
        flexDirection:'row',
        marginBottom:Sizes.wp('2%'),
        alignItems:'center',
    },
    datesWrapper: {
        flexDirection:'row',
        marginBottom:Sizes.wp('2%'),
        alignItems:'center',
        //justifyContent:'space-between',
    },
    twoItemLeftWrapper: {
        width:'45%',
        marginRight:'5%',
    },
    startDateWrapper: {
        width:'45%',
        marginRight:'5%',
    },
    twoItemTextWrapper: {
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    // startDateTextWrapper: {
    //     backgroundColor:'yellow',
    //     borderRadius:Sizes.mainItemsRadius,
    // },
    startDateText: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },
    twoItemRightWrapper: {
        width:'45%',
        marginLeft:'5%',
    },
    endDateWrapper: {
        width:'45%',
        marginLeft:'5%',
    },
    // endDateTextWrapper: {
    //     backgroundColor:'yellow',
    //     borderRadius:Sizes.mainItemsRadius,
    // },
    endDateText: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
        paddingLeft:0,
    },
    timeWrapper: {
        flexDirection:'row',
        marginBottom:Sizes.wp('2%'),
        alignItems:'center',
        //justifyContent:'space-between',
    },
    startTimeWrapper: {
        width:'45%',
        marginRight:'5%',
    },
    // startTimeTextWrapper: {
    //     backgroundColor:'yellow',
    //     borderRadius:Sizes.mainItemsRadius,
    // },
    endTimeWrapper: {
        width:'45%',
        marginLeft:'5%',
    },
    // endTimeTextWrapper: {
    //     backgroundColor:'yellow',
    //     borderRadius:Sizes.mainItemsRadius,
    // },
    participantWrapper: {
        marginBottom:Sizes.wp('2%'),
    },
    threeItemParticipantWrapper: {
        flexDirection:'row',
        marginBottom:Sizes.wp('2%'),
        alignItems:'center',
        justifyContent:'space-between'
    },
    minAgeWrapper: {
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    middleItemWrapper: {
        alignItems:'center',
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    maxAgeWrapper: {
        alignItems:'center',
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    threeItemText: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4%'),
        padding:Sizes.wp('4%'),
    },
    joinCheckWrapper: {
        marginTop:Sizes.wp('2%'),
        marginBottom:Sizes.wp('2%'),
    },
    switchItemWrapper: {
        backgroundColor:Colors.mainFieldColor,
        borderRadius:Sizes.mainItemsRadius,
    },
    switchWrapper: {
        paddingLeft:Sizes.wp('4%'),
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

    dateHeaderContainer: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateHeaderButton: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    dateHeaderButtonCancel: {
        fontSize: 18,
        color: "#666",
        fontWeight: "400"
    },
    dateHeaderButtonDone: {
        fontSize: 18,
        color: "#006BFF",
        fontWeight: "500"
    },
    snackbarMessage:{
        fontFamily:Fonts.main, 
        fontSize:Sizes.wp('3.75%'), 
        color:Colors.white,
        paddingBottom:Sizes.wp('6%'),
        paddingTop:Sizes.wp('6%'),
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'green',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });