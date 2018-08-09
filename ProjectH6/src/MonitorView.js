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

const sine = [
50,51,52,54,55,56,57,59,60,61,
62,63,65,66,67,68,69,70,71,72,
74,75,76,77,78,79,80,81,82,83,
84,84,85,86,87,88,89,89,90,91,
92,92,93,94,94,95,95,96,96,97,
97,97,98,98,99,99,99,99,99,100,
100,100,100,100,100,100,100,100,100,100,
99,99,99,99,99,98,98,97,97,97,
96,96,95,95,94,94,93,92,92,91,
90,89,89,88,87,86,85,84,84,83,
82,81,80,79,78,77,76,75,74,72,
71,70,69,68,67,66,65,63,62,61,
60,59,57,56,55,54,52,51,50,49,
48,46,45,44,43,41,40,39,38,37,
35,34,33,32,31,30,29,28,26,25,
24,23,22,21,20,19,18,17,16,16,
15,14,13,12,11,11,10,9,8,8,
7,6,6,5,5,4,4,3,3,3,
2,2,1,1,1,1,1,0,0,0,
0,0,0,0,0,0,0,0,1,1,
1,1,1,2,2,3,3,3,4,4,
5,5,6,6,7,8,8,9,10,11,
11,12,13,14,15,16,16,17,18,19,
20,21,22,23,24,25,26,28,29,30,
31,32,33,34,35,37,38,39,40,41,
43,44,45,46,48,49,50,
];

export default class MonitorView extends Component {
  static navigationOptions = {
    title: 'Monitor',
  };

  constructor(props) {
    super(props);
    this.state = {
      intervalID: -1,
      sampling: false,
      index: 0,
      data: sine.slice()
    }
  }

  componentDidMount() {
    this.eventListeners = [
      this.props.navigation.addListener('didFocus', () => this.didFocus()),
      this.props.navigation.addListener('willBlur', () => this.willBlur())
    ];
  }

  componentWillUnmount() {
    this.eventListeners.forEach(eventListener => eventListener.remove());
  }

  didFocus() {
    this.setState({sampling: true});
    this.state.intervalID = setInterval(() => {
      if (!this.state.sampling) {
        return;
      }
      let data = this.state.data;
      let index = this.state.index;
      data.shift();
      data.push(sine[index++]);
      if (index >= sine.length) {
        index = 0;
      }
      this.setState({data: data, index: index});
    }, 200);
  }

  willBlur() {
    this.setState({sampling: false});
    clearInterval(this.state.intervalID);
  }

  render() {
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
        <LineChart style={styles.chart} data={this.state.data} contentInset={{top: 20, bottom: 20}} curve={shape.curveNatural} svg={{strokeWidth: 2, stroke: 'url(#gradient)'}}>
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
