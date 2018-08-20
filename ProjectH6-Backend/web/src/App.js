/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import Splash from './Splash';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import ReportsPage from './pages/ReportsPage';
import ReportPage from './pages/ReportPage';
import SamplesPage from './pages/SamplesPage';
import SamplePage from './pages/SamplePage';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    if (App.Singleton === undefined) {
      App.Singleton = this;
    } else {
      console.error('App.Singleton already exists!');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      Splash.Singleton.remove();
    }, 0);
  }

  render() {
    return (
      <Layout>
        <Layout.Sider className="sider">
          <img src={logo} className="app-logo" alt="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="profile">
              <Link to="/profile">
                <Icon type="user" /><span className="nav-text">Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="samples">
              <Link to="/samples">
                <Icon type="line-chart" /><span className="nav-text">Samples</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="reports">
              <Link to="/reports">
                <Icon type="profile" /><span className="nav-text">Reports</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout className="main">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <Route path="/reset-password/:id" component={ResetPasswordPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/samples" exact component={SamplesPage} />
            <Route path="/samples/:id" component={SamplePage} />
            <Route path="/reports" exact component={ReportsPage} />
            <Route path="/reports/:id" component={ReportPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </Layout>
    )
  }
}
