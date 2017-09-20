import React from "react"
import { StyleSheet, View } from "react-native"
import {
  Form,
  Input,
  Item,
  Container,
  Content,
  Button,
  Text,
  Label
} from "native-base"

import firebaseInstance from "../firebase"

export default class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = fieldName => {
    return value => {
      this.setState({ [fieldName]: value.replace(/\s/gi, "") })
    }
  }

  handleLogin = () => {
    console.warn("trying to login", this.state)
    const { email, password } = this.state
    firebaseInstance
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.warn(`Error: ${errorCode}: ${errorMessage}`)
      })
  }
  render() {
    const { email, password } = this.state
    return (
      <Container style={{ paddingTop: 50, alignItems: "center" }}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Correo electrónico</Label>
              <Input onChangeText={this.handleChange("email")} value={email} />
            </Item>
            <Item floatingLabel>
              <Label>Contraseña</Label>
              <Input
                onChangeText={this.handleChange("password")}
                value={password}
                secureTextEntry
              />
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
