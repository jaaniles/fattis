import firebase from 'firebase/app';

export const logout = () => {
  firebase.auth().signOut();
};
