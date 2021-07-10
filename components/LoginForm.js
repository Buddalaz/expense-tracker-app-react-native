import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      hidePassword: true,
      isLoading: false
    };
  }

  // setPasswordVisibility = () => {
  //   this.setState({ hidePassword: !this.state.hidePassword });
  // }

  async checkLogin() {

    this.setState({
      isLoading: true
    });

    let data = {
      email: this.state.email,
      password: this.state.pass
    }

    var myHeaders = new Headers();
    myHeaders.append("email", data.email);
    myHeaders.append("password", data.password);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    // http://192.168.1.101:3000/api/v1/userRoute/login

    return await fetch('http://192.168.1.101:3000/api/v1/userRoute/login', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // console.log(json.data.email);
        // console.log(json.data.password);
        if (json.message == 'success') {
          if (json !== null) {
            if (data.email === json.data.email && data.password === json.data.password) {
              this.setState({
                isLoading: false
              })

              this.props.navigation.navigate('Tab Navigation');
              this.storeData(json).bind(this);
            } else {
              alert(json.message);
            }
          }
        } else {
          this.setState({
            isLoading: false
          })
          alert(json.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('key', jsonValue)
      console.log(value);
      console.log('data saved');
    } catch (e) {
      // saving error
      console.log(e);
    }
    console.log('data saved');
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.container2}>
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 30, padding: 30 }}>Welcome To Login Screen</Text>
        </View>
        <View style={style.container3}>
          <Image
            style={style.imgWrapper}
            source={require('../assets/img/login-vector.png')}
          />
          <Text style={{ color: 'black', fontSize: 30, padding: 10 }}> LoginForm </Text>
          <TextInput
            style={style.input}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(value) => {
              this.setState({
                email: value
              })
            }}
          />
          <TextInput
            style={style.input}
            placeholder="Password"
            value={this.state.pass}
            onChangeText={(value) => {
              this.setState({
                pass: value
              })
            }}
          // onPress={this.setPasswordVisibility.bind(this)}
          />
          <Text style={{ color: 'black', fontSize: 20, padding: 10 }} onPress={() => {
            console.log('Text Clicked');
          }}>Forget Your password?</Text>
          <View style={[style.activityWrapper]}>
            <ActivityIndicator size="large" color='white' animating={this.state.isLoading} />
          </View>
          <TouchableOpacity
            style={style.button}
            // this.props.navigation.navigate('Tab Navigation');
            // console.log('Login button preesd');
            // ? this.props.navigation.navigate('Tab Navigation') : console.log('Login button preesd')
            onPress={this.checkLogin.bind(this)}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() => {
              console.log('Sign in button preesd');
              this.props.navigation.navigate('SignUpForm');
            }}
          >
            <Text>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe4ea',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  container2: {
    flex: 2,
    backgroundColor: '#f1f2f6',
    zIndex: 0
  },
  container3: {
    flex: 13,
    backgroundColor: '#5352ed',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    zIndex: 0
  },
  container4: {
    flex: 2,
    backgroundColor: '#ff4757',
  },
  imgWrapper: {
    width: '60%',
    height: '30%'
  },
  input: {
    width: '50%',
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  container4MainWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '50%',
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    backgroundColor: '#ff4757',
    borderRadius: 12
  },
  activityWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  }
});
