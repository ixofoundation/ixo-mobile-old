import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet,
    Alert
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';

import ExistingProjectsScreen from './ExistingProjectsScreen';
import ExistingProjectDetailScreen from './ExistingProjectDetailScreen';

class HomeScreen extends Component {

    static navigationOptions = {
        title: "Home Screen",
        headerTitleStyle: {
            alignSelf: 'center',
        }
    };

    handleButton() {
        Alert.alert("button pressed");
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Button title="Create a project" onPress={this.handleButton}/>
                <Button title="View my projects" onPress={this.handleButton}/>
                <Button title="View existing projects" onPress={() => navigate('ExistingProjects')}/>
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

const App = StackNavigator({
    Home: { screen: HomeScreen },
    ExistingProjects: { screen: ExistingProjectsScreen },
    ExistingProjectDetailScreen: { screen: ExistingProjectDetailScreen }
});

export default App;
