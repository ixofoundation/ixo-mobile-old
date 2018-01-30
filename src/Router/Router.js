import React, { Component } from "react";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import ExistingProjectsScreen from "../ExistingProjectsScreen/index.js";
const Router = DrawerNavigator(
  {
    ProjectListScreen: { screen: ExistingProjectsScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default Router;