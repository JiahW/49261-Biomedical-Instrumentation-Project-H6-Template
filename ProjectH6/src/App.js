/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {createDrawerNavigator, createBottomTabNavigator} from 'react-navigation';
import WelcomeStack from './WelcomeStack';
import MonitorStack from './MonitorStack';
import ParentStack from './ParentStack';

const AppNavigator = Platform.OS === 'android' ? createDrawerNavigator(
  {
    Welcome: WelcomeStack,
    Monitor: MonitorStack,
    Parent: ParentStack
  }
) : createBottomTabNavigator(
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
