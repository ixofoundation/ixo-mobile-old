import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import sign from '../Sign';

export default class TestSign extends Component<{}> {
  static navigationOptions = {
    title: 'Form',
  };

  state = {
    text: null,
  }

  async onPress() {
    console.log('Signing...');
    const response = await sign(this.state.text);
    // NB: `setTimeout` is used because alert is ignored while in background.
    // The timeout provides enough time for the app to return to foreground.
    setTimeout(() => alert(response), 100);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Field:</Text>
        <TextInput 
          style={{width: '100%'}} 
          onChangeText={text => 
            this.setState({text: text})} 
          placeholder={'value'} />
        <Button 
          title="Test"
          onPress={() => this.onPress()} 
          disabled={!this.state.text || this.state.text === ''} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
