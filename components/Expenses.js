import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      email: ''
    };
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>{ }</Text>
          <Text>{ }</Text>
          <Text>{ }</Text>
          <Text>{ }</Text>
        </View>
      </View>
    )
  }

  // async componentDidMount() {
  //   this.focusListener = this.props.navigation.addListener('didFocus', () => {
  //     this.fetchData()
  //   })
  // }

  // // and don't forget to remove the listener
  // componentWillUnmount() {
  //   this.focusListener.remove()
  // }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key')
      if (jsonValue != null) {
        // console.log(JSON.parse(jsonValue));
        let data = JSON.parse(jsonValue);
        console.log(data.data.email);
        this.setState({
          email: data.data.email
        })
        console.log(this.state.email)
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
    console.log('getting data');
  }

  async fetchData() {
    fetch('http://192.168.1.101:3000/api/v1/userRoute/getUserExpenses/' + this.state.email, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        // this.setState({
        //   dataSource: json
        // })
        console.log(json);
      });
  }


  render() {
    return (
      <View style={style.container}>
        <View style={style.contentTopWrapper}>
          {/* <FlatList
          keyExtractor={(item, index) => index}
          data={this.state.dataSource}
          renderItem={this.renderItem}
        /> */}
        </View>
        <View style={style.contentBottomWrapper}>
          {/* <Text> Expenses </Text> */}
          <TouchableOpacity
            style={style.button}
            onPress={this.getData.bind(this)}
          >
            <Text>Get ID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={this.fetchData.bind(this)}
          >
            <Text>Get Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#dfe4ea',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentTopWrapper: {
    flex: 12,
    backgroundColor: '#1abc9c',
  },
  contentBottomWrapper: {
    flex: 2,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    width: '50%',
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    backgroundColor: '#ff4757',
  }
});
