import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { fire, facebookProvider } from './fire';
import './App.css'

import SignInScreen from './components/SignInScreen'




import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';


class App extends Component {
  state = {
    items: {},
    authenticated: false,
    loading: true,
    isSignedIn: false

  }
  itemsRef = '';

  uiConfig = {

     // Popup signin flow rather than redirect flow.
     signInFlow: 'popup',
     'credentialHelper': firebaseui.auth.CredentialHelper.NONE,
     signInSuccessUrl: '/home',
     // We will display Google and Facebook as auth providers.
     signInOptions: [
       firebase.auth.EmailAuthProvider.PROVIDER_ID,
       firebaseui.auth.CredentialHelper.NONE,

     ],
     callbacks: {
       // Avoid redirects after sign-in.
       signInSuccessWithAuthResult: () => false
     }
   };


  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }

  authWithFacebook=()=>{
    fire.auth().signInWithPopup(facebookProvider)
      .then((result,error) => {
        if(error){
          console.log('unable to signup with firebase')
        } else {
          this.setState({authenticated: true })
        }
      })
  }
  logOut=()=>{
    fire.auth().signOut().then((user)=> {
      this.setState({items:null})
    })
  }
  componentWillUnmount(){

    this.unregisterAuthObserver();
  }
  completeItem=(id)=>{
    this.itemsRef.update({
      [id]:{
        ...this.state.items[id],
        completed: true
      }
    })
  }
  deleteItem = (id) => {
    this.itemsRef.update({
      [id]: null
    })
  }
  addItem=(e)=> {
    e.preventDefault();
    this.itemsRef.push({
      item: this.todoItem.value,
      completed: false
    })
  }
  EmailAndPasswordAuthentication=(e)=>{
    e.preventDefault()
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    fire.auth().fetchProvidersForEmail(email)
      .then(provider => {
        if(provider.length === 0){
          return fire.auth().createUserWithEmailAndPassword(email, password)
        }else if (provider.indexOf("password") === -1) {
          console.log("you already have an account with " + provider[0] )
      } else {
        console.log(provider)
        return fire.auth().signInWithEmailAndPassword(email, password)
      }
      })
  }

  render() {
  if (!this.state.loading) {
    return (
      <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>

      </div>
    )
  }
  return (
    <BrowserRouter>
      <div className="wrap">


        <SignInScreen />

      </div>
    </BrowserRouter>
  );
}
}
export default App;
