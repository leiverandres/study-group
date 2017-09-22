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

import firebaseConfig from "./config/firebaseConfig"
import PrivateRoute from "./src/privateRoute"
import Authentication from "./src/authentication"
import Login from "./src/loginScreen"
import Logout from "./src/logout"
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
              <Link to="/logout">
                <Text>Logout!!</Text>
              </Link>
              <Switch>
                <Route exact path="/" component={Authentication} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/signup" component={Signup} />
                {/* <PrivateRoute exact path="/home" component={Home} /> */}
                <Route exact path="/home" component={Home} />
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
