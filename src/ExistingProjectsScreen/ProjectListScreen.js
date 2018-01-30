import React from "react";
import { StatusBar } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, 
List, ListItem
} from "native-base";

var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List dataArray={items}
            renderRow={(item) =>
              <ListItem onPress={() => this.props.navigation.navigate("ProjectDetailScreen")}>
                <Text>{item}</Text>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}
