/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { createBottomTabNavigator } from 'react-navigation';
import WelcomeStack from './WelcomeView';
import MonitorStack from './MonitorView';
import ParentStack from './ParentStack';

const AppNavigator = createBottomTabNavigator(
  {
    Welcome: WelcomeStack,
    Monitor: MonitorStack,
    Parent: ParentStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Welcome':
            iconName = 'hand-spock';
            break;
          case 'Monitor':
            iconName = 'heart';
            break;
          case 'Parent':
            iconName = 'paper-plane';
            break;
          default:
        }
        return <Icon name={iconName} size={24} color={tintColor}/>;
      }
    })
  }
);

export default class App extends Component {
  render() {
    return (
      <AppNavigator ref={navigator => {this.navigator = navigator}}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
