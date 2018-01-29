import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

class ExistingProjectDetailScreen extends Component {

    static navigationOptions = {
        title: "Project Detail Screen",
        headerTitleStyle: {
            alignSelf: 'center',
        }
    };

    render() {
        const { state, navigate } = this.props.navigation;
        return (
            <View>
                <Text>{JSON.stringify(state.params)}</Text>
            </View>
        );
    }
}

export default ExistingProjectDetailScreen;