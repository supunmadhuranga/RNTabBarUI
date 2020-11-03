import * as firebase from 'firebase';

export const userSignUp = async(email, password) => {

    return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const data = {
                    id: response.user.uid,
                    name: this.state.name,
                    email: this.state.email,
                    username: this.state.username,
                    image: '',
                    followed_count: 0,
                    follower_count: 0,
                    post_count: 0,
                    active:1,
                };
                const usersRef = firebase.firestore().collection('users');
                usersRef
                .doc(response.user.uid)
                .set(data)
                .then(() => {
                    return true;
                })
                .catch((error) => {
                    return error;
                });
            })
            .catch((error) => {
                return error;
            });
}

export const userSignIn = async(email, password) => {

    return firebase
            .auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                return true;
            })
            .catch((error) => {
                return error;
            });
}

/* get user details by logged user id */
export const fetchUserDetails = async() => {
    let user = firebase.auth().currentUser;
    return firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(function(doc) {
            let userDetails = doc.data()
            return userDetails;
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error);
            return false;
        })
}

/* user logout */
export const UserSignOut = async() => {
    return firebase.auth().signOut().then((res) => {
        return true;
    })
    .catch(error => {
        console.log('Error getting documents: ', error);
        return false;
    });
}

/* upload profile image */
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

export const updateUserInfo = async(field, value) => {
    let user = firebase.auth().currentUser;

    let obj = {};
    obj[field] = value;

    return firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update(obj)
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

export const fetchUserPosts = async() => {
    let user = firebase.auth().currentUser;
    return firebase
      .firestore()
      .collection('posts')
      .where('uid', '==', user.uid)
      .get()
      .then(function(querySnapshot) {
        let posts = querySnapshot.docs.map(doc => doc.data())
        return posts;
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
        return error;
      })
}

/* any local image upload to firebase storage and get remote url */
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

export const addPost = async(text, localUri) => {
    let user = firebase.auth().currentUser;

    let timestamp = Date.now();

    const remote_url = await uploadPhotoAsync(localUri, `posts/${user.uid}/${timestamp}.jpg`);
    // return new Promise((res, rej) => {
    //     this.firestore
    //         .collection("posts")
    //         .add({
    //             uid: this.uid,
    //             caption: "testing post3",
    //             path: remote_url,
    //             date_created: this.timestamp,
    //             date_updated: this.timestamp,
    //         }).then(
    //             (response) => {
    //                 res(response)
    //             }
    //         )
    // });

    // return firebase
    //     .firestore()
    //     .collection('posts')
    //     .add({
    //         uid: user.uid,
    //         caption: text,
    //         path: remote_url,
    //         date_created: timestamp,
    //         date_updated: timestamp,
    //     }).then(
    //         (res) => {
    //             return true;
    //         }
    //     )
    //     .catch(function(error) {
    //         return false;
    //         console.log('Error getting : ', error);
    //     })
    
    var newRef =  firebase
        .firestore()
        .collection('posts')
        .doc()

    return newRef.set({
            id: newRef.id,
            uid: user.uid,
            caption: text,
            path: remote_url,
            date_created: timestamp,
            date_updated: timestamp,
        })
        .then((res) => {
            console.log('posted');
            return true;
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
            return false;
        })

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

export const AddNewData = async(collection_name, data_obj) => {
    
    var collectionRef =  firebase.firestore().collection(collection_name).doc();

    data_obj['id'] =  collectionRef.id;

    return collectionRef.set(data_obj)
        .then(
            (docRef) => {
                console.log(docRef);
                //console.log("Document written with ID: ", docRef.id);
                return true;
            }
        )
        .catch(function(error) {
            console.error("Error adding document: ", error);
            return false;
        });
    // collectionRef.add({
    //     id
    //     uid
    //     name
    //     place
    //     start_date
    //     return_date
    //     start_hour
    //     return_hour
    //     min_age
    //     max_age
    //     people_count
    //     type
    //     request
    // })
}

export const fetchData = async(collection_name) => {
    let user = firebase.auth().currentUser;
    return firebase
      .firestore()
      .collection(collection_name)
      .where('uid', '==', user.uid)
      .get()
      .then(function(querySnapshot) {
        let posts = querySnapshot.docs.map(doc => doc.data())
        return posts;
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
        return error;
      })
}
