import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import Feed from '../screens/Feed';
import CreateStory from '../screens/CreateStory';
import { getAuth } from "firebase/auth";
import {ref,onValue} from "firebase/dataase";
import db from "../config";
const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component{
	constructor(props){
		super(props)
		this.state={light_theme:true}
	}
	componentDidMount(){
		let theme 
		const auth=getAuth()
		const userId=auth.currentUser.uid
		onValue(ref(db,'/users/'+userId),(snapshot)=>{
			theme=snapshot.val().current_theme
			this.setState({
				light_theme:theme === "light" ? true:false
			})
		})
	}

render() {
	return (
		<Tab.Navigator
			labeled={false}
			barStyle={this.state.light_theme?styles.bootomTabStyleLight:styles.bottomTabStyle}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === 'Feed') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (route.name === 'Create Story') {
						iconName = focused ? 'add-circle' : 'add-circle-outline';
					}
					return (
						<Ionicons
							name={iconName}
							size={RFValue(25)}
							color={color}
							style={styles.icons}
						/>
					);
				},
				activeTintColor: '#ee8249',
				inactiveTintColor: 'gray',
			})}>
			<Tab.Screen name='Feed' component={Feed} />
			<Tab.Screen name='Create Story' component={CreateStory} />
		</Tab.Navigator>
		
	);
};
}
const styles = StyleSheet.create({
	bottomTabStyle: {
		backgroundColor: '#2f345d',
		height: '8%',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		overflow: 'hidden',
		position: 'absolute',
	},
	icons: {
		width: RFValue(30),
		height: RFValue(30),
	},
	bottomTabStyleLight: {
		backgroundColor:"#eaeaea",
		height: "8%",
		borderTopLeftRadius: RFValue(30),
		borderTopRightRadius: RFValue(30),
		overflow: 'hidden',
		position: 'absolute',
	}
});

