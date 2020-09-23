import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Platform, 
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppPreLoader from "../components/AppPreLoader";
import HorizontalSwipeList from '../components/HorizontalSwipeList';

/* sample image list */
const ENTRIES1 = [
    {
        title: 'Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/lceHsT6l.jpg'
    }
];

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //uid: '',
            isLoading: true,
        };

        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    /* navigation header bar */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Explore',
            headerRight: () => ( 
                <View style={{flex:1, justifyContent:'center', height:Sizes.wp('5%'), width:Sizes.wp('10%'), marginRight:Sizes.wp('0%')}}>
                    <TouchableOpacity 
                        //onPress={() => this.followFunction()}
                        style={{height:Sizes.wp('10%'), width:Sizes.wp('10%'), justifyContent: 'center', alignItems:'center', borderRadius:Sizes.wp('10%')/2 }}>
                        <Icon name='search' size={Sizes.wp('5%')} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            ),
            
            headerStyle: {
                backgroundColor:Colors.white,
                elevation: 0,
                shadowOpacity: 0,
            },
            headerTitleStyle: {
                textAlign: 'left',
                fontSize:Sizes.wp('6%'),
                fontFamily:Fonts.mainBold,
                fontWeight: '200',
            }
             
        };  
    };

    componentDidMount() {
        //this.checkSession();
        this.setState({ 
            isLoading: false,
        });
    }

    // checkSession = async() => {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             this.props.navigation.navigate('App');
    //         } else {
    //             this.props.navigation.navigate('Auth');
    //         }
    //     });
    // };

    render() {

        if (!this.state.isLoading) {
            return (
                <View style={{flex:1, backgroundColor:Colors.white}}>
                    
                    <View style={{flex:1, justifyContent:'space-between'}}>

                        {/* first swipe list */}
                        <View>
                            <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginTop:Sizes.wp('4%'), marginBottom:Sizes.wp('2%')}}>
                                <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>Friends</Text>
                            </View>

                            <View>
                            {/* dynamic swipe list */}
                                <HorizontalSwipeList 
                                    dataArray={ENTRIES1}
                                    listType='image'
                                />
                            </View>
                        </View>

                        {/* second swipe list */}
                        <View>
                            <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginTop:Sizes.wp('7%'), marginBottom:Sizes.wp('2%')}}>
                                <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>You might like</Text>
                            </View>
                            <View style={{}}>
                            {/* dynamic swipe list */}
                                <HorizontalSwipeList 
                                    dataArray={ENTRIES1}
                                    listType='image'
                                />
                            </View>
                        </View>

                        {/* third swipe list */}
                        <View>
                            <View style={{marginLeft:Sizes.wp('4%'), marginRight:Sizes.wp('4%'), marginTop:Sizes.wp('7%'), marginBottom:Sizes.wp('2%')}}>
                                <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>Categories</Text>
                            </View>
                            <View style={{marginBottom:Sizes.wp('5%')}}>
                            {/* dynamic swipe list */}
                                <HorizontalSwipeList 
                                    dataArray={ENTRIES1}
                                    listType='icon'
                                />
                            </View>
                        </View>

                    </View>
                </View>
            );
        } else {
            return (
                <AppPreLoader 
                    color={Colors.main}
                    size={Sizes.wp('10%')}
                    background={false}
                />
            );
        }
    }
}
