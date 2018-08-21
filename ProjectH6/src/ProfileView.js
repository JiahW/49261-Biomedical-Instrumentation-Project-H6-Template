/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, {Component} from 'react';
import {Platform, ActivityIndicator} from 'react-native';
import {StyleSheet, SafeAreaView, View, FlatList, Text} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Backend from './Backend';

export default class ProfileView extends Component {
  static navigationOptions = {
    title: 'Profile'
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profileData: []
    };
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
    this.setState({ loading: true });
    Backend.UserProfile((data) => {
      let { user, profile, error } = data;
      if (error) {
        switch (error) {
          case Backend.Errors.Unauthorized:
            this.props.navigation.navigate('SignIn');
            break;
          default:
            break;
        }
      } else {
        this.setState({
          loading: false,
          profileData: [
            {
              label: 'Username',
              value: user.username
            },
            {
              label: 'Name',
              value: `${profile.firstname} ${profile.lastname}`
            },
            {
              label: 'Gender',
              value: profile.gender
            },
            {
              label: 'Birthday',
              value: profile.birthday
            },
            {
              label: 'E-mail Address',
              value: profile.email_address
            },
            {
              label: 'Telephone Number',
              value: profile.telephone_number
            }
          ]
        });
      }
    });
  }

  willBlur() {

  }

  render() {
    const { loading, profileData } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          {loading ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator />
            </View>
          ) : (
            <List>
              <FlatList
                renderItem={({item}) => (
                  <ListItem key={item.label} title={item.label} rightTitle={item.value} hideChevron/>
                )}
                data={profileData}
              />
            </List>
          )}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
