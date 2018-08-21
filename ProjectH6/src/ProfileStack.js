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
import ProfileView from './ProfileView';
import SignInView from './SignInView';
import SignUpView from './SignUpView';

let ProfileStack = Platform.OS === 'android' ? createStackNavigator(
  {
    Profile: ProfileView,
    SignIn: SignInView,
    SignUp: SignUpView
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => {
        const { routeName } = navigation.state;
        if (routeName == 'Profile') {
          return <HeaderBackButton backImage={<MaterialIcon name={'menu'} size={24} color={'#000'} style={{margin: 3}}/>} onPress={() => navigation.toggleDrawer()}/>
        }
        return <HeaderBackButton onPress={() => navigation.goBack()}/>
      }
    })
  }
) : createStackNavigator(
  {
    Profile: ProfileView,
    SignIn: SignInView,
    SignUp: SignUpView
  }
);
if (Platform.OS === 'android') {
  ProfileStack.navigationOptions = {drawerLabel: 'Profile', drawerIcon: ({ tintColor }) => (<Icon name={'user'} size={24} color={tintColor}/>)}
} else {
  ProfileStack.navigationOptions = {tabBarLabel: 'Profile'};
}
export default ProfileStack;
