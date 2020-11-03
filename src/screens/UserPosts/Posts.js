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

import userImage from '../../../assets/world.png';

import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';
import {Feather, Entypo, EvilIcons, FontAwesome5, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';
import moment from "moment";

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

export default class UserPosts extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            feedData: null,
        };

        const { params } = this.props.navigation.state;
        global.postIndex = params ? params.postIndex : null;
    }

    /* navigation header */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Posts',
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

    getUserPosts = async() => {
        let results = await ApiMethods.fetchUserPosts();

        if (results) {
            this._isMounted && this.setState({
                feedData: results,
            });
        } else {
            console.log("fetch results error");
        }
    }

    // renderItem = ({ item, index }) => {
    //     console.log(item);
        
    //     return (
    //         <View style={{}}>
                
    //             <TouchableOpacity onPress={() => this.props.navigation.navigate("UserPostsScreen")}>
    //                 <Image
    //                     //resizeMode='cover'
    //                     style={{
    //                         width: this.state.itemSize,
    //                         height: this.state.itemSize,
    //                         margin: 1.5
    //                     }}
    //                     source={{uri:item.uri}}

    //                 />
    //             </TouchableOpacity>
                
                
    //         </View>
    //     );
    // }

    renderItem = ({item, index}) => {
        let feedTime = moment(item.date_updated).startOf('hour').fromNow();
        console.log(item)
        return (
            <View key={index} style={styles.feeds}>
                <View style={styles.headerWrapper}>
                    <View style={styles.headerLeftWrapper}>
                        <Image
                            resizeMode='cover'
                            style={styles.profileThumb}
                            source={{uri:"https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY"}}
                            //source={userImage}
                        />
                        <Text style={styles.headerUserName}>Ghost</Text>
                    </View>
                    <Entypo name='dots-three-vertical' size={Sizes.wp('5%')} style={styles.dotIcon} color='#000' />
                </View>
                <View>
                    <Image
                        //resizeMode='contain'
                        style={styles.feedImage}
                        source={{uri:item.path}}
                        //resizeMode="contain"
                    />
                </View>
                <View style={styles.feedImageFooter}>
                    <Feather name='heart' size={Sizes.wp('7%')} style={[styles.dotIcon], {paddingRight:15}} color='#000' />
                    <Feather name='message-circle' size={Sizes.wp('7%')} style={styles.dotIcon} color='#000' />
                </View>
                <View style={{height:1, backgroundColor:Colors.separator}} />
                <View style={styles.feedLikesData}>
                    <Text style={styles.footerPostLikesCount}>500</Text>
                    <Text style={styles.footerPostLikes}>Likes</Text>
                </View>
                <View style={styles.feedUserData}>
                    <Text style={styles.footerUserName}>Ghost</Text>
                    <Text style={styles.footerUserCaption}>{item.caption}</Text>
                </View>
                <View style={styles.feedTime}>
                    <Text style={styles.time}>{feedTime}</Text>
                </View>
            </View>
        );
    }

    getItemLayout(data, index) {
        console.log(data);
        return (
            {
                length: 50,
                offset: 50 * index,
                index
            }    
        );
    }

    render() {
        return(
            <View>
                <FlatList
                    data={this.state.feedData}
                    ref={(ref) => { this.flatListRef = ref; }}
                    //initialScrollIndex={postIndex}
                    //getItemLayout={(data, index) => this.getItemLayout(data, index)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    feeds: {
        flex:1,
        display:'flex',
        //paddingHorizontal: 0.5,
        backgroundColor:Colors.white,
    },
    headerWrapper: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
    },
    headerLeftWrapper: {
        flexDirection:'row',
        alignItems:'center',
    },
    headerUserName: {
        fontFamily:Fonts.mainMedium, 
        fontSize:Sizes.wp('3.7%'),
        paddingLeft:Sizes.wp('2%'),
    },
    dotIcon: {
        //opacity:0.5,
    },
    profileThumb: {
        width:30,
        height:30,
        borderRadius:30,
    },
    feedImage: {
        width:'100%',
        aspectRatio: 1,
        //height:'50%',
    },
    feedImageFooter: {
        flexDirection:'row',
        padding:10,
    },
    feedLikesData:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
    },
    footerPostLikesCount: {
        fontFamily:Fonts.main,
    },
    footerPostLikes: {
        fontFamily:Fonts.main,
        paddingLeft:Sizes.wp('1%'),
    },
    feedUserData: {
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        paddingTop:0,
        paddingBottom:5,
    },
    footerUserName: {
        fontFamily:Fonts.mainMedium, 
        fontSize:Sizes.wp('3.7%'),
    },
    footerUserCaption: {
        flexWrap:'wrap',
        fontFamily:Fonts.main,
        fontSize:Sizes.wp('3.7%'),
        paddingLeft:Sizes.wp('1%'),
    },
    feedTime: {
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        paddingBottom:10,
    },
    time: {
        fontFamily:Fonts.main,
        fontSize:Sizes.wp('3%'),
        color:Colors.sideBarIcon,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white'
    }
})
