import React from "react";
import { Image } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, View } from "native-base";
import { StackNavigator } from 'react-navigation';
export default class ProjectDetailScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    _renderImage() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Image source={{ uri: 'https://cdn.xl.thumbs.canstockphoto.com/example-blue-square-stamp-isolated-on-white-background-clip-art_csp23367728.jpg' }}
                    style={{ height: 200, flex: 1 }} resizeMode='cover' />
            </View>
        );
    }

    _renderText = () => {
        const { state } = this.props.navigation;
        let projectData = state.params;
        let textViews = Object.keys(projectData).map((key, index) => {
            let legibleKey = (key.charAt(0).toUpperCase() + key.slice(1)).replace(".", " ");
            return (
                <View padder style={{ flex: 1, flexDirection: "row" }}
                    key={index}>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>{legibleKey}</Text>
                    <Text style={{ flex: 3 }}>{projectData[key]}</Text>
                </View>
            );
        });

        return (
            <View>{textViews}</View>
        );
    }

    render() {
        const { state } = this.props.navigation;
        let projectData = state.params;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{projectData.name}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this._renderImage()}
                    {this._renderText()}
                </Content>
            </Container>
        );
    }
}