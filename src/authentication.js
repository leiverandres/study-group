import React, { Component } from 'react';
import { Redirect } from 'react-router-native';

import firebaseInstance from './firebase';

export default class Authentication extends Component {
  render() {
    const user = firebaseInstance.auth().currentUser;
    if (user) {
      console.log('> user!', JSON.stringify(user));
      return <Redirect to="/home" />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
