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
import ParentView from './ParentView';
import ChildView from './ChildView';

let ParentStack = Platform.OS === 'android' ? createStackNavigator(
  {
    Parent: ParentView,
    Child: ChildView
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => {
        const { routeName } = navigation.state;
        if (routeName == 'Parent') {
          return <HeaderBackButton backImage={<MaterialIcon name={'menu'} size={24} color={'#000'} style={{margin: 3}}/>} onPress={() => navigation.toggleDrawer()}/>
        }
        return <HeaderBackButton onPress={() => navigation.goBack()}/>
      }
    })
  }
) : createStackNavigator(
  {
    Parent: ParentView,
    Child: ChildView
  }
);
if (Platform.OS === 'android') {
  ParentStack.navigationOptions = {drawerLabel: 'Parent View', drawerIcon: ({ tintColor }) => (<Icon name={'paper-plane'} size={24} color={tintColor}/>)}
} else {
  ParentStack.navigationOptions = {tabBarLabel: 'Parent View'};
}
export default ParentStack;
