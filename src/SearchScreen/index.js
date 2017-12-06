import React, { Component } from 'react';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Spinner,
  View,
  Card,
  CardItem,
  H2
} from 'native-base';
import { FlatList } from 'react-native';
import Fuse from 'fuse.js';

import firebaseInstance from '../firebase';
import GroupCard from '../GroupCard';
export default class SearchScreen extends Component {
  state = {
    loading: true,
    searchingText: '',
    groups: [],
    filteredGroups: []
  };

  componentDidMount() {
    firebaseInstance
      .database()
      .ref()
      .child('groups/')
      .once('value', snap => {
        if (snap) {
          let data = [];
          snap.forEach((childSnap, idx) => {
            const item = {
              key: childSnap.key,
              id: childSnap.key,
              ...childSnap.val()
            };

            data.push(item);
          });
          console.warn(data);
          this.setState({ groups: data, loading: false });
          this.fuse = new Fuse(data, {
            keys: ['place', 'topic', 'name']
          });
        }
      });
  }

  handleChange = value => {
    const result = this.fuse.search(value);
    this.setState({ searchingText: value, filteredGroups: result });
  };

  render() {
    const { searchingText, loading, filteredGroups } = this.state;
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="md-search" />
            <Input
              placeholder="Buscar"
              onChangeText={this.handleChange}
              value={searchingText}
              disabled={loading}
            />
            <Icon name="logo-buffer" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Spinner size="large" animating />
          </View>
        ) : filteredGroups.length > 0 ? (
          <FlatList
            contentContainerStyle={{ margin: 15 }}
            data={filteredGroups}
            renderItem={({ item, index }) => {
              return <GroupCard {...item} />;
            }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Card contentContainerStyle={{ margin: 10, height: 200 }}>
              <CardItem>
                <H2 style={{ color: '#757575' }}>
                  Puedes buscar por tema, nombre del grupo o sitio de reunion.
                </H2>
              </CardItem>
            </Card>
          </View>
        )}
      </Container>
    );
  }
}
