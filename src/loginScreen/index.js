import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Form,
  Input,
  Item,
  Container,
  Content,
  Button,
  Text,
  Label,
  Spinner
} from 'native-base';
import { Redirect, Link } from 'react-router-native';

import firebaseInstance from '../firebase';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    shouldRedirect: false
  };

  componentWillMount() {
    firebaseInstance.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ shouldRedirect: true });
      }
      // User is logged out so do nothing
    });
  }

  handleChange = fieldName => {
    return value => {
      this.setState({ [fieldName]: value.replace(/\s/gi, '') });
    };
  };

  handleLogin = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    firebaseInstance
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(usr => {
        this.setState({ loading: false });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.warn(`Error: ${errorCode}: ${errorMessage}`);
        this.setState({ loading: false });
      });
  };
  render() {
    const { email, password, shouldRedirect, loading } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/home" />;
    }

    return (
      <Container style={{ paddingTop: 50 }}>
        <Content style={styles.content}>
          {loading ? (
            <Spinner />
          ) : (
            <View>
              <Form>
                <Item floatingLabel>
                  <Label>Correo electrónico</Label>
                  <Input
                    onChangeText={this.handleChange('email')}
                    value={email}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Contraseña</Label>
                  <Input
                    onChangeText={this.handleChange('password')}
                    value={password}
                    secureTextEntry
                  />
                </Item>
              </Form>
              <View style={styles.loginButton}>
                <Button onPress={this.handleLogin}>
                  <Text>Entrar</Text>
                </Button>
              </View>
              <View style={styles.message}>
                <Text>¿No tienes cuenta?</Text>
                <Link to="/signup">
                  <Text style={{ color: 'teal' }}> Registrate!</Text>
                </Link>
              </View>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: { minWidth: 250, flexDirection: 'column' },
  loginButton: { alignSelf: 'center', padding: 50 },
  message: { flexDirection: 'row', justifyContent: 'center' }
});
