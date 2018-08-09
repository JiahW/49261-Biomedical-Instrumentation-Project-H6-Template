/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, HeaderBackButton} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import WelcomeView from './WelcomeView';

let WelcomeStack = Platform.OS === 'android' ? createStackNavigator(
  {
    Welcome: WelcomeView
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => {
        const { routeName } = navigation.state;
        if (routeName == 'Welcome') {
          return <HeaderBackButton backImage={<MaterialIcon name={'menu'} size={24} color={'#000'} style={{margin: 3}}/>} onPress={() => navigation.toggleDrawer()}/>
        }
        return <HeaderBackButton onPress={() => navigation.goBack()}/>
      }
    })
  }
) : createStackNavigator(
  {
    Welcome: WelcomeView
  }
);
if (Platform.OS === 'android') {
  WelcomeStack.navigationOptions = {drawerLabel: 'Welcome', drawerIcon: ({ tintColor }) => (<Icon name={'hand-spock'} size={24} color={tintColor}/>)}
} else {
  WelcomeStack.navigationOptions = {tabBarLabel: 'Welcome'};
}
export default WelcomeStack;
