import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.saveExpenses.bind(this);
    this.state = {
      balance: 'RS.234.56',
      id: '',
      email: '',
      fName: '',
      traveling: 0.00,
      food: 0.00
    };
  }

  //get loging user details form the AsyncStorage
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key')
      if (jsonValue != null) {
        // console.log(JSON.parse(jsonValue));
        let data = JSON.parse(jsonValue);
        // console.log(data.data._id);
        this.setState({
          id: data.data._id,
          fName: data.data.fName
        })
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
    console.log(this.state.id);
    console.log(this.state.fName);
    console.log('getting data');
  }

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('key')
      this.props.navigation.navigate('LoginForm');
    } catch (e) {
      // remove error
      console.log(e)
    }
    console.log('Done.')
  }

  //send post request to save expenses for the login user
  async saveExpenses() {

    const date = Date.now();

    const travelValue = parseFloat(this.state.traveling);

    const foodValue = parseFloat(this.state.food);

    console.log(travelValue);
    console.log(foodValue);
    console.log(date);


    this.getData().bind(this);

    // return await fetch('http://192.168.1.101:3000/api/v1/userRoute/updateUserWithExpense', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     id: this.state.id,
    //     date: date,
    //     traveling: travelValue,
    //     food: foodValue,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // }).then((response) => response.json())
    //   .then((json) => {
    //     console.log(json);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }


  render() {
    return (
      <View style={style.container}>
        <View style={style.container2}>
          <View style={style.container2Wrapper}>
            <Text style={{ fontSize: 20 }}>Welcome {this.state.fName}</Text>
            <Text style={style.signOutText} onPress={this.removeValue.bind(this)}>Log Out</Text>
          </View>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 30, padding: 6 }}>{this.state.balance}</Text>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, padding: 10 }}>Total Balance</Text>
        </View>
        <View style={style.container3}>
          <Text style={{ color: 'black', fontSize: 40, padding: 10 }}> Add Expenses </Text>
          <TextInput
            style={style.input}
            placeholder="traveling"
            value={this.state.traveling}
            onChangeText={(value) => {
              this.setState({
                traveling: value
              })
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={style.input}
            placeholder="food"
            value={this.state.food}
            onChangeText={(value) => {
              this.setState({
                food: value
              })
            }}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={style.button}
            onPress={this.saveExpenses.bind(this)}
          >
            <Text>Save</Text>
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
    flex: 4,
    backgroundColor: '#5352ed',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20
  },
  container2Wrapper: {
    flex: 1,
    width: '80%',
    margin: 35,
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container3: {
    flex: 13,
    // backgroundColor:'#5352ed',
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopEndRadius:20,
    // borderTopStartRadius:20
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
    width: '70%',
    color: 'black',
    height: 50,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'gray',
    borderRadius: 12
  },
  container4MainWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '30%',
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    backgroundColor: '#ff4757',
    borderRadius: 12
  },
  signOutText: {
    fontSize: 20
  }
});