import React from "react";
import { Image, Alert } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, View, Form, Item, Label, Input, Picker } from "native-base";
import { StackNavigator } from 'react-navigation';

import CreateProjectData from '../Data/CreateProjectData.js';
var countries = ["South Africa", "USA", "China"]

export default class DetailScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    state = {}

    _onSubmit() {
        Alert.alert("This submit worked");

    }

    _onValueChange = (formState, fieldName, value) => {
        formState[fieldName] = value;
        this.setState(formState);
    }

    _generateTemplate() {
        let fields = CreateProjectData.fields;
        let formState = this.state;
        let formFields = fields.map((field, index) => {
            let fieldName = field.name;
            if (!(fieldName in formState)) {
                formState[fieldName] = "";
            }
            if (field.hidden !== "true") {
                switch (field.type) {
                    case "country":
                        return (
                            <Picker
                                iosHeader="Select one"
                                mode="dropdown"
                                key={index}
                                selectedValue={this.state[fieldName]}
                                onValueChange={(country) => this._onValueChange(formState, fieldName, country)}
                            >
                                {countries.map((country, index) => {
                                    return <Item label={country} value={country} key={index} />
                                })}

                            </Picker>
                        );
                    case "textarea":
                        return (
                            <Item regular
                                key={index}>
                                <Input multiline={true}
                                    style={{ textAlignVertical: "top" }}
                                    numberOfLines={4}
                                    placeholder={field.label}
                                    onChangeText={(text) => this._onValueChange(formState, fieldName, text)}
                                />
                            </Item>
                        );
                    case "text":
                        return (
                            <Item
                                key={index}>
                                <Input placeholder={field.label}
                                    onChangeText={(text) => this._onValueChange(formState, fieldName, text)}
                                />
                            </Item>
                        );
                    case "select":
                        let options = field.options;
                        return (
                            <Picker
                                iosHeader="Select one"
                                mode="dropdown"
                                key={index}
                                selectedValue={this.state[fieldName]}
                                onValueChange={(value) => this._onValueChange(formState, fieldName, value)}
                            >
                                {options.map((option, index) => {
                                    return <Item label={option.label} value={option.value} key={index} />
                                })}

                            </Picker>
                        );
                    default:
                        return null;
                }
            }
        });
        return formFields;
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
                <Content padder>
                    <View>
                        {this._generateTemplate()}
                    </View>
                        <Button block onPress={() => this._onSubmit()}>
                            <Text>Submit</Text>
                        </Button>
                </Content>
            </Container>
        );
    }
}


