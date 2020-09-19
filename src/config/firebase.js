import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA1EXRcpJEbhTdq_In7b7XUQJZx01P0HDs",
    authDomain: "app-test-dcec2.firebaseapp.com",
    databaseURL: "https://app-test-dcec2.firebaseio.com",
    projectId: "app-test-dcec2",
    storageBucket: "app-test-dcec2.appspot.com",
    messagingSenderId: "1027715423940",
    appId: "1:1027715423940:web:23fc674315623d2570b391"
};

const firebaseInit = firebase.initializeApp(firebaseConfig);

export default firebaseInit;
