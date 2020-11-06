import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';

import * as ImagePicker from "expo-image-picker";

export const getCameraPermission = async() => {
    
    let status;

    status = await Permissions.getAsync(Permissions.CAMERA);
    let statusCamera = status.status;
    console.log("Camera Permissions: ", statusCamera);

    status = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    let statusCameraRoll = status.status;
    console.log("CameraRoll Permissions: ", statusCameraRoll);

    if (statusCamera !== "granted") {
        console.log("Requesting Camera Permissions");
        status = await Permissions.askAsync(Permissions.CAMERA);
        statusCamera = status.status;
    }

    if (statusCameraRoll !== "granted") {
        console.log("Requesting CameraRoll Permissions");
        status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        statusCameraRoll = status.status;
    }

    if (statusCamera !== "granted" || statusCameraRoll !== "granted") {
        console.log("Permissions not granted");
        return;
    }

    console.log("Permissions Granted!");

}

const options = {
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    //aspect: [4, 3],
};

export const _selectPhoto = async () => {
    let { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status) {
        let result = await ImagePicker.launchImageLibraryAsync(options);
    
        if (!result.cancelled) {
            return result.uri;
            //this.props.navigation.navigate("NewPost", { image: result.uri });
        } else return false;
    }
};

export const _takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status) {
        const result = await ImagePicker.launchCameraAsync(options);
        if (!result.cancelled) {
            return result.uri;
            //this.props.navigation.navigate("NewPost", { image: result.uri });
        } else return false;
    }
};
