import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Expo, { AppLoading } from "expo"
import { NativeRouter, Route, Link } from "react-router-native"
import * as firebase from "firebase"

import firebaseConfig from "./config/firebaseConfig"
import Login from "./src/loginScreen/login"
import GroupsList from "./src/myGroupsScreen/groupsList"

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
          <View style={styles.container}>
            <Link to="/login">
              <Text> Ir al login </Text>
            </Link>
            <Link to="/myGroups">
              <Text> Lista de grupos </Text>
            </Link>
            <Route exact path="/login" component={Login} />
            <Route exact path="/myGroups" component={GroupsList} />
          </View>
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
