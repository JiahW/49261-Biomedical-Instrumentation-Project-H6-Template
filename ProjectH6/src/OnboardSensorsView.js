/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, Text} from 'react-native';
import {Accelerometer, Gyroscope, Magnetometer} from "react-native-sensors";

export default class OnboardSensorsView extends Component {
  static navigationOptions = {
    title: 'Onboard Sensors'
  };

  constructor(props) {
    super(props);
    this.state = {
      sampling: false,
      accelerometer: null,
      accelerometerSample: {x: 0, y: 0, z: 0, timestamp: 0},
      gyroscope: null,
      gyroscopeSample: {x: 0, y: 0, z: 0, timestamp: 0},
      magnetometer: null,
      magnetometerSample: {x: 0, y: 0, z: 0, timestamp: 0}
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

    if (this.state.accelerometer === null) {
      new Accelerometer({
        updateInterval: 100 // 100ms
      }).then(observable => {
        this.setState({accelerometer: observable});
        observable.subscribe(({x, y, z, timestamp}) => {
          if (!this.state.sampling) {
            return;
          }
          this.setState({accelerometerSample: {x, y, z, timestamp}});
        });
      }).catch(error => {
        this.setState({accelerometer: false});
      });
    } else if (this.state.accelerometer !== false) {
      this.state.accelerometer.start();
    }

    if (this.state.gyroscope === null) {
      new Gyroscope({
        updateInterval: 100 // 100ms
      }).then(observable => {
        this.setState({gyroscope: observable});
        observable.subscribe(({x, y, z, timestamp}) => {
          if (!this.state.sampling) {
            return;
          }
          this.setState({gyroscopeSample: {x, y, z, timestamp}});
        });
      }).catch(error => {
        this.setState({gyroscope: false});
      });
    } else if (this.state.gyroscope !== false) {
      this.state.gyroscope.start();
    }

    if (this.state.magnetometer === null) {
      new Magnetometer({
        updateInterval: 100 // 100ms
      }).then(observable => {
        this.setState({magnetometer: observable});
        observable.subscribe(({x, y, z, timestamp}) => {
          if (!this.state.sampling) {
            return;
          }
          this.setState({magnetometerSample: {x, y, z, timestamp}});
        });
      }).catch(error => {
        this.setState({magnetometer: false});
      });
    } else if (this.state.magnetometer !== false) {
      this.state.magnetometer.start();
    }
  }

  willBlur() {
    this.setState({sampling: false});

    if (this.state.accelerometer) {
      this.state.accelerometer.stop();
    }

    if (this.state.gyroscope) {
      this.state.gyroscope.stop();
    }

    if (this.state.magnetometer) {
      this.state.magnetometer.stop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderAccelerometer()}
        {this.renderGyroscope()}
        {this.renderMagnetometer()}
      </View>
    )
  }

  renderAccelerometer() {
    const content = this.state.accelerometer === null ? (
      <Text>Checking</Text>
    ) : this.state.accelerometer === false ? (
      <Text>Not Available</Text>
    ) : (
      <View>
        <Text>Timestamp {this.state.accelerometerSample.timestamp}</Text>
        <Text style={styles.xAxis}>X {this.state.accelerometerSample.x}</Text>
        <Text style={styles.yAxis}>Y {this.state.accelerometerSample.y}</Text>
        <Text style={styles.zAxis}>Z {this.state.accelerometerSample.z}</Text>
      </View>
    )

    return (
      <View style={styles.sensor}>
        <Text style={styles.sensorName}>Accelerometer</Text>
        {content}
        <Text>in acceleration (m/s²)</Text>
      </View>
    )
  }

  renderGyroscope() {
    const content = this.state.gyroscope === null ? (
      <Text>Checking</Text>
    ) : this.state.gyroscope === false ? (
      <Text>Not Available</Text>
    ) : (
      <View>
        <Text>Timestamp {this.state.gyroscopeSample.timestamp}</Text>
        <Text style={styles.xAxis}>X {this.state.gyroscopeSample.x}</Text>
        <Text style={styles.yAxis}>Y {this.state.gyroscopeSample.y}</Text>
        <Text style={styles.zAxis}>Z {this.state.gyroscopeSample.z}</Text>
      </View>
    )

    return (
      <View style={styles.sensor}>
        <Text style={styles.sensorName}>Gyroscope</Text>
        {content}
        <Text>in angular velocity (rad/s)</Text>
      </View>
    )
  }

  renderMagnetometer() {
    const content = this.state.magnetometer === null ? (
      <Text>Checking</Text>
    ) : this.state.magnetometer === false ? (
      <Text>Not Available</Text>
    ) : (
      <View>
        <Text>Timestamp {this.state.magnetometerSample.timestamp}</Text>
        <Text style={styles.xAxis}>X {this.state.magnetometerSample.x}</Text>
        <Text style={styles.yAxis}>Y {this.state.magnetometerSample.y}</Text>
        <Text style={styles.zAxis}>Z {this.state.magnetometerSample.z}</Text>
      </View>
    )

    return (
      <View style={styles.sensor}>
        <Text style={styles.sensorName}>Magnetometer</Text>
        {content}
        <Text>in geomagnetic field strength (µT)</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sensor: {
    flex: 1,
    padding: 20,
  },
  xAxis: {
    color: '#FF0000',
  },
  yAxis: {
    color: '#00FF00',
  },
  zAxis: {
    color: '#0000FF',
  },
  sensorName: {
    fontSize: 20,
  }
});
