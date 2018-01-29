import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';

class ExistingProjectsScreen extends Component {

    static navigationOptions = {
        title: "Existing Projects Screen",
        headerTitleStyle: {
            alignSelf: 'center',
        }
    };

    handleButton() {
        Alert.alert("button pressed");
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Create a project" onPress={this.handleButton}/>
                <Button title="View my projects" onPress={this.handleButton}/>
                <Button title="View existing projects" onPress={this.handleButton}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        color: 'red'
    }
});

export default ExistingProjectsScreen;
