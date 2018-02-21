import ProjectListScreen from "./ProjectListScreen.js";
import ProjectDetailScreen from "./ProjectDetailScreen.js";
import { StackNavigator } from "react-navigation";

export default StackNavigator({
    ProjectListScreen: { screen: ProjectListScreen },
    ProjectDetailScreen: { screen: ProjectDetailScreen },
});