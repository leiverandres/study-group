import React, { Component } from 'react';
import {
  Container,
  Tab,
  Tabs,
  Header,
  Left,
  Button,
  Right,
  Drawer,
  Icon
} from 'native-base';
import { Route, Link } from 'react-router-native';

import SideBar from './sidebar';
import MyGroups from './myGroupsScreen';
import Explore from './exploreScreen';
import AddGroupScreen from './addGroupScreen';

export default class Home extends Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar />}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header hasTabs>
            <Left>
              <Icon
                active
                ios="ios-menu"
                android="md-menu"
                style={{ fontSize: 35, width: 30 }}
                onPress={() => this.openDrawer()}
              />
            </Left>
            <Right>
              <Link to="/search-group">
                <Icon
                  active
                  ios="ios-search"
                  android="md-search"
                  style={{ fontSize: 35, width: 30 }}
                />
              </Link>
            </Right>
          </Header>
          <Tabs initialPage={0}>
            <Tab heading="Mis Grupos">
              <MyGroups url={this.props.match.url} />
            </Tab>
            <Tab heading="Explorar">
              <Explore />
            </Tab>
          </Tabs>
        </Container>
      </Drawer>
    );
  }
}
