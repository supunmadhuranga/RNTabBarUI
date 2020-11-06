//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text,Image, TouchableOpacity  } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from './material-menu/index';
//import menu and menu item

import AntDesign from 'react-native-vector-icons/AntDesign';
import Sizes from '../styles/sizes';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

export default class CustomMenuIcon extends Component {
    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };
    showMenu = () => {
        this._menu.show();
    };
    hideMenu = () => {
        this._menu.hide();
    };
    option1Click = () => {
        this._menu.hide();
        this.props.option1Click();
    };
    // option2Click = () => {
    //     this._menu.hide();
    //     this.props.option2Click();
    // };
    // option3Click = () => {
    //     this._menu.hide();
    //     this.props.option3Click();
    // };
    // option4Click = () => {
    //     this._menu.hide();
    //     this.props.option4Click();
    // };
    render() {
        return (
            <View style={this.props.menustyle}>
                <Menu
                    ref={this.setMenuRef}
                    button={
                        <TouchableOpacity onPress={this.showMenu}>
                            <AntDesign name='bars' size={Sizes.wp('7%')} color={'#000000'} />
                        </TouchableOpacity>
                    }
                >
                <MenuItem 
                    onPress={this.option1Click}
                    textStyle={{fontFamily:Fonts.main, fontSize:Sizes.wp('3.5%'),}}
                >Logout</MenuItem>
                {/* <MenuItem onPress={this.option2Click}>op2:Demo Option</MenuItem>
                <MenuItem onPress={this.option3Click} disabled>
                    op3:Disabled option
                </MenuItem>
                <MenuDivider />
                <MenuItem onPress={this.option4Click}>
                    op4:Option After Divider
                </MenuItem> */}
                </Menu>
            </View>
        );
    }
}