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
                <Image source={{ uri: 'http://www.theanimalfiles.com/images/sand_cat_1.jpg' }}
                    style={{ height: 200, flex: 1 }} resizeMode='cover' />
            </View>
        );
    }

    _onRegister(){
        const { state } = this.props.navigation;
        let projectData = state.params;
        this.props.navigation.navigate("TemplateScreen", {type: "registerAgent", projectData: projectData });
    }

    _onSubmitClaim(){
        const { state } = this.props.navigation;
        let projectData = state.params;
        this.props.navigation.navigate("TemplateScreen", {type: "submitClaim", projectData: projectData });
    }

    _renderText = () => {
        const { state } = this.props.navigation;
        let projectData = state.params;
        return (
            <View>
                <View padder style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>Created: </Text>
                    <Text style={{ flex: 3 }}>{projectData['created']}</Text>
                </View>
                <View padder style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>About: </Text>
                </View>
                <View padder style={{ flex: 2, flexDirection: "row" }}>
                    <Text style={{ flex: 3, height: 40}}>{projectData['about']}</Text>
                </View>
                <View padder style={{ flex: 2, flexDirection: "row" }}>
                    <Text style={{ flex: 1}}></Text>
                    <Button block onPress={() => this._onRegister()} style={{ flex: 5, justifyContent: "center" }}><Text>Register</Text></Button>
                    <Text style={{ flex: 1 }}></Text>
                    <Button block onPress={() => this._onSubmitClaim()} style={{ flex: 5, justifyContent: "center" }}><Text>Submit Claim</Text></Button>
                    <Text style={{ flex: 1 }}></Text>
                </View>
            </View>
        )
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
                    <Body style={{flex: 3}}>
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