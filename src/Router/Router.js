import React from "react";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import ExistingProjectsScreen from "../ExistingProjectsScreen/index.js";
import TemplateScreen from "../TemplateScreen/index.js";

const Router = DrawerNavigator(
    {
        ExistingProjectsScreen: { screen: ExistingProjectsScreen },
        TemplateScreen: { screen: TemplateScreen }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default Router;