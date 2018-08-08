/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import {createStackNavigator} from 'react-navigation';
import ParentView from './ParentView';
import ChildView from './ChildView';

let ParentStack = createStackNavigator(
  {
    Parent: ParentView,
    Child: ChildView
  }
);
ParentStack.navigationOptions = {tabBarLabel: 'Parent View'};
export default ParentStack;
