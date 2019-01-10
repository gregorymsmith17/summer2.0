import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyAnBBm9lWhEL_TTCZpHMbbpBeoJj_rqIjA",
  authDomain: "fir-test-93760.firebaseapp.com",
  databaseURL: "https://fir-test-93760.firebaseio.com",
  projectId: "fir-test-93760",
  storageBucket: "fir-test-93760.appspot.com",
  messagingSenderId: "817850193285"
};
const fire = firebase.initializeApp(config)
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { fire, facebookProvider }
