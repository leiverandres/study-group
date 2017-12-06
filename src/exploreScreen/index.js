import React, { Component } from 'react';
import { Container, List, Card, View, CardItem, H2 } from 'native-base';
import { FlatList } from 'react-native';

import GroupCard from '../GroupCard';
import firebaseInstance from '../firebase';

export default class Explore extends Component {
  state = {
    groups: []
  };

  componentDidMount() {
    const loggedUser = firebaseInstance.auth().currentUser;
    firebaseInstance
      .database()
      .ref()
      .child('groups/')
      .once('value', snap => {
        if (snap) {
          const data = [];
          snap.forEach((childSnap, idx) => {
            const item = {
              key: childSnap.key,
              id: childSnap.key,
              ...childSnap.val()
            };
            if (!item.members[loggedUser.uid]) {
              data.push(item);
            }
          });
          this.setState({ groups: data });
        }
      });
  }
  render() {
    const { groups } = this.state;
    return (
      <Container>
        {groups.length > 0 ? (
          <FlatList
            contentContainerStyle={{ margin: 15 }}
            data={groups}
            renderItem={({ item, index }) => {
              return <GroupCard {...item} />;
            }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Card style={{ margin: 10, height: 200 }}>
              <CardItem>
                <H2 style={{ color: '#757575' }}>
                  Lo sentimos, pero en este momento no hay más grupos :(. Vuelve
                  después, tal vez tengas más suerte.
                </H2>
              </CardItem>
            </Card>
          </View>
        )}
      </Container>
    );
  }
}
