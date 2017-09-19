import React from "react"
import { StyleSheet, View } from "react-native"
import {
  Form,
  Input,
  Item,
  Container,
  Content,
  Button,
  Text
} from "native-base"

export default class Login extends React.Component {
  handleLogin() {
    console.warn("trying to login")
  }
  render() {
    return (
      <Container style={{ paddingTop: 50, alignItems: "center" }}>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          </Form>
          <View style={{ alignSelf: "center", paddingTop: 50 }}>
            <Button onPress={this.handleLogin}>
              <Text>Entrar</Text>
            </Button>
          </View>
          <Text style={{ paddingTop: 50 }}>¿No tienes cuenta? Registrate!</Text>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
