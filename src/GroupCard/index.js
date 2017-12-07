import React, { Component } from 'react';
import { Card, CardItem, Text, Body, View, H2, Button } from 'native-base';
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
      id,
      members
    } = this.props;
    const activeMembers = Object.values(members).reduce((acum, cur) => {
      if (cur) {
        return acum + 1;
      }
    }, 0);
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
            <FontAwesome
              name="group"
              style={{
                color: `${
                  activeMembers < maxMembersQuantity ? '#4caf50' : '#ff5722'
                }`
              }}
            />
            <Text>{`${activeMembers} de ${maxMembersQuantity || 0}`}</Text>
          </View>
          <Link to={`/group/${id}`}>
            <Text style={{ color: '#42a5f5', fontWeight: 'bold' }}>
              Ver grupo
            </Text>
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
