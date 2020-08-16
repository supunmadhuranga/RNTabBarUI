
import { Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('window');

export default {
    wp:wp,
    hp:hp,
    height:height,
    width:width,
    deviceHeight:height,
    deviceWidth:width,
    mainItemsRadius:wp('1%'),
}