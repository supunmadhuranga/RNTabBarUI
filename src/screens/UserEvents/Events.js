import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,

} from 'react-native';
import { createStackNavigator, TransitionPresets, HeaderBackButton } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';
import {EvilIcons, Entypo, Feather, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';

import * as ApiMethods from "../../config/Api";

import userImage from '../../../assets/user.png';

class Events extends Component {
    constructor(props) {
        super(props);
        _isMounted = false;
        this.state = {
            eventList:[]
        };
    }

    async componentDidMount() {
        this._isMounted = true;

        this._isMounted && this.getUserEvents();

        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this._isMounted && this.getUserEvents();
        });

    }

    componentWillUnmount() {
        this._isMounted = false;
        //this.unsubscribe();
    }

    getUserEvents = async() => {
        let results = await ApiMethods.fetchData('events');

        if (results) {
            this._isMounted && this.setState({
                eventList: results,
            });
        } else {
            console.log("fetch results error");
        }
       
    }

    viewEvent = (id) => {
        this.props.navigation.navigate("EventView", {eventId:id});
    }

    renderItem = ({ item, index }) => {
        console.log(item);
        return ( 
            <TouchableOpacity 
                onPress={() => {this.viewEvent(item.id)}}
                style={styles.listWrapper}
            >   
                <View style={styles.eventHeaderWrapper}>
                    <View style={styles.titleWrapper}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.eventTitle}>{item.name}</Text>
                    </View>
                    <View style={styles.userImageWrapper}>
                        <Image
                            source={userImage}
                            resizeMode='cover'
                            style={styles.userImage}
                        />
                    </View>
                </View>
                
                <View style={styles.eventDescription}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.commonTextAll}>When referencing the Laravel framework or its components from your application or package.</Text>
                </View>
                
                <View style={styles.eventPlaceWrapper}>
                    <View style={styles.iconWrapper}>
                        <EvilIcons name='location' size={Sizes.wp('8%')} color='#000' style={{margin:-5}} />
                    </View>
                    <View style={styles.placeTextWrapper}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.commonTextAll}>{item.place}</Text>
                    </View>
                    
                </View>
                
                <View style={styles.eventDateTimeWrapper}>
                    
                    <View style={styles.eventDateWrapper}>
                        <View style={styles.iconWrapper}>
                            <EvilIcons name='calendar' size={Sizes.wp('8%')} color='#000' style={{margin:-5}} />
                        </View>
                        <View style={styles.dateTextWrapper}>
                            <Text style={styles.commonTextAll}>{item.start_date}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.eventTimeWrapper}>
                        <View style={styles.iconWrapper}>
                            <EvilIcons name='clock' size={Sizes.wp('8%')} color='#000' style={{margin:-5}} />
                        </View>
                        <View style={styles.timeTextWrapper}>
                            <Text style={styles.commonTextAll}>{item.start_hour}</Text>
                        </View>
                    </View>
                    
                </View>

                <View style={styles.hrLine}/>
                
            </TouchableOpacity>
        );
    }

    render() {
        if (this.state.eventList == null || this.state.eventList.length == 0){
            return (
                <View style={{flex:1, alignItems:'center', marginTop:Sizes.wp('10%')}}>
                    <Feather 
                        name='calendar' 
                        size={Sizes.wp('20%')} 
                        color={Colors.thirdFontColor}
                        style={{marginBottom: Sizes.hp('2.5%')}}
                    />

                    <View style={{marginLeft:Sizes.wp('2%'), marginRight:Sizes.wp('2%'), alignItems:'center', justifyContent: 'center',}}>
                        <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('4.5%'), color:Colors.thirdFontColor}}>No Any Events</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.eventList}
                        //numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    />
                </View>
            );
        }
    }

    
}

const styles = StyleSheet.create({
    container: {
        marginLeft:Sizes.wp('3%'),
        marginRight:Sizes.wp('3%')
    },
    emptyListText: {
        //justifyContent: 'center',
        //textAlign: 'center',
        fontFamily:Fonts.main,
        fontSize: Sizes.wp('3.5%'),
        //color: '#85929E',
        color:'#CCC5B9',
    },
    listWrapper: {
        //height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3,
        height:'auto',
        width:'100%', 
        marginBottom:Sizes.wp('4%'), 
        borderRadius:Sizes.mainItemsRadius, 
        //backgroundColor:'#CCD1D1',
        backgroundColor:'#e0e0e0',
        padding:Sizes.wp('4%'),
    },
    eventHeaderWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:Sizes.wp('1%'), 
    },
    titleWrapper: {
        width:'80%',
        //marginRight:Sizes.wp("5%"),
    },
    eventTitle: {
        fontFamily:Fonts.mainMedium,
        fontSize:Sizes.wp('4.5%'),
        flexWrap:'wrap',
        //padding:Sizes.wp('2%'),
    },
    userImageWrapper: {
        justifyContent:'flex-end',
        //marginLeft:Sizes.wp("4%"),
        //marginRight:Sizes.wp("4%"),
    },
    userImage: {
        height:Sizes.wp('8%'), 
        width:Sizes.wp('8%'),  
        borderRadius:Sizes.wp('8%')/2
    },
    eventDescription: {
        marginBottom:Sizes.wp('1%'), 
    },
    eventPlaceWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:Sizes.wp('1%'),
        paddingBottom:Sizes.wp('1%'),
        marginBottom:Sizes.wp('1%'), 
    },
    iconWrapper: {
        justifyContent:'flex-start',
        //backgroundColor:'yellow',
    },
    placeTextWrapper: {
        marginLeft:Sizes.wp('1.5%'),
    },
    eventDateTimeWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:Sizes.wp('1%'),
        paddingBottom:Sizes.wp('1%'),
        marginBottom:Sizes.wp('1%'), 
    },
    eventDateWrapper: {
        width:'50%',
        flexDirection:'row',
        alignItems:'center',
    },
    dateTextWrapper: {
        marginLeft:Sizes.wp('1.5%'),
    },
    eventTimeWrapper: {
        width:'50%',
        flexDirection:'row',
        alignItems:'center',
    },
    timeTextWrapper: {
        marginLeft:Sizes.wp('1.5%'),
    },
    hrLine: {
        height: 1,
        width: "100%",
        backgroundColor: "#EAEDED",
        marginTop:Sizes.wp('1%'), 
        marginBottom:Sizes.wp('1%'), 
    },
    commonTextAll: {
        fontFamily:Fonts.main,
        fontSize:Sizes.wp('4%'),
        flexWrap:'wrap',
        //paddingLeft:Sizes.wp('2%'),
    },
    // header: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   backgroundColor: 'white'
    // }
})

export default withNavigation(Events);
