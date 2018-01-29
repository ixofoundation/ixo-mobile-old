import React, { Component } from 'react'
import {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	FlatList,
	Text,
} from 'react-native';
import ExistingProjectsData from './ExistingProjectsData';

class ListItem extends React.PureComponent {
	_onPress = () => {
		this.props.onPressItem(this.props.index);
	}

	render() {
		const item = this.props.item;
		return (
			<TouchableHighlight
				onPress={this._onPress}
				underlayColor='#dddddd'>
				<View>
					<View style={styles.rowContainer}>
						<Image style={styles.thumb} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg" }} />
						<View style={styles.textContainer}>
							<Text style={styles.title}>{item.name}</Text>
							<Text style={styles.country} numberOfLines={1}>{item.country}</Text>
						</View>
					</View>
					<View style={styles.separator} />
				</View>
			</TouchableHighlight>
		);
	}
}

export default class SearchResults extends Component {

	static navigationOptions = {
		title: "Existing Projects Screen",
		headerTitleStyle: {
			alignSelf: 'center',
		}
	};

	_keyExtractor = (item) => item._id;

	_renderItem = ({ item, index }) => (
		<ListItem
			item={item}
			index={index}
			onPressItem={this._onPressItem}
		/>
	);

	_onPressItem = (index) => {
		console.log("Pressed row: " + index);
	};

	render() {
		return (
			<FlatList
				data={ExistingProjectsData}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
		);
	}
}

const styles = StyleSheet.create({
	thumb: {
		width: 80,
		height: 80,
		marginRight: 10
	},
	textContainer: {
		flex: 1
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#48BBEC'
	},
	country: {
		fontSize: 20,
		color: '#656565'
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 10
	},
});