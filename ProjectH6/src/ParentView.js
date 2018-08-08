/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

export default class ParentView extends Component {
  static navigationOptions = {
    title: 'Parent View'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{padding: 20}}>This is the Parent View. Tap on the button below to show the child view.</Text>
        <Icon.Button name="caret-square-right" onPress={() => this.exposeChildView()}>
          <Text style={{color: '#FFFFFF'}}>Expose Child View</Text>
        </Icon.Button>
      </View>
    );
  }

  exposeChildView() {
    this.props.navigation.navigate('Child');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
