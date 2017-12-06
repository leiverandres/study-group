import React from 'react';
import { Container, Content, Text, Button, H2, Icon } from 'native-base';
import { FlatList, View } from 'react-native';
import { Link } from 'react-router-native';
import { StyleSheet } from 'react-native';

import GroupCard from '../GroupCard';
import firebaseInstance from '../firebase';

const AddGroupButton = () => {
  return (
    <Button
      bordered
      iconRight
      info
      style={{ marginVertical: 20, alignSelf: 'center' }}
    >
      <Link to="/add-group">
        <Text>Añadir grupo</Text>
      </Link>
      <Link to="/add-group">
        <Icon ios="ios-add" android="md-add" name="md-add" />
      </Link>
    </Button>
  );
};

export default class GroupsList extends React.Component {
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
          const data = [{ key: 0 }];
          snap.forEach((childSnap, idx) => {
            const item = {
              key: childSnap.key,
              id: childSnap.key,
              ...childSnap.val()
            };
            if (item.members[loggedUser.uid]) {
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
        <Content>
          {groups.length > 1 ? (
            <FlatList
              contentContainerStyle={{ margin: 15 }}
              data={groups}
              renderItem={({ item, index }) => {
                if (index === 0) {
                  return <AddGroupButton />;
                } else {
                  return <GroupCard {...item} />;
                }
              }}
            />
          ) : (
            <View style={styles.messageContainer}>
              <H2 style={styles.messageTitle}>No hay grupos</H2>
              <Text style={styles.messageBody}>
                No eres miembro de ningún grupo de estudio, ve a explorar y
                encuentra un grupo para ti o inicia uno nuevo!
              </Text>
              <AddGroupButton />
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 2,
    marginTop: 20
  },
  messageTitle: {
    color: 'dimgray'
  },
  messageBody: {
    color: 'dimgray',
    marginHorizontal: 25,
    textAlign: 'center'
  }
});
