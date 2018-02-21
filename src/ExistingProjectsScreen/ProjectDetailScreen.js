import React from "react";
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { 
    Container, 
    Header, 
    Title, 
    Left, 
    Icon, 
    Right, 
    Button, 
    Body, 
    Content, 
    Text, 
    View 
} from "native-base";
export default class ProjectDetailScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    _renderImage() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Image source={{ uri: 'http://www.theanimalfiles.com/images/sand_cat_1.jpg' }}
                    style={{ height: 200, flex: 1 }} resizeMode='cover' />
            </View>
        );
    }

    _renderText = () => {
        const { state } = this.props.navigation;
        let projectData = state.params;
        let textViews = Object.keys(projectData).map((key, index) => {
            let legibleKey = (key.charAt(0).toUpperCase() + key.slice(1)).replace(".", " ");
            return (
                <View padder style={{ flex: 1, flexDirection: "row" }}
                    key={index}>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>{legibleKey}</Text>
                    <Text style={{ flex: 3 }}>{projectData[key]}</Text>
                </View>
            );
        });

        return (
            <View>{textViews}</View>
        );
    }

    render() {
        const { state } = this.props.navigation;
        let projectData = state.params;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{flex: 3}}>
                        <Title>{projectData.name}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this._renderImage()}
                    {this._renderText()}
                </Content>
            </Container>
        );
    }
}