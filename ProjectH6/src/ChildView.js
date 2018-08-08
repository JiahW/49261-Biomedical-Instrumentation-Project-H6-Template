/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class ChildView extends Component {
  static navigationOptions = {
    title: 'Child View'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, margin: 10}}>Hooray! You found the child view.</Text>
        <Text>Good Job 👍</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
