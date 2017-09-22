import React, { Component } from "react"
import { Redirect } from "react-router-native"

import firebaseInstance from "./firebase"

export default class Authentication extends Component {
  render() {
    const user = firebaseInstance.auth().currentUser
    console.log("user!")
    if (user) {
      console.log("redirecting to home")
      return <Redirect to="/home" />
    } else {
      console.log("redirecting to login")
      return <Redirect to="/login" />
    }
  }
}
