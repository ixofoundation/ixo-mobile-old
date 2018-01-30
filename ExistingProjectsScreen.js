import React, { Component } from 'react'
import {
	Container,
	Header,
	Content,
	List,
	ListItem,
	Thumbnail,
	Text,
	Body
} from 'native-base';

import {
	Alert
} from 'react-native';

import ExistingProjectsData from './ExistingProjectsData';

export default class ListThumbnailExample extends Component {
  render() {
	var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
    return (
      <Container>
        <Header />
        <Content>
			<List dataArray={items}
				  renderRow={(item) =>
				<ListItem button={true}>
					<Thumbnail square size={80} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg" }} />
					<Body>
						<Text>Sankhadeep</Text>
						<Text note>Its time to build a difference . .</Text>
					</Body>
				</ListItem>
			}>
          </List>
        </Content>
      </Container>
    );
  }
}











// class ListItem extends React.PureComponent {
// 	_onPress = () => {
// 		this.props.onPressItem(this.props.index);
// 	}

// 	render() {
// 		const item = this.props.item;
// 		return (
// 			<TouchableHighlight
// 				onPress={this._onPress}
// 				underlayColor='#dddddd'>
// 				<View>
// 					<View style={styles.rowContainer}>
// 						<Image style={styles.thumb} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg" }} />
// 						<View style={styles.textContainer}>
// 							<Text style={styles.title}>{item.name}</Text>
// 							<Text style={styles.country} numberOfLines={1}>{item.country}</Text>
// 						</View>
// 					</View>
// 					<View style={styles.separator} />
// 				</View>
// 			</TouchableHighlight>
// 		);
// 	}
// }

// export default class SearchResults extends Component {

// 	static navigationOptions = {
// 		title: "Existing Projects Screen",
// 		headerTitleStyle: {
// 			alignSelf: 'center',
// 		}
// 	};

// 	_keyExtractor = (item) => item._id;

// 	_renderItem = ({ item, index }) => (
// 		<ListItem
// 			item={item}
// 			index={index}
// 			onPressItem={this._onPressItem}
// 		/>
// 	);

// 	_onPressItem = (index) => {
// 		const { navigate } = this.props.navigation;
// 		navigate('ExistingProjectDetailScreen', ExistingProjectsData[index])
// 	};

// 	render() {
// 		return (
// 			<FlatList
// 				data={ExistingProjectsData}
// 				keyExtractor={this._keyExtractor}
// 				renderItem={this._renderItem}
// 			/>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	thumb: {
// 		width: 80,
// 		height: 80,
// 		marginRight: 10
// 	},
// 	textContainer: {
// 		flex: 1
// 	},
// 	separator: {
// 		height: 1,
// 		backgroundColor: '#dddddd'
// 	},
// 	title: {
// 		fontSize: 25,
// 		fontWeight: 'bold',
// 		color: '#48BBEC'
// 	},
// 	country: {
// 		fontSize: 20,
// 		color: '#656565'
// 	},
// 	rowContainer: {
// 		flexDirection: 'row',
// 		padding: 10
// 	},
// });