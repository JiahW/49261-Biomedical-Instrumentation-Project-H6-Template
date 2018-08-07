/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */

import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, NavigatorIOS, TabBarIOS} from 'react-native';
import WelcomeView from './WelcomeView';
import MonitorView from './MonitorView';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: 'welcome'
    };
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item title='Welcome' selected={this.state.selectedView == 'welcome'} onPress={() => {this.setState({selectedView: 'welcome'})}}>
          <NavigatorIOS style={styles.container} initialRoute={{component: WelcomeView, title: 'Welcome'}}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Monitor' selected={this.state.selectedView == 'monitor'} onPress={() => {this.setState({selectedView: 'monitor'})}}>
          <NavigatorIOS style={styles.container} initialRoute={{component: MonitorView, title: 'Monitor'}}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
