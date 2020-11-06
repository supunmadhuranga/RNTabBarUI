import uuid from 'uuid/v4';
import * as firebase from 'firebase';
import firebaseKeys from './src/config/firebase';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'snack-SJucFknGX';

class Fire {
    constructor() {

        //Initialize firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseKeys.firebaseConfig);
        }

        // Some nonsense...
        firebase.firestore().settings({ 
            timestampsInSnapshots: true 
        });

        // Listen for auth
        firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
        });
    }

    // Download Data
    getPaged = async ({ size, start }) => {
        let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
        try {
        if (start) {
            ref = ref.startAfter(start);
        }

        const querySnapshot = await ref.get();
        const data = [];
        querySnapshot.forEach(function(doc) {
            if (doc.exists) {
            const post = doc.data() || {};

            // Reduce the name
            const user = post.user || {};

            const name = user.deviceName;
            const reduced = {
                key: doc.id,
                name: (name || 'Secret Duck').trim(),
                ...post,
            };
            data.push(reduced);
            }
        });

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return { data, cursor: lastVisible };
        } catch ({ message }) {
        alert(message);
        }
    };

    // Upload Data
    // uploadPhotoAsync = async uri => {
    //     const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    //     return uploadPhoto(uri, path);
    // };

    post = async ({ text, image: localUri }) => {
        try {
        const { uri: reducedImage, width, height } = await shrinkImageAsync(
            localUri,
        );

        const remoteUri = await this.uploadPhotoAsync(reducedImage);
        this.collection.add({
            text,
            uid: this.uid,
            timestamp: this.timestamp,
            imageWidth: width,
            imageHeight: height,
            image: remoteUri,
            user: getUserInfo(),
        });
        } catch ({ message }) {
        alert(message);
        }
    };

    addPost = async ({text, localUri}) => {
        const remote_url = await uploadPhotoAsync(localUri, `posts/${this.uid}/${this.timestamp}.jpg`);

        return new Promise((res, rej) => {
            this.firestore
                .collection("posts")
                .add({
                    uid: this.uid,
                    caption: "testing post3",
                    path: uri,
                    date_created: this.timestamp,
                    date_updated: this.timestamp,
                })
        });

    }

    uploadPhotoAsync = async(local_uri, folder) => {

        return new Promise(async (res, rej) => {
            const response = await fetch(local_uri);
            const file = await response.blob();
    
            let upload = firebase
                    .storage()
                    .ref(folder)
                    .put(file);
    
            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej(err);
                },
                async () => {
                    const remote_url = await upload.snapshot.ref.getDownloadURL();
                    res(remote_url);
                }
    
            );
    
        });
    }

    // Helpers
    get collection() {
        return firebase.firestore().collection(collectionName);
    }

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;