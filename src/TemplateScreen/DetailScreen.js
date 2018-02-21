import React from "react";
import PropTypes from 'prop-types';
import { 
    Container, 
    Header, 
    Title, 
    Left, 
    Icon, 
    Right, 
    Button, 
    Body, 
    Content, 
    Text, 
    View, 
    Item, 
    Input, 
    Picker
} from "native-base";

import CreateProjectData from '../Data/CreateProjectData.js';
import signWithApp from '../../SignWithApp.js';

var countries = ["South Africa", "USA", "China"]

export default class DetailScreen extends React.Component {

    static navigationOptions = {
        header: null
    }
    
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    state = {
        latitude: null,
        longitude: null,
        templateData: {}
    };

    _getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log("this is the position: ", position);
            },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    _setHiddenFields = () => {
        let fields = CreateProjectData.fields;
        let formState = this.state.templateData;
        for (let field of fields) {
            if (field.hidden == "true") {
                let fieldName = field.name;
                this._updateFormData(formState, fieldName, "default");
            }
        }
    }

    componentDidMount() {
        // this._getLocation();
        this._setHiddenFields();
    }

    componentWillMount() {
        let newState = Object.assign(this.state.templateData);
        let fields = CreateProjectData.fields;
        fields.map(field => {
            let fieldName = field.name;
            switch (field.type) {
                case "country":
                    newState[fieldName] = countries[0];
                    break;
                case "select":
                    newState[fieldName] = field.options[0].value;
                    break;
                default:
                    break;

            }
            this.setState({ templateData: newState });
        });
    }

    _jsonifyFlatData(state) {
        let obj = {}
        let temp = obj;
        let keys = Object.keys(state);
        for (let i = 0; i < keys.length; i++) {
            let arr = keys[i].split('.');
            let val = state[keys[i]];
            for (let j = 0; j < arr.length; j++) {
                if (j == arr.length - 1) {
                    obj[arr[j]] = val
                } else if (obj[arr[j]] === undefined) {
                    obj[arr[j]] = {};
                }
                obj = obj[arr[j]];
            }
            obj = temp;
        }
        return obj;
    }

    _onSubmit = () => {
        let jsonifiedData = this._jsonifyFlatData(this.state.templateData);
        console.log(jsonifiedData);
        signWithApp(JSON.stringify(jsonifiedData))
          .then( signedData => {
            console.log('signedData: %s', JSON.stringify(signedData));
          })
          .catch (error => {
            console.log('failed on signWithApp call');
            console.log(JSON.stringify(error));
          });
    }

    _updateFormData = (formState, fieldName, value) => {
        formState[fieldName] = value;
        this.setState({ templateData: formState });
    }

    _generateTemplate() {
        let fields = CreateProjectData.fields;
        let formState = this.state.templateData;
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
                                selectedValue={this.state.templateData[fieldName]}
                                onValueChange={(country) => this._updateFormData(formState, fieldName, country)}
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
                                    onChangeText={(text) => this._updateFormData(formState, fieldName, text)}
                                />
                            </Item>
                        );
                    case "text":
                        return (
                            <Item
                                key={index}>
                                <Input placeholder={field.label}
                                    onChangeText={(text) => this._updateFormData(formState, fieldName, text)}
                                />
                            </Item>
                        );
                    case "select":
                        return (
                            <Picker
                                iosHeader="Select one"
                                mode="dropdown"
                                key={index}
                                selectedValue={this.state.templateData[fieldName]}
                                onValueChange={(value) => this._updateFormData(formState, fieldName, value)}
                            >
                                {field.options.map((option, index) => {
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
                    <Body style={{ flex: 3 }}>
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


