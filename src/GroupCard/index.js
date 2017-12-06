import React, { Component } from 'react';
import { Card, CardItem, Text, Body } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'react-router-native';

export default class GroupCard extends Component {
  render() {
    const {
      name,
      topic,
      place,
      description,
      maxMembersQuantity,
      id
    } = this.props;

    return (
      <Card style={{ marginHorizontal: 50 }}>
        <CardItem header>
          <Text>{name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Tema: {topic}</Text>
            <Text>Lugar: {place}</Text>
            <Text>{description}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <FontAwesome name="group" />
          <Text>{maxMembersQuantity || 0}</Text>
          <Link to={`/group/${id}`}>
            <Text>Ver</Text>
          </Link>
        </CardItem>
      </Card>
    );
  }
}
