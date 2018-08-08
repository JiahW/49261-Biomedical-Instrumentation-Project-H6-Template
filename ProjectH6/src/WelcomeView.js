/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class WelcomeView extends Component {
  static navigationOptions = {
    title: 'Welcome'
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 50, height: 50}} source={require('./img/react-logo.png')}></Image>
        <Text style={styles.welcome}>Welcome to Project H6 App Template!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

let WelcomeStack = createStackNavigator({WelcomeView});
WelcomeStack.navigationOptions = {tabBarLabel: 'Welcome'};

export default WelcomeStack;
