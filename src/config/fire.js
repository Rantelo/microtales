import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD9FRpp2jIzDr0WojPpy5olU5kYoOyey7k",
  authDomain: "microtales-ba.firebaseapp.com",
  databaseURL: "https://microtales-ba.firebaseio.com",
  projectId: "microtales-ba",
  storageBucket: "microtales-ba.appspot.com",
  messagingSenderId: "743793249017"
};
const fire = firebase.initializeApp(config);
export default fire;
