import React, { Component } from "react"
import { Container, Tab, Tabs, Header } from "native-base"

import MyGroups from "./myGroupsScreen"
import Explore from "./exploreScreen"

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs />
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
