import React from "react";
import { StatusBar } from "react-native";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem,
    List, ListItem, Thumbnail, Spinner
} from "native-base";
import { Ixo } from 'ixo-module';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            flatData: [],
            isLoading: true
        };
        let hostName = 'https://ixo-node.herokuapp.com';
        this.ixo = new Ixo(hostName);
    }

    componentDidMount() {
        this.ixo.project.listProjects()
            .then((response) => {
                console.log(response.result);
                let flatData = response.result.map((value, index) => {
                    return this._flattenData(value, [], {});
                })
                this.setState(
                    {
                        flatData: flatData,
                        isLoading: false
                    }
                );
            })
            .catch(error => console.log(error));
    }

    _flattenData = (data, accum, flatData) => {
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            accum.push(keys[i]);
            if (data[keys[i]] !== null && typeof data[keys[i]] === "object") {
                this._flattenData(data[keys[i]], accum, flatData);
            } else {
                let flatString = accum.join(".");
                accum.pop();
                flatData[flatString] = data[keys[i]];
            }
            if (i == keys.length - 1) {
                accum.pop()
            }
        }
        return flatData
    }

    _renderRow = (item, _, index) => {
        return (
            <ListItem
                item={item}
                index={index}
                onPress={() => this.props.navigation.navigate("ProjectDetailScreen", this.state.flatData[index])}>
                <Thumbnail square size={80} source={{ uri: 'http://www.theanimalfiles.com/images/sand_cat_1.jpg' }} />
                <Body>
                    <Text>{this.state.flatData[index]['name']}</Text>
                    <Text note>{this.state.flatData[index]['country']} | {this.state.flatData[index]['owner.name']}</Text>
                </Body>
            </ListItem>
        );
    }

    _generateContent() {
        if (this.state.isLoading) {
            return <Content contentContainerStyle={{flex: 1, justifyContent: "center"}}><Spinner color="blue"/></Content>
        } else {
            return <List dataArray={this.state.flatData} renderRow={this._renderRow}></List>
        }
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
                    <Body style={{flex: 3}}>
                        <Title>Existing Projects</Title>
                    </Body>
                    <Right />
                </Header>
                {this._generateContent()}
            </Container>
        );
    }
}
