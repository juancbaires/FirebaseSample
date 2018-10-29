import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
// import Login from "./Login/Login"
// import Signup from "./Signup/Signup"
import { DB_CONFIG } from './Config/Config';
import firedatabase from 'firebase/app';
import 'firebase/database';
import './App.css';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase"


class App extends Component {
  constructor(props) {
    super(props);
    this.addnote = this.addnote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.app = firedatabase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
      isSignedIn: false
    }
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
  componentWillMount() {
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  addnote(note) {
    this.database.push().set({ noteContent: note });
  }
  removeNote(noteId) {
    this.database.child(noteId).remove()
  }

  render() {
    return (

      <div className="notesWrapper">
        {this.state.isSignedIn ? (
          <span>
            <h1 className="heading">React & Firebase To-Do List</h1>
            <div className="notesFooter">
              <NoteForm addnote={this.addnote} />
            </div>
            <div className="notesBody">
              {
                this.state.notes.map((note) => {
                  return (
                    <Note noteContent={note.noteContent}
                      noteId={note.id}
                      key={note.id}
                      removeNote={this.removeNote} />
                  )
                })
              }
            </div>
            <h2>Signed In!</h2>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
          </span>
        ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}

      </div>
    );
  }
}

export default App;