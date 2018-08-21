/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, {Component} from 'react';
import {StyleSheet, WebView} from 'react-native';
import Backend from './Backend';

export default class SignUpView extends Component {
  static navigationOptions = {
    title: 'Sign Up'
  };

  render() {
    const url = Backend.SignUpUrl;
    return (
      <WebView source={{uri: url}} />
    )
  }
}

const styles = StyleSheet.create({
});
