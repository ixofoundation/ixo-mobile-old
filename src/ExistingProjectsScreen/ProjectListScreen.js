import React from "react";
import { StatusBar } from "react-native";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem,
    List, ListItem, Thumbnail
} from "native-base";
import ExistingProjectsData from '../Data/ExistingProjectsData.js';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.flatData = ExistingProjectsData.map((value, index) => {
            return this._flattenData(value, [], {});
        })
    }

    _flattenData = (data, accum, flatData) => {
        for (key in data) {
            accum.push(key);
            if (data[key] !== null && typeof data[key] === "object") {
                this._flattenData(data[key], accum, flatData);
            } else {
                let flatString = accum.join(".");
                accum.pop()
                flatData[flatString] = data[key];
            }
        }
        return flatData
    }

    _renderRow = (item, _, index) => {
        return (
            <ListItem
                item={item}
                index={index}
                onPress={() => this.props.navigation.navigate("ProjectDetailScreen", this.flatData[index])}>
                <Thumbnail square size={80} source={{ uri: 'https://cdn.xl.thumbs.canstockphoto.com/example-blue-square-stamp-isolated-on-white-background-clip-art_csp23367728.jpg' }} />
                <Body>
                    <Text>{this.flatData[index]['name']}</Text>
                    <Text note>{this.flatData[index]['country']} | {this.flatData[index]['owner.name']}</Text>
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
                        <Title>Existing Projects</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <List dataArray={this.flatData}
                        renderRow={this._renderRow}>
                    </List>
                </Content>
            </Container>
        );
    }
}
