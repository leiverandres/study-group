import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  H1,
  Button,
  View,
  Toast,
  Left,
  Right,
  Icon,
  Spinner
} from 'native-base';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Redirect } from 'react-router-native';

import firebaseInstance from '../firebase';

export default class AddGroup extends Component {
  state = {
    groupName: '',
    topic: '',
    place: '',
    description: '',
    maxMembersQuantity: '',
    showToast: false,
    loading: false
  };

  handleChange = fieldName => {
    return value => {
      this.setState({ [fieldName]: value });
    };
  };

  clearData = () => {
    this.setState({
      groupName: '',
      topic: '',
      place: '',
      description: '',
      maxMembersQuantity: ''
    });
  };

  handleCreate = () => {
    this.setState({ loading: true });
    const user = firebaseInstance.auth().currentUser;
    const groupsRef = firebaseInstance
      .database()
      .ref()
      .child('groups/')
      .push(
        {
          name: this.state.groupName,
          topic: this.state.topic,
          place: this.state.place,
          description: this.state.description,
          createdAt: Date.now(),
          owner: user.uid,
          maxMembersQuantity: this.state.maxMembersQuantity,
          members: { [user.uid]: true },
          messages: {}
        },
        err => {
          update = { loading: false };
          if (err) {
            Toast.show({
              text: 'Error creando el grupo',
              type: 'danger',
              position: 'bottom',
              duration: 3000
            });
          } else {
            Toast.show({
              text: 'Grupo creado exitosamente',
              type: 'success',
              position: 'bottom',
              duration: 3000
            });
            update['redirect'] = true;
          }
          this.setState(update);
        }
      );
    const initialMsg = groupsRef.child('messages').push();
    initialMsg.set({
      key: initialMsg.key,
      text: `Bienvenido al grupo ${this.state.groupName}`,
      createdAt: new Date(),
      user: {
        id: user.uid,
        name: 'A man'
      }
    });
  };
  render() {
    const {
      groupName,
      topic,
      place,
      description,
      maxMembersQuantity,
      redirect,
      loading
    } = this.state;

    if (redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Icon
              style={{ 'align-self': 'flex-start', backgroundColor: '#fff' }}
              active
              ios="md-arrow-round-back"
              android="md-arrow-round-back"
              style={{ fontSize: 30, width: 30 }}
              onPress={() => this.props.history.goBack()}
            />
          </Left>
          <Right />
        </Header>

        {loading ? (
          <Spinner />
        ) : (
          <Content>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <H1 style={styles.title}>Datos del nuevo grupo</H1>
              <Form>
                <Item floatingLabel>
                  <Label>Nombre del grupo</Label>
                  <Input
                    onChangeText={this.handleChange('groupName')}
                    value={groupName}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Area de conocimiento</Label>
                  <Input
                    onChangeText={this.handleChange('topic')}
                    value={topic}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Sitio de reuniones</Label>
                  <Input
                    onChangeText={this.handleChange('place')}
                    value={place}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Descripción</Label>
                  <Input
                    onChangeText={this.handleChange('description')}
                    value={description}
                    multiline
                    numberOfLines={4}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Limite de miembros</Label>
                  <Input
                    onChangeText={this.handleChange('maxMembersQuantity')}
                    value={maxMembersQuantity}
                    keyboardType="numeric"
                  />
                </Item>
              </Form>
              <View style={styles.button}>
                <Button success onPress={this.handleCreate}>
                  <Text>Crear</Text>
                </Button>
              </View>
            </KeyboardAvoidingView>
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: { alignSelf: 'center', padding: 50 },
  title: {
    paddingTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  }
});
