import React from "react";
import { Container, Content, Text, List, ListItem } from "native-base";

export default class SideBar extends React.Component {

    _renderRow = item => {
        return (
            <ListItem
                button
                onPress={() => this.props.navigation.navigate(item.routeName)}>
                <Text>{item.routeName}</Text>
            </ListItem>
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <List
                        dataArray={this.props.navigation.state.routes}
                        renderRow={this._renderRow}
                    />
                </Content>
            </Container>
        );
    }
}