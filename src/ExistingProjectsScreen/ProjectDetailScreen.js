import React from "react";
import { Image, StyleSheet, Button, View, Text, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ixo } from 'ixo-module';
export default class ProjectDetailScreen extends React.Component {
    state = { pingResult: "Waiting..." };

    // pingIxoServerNode = () => {
    //     var ixo = new Ixo('https://ixo-node.herokuapp.com');
    //     ixo.network.pingIxoServerNode().then((response) => {
    //         this.setState({ pingResult: JSON.stringify(response) });
    //     })
    // }

    _onPress() {
        Alert.alert('on Press!');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.pingResult}</Text>
                <Button onPress={this._onPress} title="Hello" color="#2E9298" accessibilityLabel="Tap on Me" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    buttonContainer: {
        backgroundColor: '#2E9298',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25
    }
})