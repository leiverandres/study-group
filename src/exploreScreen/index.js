import React, { Component } from 'react';
import { Container, List, Card } from 'native-base';
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
        <FlatList
          data={groups}
          renderItem={({ item, index }) => {
            return <GroupCard {...item} />;
          }}
        />
      </Container>
    );
  }
}
