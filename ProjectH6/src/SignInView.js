/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text, TextInput, Button, ActivityIndicator, Linking} from 'react-native';
import Backend from './Backend';

export default class SignInView extends Component {
  static navigationOptions = {
    title: 'Sign In'
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      hasError: false,
      errorMessage: '',
      loading: false
    };
  }

  render() {
    const { loading, hasError, errorMessage } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <TextInput placeholder='Username' textContentType='username' style={styles.textInput} onChangeText={(userName) => this.setState({userName})} value={this.state.userName} autoCapitalize='none' />
          <TextInput placeholder='Password' textContentType='password' style={styles.textInput} onChangeText={(password) => this.setState({password})} value={this.state.password} autoCapitalize='none' secureTextEntry />
          <View>
            {hasError ? (
              <Text>{errorMessage}</Text>
            ) : (
              <Text />
            )}
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button title='Sign In' onPress={() => this.trySignIn()}/>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Do not have a account? </Text><Button onPress={() => this.exposeSignUp()} title='Sign Up Now' />
          </View>
        </View>
      </SafeAreaView>
    )
  }

  trySignIn() {
    const { userName, password } = this.state;
    this.setState({ hasError: false, loading: true });
    Backend.UserSignIn({
      user: {
        username: userName,
        password: password
      },
      persistent: true
    }, (data) => {
      const { user, error } = data;
      this.setState({ loading: false });
      if (error) {
        this.setState({ hasError: true });
        switch (error) {
          case Backend.Errors.NotFound:
            this.setState({ errorMessage: 'Your username cannot be found.' });
            break;
          case Backend.Errors.PasswordMismatch:
            this.setState({ errorMessage: 'Your password does not match the existing record.' });
            break;
          default:
            this.setState({ errorMessage: `Error Code ${error}` });
        }
      } else {
        this.props.navigation.goBack();
      }
    });
  }

  exposeSignUp() {
    Linking.openURL(Backend.SignUpUrl);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  form: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: '100%',
    height: 30,
    padding: 6,
    borderColor: '#A0A0A0',
    borderWidth: 1
  }
});
