import React, { Component } from "react";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import ExistingProjectsScreen from "../ExistingProjectsScreen/index.js";
//import TemplateScreen from "../TemplateScreen/index.js";

const Router = DrawerNavigator(
    {
        ListProjectsScreen: { 
            screen: ExistingProjectsScreen
        }
//        MyProjectsScreen: { screen: props => <ExistingProjectsScreen  {...props} /> },
//        TemplateScreen: { screen: TemplateScreen }
    },
    {
        contentComponent: props => <SideBar {...props} />,
        initialRouteName: 'ListProjectsScreen',
    }
);
export default Router;