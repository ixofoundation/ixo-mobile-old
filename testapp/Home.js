import React from 'react';
import { 
    Button,
    Platform
} from 'react-native';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
  }

  onPress() {
      const { navigate } = this.props.navigation;
      navigate('Form');
  }

  render() {
    return <Button title='New Form' onPress={() => this.onPress()} />
  }
}

export default Home;
