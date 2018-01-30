import React, { Component } from "react";
import ProjectListScreen from "./ProjectListScreen.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import ProjectStackNavigator from "./ProjectStackNavigator.js";
const HomeScreenRouter = DrawerNavigator(
  {
    ProjectListScreen: { screen: ProjectStackNavigator },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;