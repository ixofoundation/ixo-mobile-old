import React from "react";
import PropTypes from 'prop-types';
import { Container, Content, Text, List, ListItem } from "native-base";

export default class SideBar extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

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