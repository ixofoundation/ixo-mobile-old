import React from "react";
import { StatusBar } from "react-native";
import {
  Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem,
  List, ListItem, Thumbnail
} from "native-base";
import ExistingProjectsData from '../Data/ExistingProjectsData.js';

var items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  _renderRow = (item, _, index) => {
    return (
      <ListItem 
        item={item}
        index={index} 
        onPress={() => this.props.navigation.navigate("ProjectDetailScreen", ExistingProjectsData[index])}>
        <Thumbnail square size={80} source={{ uri: 'https://cdn.xl.thumbs.canstockphoto.com/example-blue-square-stamp-isolated-on-white-background-clip-art_csp23367728.jpg' }} />
        <Body>
          <Text>Sankhadeep</Text>
          <Text note>Its time to build a difference . .</Text>
        </Body>
      </ListItem>
    );
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
          <List dataArray={ExistingProjectsData}
                renderRow={this._renderRow}>
          </List>
        </Content>
      </Container>
    );
  }
}
