import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Expo, { AppLoading } from "expo"
import {
  NativeRouter,
  AndroidBackButton,
  Route,
  Link,
  Switch
} from "react-router-native"
// import * as firebase from "firebase"

import firebaseConfig from "./config/firebaseConfig"
import PrivateRoute from "./src/privateRoute"
import Login from "./src/loginScreen"
import Signup from "./src/signupScreen"
import Home from "./src/home"

// const firebaseApp = firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  state = {
    isReady: false
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })

    this.setState({ isReady: true })
  }
  render() {
    if (this.state.isReady) {
      return (
        <NativeRouter>
          <AndroidBackButton>
            <View style={styles.container}>
              <Switch>
                <Route path="/" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/home" component={Home} />
              </Switch>
            </View>
          </AndroidBackButton>
        </NativeRouter>
      )
    } else {
      return <AppLoading />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
})
