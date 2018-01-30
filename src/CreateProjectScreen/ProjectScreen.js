import React from "react";
import { StatusBar } from "react-native";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem,
    List, ListItem, Thumbnail
} from "native-base";
export default class ProjectScreen extends React.Component {
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
                        <Title>Create Project</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Text>Hello World</Text>
                </Content>
            </Container>
        );
    }
}
