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
  where,
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
  firstName: string,
  lastName: string,
  email: string,
  birthday: Date,
  id: string
) => {
  await setDoc(doc(db, 'Users', id), {
    firstName,
    lastName,
    birthday,
    email,
  });
};

export const findUserByEmail = async (email: string) => {
  const userRef = collection(db, 'Users');
  const q = query(userRef, where('email', '==', email));
  const users = await getDocs(q);
  let user;
  users.forEach((snap) => {
    user = snap.data();
  });
  console.log(user);
  return user;
};

export const createGroups = async (
  name: string,
  description: string,
  date: string,
  age: string,
  interests: string[],
  users: string[],
  admin: string | undefined
) => {
  const docRef = doc(collection(db, 'Groups'));
  await setDoc(docRef, {
    name,
    description,
    date,
    age,
    interests,
    users,
    admin,
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
  querySnapshot.forEach((d) => {
    console.log(d.id);
  });
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
