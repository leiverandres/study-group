import React, { Component } from "react"
import { Redirect } from "react-router-native"
import { Spinner } from "native-base"

import firebaseInstance from "./firebase"

export default class Logout extends Component {
  state = {
    redirect: false
  }
  componentWillMount() {
    firebaseInstance
      .auth()
      .signOut()
      .then(
        () => {
          console.warn("User logged out successfully")
        },
        err => {
          console.warn("Error loging out user")
        }
      )
  }
  render() {
    {
      this.state.redirect ? <Redirect to="/" /> : <Spinner color="red" />
    }
  }
}
