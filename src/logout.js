import React, { Component } from 'react';
import { Redirect } from 'react-router-native';
import { Spinner, Container, Content } from 'native-base';

import firebaseInstance from './firebase';

export default class Logout extends Component {
  state = {
    redirect: false
  };

  componentWillMount() {
    firebaseInstance
      .auth()
      .signOut()
      .then(
        () => {
          this.setState({ redirect: true });
        },
        err => {
          this.setState({ redirect: true });
        }
      );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <Container>
          <Content>
            <Spinner />
          </Content>
        </Container>
      );
    }
  }
}
