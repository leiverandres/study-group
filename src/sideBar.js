import React, { Component } from 'react';
import { Image } from 'react-native';

import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Button,
  View
} from 'native-base';
const drawerCover = require('./img/logo_with_name.png');

const datas = [
  {
    name: 'Anatomy',
    route: 'Anatomy',
    icon: 'phone-portrait',
    bg: '#C5F442'
  },
  {
    name: 'Actionsheet',
    route: 'Actionsheet',
    icon: 'easel',
    bg: '#C5F442'
  }
];
const deviceHeight = Dimensions.get('window').height;
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/study-group-57d2c.appspot.com/o/logo_with_name.png?alt=media&token=779fc20d-6eda-4b76-9e78-c7e640a65832'
              }}
              style={{
                alignSelf: 'stretch',
                height: deviceHeight / 3.5,
                width: null,
                position: 'relative',
                marginBottom: 10
              }}
            />
          </View>
          <View style={{ flex: 6 }}>
            <List
              dataArray={datas}
              renderRow={data => (
                <ListItem
                  button
                  noBorder
                  onPress={() => this.props.navigation.navigate(data.route)}
                >
                  <Left>
                    <Icon
                      active
                      name={data.icon}
                      style={{ color: '#777', fontSize: 26, width: 30 }}
                    />
                    <Text>{data.name}</Text>
                  </Left>
                  {data.types && (
                    <Right style={{ flex: 1 }}>
                      <Badge
                        style={{
                          borderRadius: 3,
                          height: 25,
                          width: 72,
                          backgroundColor: data.bg
                        }}
                      >
                        <Text>{`${data.types} Types`}</Text>
                      </Badge>
                    </Right>
                  )}
                </ListItem>
              )}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
