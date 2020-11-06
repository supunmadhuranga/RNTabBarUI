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
import {Feather, SimpleLineIcons, Ionicons, MaterialCommunityIcons, AntDesign} from 'react-native-vector-icons';

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

class Photos extends Component {
    constructor(props) {
        super(props);
        _isMounted = false;
        const itemSize = (Sizes.deviceWidth - 12) / 3

        this.state = {
            galleryData: null,
            itemSize,
            totalPosts: gallery.length,

        };
        
    }

    async componentDidMount() {
        this._isMounted = true;

        /*set navigation header function*/
        // this.props.navigation.setParams({
        //     _postFeed: this.postFeed
        // });

        this._isMounted && this.getUserPosts();

        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this._isMounted && this.getUserPosts();
        });

    }

    getUserPosts = async() => {
        let results = await ApiMethods.fetchUserPosts();

        if (results) {
            this._isMounted && this.setState({
                galleryData: results,
            });
        } else {
            console.log("fetch results error");
        }
        
        
    }

    componentWillUnmount() {
        this._isMounted = false;
        //this.unsubscribe();
    }

    addPost = async() => {
        //this.props.navigation.navigate("selectPhoto");
    }

    renderItem = ({ item, index }) => {
        
        return (
            <View style={{}}>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate("UserPostsScreen", {postIndex:index})}>
                    <Image
                        //resizeMode='cover'
                        style={{
                            width: this.state.itemSize,
                            height: this.state.itemSize,
                            margin: 1.5
                        }}
                        source={{uri:item.path}}

                    />
                </TouchableOpacity>
                
                
            </View>
        );
    }

    render() {

        if (this.state.galleryData == null || this.state.galleryData.length == 0){
            return (
                <View style={{flex:1, alignItems:'center', marginTop:Sizes.wp('10%')}}>
                    <Feather 
                        name='camera' 
                        size={Sizes.wp('20%')} 
                        color={Colors.thirdFontColor}
                        style={{marginBottom: Sizes.hp('2.5%')}}
                    />

                    <View style={{marginLeft:Sizes.wp('2%'), marginRight:Sizes.wp('2%'), alignItems:'center', justifyContent: 'center',}}>
                        <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('4.5%'), color:Colors.thirdFontColor}}>No Posts Yet</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.images}>
                    {/* <View style={{}}>
                        <TouchableOpacity 
                            onPress={() => alert('add functionality to open')}
                            style={{width: this.state.itemSize, height: this.state.itemSize, justifyContent:'center', alignItems:'center'}}
                        >
                            
                            <SimpleLineIcons name={"plus"} size={Sizes.wp('15%')} style={{ }} color={"#555555"} />
                            <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%'), color:"#555555" }}>New</Text>
                        </TouchableOpacity>
                    </View> */}
                    <FlatList
                        data={this.state.galleryData}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    />
                </View>
            );
        }
    }

    // render() {
    //     return (
    //         <ScrollView showsVerticalScrollIndicator={false} style={[{ flex:1, backgroundColor: '' }]}>
        
    //             {/* first row */}
    //             <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft:Sizes.wp('3%'), marginTop:Sizes.wp('4%'), marginRight:Sizes.wp('3%'), marginBottom:Sizes.wp('4%'), justifyContent:'space-between'}}>
    //                 <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
    //                 </View>

    //                 <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
    //                 </View>

    //                 <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
    //                 </View>
                    
    //             </View>

    //             <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft:Sizes.wp('3%'), marginRight:Sizes.wp('3%'), marginBottom:Sizes.wp('4%'), justifyContent:'space-between'}}>
    //                 <View style={{height:Sizes.wp('50%'), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
    //                 </View>

    //                 <View style={{justifyContent:'space-between'}}>

    //                     <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:Sizes.wp('60%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                            
    //                     </View>
                        
    //                     <View style={{flexDirection:'row', justifyContent:'space-between', }}>
    //                         <View style={{height: Sizes.wp('46%') - ((Sizes.wp('100%') - Sizes.wp('20%'))  / 3), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                                
    //                         </View>

    //                         <View style={{height: Sizes.wp('46%') - ((Sizes.wp('100%') - Sizes.wp('20%'))  / 3), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                                
    //                         </View>
    //                     </View>

    //                 </View>
                    
    //             </View>

    //         </ScrollView>
    //     );
    // }
}

const styles = StyleSheet.create({
    images: {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 0.5,
    },
    emptyListText: {
        //justifyContent: 'center',
        //textAlign: 'center',
        fontFamily:Fonts.main,
        fontSize: Sizes.wp('3.5%'),
        //color: '#85929E',
        color:'#CCC5B9',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white'
    }
})

export default withNavigation(Photos);
