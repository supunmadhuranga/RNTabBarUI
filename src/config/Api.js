import * as firebase from 'firebase';


export const fetchUserDetails = async() => {
    let user = firebase.auth().currentUser;
    return firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(function(doc) {
        let userDetails = doc.data()
        return userDetails
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error);
        })
}

export const uploadAvatar = async(localUri) => {
    let user = firebase.auth().currentUser;

    const remote_url = await uploadPhotoAsync(localUri, `avatar/${user.uid}/userimage.jpg`);

    return firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({image:remote_url})
        .then(() => {
            return true;
        })
        .catch( error => {
            return false;
        })
    
}

// export const uploadPhotoAsync = async(local_uri, filename) => {

//     const response = await fetch(local_uri);
//     const file = await response.blob();

//     const upload = firebase
//     .storage()
//     .ref(filename)
//     .put(file);

//     return upload
//         .on(
//             "state_changed",
//             // (snapshot) => {
//             //     console.log(snapshot);
//             // },
//             (error) => {
//                 //console.log(error);
//                 return error;
//             },
//             async () => {
//                 const remote_url = await upload.snapshot.ref.getDownloadURL();
//                 console.log(remote_url)
//                 //return remote_url;
//             }
//         );
// }

const uploadPhotoAsync = async(local_uri, filename) => {

    return new Promise(async (res, rej) => {
        const response = await fetch(local_uri);
        const file = await response.blob();

        let upload = firebase
                .storage()
                .ref(filename)
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

export const createPost = async(id, postData) => {
    let user = firebase.auth().currentUser;
  
    return firebase
        .firestore()
        .collection('posts')
        .doc(id)
        .set(postData)
        .then(function(res) {
            console.log('posted');
            return res;
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error);
        })
}

