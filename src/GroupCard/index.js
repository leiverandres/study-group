import React, { Component } from 'react';
import { Card, CardItem, Text, Body, View, H2 } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'react-router-native';
import { StyleSheet } from 'react-native';

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
      <Card>
        <CardItem header>
          <H2>{name}</H2>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Tema: </Text>
              {topic}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Lugar: </Text>
              {place}
            </Text>
            <Text>{description}</Text>
          </Body>
        </CardItem>
        <CardItem footer style={styles.footer}>
          <View style={styles.usersIcons}>
            <FontAwesome name="group" />
            <Text>{maxMembersQuantity || 0}</Text>
          </View>
          <Link to={`/group/${id}`}>
            <Text>Ver grupo</Text>
          </Link>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'space-around'
  },
  usersIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
