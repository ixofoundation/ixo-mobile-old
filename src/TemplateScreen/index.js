import React, { Component } from "react";
import ListScreen from "./ListScreen.js";
import DetailScreen from "./DetailScreen.js";
import { StackNavigator } from "react-navigation";

export default (DrawNav = StackNavigator({
    ListScreen: { screen: ListScreen },
    DetailScreen: { screen: DetailScreen },
}));