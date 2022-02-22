// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { Group } from '../types/group';

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
export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);
export default firebaseApp;

export const getUserByID = async (id: string) => {
  const ref = doc(db, 'Users', id);
  const data = await getDoc(ref);
  if (data.exists()) {
    const user = data.data();
    return user;
  }
  alert('User does not exist');
};

export const getGroupByID = async (id: string) => {
  const ref = doc(db, 'Groups', id);
  const data = await getDoc(ref);
  if (data.exists()) {
    const group = data.data();
    return group as Group;
  }
  alert('Group does not exist');
};
