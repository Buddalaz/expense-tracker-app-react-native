import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: '',
      isLoading: false
    };
  }

  getUserData() {
    var firstName = this.state.fName;
    var lastName = this.state.lName;
    var email = this.state.email;
    var pass = this.state.password;
    console.log(firstName + " " + lastName + " " + email + " " + pass);
  }

  // https://jsonplaceholder.typicode.com/posts
  // https://localhost:3000/api/v1/userRoute/registerUser

  async postData() {

    // const result = await fetch('http://192.168.1.101:3000/api/v1/userRoute/registerUser', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     fName: this.state.fName,
    //     lName: this.state.lName,
    //     email: this.state.email,
    //     password: this.state.password,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   }
    // });
    // const response = await result.json();
    // console.log(response);

    return await fetch('http://192.168.1.101:3000/api/v1/userRoute/registerUser', {
      method: "POST",
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({
        fName: this.state.fName,
        lName: this.state.lName,
        email: this.state.email,
        password: this.state.password,
      })
    }).then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.dataObj.message === 'success') {
          console.log(data.message);
          this.props.navigation.navigate('LoginForm');
        }
      }).catch((error) => {
        console.log(error);
      });

    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //   method:'GET'
    // })
    // .then((response) => response.json())
    // .then((json) => console.log(json));
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.container2}>
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 30, padding: 30 }}>LET'S SIGN IN FIRST</Text>
        </View>
        <View style={style.container3}>
          <Image
            style={style.imgWrapper}
            source={require('../assets/img/signin-photo.png')}
          />
          <Text style={{ color: 'black', fontSize: 30, padding: 10 }}> SIGN IN FORM </Text>
          <TextInput
            style={style.input}
            placeholder="First Name"
            value={this.state.fName}
            onChangeText={(value) => {
              this.setState({
                fName: value
              })
            }}
          />
          <TextInput
            style={style.input}
            placeholder="Last Name"
            value={this.state.lName}
            onChangeText={(value) => {
              this.setState({
                lName: value
              })
            }}
          />
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
            value={this.state.password}
            onChangeText={(value) => {
              this.setState({
                password: value
              })
            }}
          />
          <View style={[style.activityWrapper]}>
            <ActivityIndicator size="large" color='white' animating={this.state.isLoading} />
          </View>
          <TouchableOpacity
            style={style.button}
            // onPress={()=>{
            //   console.log('button preesd');
            //   console.log(this.state.fName);
            //   console.log(this.state.lName);
            //   console.log(this.state.email);
            //   console.log(this.state.password);
            // }}
            onPress={this.postData.bind(this)}
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
    backgroundColor: '#f1f2f6'
  },
  container3: {
    flex: 13,
    backgroundColor: '#5352ed',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20
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
