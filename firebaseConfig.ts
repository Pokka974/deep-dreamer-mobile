// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCNUTp5gTdUOqedCiu8VpO44SaKQk0-u6U',
    authDomain: 'deep-dreamer-8045c.firebaseapp.com',
    projectId: 'deep-dreamer-8045c',
    storageBucket: 'deep-dreamer-8045c.appspot.com',
    messagingSenderId: '99774850119',
    appId: '1:99774850119:web:14573e94b1a7cadcc53d62',
    measurementId: 'G-QGD23FQ4T5',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
