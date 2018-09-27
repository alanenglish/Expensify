import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBz1IOM1VahrTsD94783hIz3aDCKSwcmBk',
  authDomain: 'expensify-13d78.firebaseapp.com',
  databaseURL: 'https://expensify-13d78.firebaseio.com',
  projectId: 'expensify-13d78',
  storageBucket: 'expensify-13d78.appspot.com',
  messagingSenderId: '165463597143'
};

firebase.initializeApp(config);

firebase.database().ref().set({
  name: 'Alan English',
  age: 35,
  isSingle: false,
  location: {
    city: 'Chicago',
    country: 'United States'
  }
});
