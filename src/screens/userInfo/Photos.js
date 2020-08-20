import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Sizes from '../../styles/sizes';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

export default class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={[{ flex:1, backgroundColor: '' }]}>
        
                {/* first row */}
                <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft:Sizes.wp('3%'), marginTop:Sizes.wp('4%'), marginRight:Sizes.wp('3%'), marginBottom:Sizes.wp('4%'), justifyContent:'space-between'}}>
                    <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
                    </View>

                    <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
                    </View>

                    <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
                    </View>
                    
                </View>

                <View style={{flexDirection:'row', flexWrap: 'wrap', marginLeft:Sizes.wp('3%'), marginRight:Sizes.wp('3%'), marginBottom:Sizes.wp('4%'), justifyContent:'space-between'}}>
                    <View style={{height:Sizes.wp('50%'), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                        
                    </View>

                    <View style={{justifyContent:'space-between'}}>

                        <View style={{height:(Sizes.wp('100%') - Sizes.wp('20%'))  / 3, width:Sizes.wp('60%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                            
                        </View>
                        
                        <View style={{flexDirection:'row', justifyContent:'space-between', }}>
                            <View style={{height: Sizes.wp('46%') - ((Sizes.wp('100%') - Sizes.wp('20%'))  / 3), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                                
                            </View>

                            <View style={{height: Sizes.wp('46%') - ((Sizes.wp('100%') - Sizes.wp('20%'))  / 3), width:(Sizes.wp('100%') - Sizes.wp('20%')) / 3, borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                                
                            </View>
                        </View>

                    </View>
                    
                </View>

            </ScrollView>
        );
    }
}
