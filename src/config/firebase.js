import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDI9rAbvXWMPNgWGizClcoiSqEIYWyd22I",
    authDomain: "travel-social-media-8ff93.firebaseapp.com",
    databaseURL: "https://travel-social-media-8ff93.firebaseio.com",
    projectId: "travel-social-media-8ff93",
    storageBucket: "travel-social-media-8ff93.appspot.com",
    messagingSenderId: "802345791301",
    appId: "1:802345791301:web:7e02ac9db76ed72b3d582c"
};


const firebaseInit = firebase.initializeApp(firebaseConfig);

export default firebaseInit;
