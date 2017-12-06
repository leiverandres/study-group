import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from 'native-base';
import Expo, { AppLoading } from 'expo';
import {
  NativeRouter,
  AndroidBackButton,
  Route,
  Link,
  Switch
} from 'react-router-native';

import firebaseConfig from './config/firebaseConfig';
import PrivateRoute from './src/privateRoute';
import Authentication from './src/authentication';
import Login from './src/loginScreen';
import Logout from './src/logout';
import Signup from './src/signupScreen';
import Home from './src/home';
import AddGroupScreen from './src/addGroupScreen';
import GroupScrean from './src/GroupScreen';

export default class App extends React.Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });

    this.setState({ isReady: true });
  }

  render() {
    if (this.state.isReady) {
      return (
        <NativeRouter>
          <AndroidBackButton>
            <View style={styles.container}>
              <Root>
                <Switch>
                  <Route exact path="/" component={Authentication} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/add-group" component={AddGroupScreen} />
                  <Route path="/group/:id" component={GroupScrean} />
                </Switch>
              </Root>
            </View>
          </AndroidBackButton>
        </NativeRouter>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});
