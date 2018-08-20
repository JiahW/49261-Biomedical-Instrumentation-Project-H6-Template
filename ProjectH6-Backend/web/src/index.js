/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import Splash from './Splash';
import App from './App';
import API from './API';
import './Style.css';
import registerServiceWorker from './registerServiceWorker';

/**
 * TODO: Change API.BaseUrl to actual API entry point before release!
 */
API.BaseUrl = 'http://127.0.0.1:7266';

ReactDOM.render(<Splash />, document.getElementById('splash'));
ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
