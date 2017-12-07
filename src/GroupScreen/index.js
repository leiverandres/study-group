import React, { Component } from 'react';
import {
  Container,
  Header,
  Body,
  Left,
  Title,
  Content,
  H1,
  Card,
  CardItem,
  Spinner,
  Text,
  View,
  Button,
  Toast,
  Tabs,
  Tab,
  Grid,
  Row,
  Form,
  Item,
  Input,
  Icon
} from 'native-base';
import { KeyboardAvoidingView, FlatList } from 'react-native';

import firebaseInstance from '../firebase';
import GroupCard from '../GroupCard/index';
import ChatView from './ChatView';

const ORIENTATION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

export default class GroupScreen extends Component {
  state = {
    loading: true,
    data: {},
    loggedUser: {}
  };

  componentDidMount() {
    const loggedUser = firebaseInstance.auth().currentUser;
    const groupID = this.props.match.params.id;
    const ref = firebaseInstance
      .database()
      .ref()
      .child(`groups/${groupID}`)
      .on('value', snap => {
        if (snap) {
          this.setState({ data: snap.val() });
        }
        this.setState({ loading: false, loggedUser: loggedUser });
      });
  }

  joinUser = () => {
    this.setState({ loading: true });
    const { loggedUser } = this.state;
    const groupID = this.props.match.params.id;
    firebaseInstance
      .database()
      .ref()
      .child(`groups/${groupID}`)
      .transaction(
        group => {
          if (group) {
            group.members[loggedUser.uid] = true;
          }
          return group;
        },
        err => {
          if (err) {
            Toast.show({
              text: 'Problemas agregandote al este grupo :(',
              type: 'danger',
              position: 'bottom',
              duration: 3000
            });
          } else {
            Toast.show({
              text: 'Te has unido a este grupo!',
              type: 'success',
              position: 'bottom',
              duration: 3000
            });
          }
          this.setState({ loading: false });
        }
      );
  };

  leaveUser = () => {
    this.setState({ loading: true });
    const { loggedUser } = this.state;
    const groupID = this.props.match.params.id;
    firebaseInstance
      .database()
      .ref()
      .child(`groups/${groupID}`)
      .transaction(
        group => {
          if (group) {
            group.members[loggedUser.uid] = false;
          }
          return group;
        },
        err => {
          if (err) {
            Toast.show({
              text: 'Problemas saliendo de este grupo :(',
              type: 'danger',
              position: 'bottom',
              duration: 3000
            });
          } else {
            Toast.show({
              text: 'Has salido del grupo exitosamente',
              type: 'success',
              position: 'bottom',
              duration: 3000
            });
          }
          this.setState({ loading: false });
        }
      );
  };
  render() {
    const { data, loading, loggedUser } = this.state;
    const isDataEmpty = Object.keys(data).length === 0;
    let isThereRoom = false;
    if (!isDataEmpty) {
      const max = data.maxMembersQuantity;
      const currentMembers = Object.keys(data.members).length;
      isThereRoom = currentMembers < max;
    }
    return (
      <Container>
        <KeyboardAvoidingView
          keyboardVerticalOffset={25}
          behavior="padding"
          style={{ flex: 1 }}
        >
          <Header hasTabs>
            <Left style={{ flex: 1 }}>
              <Icon
                style={{ 'align-self': 'flex-start', backgroundColor: '#fff' }}
                active
                ios="md-arrow-round-back"
                android="md-arrow-round-back"
                style={{ fontSize: 30, width: 30 }}
                onPress={() => this.props.history.goBack()}
              />
            </Left>
            <Body style={{ flex: 4 }}>
              <Title>{(!isDataEmpty && data.name) || ''}</Title>
            </Body>
          </Header>
          {loading ? (
            <Spinner
              size="large"
              style={{
                alignSelf: 'center',
                height: 500
              }}
            />
          ) : (
            <Tabs>
              <Tab heading="Info">
                <View style={{ flex: 2 }}>
                  <Card>
                    <CardItem>
                      <Text style={{ fontWeight: 'bold' }}>Materia:</Text>
                      <Text>{data.topic}</Text>
                    </CardItem>
                    <CardItem>
                      <Text style={{ fontWeight: 'bold' }}>Reuniones:</Text>
                      <Text>{data.place}</Text>
                    </CardItem>
                  </Card>
                  <Card style={{ alignItems: 'flex-start' }}>
                    <CardItem
                      style={{
                        flexDirection: 'column'
                      }}
                    >
                      <Text style={{ fontWeight: 'bold' }}>Descripción</Text>
                      <Text>{data.description}</Text>
                    </CardItem>
                  </Card>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end'
                  }}
                >
                  {!data.members[loggedUser.uid] && (
                    <Button
                      full
                      disabled={!isThereRoom}
                      success={isThereRoom}
                      style={{ bottom: 0 }}
                    >
                      <Text onPress={this.joinUser}>Unirse</Text>
                    </Button>
                  )}
                  {data.members[loggedUser.uid] && (
                    <Button full danger style={{}}>
                      <Text onPress={this.leaveUser}>Salir del grupo</Text>
                    </Button>
                  )}
                </View>
              </Tab>
              <Tab heading="Chat">
                {data.members[loggedUser.uid] ? (
                  <ChatView
                    currentUser={this.state.loggedUser}
                    currentGroup={this.props.match.params.id}
                  />
                ) : (
                  <Card>
                    <CardItem style={{ flexDirection: 'column' }}>
                      <Text style={{ fontWeight: 'bold' }}>
                        No puedes acceder a esta infomación
                      </Text>
                      <Icon name="md-sad" style={{ fontSize: 30 }} />
                    </CardItem>
                  </Card>
                )}
              </Tab>
            </Tabs>
          )}
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
