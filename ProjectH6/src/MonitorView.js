/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */

import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import * as shape from 'd3-shape';
import {LineChart, Grid} from 'react-native-svg-charts';
import {createStackNavigator} from 'react-navigation';

class MonitorView extends Component {
  static navigationOptions = {
    title: 'Monitor',
  };

  render() {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'0%'} stopColor={'rgb(103, 58, 183)'}/>
          <Stop offset={'100%'} stopColor={'rgb(233, 30, 99)'}/>
        </LinearGradient>
      </Defs>
    );
    return (
      <SafeAreaView style={styles.container}>
        <LineChart style={styles.chart} data={data} contentInset={{top: 20, bottom: 20}} curve={shape.curveNatural} svg={{strokeWidth: 2, stroke: 'url(#gradient)'}}>
          <Grid/>
          <Gradient/>
        </LineChart>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Code Me</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1
  },
});

let MonitorStack = createStackNavigator({MonitorView});
MonitorStack.navigationOptions = {tabBarLabel: 'Monitor'};

export default MonitorStack;
