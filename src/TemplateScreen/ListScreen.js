import React from "react";
import { StatusBar } from "react-native";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem,
    List, ListItem, Thumbnail, View, Item, Input
} from "native-base";
import ExistingProjectsData from '../Data/ExistingProjectsData.js';


var templateList = [{ name: 'Fake Name 0', type: 'Project 0' }, { name: 'Fake Name 0', type: 'Project 0' }, { name: 'Fake Name 0', type: 'Project 0' },
{ name: 'Fake Name 1', type: 'Project 1' }, { name: 'Fake Name 1', type: 'Project 1' },
{ name: 'Fake Name 2', type: 'Project 2' }, { name: 'Fake Name 2', type: 'Project 2' }, { name: 'Fake Name 2', type: 'Project 2' }
]

export default class ListScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    _renderRow = (item, _, index) => {
        return (
            <View>
                {((index == 0) || (item.type !== templateList[index - 1].type)) &&
                    <ListItem itemDivider>
                        <Text>{item.type}</Text>
                    </ListItem>
                }
                <ListItem onPress={() => this.props.navigation.navigate("DetailScreen", item)}>
                    <Text>{item.name}</Text>
                </ListItem>
            </View>
        );
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <View style={{ flex: 0, justifyContent: "space-around" }}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon
                                style={{ marginLeft: 5 }}
                                name="menu" />
                        </Button>
                    </View>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content padder>
                    <List dataArray={templateList}
                        renderRow={this._renderRow}>
                    </List>
                </Content>
            </Container>
        );
    }
}
