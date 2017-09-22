import React from "react"
import {
  Container,
  List,
  ListItem,
  Card,
  CardItem,
  Text,
  Body
} from "native-base"
import { FlatList } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

const fakeGroupsList = [
  {
    key: 1,
    name: "Matematicoss UTP",
    subject: "Matematicas",
    meetingPlace: "UTP",
    description: "Reuniones para estudiar matematicas 1",
    members: 10
  },
  {
    key: 2,
    name: "Lectura clasica",
    subject: "Literatura",
    meetingPlace: "Universidad Nacional",
    description: "Estudio de literatura clasica",
    members: 10
  },
  {
    key: 3,
    name: "Física UTP",
    subject: "Física",
    meetingPlace: "UTP",
    description:
      "Fisica cuantica cada martes y jueves de 4 a 6 pm, en la biblioteca ROA",
    members: 10
  }
]

export default class GroupsList extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Container>
        <FlatList
          data={fakeGroupsList}
          renderItem={({ item }) => (
            <Card style={{ marginHorizontal: 20 }}>
              <CardItem header>
                <Text>{item.name}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Tema: {item.subject}</Text>
                  <Text>Lugar: {item.meetingPlace}</Text>
                  <Text>{item.description}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <FontAwesome name="group" />
                <Text>{item.members}</Text>
              </CardItem>
            </Card>
          )}
        />
      </Container>
    )
  }
}
