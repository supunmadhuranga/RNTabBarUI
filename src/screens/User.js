import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

import { TabView, SceneMap } from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';

import board1 from '../../assets/coming.png';
import { Button } from 'react-native-paper';

const FirstRoute = () => (
    <View style={[{ flex:1, backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[{ flex:1, backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = () => (
    <View style={[{ flex:1, backgroundColor: '#673ab7' }]} />
);


export default class User extends Component {
        constructor(props) {
            super(props);
            this.state = {
                index : 0,
                routes: [
                    { key: 'first', title: 'Photos' },
                    { key: 'second', title: 'Events' },
                    { key: 'third', title: 'Info' },
                ],
            };
        }

        static navigationOptions = ({ navigation }) => ({
            title: "Ghost",
            //headerTransparent: true,
            
            //headerLeft: () => ( <HeaderBackButton tintColor="#fff" onPress={() => navigation.goBack()} /> ),
            headerRight: () => (
                    // <View>
                    //     <Text style={{color="#000"}}>Ghost</Text>
                    // </View>
                    <Button
                        title="Info"
                        color="red"
                    />
            ),
            
        });

        _handleIndexChange = index => this.setState({ index });

        _renderTabBar = props => {
            const inputRange = props.navigationState.routes.map((x, i) => i);
        
            return (
              <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = Animated.color(
                        Animated.round(
                            Animated.interpolate(props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                inputIndex === i ? 255 : 0
                                ),
                            })
                        ),0,0
                    );
        
                  return (
                    <TouchableOpacity
                      style={styles.tabItem}
                      onPress={() => this.setState({ index: i })}>
                      <Animated.Text style={{ color, fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%') }}>{route.title}</Animated.Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
        };

        _renderScene = SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute,
        });

        render() {
            
            return (
                <View style={{flex:1, backgroundColor:Colors.white, marginTop:Sizes.wp('3%'), marginBottom:Sizes.wp('3%')}}>
                    
                    {/* user image */}
                    <View style={{flexDirection:'row', alignItems:'flex-start', marginLeft:Sizes.wp('10%'), marginBottom:Sizes.wp('12%')}}>
                        <Image
                            source={board1}
                            style={{height:Sizes.wp('15%'), width:Sizes.wp('15%'), resizeMode:'cover',borderWidth:1, borderColor:'black', borderRadius:Sizes.wp('15%')/2}}
                        />
                        <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('5%'), marginLeft:Sizes.wp('3%')}}>Seb Frechard</Text>
                    </View>

                    {/* status info */}
                    <View style={{flexDirection:'row', marginLeft:Sizes.wp('10%'), marginRight:Sizes.wp('10%'), marginBottom:Sizes.wp('12%'), justifyContent:'space-between'}}>
                        <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>5</Text>
                            <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Posts</Text>
                        </View>
                        <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>5</Text>
                            <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Followers</Text>
                        </View>
                        <View style={{alignItems:'center', paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                            <Text style={{fontFamily:Fonts.mainMedium, fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%'), marginTop:Sizes.wp('1%') }}>5</Text>
                            <Text style={{fontFamily:Fonts.mainMedium, color:'#CCD1D1', fontSize:Sizes.wp('3.5%'), marginBottom:Sizes.wp('1%') }}>Following</Text>
                        </View>
                        
                    </View>

                    {/* follow button */}
                    <View style={{flexDirection:'row', marginLeft:Sizes.wp('10%'), marginRight:Sizes.wp('10%'), marginBottom:Sizes.wp('12%'), justifyContent:'space-between'}}>
                        <View style={{alignItems:'center', width:'65%',  height:Sizes.wp('12%'), paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>

                            <View style={{flex:1, justifyContent:'center', height:Sizes.wp('12%'), width:'100%'}}>
                                <TouchableOpacity 
                                    //onPress={() => this.followFunction()}
                                    style={{backgroundColor:'#CCD1D1', height:Sizes.wp('12%'), width:'100%', justifyContent: 'center', alignItems: 'center', borderRadius:Sizes.mainItemsRadius,}}>
                                    <Text style={{ fontSize:Sizes.wp('4%'), fontFamily:Fonts.mainMedium, color:Colors.black, padding:Sizes.wp('3%')}}>Follow</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{alignItems:'center', width:'30%', height:Sizes.wp('12%'), paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}}>
                            
                            <View style={{flex:1, justifyContent:'center', height:Sizes.wp('12%'), width:'100%'}}>
                                <TouchableOpacity 
                                    //onPress={() => this.followFunction()}
                                    style={{backgroundColor:'#CCD1D1', height:Sizes.wp('12%'), width:'100%', justifyContent: 'center', alignItems: 'center', borderRadius:Sizes.mainItemsRadius,}}>
                                    <Feather name='send' size={Sizes.wp('6%')} color={Colors.black} style={{paddingLeft:Sizes.wp('2%'), paddingRight:Sizes.wp('2%')}} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        
                    </View>
                    
                    {/* tab navigator */}
                    <TabView
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={this._handleIndexChange}
                        initialLayout={{ width:Sizes.deviceWidth }}
                    />
                   
                </View>
            );
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      paddingTop:0,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
});