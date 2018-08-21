/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import Backend from './src/Backend';
import {name as appName} from './app.json';

/**
 * TODO: Change API.BaseUrl to actual backend entry points before release!
 */
Backend.BaseUrl = 'http://127.0.0.1:7266';
Backend.SignUpUrl = 'http://127.0.0.1:7260/sign-up';
AppRegistry.registerComponent(appName, () => App);
