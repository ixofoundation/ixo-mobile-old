import React from "react";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text} from "native-base";
import { StackNavigator} from 'react-navigation';
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Single Project</Title>
            </Body>
            <Right />
          </Header>
        )
      });

      render() {
        const { state, navigate } = this.props.navigation;
        return (
            <Text>{JSON.stringify(state.params)}</Text>
        );
    }
}
