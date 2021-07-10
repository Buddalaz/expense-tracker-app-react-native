import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Expenses from './components/Expenses';
import Chart from './components/Chart';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    createBottomTabs = () => {
      return <Tab.Navigator
        keyboardHidesTabBar={true}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: { fontSize: 20 },
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Expenses" component={Expenses} />
        <Tab.Screen name="Chart" component={Chart} />
      </Tab.Navigator>
    }

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginForm" component={LoginForm} />
          <Stack.Screen name="SignUpForm" component={SignUpForm} />
          <Stack.Screen name="Tab Navigation" children={createBottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#686de0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  view2: {
    flex: 0.2,
    width: '75%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
  }
});
