import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Form from './Form';

const Router = StackNavigator({
  Home: { screen: Home },
  Form: { screen: Form },
});

export default Router;
