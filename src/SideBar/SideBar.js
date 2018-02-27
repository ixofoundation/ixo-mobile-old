import React from "react";
import { AppRegistry, StyleSheet, View, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";


const list = [
    {
        title: 'List Project',
        screen: 'ListProjectsScreen'

    },
    // {
    //     title: 'My Project',
    //     screen: 'MyProjectsScreen'

    // },
    {
        title: 'List Template',
        screen: 'TemplateScreen'

    }
  ];

const SideBar = (props) => {
    return (
        <View style={styles.container}>
            <List>
                { 
                    list.map((item, i) => {
                       return (<ListItem key={i} onPress={() => this.props.navigation.navigate(item.screen)} >
                            <Text>{item.title}</Text>
                        </ListItem>)
                    })
                }
            </List>

        </View>
    );
}

module.exports = SideBar;

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: 'darkgray',
    }
})
  
