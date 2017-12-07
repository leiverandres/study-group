import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import {
  Form,
  Input,
  Item,
  Container,
  Content,
  Button,
  Text,
  Label,
  Spinner,
  Toast
} from 'native-base';
import { Link, Redirect } from 'react-router-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebaseInstance from '../firebase';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    loading: false,
    shouldRedirect: false
  };

  componentDidMount() {
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

  handleSignup = () => {
    this.setState({ loading: true });
    const { email, password, username } = this.state;
    firebaseInstance
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        // Successfully created
        newUser
          .updateProfile({
            displayName: username
          })
          .then(() => this.setState({ loading: false }))
          .catch(err => {
            Toast.show({
              text: 'Error actulizando datos de usuario',
              type: 'danger',
              buttonText: 'Continuar'
            });
            this.setState({ loading: false });
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let update = { loading: false };
        if (errorCode === 'auth/email-already-in-use') {
          Toast.show({
            text: 'Este correo ya se encuentra registrado',
            buttonText: 'OK',
            type: 'danger',
            duration: 5000
          });
          update.email = '';
          update.password = '';
        } else if (errorCode === 'auth/invalid-email') {
          Toast.show({
            text: 'Correo inválido, intentalo de nuevo',
            buttonText: 'OK',
            type: 'warning',
            duration: 5000
          });
          update.email = '';
        } else if (errorCode === 'auth/weak-password') {
          Toast.show({
            text:
              'La contraseña es demasiado debil, debe tener al menos de 6 caracteres',
            buttonText: 'Ok',
            type: 'warning'
          });
          update.password = '';
        }
        this.setState(update);
      });
  };

  render() {
    const { email, password, username, loading, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/home" />;
    }

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          {loading ? (
            <Spinner style={styles.spinner} />
          ) : (
            <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0}>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input
                    onChangeText={this.handleChange('username')}
                    value={username}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Correo electrónico</Label>
                  <Input
                    onChangeText={this.handleChange('email')}
                    value={email}
                    keyboardType="email-address"
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
              <View style={styles.signupButton}>
                <Button onPress={this.handleSignup}>
                  <Text>Registrarse</Text>
                </Button>
              </View>
              <View style={styles.message}>
                <Text>¿Ya tienes cuenta?</Text>
                <Link to="/login">
                  <Text style={{ color: 'teal' }}> Inicia sesión!</Text>
                </Link>
              </View>
            </KeyboardAvoidingView>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingTop: 50 },
  content: { minWidth: 250, flexDirection: 'column' },
  spinner: { alignSelf: 'center' },
  signupButton: { alignSelf: 'center', padding: 50 },
  message: { flexDirection: 'row', justifyContent: 'center' }
});
