import { StyleSheet } from 'react-native';

import Sizes from './sizes';
import Colors from './colors';
import Fonts from './fonts';

export default StyleSheet.create({
    snackbarMessage:{
        fontFamily:Fonts.main, 
        fontSize:Sizes.wp('3.75%'), 
        color:Colors.white,
        paddingBottom:Sizes.wp('6%'),
        paddingTop:Sizes.wp('6%'),
    },
});