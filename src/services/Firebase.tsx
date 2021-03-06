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
  return user;
};

export const createGroups = async (
  name: string,
  description: string,
  date: string,
  age: string,
  membershipType: string,
  interests: string[],
  users: string[],
  admin: string | undefined,
  id: string,
  location: string,
  superlikedGroups: string[],
  likedGroups: string[]
) => {
  const docRef = doc(db, 'Groups', id);
  await setDoc(docRef, {
    name,
    description,
    date,
    age,
    membershipType,
    interests,
    users,
    admin,
    id,
    location,
    superlikedGroups,
    likedGroups,
  });
};

export const getUserByID = async (id: string) => {
  const ref = doc(db, 'Users', id);
  const data = await getDoc(ref);
  if (data.exists()) {
    const user = data.data();
    return user as User;
  }
};

export const getAllGroups = async () => {
  const q = query(collection(db, 'Groups'));
  const querySnapshot = await getDocs(q);
  const groups: Group[] = [];
  querySnapshot.forEach((d) => {
    const group = d.data() as unknown as Group;
    groups.push(group);
  });
  console.log(groups);
  return groups;
};

export const getGroupByID = async (id: string) => {
  const ref = doc(db, 'Groups', id);
  const data = await getDoc(ref);
  if (data.exists()) {
    const group = data.data();
    return group as Group;
  }
};

export const getMemberGroups = async (email: string) => {
  const ref = collection(db, 'Groups');
  const qGroups = query(ref, where('users', 'array-contains', email));
  const myGroups: Group[] = [];
  const memberGroups = await getDocs(qGroups);
  memberGroups.forEach((snap) => {
    const group = snap.data() as unknown as Group;
    myGroups.push(group);
  });
  return myGroups;
};

export const getAdminGroups = async (id: string) => {
  const ref = collection(db, 'Groups');
  const qAdmin = query(ref, where('admin', '==', id));
  const myGroups: Group[] = [];
  const adminGroups = await getDocs(qAdmin);
  adminGroups.forEach((snap) => {
    const group = snap.data() as unknown as Group;
    myGroups.push(group);
  });
  return myGroups;
};

export const getGroupsSuperliking = async (groupID: string) => {
  const group = await getGroupByID(groupID);
  if (group == null) {
    return;
  }
  const ref = collection(db, 'Groups');
  const qSuperliking = query(
    ref,
    where('superlikedGroups', 'array-contains', group.name)
  );
  const groups: Group[] = [];
  const groupsSuperliking = await getDocs(qSuperliking);
  groupsSuperliking.forEach((snap) => {
    const g = snap.data() as unknown as Group;
    groups.push(g);
  });
  return groups;
};

export const getMatches = async (groupID: string) => {
  const group = await getGroupByID(groupID);
  if (group == null) {
    return;
  }
  const ref = collection(db, 'Groups');
  const qliking = query(
    ref,
    where('likedGroups', 'array-contains', group.name)
  );
  const groups: Group[] = [];
  const groupsMatches = await getDocs(qliking);
  groupsMatches.forEach((snap) => {
    const g = snap.data() as unknown as Group;
    groups.push(g);
  });
  return groups;
};

export const addMemberToGroup = async (userEmail: string, groupID: string) => {
  const group = await getGroupByID(groupID);
  if (group == null) {
    return;
  }
  const users = group?.users;
  users.push(userEmail);
  const docRef = doc(db, 'Groups', groupID);
  setDoc(docRef, group);
};

export const addSuperlikes = async (groupID1: string, groupID2: string) => {
  const groupSuperliking = await getGroupByID(groupID1);
  const groupSuperliked = await getGroupByID(groupID2);
  if (groupSuperliking == null) {
    return;
  }
  if (groupSuperliked == null) {
    return;
  }
  const superlikedGroupsArray = groupSuperliking?.superlikedGroups;
  superlikedGroupsArray.push(groupSuperliked.name);
  const docRef = doc(db, 'Groups', groupID1);
  setDoc(docRef, groupSuperliking);
};

export const addReport = async (
  userEmail: string,
  reporterEmail: string,
  reportDescription: string,
  id: string
) => {
  const docRef = doc(db, 'Reports', id);
  setDoc(docRef, {
    reportDescription,
    userEmail,
    reporterEmail,
  });
};

export const addLikes = async (groupID1: string, groupID2: string) => {
  const groupLiking: Group | undefined = await getGroupByID(groupID1);
  const groupLiked: Group | undefined = await getGroupByID(groupID2);
  if (groupLiking == null) {
    return;
  }
  if (groupLiked == null) {
    return;
  }
  const likedBy = groupLiking?.likedGroups;
  const likedOf = groupLiked?.likedGroups;
  likedBy.push(groupLiked.name);
  likedOf.push(groupLiking.name);
  const docRef1 = doc(db, 'Groups', groupID1);
  const docRef2 = doc(db, 'Groups', groupID2);
  setDoc(docRef1, groupLiking);
  setDoc(docRef2, groupLiked);
};
