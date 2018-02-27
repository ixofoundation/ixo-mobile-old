import React from "react";
import { Image, Alert } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, View, Form, Item, Label, Input, Picker } from "native-base";
import { StackNavigator } from 'react-navigation';

//import CreateProjectData from '../Data/CreateProjectData.js';
import signWithApp from '../../SignWithApp.js';

var countries = ["South Africa", "USA", "China"]

export default class TemplateScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            fields: [],
            loaded: false,
            templateData: {"projectTx": props.navigation.state.params.projectData.tx},
            projectData: props.navigation.state.params.projectData,
            type: props.navigation.state.params.type
        };
        this.ixo = props.ixo;
    }

    _loadAgentTemplate(name){
        return this.ixo.agent.getAgentTemplate(name)
            .then((response) => {
                this.setState({
                    fields: response.result.form.fields,
                    loaded: true
                });
             })
            .catch(error => 
                console.log(error)
            );
    }
    

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
        let formState = this.state.templateData;
        for (field of this.state.fields) {
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

        if(this.state.type == 'register'){
            this._loadAgentTemplate(this.state.projectData["agentTemplate.name"]);     
        } 
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
        let payload = {data: jsonifiedData, template: {name: this.state.projectData["agentTemplate.name"]} };
        signWithApp(JSON.stringify(payload))
          .then( signedData => {
            console.log('signedData: %s', JSON.stringify(signedData));
            this._createAgent(signedData);
          })
          .catch (error => {
            console.log('failed on signWithApp call');
            console.log(JSON.stringify(error));
          });
    }

    _createAgent(signedData){
        // TODO: The should be changed to be response.data.signature.creator and then the public key should also be sent
        var did = signedData.signature.publicKey;
        var signature = signedData.signature.signature; 
        var data = signedData.content;
        var signedDate = signedData.signature.created;
        var signatureType = signedData.signature.type;

        this.ixo.credentialProvider.setSignature(signedData.signature);
      
        //update the did to the signed in user
        this.ixo.credentialProvider.setDid(did);
      
        console.log("Sign response:" + JSON.stringify(signedData));
        return ixo.agent.createAgent(signedData.payload, signedData.payload.template.name);
      
    }

    _updateFormData = (formState, fieldName, value) => {
        formState[fieldName] = value;
        this.setState({ templateData: formState });
    }

    _generateTemplate(type, projectData) {
        if(!this.state.loaded){
            return (
                <Content padder>
                    <Text>Loading</Text>
                </Content>
            );
        }else{
            let formState = this.state.templateData;
            let formFields = this.state.fields.map((field, index) => {
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
                            let options = field.options;
                            return (
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    key={index}
                                    selectedValue={this.state.templateData[fieldName]}
                                    onValueChange={(value) => this._updateFormData(formState, fieldName, value)}
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
            return (
                <Content padder>
                    <View>
                        {formFields}
                    </View>
                    <Button block onPress={() => this._onSubmit()}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
             );
        }
    }

    render() {
        const { state } = this.props.navigation;
        let projectData = state.params.projectData;
        let type = state.params.type;

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
                {this._generateTemplate()}
            </Container>
        );
    }
}


