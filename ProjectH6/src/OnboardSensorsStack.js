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
import OnboardSensorsView from './OnboardSensorsView';

let OnboardSensorsStack = Platform.OS === 'android' ? createStackNavigator(
  {
    OnboardSensors: OnboardSensorsView
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => {
        const { routeName } = navigation.state;
        if (routeName == 'OnboardSensors') {
          return <HeaderBackButton backImage={<MaterialIcon name={'menu'} size={24} color={'#000'} style={{margin: 3}}/>} onPress={() => navigation.toggleDrawer()}/>
        }
        return <HeaderBackButton onPress={() => navigation.goBack()}/>
      }
    })
  }
) : createStackNavigator(
  {
    OnboardSensors: OnboardSensorsView
  }
);
if (Platform.OS === 'android') {
  OnboardSensorsStack.navigationOptions = {drawerLabel: 'Onboard Sensors', drawerIcon: ({ tintColor }) => (<Icon name={'compass'} size={24} color={tintColor}/>)}
} else {
  OnboardSensorsStack.navigationOptions = {tabBarLabel: 'Onboard Sensors'};
}
export default OnboardSensorsStack;
