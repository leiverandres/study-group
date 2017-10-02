import React, { PureComponent } from "react";
import { Image } from "react-native";

import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left
} from "native-base";
import { Link } from "react-router-native";

const datas = [
  {
    name: "Mi perfil",
    route: "/profile",
    iosIcon: "ios-person",
    androidIcon: "md-person"
  },
  {
    name: "Salir",
    route: "/logout",
    iosIcon: "ios-exit",
    androidIcon: "md-exit"
  }
];

class SideBar extends PureComponent {
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <List
            dataArray={datas}
            renderRow={itemData => (
              <ListItem button noBorder>
                <Left>
                  <Icon
                    active
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                    ios={itemData.iosIcon}
                    android={itemData.androidIcon}
                  />
                  <Link to={itemData.route}>
                    <Text>{itemData.name}</Text>
                  </Link>
                </Left>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
