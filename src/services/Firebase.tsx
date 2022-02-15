// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCiChYFR33lDnUaziQvfYE8XkrtSorSoeo',
  authDomain: 'groupup-gr27.firebaseapp.com',
  projectId: 'groupup-gr27',
  storageBucket: 'groupup-gr27.appspot.com',
  messagingSenderId: '330153704971',
  appId: '1:330153704971:web:deb0f02248c7f6fccf910e',
  measurementId: 'G-BFXEZ35KTP',
});

// Initialize Firebase
export const db = getFirestore(firebaseApp);
// export const auth = firebase.auth();
export default firebaseApp;
