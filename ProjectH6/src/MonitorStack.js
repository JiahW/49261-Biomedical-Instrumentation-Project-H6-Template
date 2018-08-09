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
import MonitorView from './MonitorView';

let MonitorStack = Platform.OS === 'android' ? createStackNavigator(
  {
    Monitor: MonitorView
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => {
        const { routeName } = navigation.state;
        if (routeName == 'Monitor') {
          return <HeaderBackButton backImage={<MaterialIcon name={'menu'} size={24} color={'#000'} style={{margin: 3}}/>} onPress={() => navigation.toggleDrawer()}/>
        }
        return <HeaderBackButton onPress={() => navigation.goBack()}/>
      }
    })
  }
) : createStackNavigator(
  {
    Monitor: MonitorView
  }
);
if (Platform.OS === 'android') {
  MonitorStack.navigationOptions = {drawerLabel: 'Monitor', drawerIcon: ({ tintColor }) => (<Icon name={'heart'} size={24} color={tintColor}/>)}
} else {
  MonitorStack.navigationOptions = {tabBarLabel: 'Monitor'};
}
export default MonitorStack;
