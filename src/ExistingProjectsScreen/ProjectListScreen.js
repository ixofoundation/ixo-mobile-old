import React from "react";
import { StatusBar } from "react-native";
import {
    Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem,
    List, ListItem, Thumbnail, Spinner, Input, View, Item
} from "native-base";

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            flatData: [],
            filteredData: [],
            searchText: "",
            isLoading: true
        };
        this.ixo = props.ixo;
    }

    componentDidMount() {
        this.ixo.project.listProjects()
            .then((response) => {
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

    _onSearchFilter = (text) => {
        console.log("_onSearchFilter called");
        let prevData = this.state.flatData;
        let searchText = text.toLowerCase().trim();

        let filteredData = prevData.filter((value, index) => {
            return (
                (prevData[index]["country"].toLowerCase().includes(searchText)) ||
                (prevData[index]['name'].toLowerCase().includes(searchText)) ||
                (prevData[index]["owner.name"].toLowerCase().includes(searchText)));
        });

        console.log("filteredData", filteredData);

        this.setState({ filteredData, searchText: text });
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
        let data = this.state.searchText.length > 0 ? this.state.filteredData : this.state.flatData;
        return (
            <ListItem
                item={item}
                index={index}
                onPress={() => this.props.navigation.navigate("ProjectDetailScreen", data[index])}>
                <Thumbnail square size={80} source={{ uri: 'http://www.theanimalfiles.com/images/sand_cat_1.jpg' }} />
                <Body>
                    <Text>{data[index]['name']}</Text>
                    <Text note>{data[index]['country']} | {data[index]['owner.name']}</Text>
                </Body>
            </ListItem>
        );
    }

    _generateContent() {
        if (this.state.isLoading) {
            return <Content contentContainerStyle={{ flex: 1, justifyContent: "center" }}><Spinner color="blue" /></Content>
        } else {
            let data = this.state.searchText.length > 0 ? this.state.filteredData : this.state.flatData;
            return <List dataArray={data} renderRow={this._renderRow}></List>
        }
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
                        <Icon name="search" />
                        <Input placeholder="Search"
                            onChangeText={(text) => this._onSearchFilter(text)}
                            value={this.state.searchText} />
                        <Icon name="paper" />
                    </Item>
                </Header>
                {this._generateContent()}
            </Container>
        );
    }
}
