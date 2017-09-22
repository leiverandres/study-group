import React, { Component } from "react"
import { Container, Tab, Tabs, Header, Left, Button, Right } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"

import MyGroups from "./myGroupsScreen"
import Explore from "./exploreScreen"

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => console.warn("pressed left menu")}
            >
              <MaterialIcons size={40} name="menu" />
            </Button>
          </Left>
          <Right />
        </Header>
        <Tabs initialPage={1}>
          <Tab heading="Mis Grupos">
            <MyGroups />
          </Tab>
          <Tab heading="Explorar">
            <Explore />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}
