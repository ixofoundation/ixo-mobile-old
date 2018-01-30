import React, { Component } from "react";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import ExistingProjectsScreen from "../ExistingProjectsScreen/index.js";
import CreateProjectScreen from "../CreateProjectScreen/index.js";

const Router = DrawerNavigator(
    {
        ExistingProjectsScreen: { screen: ExistingProjectsScreen },
        CreateProjectScreen: { screen: CreateProjectScreen }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default Router;