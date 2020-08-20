import React, { Component } from 'react';
import { 
    View, 
    Text, 
    FlatList,
    Image,
} from 'react-native';
import propTypes from 'prop-types';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';


/* This component can use as dynamic swipe list 

you can add prop types and change render items

in here used two type swipe lists (image and icon)

*/

export default class HorizontalSwipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /* image list */
    _renderItem = ({item, index}) => {
        return (
            <View style={{height:Sizes.wp('40%'), width:Sizes.wp('30%'), marginLeft:Sizes.wp('4%') }}>
                <View style={{flex:2}}>
                    <Image
                        source={{ uri: item.illustration }}
                        style={{flex:1, height:null, width:null, resizeMode:'cover', borderRadius:Sizes.mainItemsRadius}}
                    />
                </View>
                <View style={{marginTop:Sizes.wp('2%')}}>
                    <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>{item.title}</Text>
                </View>
            </View>
        );
    }

    /* icon list */
    _renderItemIcons = ({item, index}) => {
        return (
            <View style={{height:Sizes.wp('15%'), width:Sizes.wp('30%'), marginLeft:Sizes.wp('4%'), borderRadius:Sizes.mainItemsRadius, backgroundColor:'#CCD1D1'}}>
                <View style={{flex:1, marginTop:Sizes.wp('1%'), justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%')}}>{item.title}</Text>
                </View>
            </View>
        );
    }

    render() {

        const { dataArray, listType } = this.props;

        return (
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={dataArray}
                    renderItem={listType == 'image' ? this._renderItem : this._renderItemIcons}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

HorizontalSwipeList.propTypes = {
    dataArray: propTypes.array.isRequired,
    listType: propTypes.string.isRequired,
}