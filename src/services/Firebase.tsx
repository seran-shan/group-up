// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
} from '@firebase/firestore';
import { getAuth, User } from '@firebase/auth';
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

export const createUser = async (
  name: string,
  age: number,
  id: string,
  date: string | unknown
) => {
  await setDoc(doc(db, 'Users', id), {
    name,
    age,
    date,
  });
};

export const createGroups = async (
  name: string,
  description: string,
  date: string,
  age: string,
  interests: string[]
) => {
  const docRef = doc(collection(db, 'Groups'));
  await setDoc(docRef, {
    name,
    description,
    date,
    age,
    interests,
  });
};

export const getUserByID = async (id: string) => {
  const ref = doc(db, 'Users', id);
  const data = await getDoc(ref);
  if (data.exists()) {
    const user = data.data();
    return user as User;
  }
  alert('User does not exist');
};

export const getAllUsers = async () => {
  const q = query(collection(db, 'Users'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((d) => {
    console.log(d.id);
  });
};

export const getAllGroups = async () => {
  const q = query(collection(db, 'Groups'));
  const querySnapshot = await getDocs(q);
  const groups = [];
  querySnapshot.forEach((d) => {
    groups.push(d.data());
  });
  return groups;
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

export const getGroups = async () => {
  const ref = doc(collection(db, 'Groups'));
  const data = await getDoc(ref);
  if (data.exists()) {
    return data;
  }
};
