import React from "react";
import PropTypes from 'prop-types';
import { AsyncStorage } from "react-native";
import {
    Container, Header, Icon, Button, Content, Text, List, ListItem, View, Item, Input
} from "native-base";
import { Ixo } from 'ixo-module';


var templateList = [{ name: 'Fake Name 0', type: 'Project 0' }, { name: 'Fake Name 1', type: 'Project 0' }, { name: 'Fake Name 2', type: 'Project 0' },
{ name: 'Fake Name 1', type: 'Project 1' }, { name: 'Fake Name 1', type: 'Project 1' },
{ name: 'Fake Name 0', type: 'Project 2' }, { name: 'Fake Name 2', type: 'Project 2' }, { name: 'Fake Name 1', type: 'Project 2' }
]

export default class ListScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        let hostName = 'https://ixo-node.herokuapp.com';
        this.ixo = new Ixo(hostName);

        this.state = {
            originalData: templateList,
            filteredData: [],
            searchText: ""
        };
    }

    _onSearchFilter = (text) => {
        console.log("_onSearchFilter called");
        let prevData = this.state.originalData;
        let searchText = text.toLowerCase().trim();
        let filteredData = prevData.filter((value, index) => prevData[index]["name"].toLowerCase().includes(searchText));
        console.log("filteredData", filteredData);
        this.setState({ filteredData, searchText: text });
    }

    componentDidMount() {
        console.log("component did mount called")
        let key = "key";
        this._storeTemplatesLocally(key)
            .then(() => this._getLocalTemplates(key));
    }

    _searchButtonPressed = (templateName) => {
        // TODO: get project template from ixo-module
        // if there is internet and the call succeeded, display it and store it locally (synchronize local and remote template copies)
        // else display templates from local storage
    }

    async _storeTemplatesLocally(key) {
        let data = this.state.searchText.length > 0 ? this.state.filteredData : this.state.originalData;
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }

    async _getLocalTemplates(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value));
                // console.log(value);
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }

    }

    _renderRow = (item, _, index) => {
        let data = this.state.searchText.length > 0 ? this.state.filteredData : this.state.originalData;
        return (
            <View>
                {((index == 0) || (item.type !== data[index - 1].type)) &&
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
        let data = this.state.searchText.length > 0 ? this.state.filteredData : this.state.originalData;
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
                        <Icon name="search" />
                        <Input placeholder="Search"
                            onChangeText={(text) => this._onSearchFilter(text)}
                            value={this.state.searchText} />
                        <Icon name="paper" />
                    </Item>
                </Header>
                <Content padder>
                    <List dataArray={data}
                        renderRow={this._renderRow}>
                    </List>
                </Content>
            </Container>
        );
    }
}
